locals {
  domain = "__DOMAIN__"
}

module "stack" {
  source = "../../modules/stack"

  environment           = "production"
  cloudflare_account_id = var.cloudflare_account_id
  hostname              = local.domain
}
