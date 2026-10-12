// biome-ignore lint/performance/noNamespaceImport: valibot exports generic names like object and string
import * as v from "valibot";

const schema = v.object({
	// Deploys always set it; local development falls back to the safe side.
	appEnv: v.optional(v.picklist(["development", "production"]), "development"),
});

export const clientEnv = v.parse(schema, {
	// biome-ignore lint/correctness/noProcessGlobal: Next.js inlines NEXT_PUBLIC_* only through the bare global; importing node:process opts out of the substitution
	appEnv: process.env.NEXT_PUBLIC_APP_ENV,
});
