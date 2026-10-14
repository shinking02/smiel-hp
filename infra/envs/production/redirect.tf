# The worker serves the apex only; www just needs a proxied record so the
# redirect rule below gets a chance to run.
resource "cloudflare_dns_record" "www" {
  zone_id = data.cloudflare_zone.main.zone_id
  name    = "www.${local.domain}"
  type    = "AAAA"
  content = "100::"
  proxied = true
  ttl     = 1
}

resource "cloudflare_ruleset" "redirect" {
  zone_id = data.cloudflare_zone.main.zone_id
  name    = "Redirect www to apex"
  kind    = "zone"
  phase   = "http_request_dynamic_redirect"

  rules = [{
    description = "Redirect www to apex"
    expression  = "http.host eq \"www.${local.domain}\""
    action      = "redirect"
    action_parameters = {
      from_value = {
        status_code           = 301
        preserve_query_string = true
        target_url = {
          expression = "concat(\"https://${local.domain}\", http.request.uri.path)"
        }
      }
    }
  }]
}
