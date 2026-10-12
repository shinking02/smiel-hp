output "r2_cache_bucket_name" {
  value       = cloudflare_r2_bucket.cache.name
  description = "R2 bucket holding the OpenNext incremental cache, referenced by wrangler configuration"
}

output "turnstile_site_key" {
  value       = cloudflare_turnstile_widget.contact.sitekey
  description = "Turnstile site key, set as the NEXT_PUBLIC_TURNSTILE_SITE_KEY GitHub variable"
}

output "turnstile_secret_key" {
  value       = cloudflare_turnstile_widget.contact.secret
  description = "Turnstile secret key, set as the TURNSTILE_SECRET_KEY GitHub secret"
  sensitive   = true
}
