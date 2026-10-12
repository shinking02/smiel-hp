variable "project" {
  type        = string
  description = "Project name, the leading part of the resource name prefix"
  default     = "smiel-hp"
}

variable "environment" {
  type        = string
  description = "Deployment environment name, combined with project to form the resource name prefix"

  validation {
    condition     = contains(["development", "production"], var.environment)
    error_message = "environment must be either development or production."
  }
}

variable "cloudflare_account_id" {
  type        = string
  description = "Cloudflare account ID that owns the resources"
}

variable "hostname" {
  type        = string
  description = "Hostname the web worker serves, which the Turnstile widget is bound to"
}
