import "server-only";

// biome-ignore lint/performance/noNamespaceImport: valibot exports generic names like object and string
import * as v from "valibot";

const schema = v.object({
	siteUrl: v.pipe(v.string(), v.url()),
	microcmsServiceDomain: v.pipe(v.string(), v.nonEmpty()),
	microcmsApiKey: v.pipe(v.string(), v.nonEmpty()),
	contactFromAddress: v.pipe(v.string(), v.email()),
	contactToAddress: v.pipe(v.string(), v.email()),
	turnstileSecretKey: v.pipe(v.string(), v.nonEmpty()),
});

// Parsed at load so a missing value fails the build instead of a request.
// OpenNext copies the worker's vars and secrets into process.env at runtime.
export const serverEnv = v.parse(schema, {
	// biome-ignore-start lint/correctness/noProcessGlobal: node:process trips noNodejsModules in this app, and the Workers runtime populates the global anyway
	siteUrl: process.env.SITE_URL,
	microcmsServiceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
	microcmsApiKey: process.env.MICROCMS_API_KEY,
	contactFromAddress: process.env.CONTACT_FROM_ADDRESS,
	contactToAddress: process.env.CONTACT_TO_ADDRESS,
	turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY,
	// biome-ignore-end lint/correctness/noProcessGlobal: see above
});
