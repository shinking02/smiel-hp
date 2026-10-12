import "server-only";

// biome-ignore lint/performance/noNamespaceImport: valibot exports generic names like object and string
import * as v from "valibot";

const schema = v.object({
	fromAddress: v.pipe(v.string(), v.email()),
	toAddress: v.pipe(v.string(), v.email()),
	turnstileSecretKey: v.pipe(v.string(), v.nonEmpty()),
});

export const contactEnv = v.parse(schema, {
	// biome-ignore-start lint/correctness/noProcessGlobal: node:process trips noNodejsModules in this app, and the Workers runtime populates the global anyway
	fromAddress: process.env.CONTACT_FROM_ADDRESS,
	toAddress: process.env.CONTACT_TO_ADDRESS,
	turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY,
	// biome-ignore-end lint/correctness/noProcessGlobal: see above
});
