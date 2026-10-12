// biome-ignore lint/performance/noNamespaceImport: valibot exports generic names like object and string
import * as v from "valibot";

const schema = v.object({
	turnstileSiteKey: v.pipe(v.string(), v.nonEmpty()),
});

export const contactClientEnv = v.parse(schema, {
	// biome-ignore lint/correctness/noProcessGlobal: Next.js inlines NEXT_PUBLIC_* only through the bare global; importing node:process opts out of the substitution
	turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
});
