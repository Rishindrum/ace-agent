provider "google" {
  project = var.project_id
  region  = var.region
}

# 1. The Garage (Artifact Registry)
# This is where your Docker images will live.
resource "google_artifact_registry_repository" "repo" {
  location      = var.region
  repository_id = var.repo_name
  description   = "Docker repository for Ace Agent"
  format        = "DOCKER"
}

# 2. Cloud Run: Backend Go (Placeholder)
resource "google_cloud_run_service" "backend_go" {
  name     = "backend-go"
  location = var.region

  template {
    spec {
      containers {
        
        image = "${var.region}-docker.pkg.dev/${var.project_id}/${var.repo_name}/backend-go:latest"
        
        env {
          name = "GCP_PROJECT_ID"
          value = var.project_id
        }
      }
    }
  }
}

# 3. Cloud Run: Backend Python (Placeholder)
resource "google_cloud_run_service" "backend_python" {
  name     = "backend-python"
  location = var.region

  template {
    spec {
      containers {
        image = "${var.region}-docker.pkg.dev/${var.project_id}/${var.repo_name}/backend-python:latest"

        env {
          name = "GEMINI_API_KEY"
          value = var.gemini_api_key
        }

        env {
          name  = "NEO4J_URI"
          value = var.neo4j_uri
        }
        env {
          name  = "NEO4J_USERNAME"
          value = "neo4j"
        }
        env {
          name  = "NEO4J_PASSWORD"
          value = var.neo4j_password
        }

        ports {
          container_port = 50051
          name           = "h2c"  # <--- Critical for gRPC!
        }

        startup_probe {
          initial_delay_seconds = 10   # Wait 10s before first check
          timeout_seconds       = 5    # Give each check 5s to respond
          period_seconds        = 10   # Check every 10s
          failure_threshold     = 10   # Allow 10 fails (Total ~100s buffer)
          
          tcp_socket {
            port = 50051  # Explicitly check the gRPC port
          }
        }
      }
    }
  }
}

# 4. Cloud Run: Frontend Angular (Placeholder)
resource "google_cloud_run_service" "frontend" {
  name     = "frontend-angular"
  location = var.region

  template {
    spec {
      containers {
        image = "${var.region}-docker.pkg.dev/${var.project_id}/${var.repo_name}/frontend-angular:latest"

        ports {
          container_port = 80
        }
      }
    }
  }
}