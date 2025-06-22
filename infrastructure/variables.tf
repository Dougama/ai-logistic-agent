variable "gcp_project_id" {
  description = "El ID de tu proyecto de Google Cloud."
  type        = string
  default     = "backend-developer-446300" 
}

variable "gcp_region" {
  description = "La región para los recursos de GCP."
  type        = string
  default     = "us-central1"
}

variable "vpc_network_name" {
  description = "El nombre para nuestra red VPC."
  type        = string
  default     = "logistica-ia-vpc"
}