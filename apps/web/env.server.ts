import "server-only";

// biome-ignore lint/performance/noNamespaceImport: valibot exports generic names like object and string
import * as v from "valibot";

// OpenNext copies the worker's vars and secrets into process.env at runtime.
// biome-ignore-start lint/correctness/noProcessGlobal: node:process trips noNodejsModules in this app, and the Workers runtime populates the global anyway

// Parsed at load, since every page needs it and a missing value should fail the build.
export const serverEnv = v.parse(
	v.object({
		siteUrl: v.pipe(v.string(), v.url()),
	}),
	{
		siteUrl: process.env.SITE_URL,
	},
);

// Feature values are parsed on first use, so local development only has to
// configure the features it is touching.
export const getMicrocmsEnv = () =>
	v.parse(
		v.object({
			serviceDomain: v.pipe(v.string(), v.nonEmpty()),
			apiKey: v.pipe(v.string(), v.nonEmpty()),
		}),
		{
			serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
			apiKey: process.env.MICROCMS_API_KEY,
		},
	);

export const getContactEnv = () =>
	v.parse(
		v.object({
			fromAddress: v.pipe(v.string(), v.email()),
			toAddress: v.pipe(v.string(), v.email()),
			turnstileSecretKey: v.pipe(v.string(), v.nonEmpty()),
		}),
		{
			fromAddress: process.env.CONTACT_FROM_ADDRESS,
			toAddress: process.env.CONTACT_TO_ADDRESS,
			turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY,
		},
	);

// biome-ignore-end lint/correctness/noProcessGlobal: see above
