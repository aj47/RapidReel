provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "cloudflare_workers_kv_namespace" "transcript_namespace" {
  title = "TranscriptNamespace"
}

resource "cloudflare_worker_script" "transcript_worker" {
  name = "transcript_worker"
  content = file("${path.module}/worker_script.js")
}

resource "cloudflare_workers_kv_namespace_binding" "transcript_binding" {
  script_name = cloudflare_worker_script.transcript_worker.name
  namespace_id = cloudflare_workers_kv_namespace.transcript_namespace.id
  binding = "TRANS_KV"
}
