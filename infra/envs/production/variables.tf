variable "cloudflare_account_id" {
  type        = string
  description = "Cloudflare account ID that owns the resources"
}

# Kept out of this public repository; set as an HCP workspace variable.
variable "contact_to_address" {
  type        = string
  description = "Inbox the contact form delivers to, registered as an Email Routing destination"
  sensitive   = true
}
