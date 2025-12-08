terraform {
  required_version = ">= 1.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
}

# Firebase プロジェクト有効化
resource "google_firebase_project" "default" {
  provider = google-beta
  project  = var.project_id
}

# Firestore データベース
resource "google_firestore_database" "default" {
  provider                    = google-beta
  project                     = var.project_id
  name                        = "(default)"
  location_id                 = var.region
  type                        = "FIRESTORE_NATIVE"
  concurrency_mode            = "OPTIMISTIC"
  app_engine_integration_mode = "DISABLED"

  depends_on = [google_firebase_project.default]
}

# Firebase Authentication（Identity Platform）
# NOTE: Identity Platform の設定は Terraform で問題が発生するため、
#       Firebase Console で手動設定が必要です。
#       Authentication → Sign-in method → メール/パスワード を有効化してください。
#
# resource "google_identity_platform_config" "default" {
#   provider = google-beta
#   project  = var.project_id
#
#   sign_in {
#     allow_duplicate_emails = false
#
#     email {
#       enabled           = true
#       password_required = true
#     }
#   }
#
#   depends_on = [google_firebase_project.default]
# }
