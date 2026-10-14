import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getContactEnv } from "@/env.server";
import { composeContactMail } from "./mail";
import type { ContactDeps } from "./submit";
import { verifyTurnstile } from "./turnstile";

/** Binds the submission to the real Turnstile and the Worker's email binding. */
export const createContactDeps = (
	remoteIp: string | undefined,
): ContactDeps => {
	const env = getContactEnv();

	return {
		verifyHuman: (token) =>
			verifyTurnstile({ secret: env.turnstileSecretKey, token, remoteIp }),
		composeMail: (input) =>
			composeContactMail(
				input,
				{ from: env.fromAddress, to: env.toAddress },
				new Date(),
			),
		sendMail: async (mail) => {
			// Async mode: `next dev` can serve the action before the adapter has
			// finished booting, and only this mode waits instead of throwing.
			const { env: bindings } = await getCloudflareContext({ async: true });
			await bindings.EMAIL.send(mail);
		},
	};
};
