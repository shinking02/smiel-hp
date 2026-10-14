import { describe, expect, it } from "vitest";
import { composeContactMail } from "./mail";

const INPUT = {
	name: "山田 花子",
	email: "hanako@example.com",
	message: "見学したいです。\nよろしくお願いします。",
};
const ADDRESSES = { from: "noreply@example.com", to: "inbox@example.com" };
const RECEIVED_AT = new Date("2026-10-12T01:30:00.000Z");

describe("composeContactMail", () => {
	it("addresses the group and replies to the visitor", () => {
		const mail = composeContactMail(INPUT, ADDRESSES, RECEIVED_AT);

		expect(mail).toMatchObject({
			from: { email: "noreply@example.com" },
			to: "inbox@example.com",
			replyTo: "hanako@example.com",
			subject: "【スマイル HP】お問い合わせ：山田 花子 様",
		});
	});

	it("keeps line breaks out of the subject", () => {
		const mail = composeContactMail(
			{ ...INPUT, name: "山田\r\nBcc: spam@example.com" },
			ADDRESSES,
			RECEIVED_AT,
		);

		expect(mail.subject).toBe(
			"【スマイル HP】お問い合わせ：山田 Bcc: spam@example.com 様",
		);
	});

	it("lists every field and the time in Tokyo", () => {
		const { text } = composeContactMail(INPUT, ADDRESSES, RECEIVED_AT);

		expect(text).toContain("■ お名前\n山田 花子");
		expect(text).toContain("■ メールアドレス\nhanako@example.com");
		expect(text).toContain(
			"■ お問い合わせ内容\n見学したいです。\nよろしくお願いします。",
		);
		expect(text).toContain("■ 受付日時\n2026年10月12日 10:30");
	});
});
