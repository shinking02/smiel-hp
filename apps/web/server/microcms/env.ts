import "server-only";

// biome-ignore lint/performance/noNamespaceImport: valibot exports generic names like object and string
import * as v from "valibot";

const schema = v.object({
	serviceDomain: v.pipe(v.string(), v.nonEmpty()),
	apiKey: v.pipe(v.string(), v.nonEmpty()),
});

export const microcmsEnv = v.parse(schema, {
	// biome-ignore-start lint/correctness/noProcessGlobal: node:process trips noNodejsModules in this app, and the Workers runtime populates the global anyway
	serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
	apiKey: process.env.MICROCMS_API_KEY,
	// biome-ignore-end lint/correctness/noProcessGlobal: see above
});
