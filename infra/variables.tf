variable "project_id" {
  description = "The GCP project ID"
  type        = string
  default     = "ace-agent-demo"
}

variable "region" {
  description = "GCP region"
  default     = "us-central1"
}

variable "repo_name" {
  description = "Artifact Registry Repository Name"
  default     = "ace-agent-repo"
}