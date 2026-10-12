terraform {
  # The effective CLI version comes from the HCP workspace setting, so keep this loose.
  required_version = "~> 1.14"

  cloud {
    organization = "__HCP_ORGANIZATION__"

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
