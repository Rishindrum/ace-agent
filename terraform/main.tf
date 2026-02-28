provider "google" {
  project = var.project_id
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

# 2. THE CLOUD MEMORY (GCS Bucket)
resource "google_storage_bucket" "brain_bucket" {
  name          = "ace-brain-${var.project_id}" # Globally unique name
  location      = "US"
  force_destroy = true
  uniform_bucket_level_access = true
}

# 3. THE BRAIN (Python Service)
resource "google_cloud_run_v2_service" "backend_python" {
  name     = "backend-python"
  location = "us-central1"
  ingress  = "INGRESS_TRAFFIC_ALL"
  deletion_protection = false

  template {
    timeout = "300s" # Gives Python plenty of time to start up

    containers {
      # This points to whatever image was last deployed
      image = "us-docker.pkg.dev/cloudrun/container/hello"

      ports {
        name           = "h2c"
        container_port = 50051
      }

      env {
        name  = "PYTHONUNBUFFERED"
        value = "1"
      }
      env {
        name  = "GEMINI_API_KEY"
        value = "placeholder"
      }
      env {
        name  = "NEO4J_URI"
        value = "bolt://localhost:7687" # Valid URI format prevents driver crashes
      }
      env {
        name  = "NEO4J_PASSWORD"
        value = "placeholder"
      }
      
      env {
        name  = "GCS_BUCKET_NAME"
        value = google_storage_bucket.brain_bucket.name 
      }

      env {
        name  = "BQ_DATASET"
        value = google_bigquery_dataset.ace_dataset.dataset_id
      }
      
      env {
        name  = "BQ_TABLE"
        value = google_bigquery_table.quiz_scores.table_id
      }
    }
  }

  # Prevents Terraform from overwriting the image GitHub Actions pushed
  lifecycle {
    ignore_changes = [
      template[0].containers[0].image,
      template[0].containers[0].env,
    ]
  }
}

# 4. THE GATEWAY (Go Service)
resource "google_cloud_run_v2_service" "backend_go" {
  name     = "backend-go"
  location = "us-central1"
  ingress  = "INGRESS_TRAFFIC_ALL"
  deletion_protection = false

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

  lifecycle {
    ignore_changes = [
      template[0].containers[0].image,
    ]
  }
}

# 5. PUBLIC ACCESS (The "Open Front Door")
resource "google_cloud_run_service_iam_member" "public_go" {
  service  = google_cloud_run_v2_service.backend_go.name
  location = google_cloud_run_v2_service.backend_go.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

resource "google_cloud_run_service_iam_member" "public_python" {
  service  = google_cloud_run_v2_service.backend_python.name
  location = google_cloud_run_v2_service.backend_python.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# 6. THE FRONTEND (Angular UI)
resource "google_cloud_run_v2_service" "frontend_angular" {
  name                = "frontend-angular"
  location            = "us-central1"
  ingress             = "INGRESS_TRAFFIC_ALL"
  deletion_protection = false

  template {
    containers {
      image = "us-docker.pkg.dev/cloudrun/container/hello"
      
      ports {
        container_port = 8080
      }
    }
  }

  # CRITICAL: Prevents Terraform from overwriting the image GitHub Actions pushed
  lifecycle {
    ignore_changes = [
      template[0].containers[0].image,
      template[0].containers[0].env,
    ]
  }
}

# Allow public access to the Frontend
resource "google_cloud_run_service_iam_member" "public_frontend" {
  service  = google_cloud_run_v2_service.frontend_angular.name
  location = google_cloud_run_v2_service.frontend_angular.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# 7. THE LONG TERM MEMORY (BigQuery Dataset & Table)
resource "google_bigquery_dataset" "ace_dataset" {
  dataset_id                  = "ace_performance"
  friendly_name               = "Ace Student Performance"
  description                 = "Stores user quiz scores and topic mastery"
  location                    = "US"
}

resource "google_bigquery_table" "quiz_scores" {
  dataset_id = google_bigquery_dataset.ace_dataset.dataset_id
  table_id   = "quiz_scores"

  # The schema defining our "Spreadsheet" columns
  schema = <<EOF
[
  {
    "name": "user_id",
    "type": "STRING",
    "mode": "REQUIRED",
    "description": "The Firebase UID of the student"
  },
  {
    "name": "topic_name",
    "type": "STRING",
    "mode": "REQUIRED",
    "description": "The specific syllabus topic tested"
  },
  {
    "name": "score",
    "type": "INTEGER",
    "mode": "REQUIRED",
    "description": "The percentage score (0-100)"
  },
  {
    "name": "timestamp",
    "type": "TIMESTAMP",
    "mode": "REQUIRED",
    "description": "When the quiz was taken"
  }
]
EOF
}


# 7. OUTPUTS (What to print after finishing)
output "repo_url" {
  value = "${google_artifact_registry_repository.ace_repo.location}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.ace_repo.repository_id}"
}

output "python_url" {
  value = google_cloud_run_v2_service.backend_python.uri
}

output "go_url" {
  value = google_cloud_run_v2_service.backend_go.uri
}

output "frontend_url" {
  value = google_cloud_run_v2_service.frontend_angular.uri
}