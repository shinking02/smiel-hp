output "zone_id" {
  value       = cloudflare_zone.main.id
  description = "Zone ID of the site domain"
}

output "name_servers" {
  value       = cloudflare_zone.main.name_servers
  description = "Name servers to register at the domain registrar"
}
