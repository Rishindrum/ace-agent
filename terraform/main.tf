provider "google" {
  project = "ace-agent-demo"  # <--- REPLACE THIS
  region  = "us-central1"      # Iowa (Standard, cheap region)
}

# 1. THE GARAGE (Artifact Registry)
# This is where we will store your Docker images
resource "google_artifact_registry_repository" "ace_repo" {
  location      = "us-central1"
  repository_id = "ace-repo"
  format        = "DOCKER"
  description   = "Docker repository for Ace Agent"
}

# 2. THE BRAIN (Python Service)
resource "google_cloud_run_v2_service" "backend_python" {
  name     = "backend-python"
  location = "us-central1"
  ingress = "INGRESS_TRAFFIC_ALL" # Allow traffic from the internet (for now)

  template {
    containers {
      # We start with a dummy image so Terraform can build the "House" 
      # before we move the "Furniture" (your code) in.
      image = "us-docker.pkg.dev/cloudrun/container/hello"

      # Environment Variables (Secrets should strictly go to Secret Manager later)
      env {
        name  = "PYTHONUNBUFFERED"
        value = "1"
      }
      # Placeholder vars - we will update these via GitHub Actions later
      env {
        name = "GEMINI_API_KEY"
        value = "placeholder"
      }
      env {
        name = "NEO4J_URI"
        value = "placeholder"
      }
      env {
        name = "NEO4J_PASSWORD"
        value = "placeholder"
      }
    }
  }
}

# 3. THE GATEWAY (Go Service)
resource "google_cloud_run_v2_service" "backend_go" {
  name     = "backend-go"
  location = "us-central1"
  ingress = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = "us-docker.pkg.dev/cloudrun/container/hello"
      
      ports {
        container_port = 8080
      }

      # CRITICAL: This connects Go to Python in the cloud
      env {
        name  = "PYTHON_SERVICE_URL"
        value = google_cloud_run_v2_service.backend_python.uri
      }
    }
  }
}

# 4. PUBLIC ACCESS (The "Open Front Door")
# This allows anyone on the internet to hit your Go Gateway URL
resource "google_cloud_run_service_iam_member" "public_go" {
  service  = google_cloud_run_v2_service.backend_go.name
  location = google_cloud_run_v2_service.backend_go.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# Allow public access to Python (Optional: usually you lock this down, but let's keep it open for debugging)
resource "google_cloud_run_service_iam_member" "public_python" {
  service  = google_cloud_run_v2_service.backend_python.name
  location = google_cloud_run_v2_service.backend_python.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# 5. OUTPUTS (What to print after finishing)
output "repo_url" {
  value = "${google_artifact_registry_repository.ace_repo.location}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.ace_repo.repository_id}"
}

output "python_url" {
  value = google_cloud_run_v2_service.backend_python.uri
}

output "go_url" {
  value = google_cloud_run_v2_service.backend_go.uri
}