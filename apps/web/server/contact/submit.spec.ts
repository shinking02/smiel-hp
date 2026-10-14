import { describe, expect, it, vi } from "vitest";
import type { ContactMail } from "./mail";
import { type ContactDeps, submitContact, TURNSTILE_FIELD } from "./submit";

const MAIL: ContactMail = {
	from: { email: "noreply@example.com", name: "スマイル" },
	to: "inbox@example.com",
	replyTo: "hanako@example.com",
	subject: "subject",
	text: "text",
};

const formOf = (fields: Record<string, string>): FormData => {
	const formData = new FormData();
	for (const [name, value] of Object.entries(fields)) formData.set(name, value);
	return formData;
};

const VALID = {
	name: "山田 花子",
	email: "hanako@example.com",
	message: "見学したいです。",
	[TURNSTILE_FIELD]: "token",
};

const depsOf = (overrides: Partial<ContactDeps> = {}): ContactDeps => ({
	verifyHuman: vi.fn(async () => true),
	composeMail: vi.fn(() => MAIL),
	sendMail: vi.fn(async () => undefined),
	...overrides,
});

describe("submitContact", () => {
	it("sends the composed mail for a valid, verified message", async () => {
		const deps = depsOf();

		await expect(submitContact(formOf(VALID), deps)).resolves.toEqual({
			status: "sent",
		});
		expect(deps.verifyHuman).toHaveBeenCalledWith("token");
		expect(deps.composeMail).toHaveBeenCalledWith({
			name: "山田 花子",
			email: "hanako@example.com",
			message: "見学したいです。",
		});
		expect(deps.sendMail).toHaveBeenCalledWith(MAIL);
	});

	it("trims the input before composing the mail", async () => {
		const deps = depsOf();

		await submitContact(formOf({ ...VALID, name: "  山田 花子 \n" }), deps);

		expect(deps.composeMail).toHaveBeenCalledWith(
			expect.objectContaining({ name: "山田 花子" }),
		);
	});

	it("reports each invalid field and keeps what was typed", async () => {
		const deps = depsOf();
		const fields = { ...VALID, name: " ", email: "not-an-email" };

		await expect(submitContact(formOf(fields), deps)).resolves.toEqual({
			status: "invalid",
			values: { name: " ", email: "not-an-email", message: "見学したいです。" },
			errors: {
				name: "お名前を入力してください。",
				email: "メールアドレスの形式が正しくありません。",
			},
		});
		expect(deps.verifyHuman).not.toHaveBeenCalled();
		expect(deps.sendMail).not.toHaveBeenCalled();
	});

	it("rejects a message over the length limit", async () => {
		const result = await submitContact(
			formOf({ ...VALID, message: "あ".repeat(2001) }),
			depsOf(),
		);

		expect(result).toMatchObject({
			status: "invalid",
			errors: { message: "お問い合わせ内容は2000文字以内で入力してください。" },
		});
	});

	it("refuses to send without a token", async () => {
		const deps = depsOf();
		const { [TURNSTILE_FIELD]: _, ...withoutToken } = VALID;

		const result = await submitContact(formOf(withoutToken), deps);

		expect(result).toMatchObject({ status: "failed" });
		expect(deps.verifyHuman).not.toHaveBeenCalled();
		expect(deps.sendMail).not.toHaveBeenCalled();
	});

	it("refuses to send when the challenge fails", async () => {
		const deps = depsOf({ verifyHuman: vi.fn(async () => false) });

		const result = await submitContact(formOf(VALID), deps);

		expect(result).toMatchObject({ status: "failed" });
		expect(deps.sendMail).not.toHaveBeenCalled();
	});

	it("turns a delivery error into a message the visitor can act on", async () => {
		vi.spyOn(console, "error").mockImplementation(() => undefined);
		const deps = depsOf({
			sendMail: vi.fn(() => Promise.reject(new Error("E_DELIVERY_FAILED"))),
		});

		const result = await submitContact(formOf(VALID), deps);

		expect(result).toMatchObject({
			status: "failed",
			values: { name: "山田 花子" },
		});
	});
});
