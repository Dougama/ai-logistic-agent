# en infrastructure/main.tf

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      # Forzamos una versión reciente que sabemos que soporta los recursos correctos
      version = ">= 5.34.0" 
    }
  }
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}