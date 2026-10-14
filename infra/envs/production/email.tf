# Email Routing is a zone-wide setting and destination addresses are account-wide,
# so production owns them and development shares the verified destination.

# Takes over the zone's MX records, which is what lets the send_email binding
# deliver to verified destinations at no cost.
resource "cloudflare_email_routing_dns" "main" {
  zone_id = data.cloudflare_zone.main.zone_id
  name    = local.domain
}

# Stays pending until the link in the verification email is clicked.
resource "cloudflare_email_routing_address" "contact" {
  account_id = var.cloudflare_account_id
  email      = var.contact_to_address
}

# The domain no longer has a mailbox of its own, so everything sent to it lands
# in the same inbox as the contact form.
resource "cloudflare_email_routing_catch_all" "main" {
  zone_id = data.cloudflare_zone.main.zone_id
  name    = "Forward everything to the contact inbox"
  enabled = true

  matchers = [{ type = "all" }]
  actions = [{
    type  = "forward"
    value = [cloudflare_email_routing_address.contact.email]
  }]

  depends_on = [cloudflare_email_routing_dns.main]
}
