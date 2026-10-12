import "server-only";

// biome-ignore lint/performance/noNamespaceImport: valibot exports generic names like object and string
import * as v from "valibot";

// Only what every page needs lives here; each feature parses its own values so
// local development does not have to configure features it is not touching.
const schema = v.object({
	siteUrl: v.pipe(v.string(), v.url()),
});

// Parsed at load so a missing value fails the build instead of a request.
// OpenNext copies the worker's vars and secrets into process.env at runtime.
export const serverEnv = v.parse(schema, {
	// biome-ignore lint/correctness/noProcessGlobal: node:process trips noNodejsModules in this app, and the Workers runtime populates the global anyway
	siteUrl: process.env.SITE_URL,
});
