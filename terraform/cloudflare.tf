terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "cloudflare_workers_kv_namespace" "rapidreel_namespace" {
  account_id = var.cloudflare_account_id
  title      = "RapidReelNamespace"
}

resource "cloudflare_worker_script" "rapidreel_worker" {
  account_id = var.cloudflare_account_id
  name       = "rapidreel_worker"
  content    = file("${path.module}/rapidreel_worker.js")

  kv_namespace_binding {
    name         = "RAPIDREEL_KV"
    namespace_id = cloudflare_workers_kv_namespace.rapidreel_namespace.id
  }
}
