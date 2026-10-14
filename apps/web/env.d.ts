// Mirrors the bindings declared in wrangler.jsonc, merged into the interface
// @opennextjs/cloudflare resolves getCloudflareContext().env against.
declare global {
	interface CloudflareEnv {
		EMAIL: SendEmail;
	}

	// The part of the send_email binding this app uses, after the documented
	// builder form. @cloudflare/workers-types is left out because its globals
	// collide with the DOM library a Next.js app compiles against.
	// https://developers.cloudflare.com/email-service/api/send-emails/workers-api/
	interface SendEmail {
		send(message: {
			from: string | { email: string; name?: string };
			to: string;
			replyTo?: string;
			subject: string;
			text: string;
		}): Promise<{ messageId: string }>;
	}
}

export {};
