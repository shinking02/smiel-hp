import { afterEach, describe, expect, it, vi } from "vitest";
import { verifyTurnstile } from "./turnstile";

vi.mock("server-only", () => ({}));

const respond = (body: unknown, status = 200) =>
	vi
		.spyOn(globalThis, "fetch")
		.mockResolvedValue(new Response(JSON.stringify(body), { status }));

const REQUEST = { secret: "secret", token: "token", remoteIp: "203.0.113.1" };

afterEach(() => {
	vi.restoreAllMocks();
});

describe("verifyTurnstile", () => {
	it("sends the secret, token and visitor IP to siteverify", async () => {
		const fetch = respond({ success: true });

		await expect(verifyTurnstile(REQUEST)).resolves.toBe(true);

		const [url, init] = fetch.mock.calls[0] ?? [];
		const body = init?.body as FormData;
		expect(url).toBe(
			"https://challenges.cloudflare.com/turnstile/v0/siteverify",
		);
		expect(Object.fromEntries(body)).toEqual({
			secret: "secret",
			response: "token",
			remoteip: "203.0.113.1",
		});
	});

	it("omits the IP when it is unknown", async () => {
		const fetch = respond({ success: true });

		await verifyTurnstile({ ...REQUEST, remoteIp: undefined });

		const body = fetch.mock.calls[0]?.[1]?.body as FormData;
		expect(body.has("remoteip")).toBe(false);
	});

	it("reports a rejected token as unverified", async () => {
		vi.spyOn(console, "warn").mockImplementation(() => undefined);
		respond({ success: false, "error-codes": ["timeout-or-duplicate"] });

		await expect(verifyTurnstile(REQUEST)).resolves.toBe(false);
	});

	it("throws when siteverify itself fails", async () => {
		respond({}, 500);

		await expect(verifyTurnstile(REQUEST)).rejects.toThrow("500");
	});
});
