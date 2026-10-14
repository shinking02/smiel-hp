terraform {
  # Root modules pin the exact version; keep this a floor so the module stays reusable.
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = ">= 5.27"
    }
  }
}
