import type { ContactInput } from "@/lib/contact-input";

export interface ContactMail {
	from: { email: string; name: string };
	to: string;
	replyTo: string;
	subject: string;
	text: string;
}

export interface MailAddresses {
	from: string;
	to: string;
}

const SENDER_NAME = "手話ダンス教室 スマイル";

const RECEIVED_AT = new Intl.DateTimeFormat("ja-JP", {
	timeZone: "Asia/Tokyo",
	dateStyle: "long",
	timeStyle: "short",
});

// Control characters (CR and LF among them) would let a visitor's name break
// out of the subject header.
const singleLine = (text: string): string =>
	text.replace(/\p{Cc}+/gu, " ").trim();

/** The notice the group receives; replying to it answers the visitor. */
export const composeContactMail = (
	input: ContactInput,
	addresses: MailAddresses,
	receivedAt: Date,
): ContactMail => ({
	from: { email: addresses.from, name: SENDER_NAME },
	to: addresses.to,
	replyTo: input.email,
	subject: `【スマイル HP】お問い合わせ：${singleLine(input.name)} 様`,
	text: [
		"ホームページのお問い合わせフォームから、新しいお問い合わせが届きました。",
		"このメールに返信すると、お問い合わせいただいた方に届きます。",
		"",
		"■ お名前",
		input.name,
		"",
		"■ メールアドレス",
		input.email,
		"",
		"■ お問い合わせ内容",
		input.message,
		"",
		"■ 受付日時",
		RECEIVED_AT.format(receivedAt),
	].join("\n"),
});
