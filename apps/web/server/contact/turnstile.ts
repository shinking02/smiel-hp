import "server-only";

// biome-ignore lint/performance/noNamespaceImport: valibot exports generic names like object and string
import * as v from "valibot";

const SITEVERIFY_URL =
	"https://challenges.cloudflare.com/turnstile/v0/siteverify";

const SiteverifySchema = v.object({
	success: v.boolean(),
	"error-codes": v.optional(v.array(v.string()), []),
});

export interface TurnstileVerification {
	secret: string;
	token: string;
	remoteIp: string | undefined;
}

/** A token is single use; the widget has to issue a new one per attempt. */
export const verifyTurnstile = async ({
	secret,
	token,
	remoteIp,
}: TurnstileVerification): Promise<boolean> => {
	const body = new FormData();
	body.set("secret", secret);
	body.set("response", token);
	if (remoteIp !== undefined) body.set("remoteip", remoteIp);

	const response = await fetch(SITEVERIFY_URL, { method: "POST", body });
	if (!response.ok) {
		throw new Error(`Turnstile siteverify responded ${response.status}`);
	}

	const result = v.parse(SiteverifySchema, await response.json());
	if (!result.success) {
		console.warn("Turnstile rejected a token", result["error-codes"]);
	}

	return result.success;
};
