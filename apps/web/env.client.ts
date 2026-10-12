// biome-ignore lint/performance/noNamespaceImport: valibot exports generic names like object and string
import * as v from "valibot";

const schema = v.object({
	appEnv: v.picklist(["development", "production"]),
	turnstileSiteKey: v.pipe(v.string(), v.nonEmpty()),
});

// Next.js inlines NEXT_PUBLIC_* only through the bare global; importing
// node:process opts out of the substitution.
export const clientEnv = v.parse(schema, {
	// biome-ignore-start lint/correctness/noProcessGlobal: see above
	appEnv: process.env.NEXT_PUBLIC_APP_ENV,
	turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
	// biome-ignore-end lint/correctness/noProcessGlobal: see above
});
