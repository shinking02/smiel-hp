// biome-ignore lint/performance/noNamespaceImport: valibot exports generic names like object and string
import * as v from "valibot";

// Next.js inlines NEXT_PUBLIC_* only through the bare global; importing
// node:process opts out of the substitution.
// biome-ignore-start lint/correctness/noProcessGlobal: see above

export const clientEnv = v.parse(
	v.object({
		// Deploys always set it; local development falls back to the safe side.
		appEnv: v.optional(
			v.picklist(["development", "production"]),
			"development",
		),
	}),
	{
		appEnv: process.env.NEXT_PUBLIC_APP_ENV,
	},
);

// Parsed on first use, like the feature values in env.server.ts.
export const getContactClientEnv = () =>
	v.parse(
		v.object({
			turnstileSiteKey: v.pipe(v.string(), v.nonEmpty()),
		}),
		{
			turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
		},
	);

// biome-ignore-end lint/correctness/noProcessGlobal: see above
