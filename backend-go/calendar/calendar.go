package calendar

import (
	"context"
	"fmt"
	"log"
	"os"

	secretmanager "cloud.google.com/go/secretmanager/apiv1"
	"cloud.google.com/go/secretmanager/apiv1/secretmanagerpb"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
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
		Scopes:       []string{"https://www.googleapis.com/auth/calendar.events"},
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
