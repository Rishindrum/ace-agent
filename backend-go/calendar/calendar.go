package calendar

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	secretmanager "cloud.google.com/go/secretmanager/apiv1"
	"cloud.google.com/go/secretmanager/apiv1/secretmanagerpb"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	googlecalendar "google.golang.org/api/calendar/v3"
	"google.golang.org/api/option"
)

var OAuthConfig *oauth2.Config

func InitOAuthConfig() {
	clientID := os.Getenv("GOOGLE_CLIENT_ID")
	clientSecret := os.Getenv("GOOGLE_CLIENT_SECRET")
	redirectURL := os.Getenv("OAUTH_REDIRECT_URL")

	if clientID == "" || clientSecret == "" {
		log.Println("[OAuth] Warning: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is empty.")
	}
	if redirectURL == "" {
		redirectURL = "http://localhost:8080/api/v1/auth/google/callback"
	}

	OAuthConfig = &oauth2.Config{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		RedirectURL:  redirectURL,
		Scopes: []string{
			"https://www.googleapis.com/auth/calendar.events",
			"https://www.googleapis.com/auth/userinfo.profile",
			"https://www.googleapis.com/auth/userinfo.email",
		},
		Endpoint:     google.Endpoint,
	}
	log.Printf("[OAuth] Initialized with RedirectURL: %s", redirectURL)
}

// GetLoginURL generates the login URL and forces offline access to get refresh token
func GetLoginURL(state string) string {
	if OAuthConfig == nil {
		InitOAuthConfig()
	}
	// AccessTypeOffline forces Google to return a refresh token
	// ApprovalForce prompts the user even if they've already authorized the app
	return OAuthConfig.AuthCodeURL(state, oauth2.AccessTypeOffline, oauth2.ApprovalForce)
}

// SaveRefreshToken saves the user's refresh token into GCP Secret Manager
func SaveRefreshToken(ctx context.Context, userID string, refreshToken string) error {
	var opts []option.ClientOption

	// Try to find credentials locally
	if _, err := os.Stat("key.json"); err == nil {
		opts = append(opts, option.WithCredentialsFile("key.json"))
	} else if _, err := os.Stat("../key.json"); err == nil {
		opts = append(opts, option.WithCredentialsFile("../key.json"))
	}

	client, err := secretmanager.NewClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("failed to create secret manager client: %w", err)
	}
	defer client.Close()

	// Project ID is ace-agent-demo
	projectID := "ace-agent-demo"
	secretID := fmt.Sprintf("ace-refresh-token-%s", userID)

	// Build the parent resource path
	parent := fmt.Sprintf("projects/%s", projectID)

	// Create Secret request
	secretName := fmt.Sprintf("%s/secrets/%s", parent, secretID)
	
	// Check if secret already exists
	getReq := &secretmanagerpb.GetSecretRequest{
		Name: secretName,
	}
	_, err = client.GetSecret(ctx, getReq)
	if err != nil {
		// Secret does not exist, create it
		createReq := &secretmanagerpb.CreateSecretRequest{
			Parent:   parent,
			SecretId: secretID,
			Secret: &secretmanagerpb.Secret{
				Replication: &secretmanagerpb.Replication{
					Replication: &secretmanagerpb.Replication_Automatic_{
						Automatic: &secretmanagerpb.Replication_Automatic{},
					},
				},
			},
		}
		_, err = client.CreateSecret(ctx, createReq)
		if err != nil {
			return fmt.Errorf("failed to create secret in secret manager: %w", err)
		}
		log.Printf("[SecretManager] Created secret: %s", secretName)
	}

	// Add payload version
	addReq := &secretmanagerpb.AddSecretVersionRequest{
		Parent: secretName,
		Payload: &secretmanagerpb.SecretPayload{
			Data: []byte(refreshToken),
		},
	}
	_, err = client.AddSecretVersion(ctx, addReq)
	if err != nil {
		return fmt.Errorf("failed to add secret version: %w", err)
	}

	log.Printf("[SecretManager] Successfully saved refresh token version for user: %s", userID)
	return nil
}

// GetRefreshToken retrieves the user's refresh token from GCP Secret Manager
func GetRefreshToken(ctx context.Context, userID string) (string, error) {
	var opts []option.ClientOption

	if _, err := os.Stat("key.json"); err == nil {
		opts = append(opts, option.WithCredentialsFile("key.json"))
	} else if _, err := os.Stat("../key.json"); err == nil {
		opts = append(opts, option.WithCredentialsFile("../key.json"))
	}

	client, err := secretmanager.NewClient(ctx, opts...)
	if err != nil {
		return "", fmt.Errorf("failed to create secret manager client: %w", err)
	}
	defer client.Close()

	projectID := "ace-agent-demo"
	secretID := fmt.Sprintf("ace-refresh-token-%s", userID)
	secretName := fmt.Sprintf("projects/%s/secrets/%s/versions/latest", projectID, secretID)

	req := &secretmanagerpb.AccessSecretVersionRequest{
		Name: secretName,
	}
	result, err := client.AccessSecretVersion(ctx, req)
	if err != nil {
		return "", fmt.Errorf("failed to access secret version: %w", err)
	}

	return string(result.Payload.Data), nil
}

