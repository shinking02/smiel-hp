#!/usr/bin/env bash
# Builds and deploys the worker for $CLOUDFLARE_ENV. Every value is read from the
# environment, so CI and a manual deploy go through the same steps.
set -euo pipefail

: "${CLOUDFLARE_ENV:?}"
: "${SITE_URL:?}"
: "${MICROCMS_SERVICE_DOMAIN:?}"
: "${MICROCMS_API_KEY:?}"
: "${CONTACT_FROM_ADDRESS:?}"
: "${CONTACT_TO_ADDRESS:?}"
: "${TURNSTILE_SECRET_KEY:?}"
: "${NEXT_PUBLIC_TURNSTILE_SITE_KEY:?}"

export NEXT_PUBLIC_APP_ENV="$CLOUDFLARE_ENV"

secrets_file="$(mktemp)"
trap 'rm -f "$secrets_file"' EXIT
node -e '
	const keys = ["MICROCMS_API_KEY", "TURNSTILE_SECRET_KEY"];
	process.stdout.write(JSON.stringify(Object.fromEntries(keys.map((k) => [k, process.env[k]]))));
' >"$secrets_file"

# Next reads these while prerendering, so the build sees the same values the
# worker is given at runtime.
opennextjs-cloudflare build --env "$CLOUDFLARE_ENV"

OPEN_NEXT_DEPLOY=true wrangler deploy --env "$CLOUDFLARE_ENV" \
	--var "SITE_URL:$SITE_URL" \
	--var "MICROCMS_SERVICE_DOMAIN:$MICROCMS_SERVICE_DOMAIN" \
	--var "CONTACT_FROM_ADDRESS:$CONTACT_FROM_ADDRESS" \
	--var "CONTACT_TO_ADDRESS:$CONTACT_TO_ADDRESS" \
	--secrets-file "$secrets_file"
