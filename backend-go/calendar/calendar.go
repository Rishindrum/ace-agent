package calendar

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strings"
	"sync"
	"time"

	auth "ace-agent/backend-go/auth"

	secretmanager "cloud.google.com/go/secretmanager/apiv1"
	"cloud.google.com/go/secretmanager/apiv1/secretmanagerpb"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	googlecalendar "google.golang.org/api/calendar/v3"
	"google.golang.org/api/option"
)

var tokenStoreMu sync.Mutex
var localTokenPath = "calendar_tokens.json"

func saveRefreshTokenLocal(ctx context.Context, userID, refreshToken string) error {
	tokenStoreMu.Lock()
	defer tokenStoreMu.Unlock()

	// Download existing tokens from GCS
	_ = auth.DownloadFromGCS(localTokenPath)

	tokens := make(map[string]string)
	file, err := os.Open(localTokenPath)
	if err == nil {
		_ = json.NewDecoder(file).Decode(&tokens)
		file.Close()
	}

	tokens[userID] = refreshToken

	outFile, err := os.Create(localTokenPath)
	if err != nil {
		return fmt.Errorf("failed to create local tokens file: %w", err)
	}
	defer outFile.Close()

	if err := json.NewEncoder(outFile).Encode(tokens); err != nil {
		return fmt.Errorf("failed to encode local tokens: %w", err)
	}

	// Upload to GCS
	if err := auth.UploadToGCS(localTokenPath); err != nil {
		log.Printf("[Calendar] Warning: failed to upload calendar tokens to GCS: %v", err)
	}

	log.Printf("[Calendar] Successfully saved refresh token locally for user %s", userID)
	return nil
}

func getRefreshTokenLocal(ctx context.Context, userID string) (string, error) {
	tokenStoreMu.Lock()
	defer tokenStoreMu.Unlock()

	// Download from GCS
	_ = auth.DownloadFromGCS(localTokenPath)

	tokens := make(map[string]string)
	file, err := os.Open(localTokenPath)
	if err == nil {
		_ = json.NewDecoder(file).Decode(&tokens)
		file.Close()
	}

	token, ok := tokens[userID]
	if !ok {
		return "", fmt.Errorf("no refresh token found for user %s", userID)
	}

	return token, nil
}

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
		log.Printf("[Calendar] Secret Manager client creation failed (falling back to GCS storage): %v", err)
		return saveRefreshTokenLocal(ctx, userID, refreshToken)
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
			log.Printf("[Calendar] Secret Manager CreateSecret failed (falling back to GCS storage): %v", err)
			return saveRefreshTokenLocal(ctx, userID, refreshToken)
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
		log.Printf("[Calendar] Secret Manager AddSecretVersion failed (falling back to GCS storage): %v", err)
		return saveRefreshTokenLocal(ctx, userID, refreshToken)
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
		log.Printf("[Calendar] Secret Manager client creation failed (falling back to GCS storage): %v", err)
		return getRefreshTokenLocal(ctx, userID)
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
		log.Printf("[Calendar] Secret Manager AccessSecretVersion failed (falling back to GCS storage): %v", err)
		return getRefreshTokenLocal(ctx, userID)
	}

	return string(result.Payload.Data), nil
}

// ScheduleStudySession renews access token, verifies availability, and inserts a calendar study event on targetDate.
func ScheduleStudySession(ctx context.Context, userID string, targetDate time.Time, preferredTime string, newTopics []string, reviewTopics []string, dashboardURL string, calendarNotifs bool) error {
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

	sessionStart := time.Date(targetDate.Year(), targetDate.Month(), targetDate.Day(), hour, 0, 0, 0, targetDate.Location())
	if targetDate.Year() == time.Now().Year() && targetDate.YearDay() == time.Now().YearDay() && sessionStart.Before(time.Now()) {
		sessionStart = sessionStart.Add(24 * time.Hour)
	}
	sessionEnd := sessionStart.Add(1 * time.Hour)

	// Check if an Ace Agent event is already scheduled on the target day to prevent duplicates
	dayStart := time.Date(sessionStart.Year(), sessionStart.Month(), sessionStart.Day(), 0, 0, 0, 0, sessionStart.Location())
	dayEnd := dayStart.Add(24 * time.Hour)
	checkCall := srv.Events.List("primary").
		TimeMin(dayStart.Format(time.RFC3339)).
		TimeMax(dayEnd.Format(time.RFC3339)).
		SingleEvents(true)
	dayEvents, err := checkCall.Do()
	if err == nil {
		for _, item := range dayEvents.Items {
			if strings.Contains(item.Summary, "Ace Agent") {
				log.Printf("[Calendar] Study session already scheduled on %s for user %s. Skipping.", sessionStart.Format("2006-01-02"), userID)
				return nil
			}
		}
	}

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
