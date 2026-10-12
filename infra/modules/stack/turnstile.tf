# Guards the contact form, which would otherwise relay spam straight to the inbox.
resource "cloudflare_turnstile_widget" "contact" {
  account_id = var.cloudflare_account_id
  name       = "${local.name_prefix}-contact"
  domains    = [var.hostname]
  mode       = "managed"
}
