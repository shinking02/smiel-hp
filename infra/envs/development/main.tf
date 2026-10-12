locals {
  domain = "smile-sign.com"
}

module "stack" {
  source = "../../modules/stack"

  environment           = "development"
  cloudflare_account_id = var.cloudflare_account_id
  hostname              = "dev.${local.domain}"
}
