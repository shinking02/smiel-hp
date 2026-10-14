locals {
  domain = "smile-sign.com"
}

module "stack" {
  source = "../../modules/stack"

  environment           = "production"
  cloudflare_account_id = var.cloudflare_account_id
  hostname              = local.domain
}

# Onboarded by hand, which also imports the records the previous DNS host served.
data "cloudflare_zone" "main" {
  filter = {
    name = local.domain
  }
}
