resource "cloudflare_r2_bucket" "cache" {
  account_id = var.cloudflare_account_id
  name       = "${local.name_prefix}-cache"
  location   = "apac"
}

# OpenNext keys entries under `<prefix>/<build id>/`, so every deploy leaves the
# previous generation behind. Expiring a still-live entry only costs a cache miss.
resource "cloudflare_r2_bucket_lifecycle" "cache" {
  account_id  = var.cloudflare_account_id
  bucket_name = cloudflare_r2_bucket.cache.name

  rules = [{
    id      = "expire-stale-incremental-cache"
    enabled = true

    conditions = {
      prefix = "incremental-cache/"
    }

    delete_objects_transition = {
      condition = {
        type    = "Age"
        max_age = 30 * 24 * 60 * 60
      }
    }
  }]
}
