package auth

import (
	"context"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"cloud.google.com/go/storage"
	"google.golang.org/api/option"
)

var gcsBucketName = ""

func getProjectID() string {
	if proj := os.Getenv("GCP_PROJECT_ID"); proj != "" {
		return proj
	}
	if proj := os.Getenv("GOOGLE_CLOUD_PROJECT"); proj != "" {
		return proj
	}
	// Query metadata server
	client := &http.Client{Timeout: 2 * time.Second}
	req, err := http.NewRequest("GET", "http://metadata.google.internal/computeMetadata/v1/project/project-id", nil)
	if err != nil {
		return ""
	}
	req.Header.Set("Metadata-Flavor", "Google")
	resp, err := client.Do(req)
	if err != nil {
		return ""
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return ""
	}
	return strings.TrimSpace(string(body))
}

func initGCS(ctx context.Context, client *storage.Client) {
	gcsBucketName = os.Getenv("GCS_BUCKET_NAME")
	if gcsBucketName == "" {
		projectID := getProjectID()
		if projectID != "" {
			gcsBucketName = "ace-agent-brain-bucket-" + projectID
		} else {
			gcsBucketName = "ace-agent-brain-bucket"
		}
	}

	if client != nil {
		bucket := client.Bucket(gcsBucketName)
		_, err := bucket.Attrs(ctx)
		if err != nil {
			if err == storage.ErrBucketNotExist {
				log.Printf("[GCS] Bucket %s does not exist, attempting to create it...", gcsBucketName)
				projectID := getProjectID()
				if projectID == "" {
					projectID = "ace-agent" // fallback/placeholder
				}
				errCreate := bucket.Create(ctx, projectID, &storage.BucketAttrs{
					Location: "us-central1",
				})
				if errCreate != nil {
					log.Printf("[GCS] Failed to create bucket %s: %v", gcsBucketName, errCreate)
				} else {
					log.Printf("[GCS] Successfully created bucket %s", gcsBucketName)
				}
			} else {
				log.Printf("[GCS] Failed to get bucket attrs: %v", err)
			}
		}
	}
}

// DownloadFromGCS downloads a file from GCS to localPath
func DownloadFromGCS(localPath string) error {
	ctx := context.Background()
	
	var client *storage.Client
	var err error
	
	keyPath := "../key.json"
	if _, errKey := os.Stat(keyPath); errKey == nil {
		client, err = storage.NewClient(ctx, option.WithCredentialsFile(keyPath))
	} else if _, errKeyRoot := os.Stat("key.json"); errKeyRoot == nil {
		client, err = storage.NewClient(ctx, option.WithCredentialsFile("key.json"))
	} else {
		client, err = storage.NewClient(ctx)
	}
	
	if err != nil {
		return fmt.Errorf("failed to create GCS client: %v", err)
	}
	defer client.Close()

	initGCS(ctx, client)

	fileName := filepath.Base(localPath)
	bucket := client.Bucket(gcsBucketName)
	obj := bucket.Object(fileName)
	
	rc, err := obj.NewReader(ctx)
	if err != nil {
		if err == storage.ErrObjectNotExist {
			log.Printf("[GCS] Object %s does not exist in bucket %s, starting fresh.", fileName, gcsBucketName)
			return nil
		}
		return fmt.Errorf("failed to read from GCS: %v", err)
	}
	defer rc.Close()

	dir := filepath.Dir(localPath)
	if err := os.MkdirAll(dir, 0755); err != nil {
		return fmt.Errorf("failed to create local directory: %v", err)
	}

	file, err := os.Create(localPath)
	if err != nil {
		return fmt.Errorf("failed to create local file: %v", err)
	}
	defer file.Close()

	_, err = io.Copy(file, rc)
	if err != nil {
		return fmt.Errorf("failed to write local file: %v", err)
	}

	log.Printf("[GCS] Successfully downloaded %s from GCS bucket %s", fileName, gcsBucketName)
	return nil
}

// UploadToGCS uploads localPath to GCS
func UploadToGCS(localPath string) error {
	ctx := context.Background()
	
	var client *storage.Client
	var err error
	
	keyPath := "../key.json"
	if _, errKey := os.Stat(keyPath); errKey == nil {
		client, err = storage.NewClient(ctx, option.WithCredentialsFile(keyPath))
	} else if _, errKeyRoot := os.Stat("key.json"); errKeyRoot == nil {
		client, err = storage.NewClient(ctx, option.WithCredentialsFile("key.json"))
	} else {
		client, err = storage.NewClient(ctx)
	}
	
	if err != nil {
		return fmt.Errorf("failed to create GCS client: %v", err)
	}
	defer client.Close()

	initGCS(ctx, client)

	file, err := os.Open(localPath)
	if err != nil {
		return fmt.Errorf("failed to open local file: %v", err)
	}
	defer file.Close()

	fileName := filepath.Base(localPath)
	bucket := client.Bucket(gcsBucketName)
	obj := bucket.Object(fileName)
	
	wc := obj.NewWriter(ctx)
	defer wc.Close()

	_, err = io.Copy(wc, file)
	if err != nil {
		return fmt.Errorf("failed to copy to GCS: %v", err)
	}
	
	if err := wc.Close(); err != nil {
		return fmt.Errorf("failed to close GCS writer: %v", err)
	}

	log.Printf("[GCS] Successfully uploaded %s to GCS bucket %s", fileName, gcsBucketName)
	return nil
}
