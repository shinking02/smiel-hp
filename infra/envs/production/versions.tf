terraform {
  # The effective CLI version comes from the HCP workspace setting, so keep this loose.
  required_version = "~> 1.15"

  cloud {
    organization = "Shinking02"

    workspaces {
      name = "smiel-hp-production"
    }
  }

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "5.27.0"
    }
  }
}
