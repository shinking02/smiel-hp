// Mirrors the bindings declared in wrangler.jsonc, merged into the interface
// @opennextjs/cloudflare resolves getCloudflareContext().env against.
declare global {
	interface CloudflareEnv {
		EMAIL: SendEmail;
	}
}

export {};
