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

variable "gemini_api_key" {
  description = "The API key for Google Gemini"
  type        = string
  sensitive   = true
}

variable "neo4j_uri" {
  type = string
}
variable "neo4j_password" {
  type      = string
  sensitive = true
}