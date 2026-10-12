# Resources every environment hangs off. The worker custom domains themselves
# are owned by wrangler, which attaches them to this zone on deploy.

resource "cloudflare_zone" "main" {
  account = {
    id = var.cloudflare_account_id
  }
  name = "__DOMAIN__"
  type = "full"
}

# Enabling Email Routing takes over the zone's MX records, which is what lets
# the send_email binding deliver to verified destinations at no cost.
resource "cloudflare_email_routing_dns" "main" {
  zone_id = cloudflare_zone.main.id
  name    = cloudflare_zone.main.name
}

# Stays pending until the link in the verification email is clicked.
resource "cloudflare_email_routing_address" "contact" {
  account_id = var.cloudflare_account_id
  email      = var.contact_to_address
}