// ScheduleStudySession renews access token, verifies availability, and inserts a calendar study event.
func ScheduleStudySession(ctx context.Context, userID string, preferredTime string, newTopics []string, reviewTopics []string, dashboardURL string, calendarNotifs bool) error {
	refreshToken, err := GetRefreshToken(ctx, userID)
	if err != nil {
		return fmt.Errorf("failed to get refresh token: %w", err)
	}

	if refreshToken == "" {
		return fmt.Errorf("refresh token is empty for user %s", userID)
	}

	// Renew token
	token := &oauth2.Token{
		RefreshToken: refreshToken,
	}
	tokenSource := OAuthConfig.TokenSource(ctx, token)
	newToken, err := tokenSource.Token()
	if err != nil {
		return fmt.Errorf("failed to renew access token: %w", err)
	}

	// Create calendar service
	var opts []option.ClientOption
	if _, err := os.Stat("key.json"); err == nil {
		opts = append(opts, option.WithCredentialsFile("key.json"))
	} else if _, err := os.Stat("../key.json"); err == nil {
		opts = append(opts, option.WithCredentialsFile("../key.json"))
	}
	client := OAuthConfig.Client(ctx, newToken)
	srv, err := googlecalendar.NewService(ctx, append(opts, option.WithHTTPClient(client))...)
	if err != nil {
		return fmt.Errorf("failed to create calendar service: %w", err)
	}

	// Determine preferred slot start/end hours
	hour := 14
	if strings.ToLower(preferredTime) == "morning" {
		hour = 9
	} else if strings.ToLower(preferredTime) == "evening" {
		hour = 19
	} else if strings.ToLower(preferredTime) == "night" {
		hour = 21
	}

	now := time.Now()
	sessionStart := time.Date(now.Year(), now.Month(), now.Day(), hour, 0, 0, 0, now.Location())
	if sessionStart.Before(now) {
		sessionStart = sessionStart.Add(24 * time.Hour)
	}
	sessionEnd := sessionStart.Add(1 * time.Hour)

	// List events to verify availability/conflicts
	listCall := srv.Events.List("primary").
		TimeMin(sessionStart.Format(time.RFC3339)).
		TimeMax(sessionEnd.Format(time.RFC3339)).
		SingleEvents(true)
	events, err := listCall.Do()
	if err != nil {
		log.Printf("[Calendar] Warning: Failed to query calendar availability: %v. Proceeding to insert.", err)
	} else if len(events.Items) > 0 {
		// Conflict found! Shift it forward by 2 hours
		log.Printf("[Calendar] Conflict found! Shifting study session for user %s by 2 hours", userID)
		sessionStart = sessionStart.Add(2 * time.Hour)
		sessionEnd = sessionEnd.Add(2 * time.Hour)
	}

	// Construct Description with topics and link
	desc := "📚 **Your Proactive Study Session**\n\n"
	desc += "Here is your personalized schedule for today:\n"
	if len(newTopics) > 0 {
		desc += "✨ **New Topics**: " + strings.Join(newTopics, ", ") + "\n"
	}
	if len(reviewTopics) > 0 {
		desc += "🔄 **Review Topics (Spaced Repetition)**: " + strings.Join(reviewTopics, ", ") + "\n"
	}
	desc += "\n🚀 Click here to study: " + dashboardURL

	var reminders *googlecalendar.EventReminders
	if calendarNotifs {
		reminders = &googlecalendar.EventReminders{
			UseDefault: false,
			Overrides: []*googlecalendar.EventReminder{
				{Method: "popup", Minutes: 10},
			},
		}
	} else {
		reminders = &googlecalendar.EventReminders{
			UseDefault: false,
			Overrides:  []*googlecalendar.EventReminder{},
		}
	}

	event := &googlecalendar.Event{
		Summary:     "Ace Agent: AI Study & Spaced Repetition",
		Description: desc,
		Start: &googlecalendar.EventDateTime{
			DateTime: sessionStart.Format(time.RFC3339),
			TimeZone: sessionStart.Location().String(),
		},
		End: &googlecalendar.EventDateTime{
			DateTime: sessionEnd.Format(time.RFC3339),
			TimeZone: sessionEnd.Location().String(),
		},
		Reminders: reminders,
	}

	_, err = srv.Events.Insert("primary", event).Do()
	if err != nil {
		return fmt.Errorf("failed to insert calendar event: %w", err)
	}

	log.Printf("[Calendar] Successfully scheduled study session for user %s at %s", userID, sessionStart.Format(time.RFC3339))
	return nil
}
