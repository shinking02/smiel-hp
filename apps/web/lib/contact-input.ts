// biome-ignore lint/performance/noNamespaceImport: valibot exports generic names like object and string
import * as v from "valibot";

/** Shared with the form, so the browser stops at the same limits the server enforces. */
export const CONTACT_LIMITS = {
	name: 100,
	email: 254,
	message: 2000,
} as const;

export const ContactInputSchema = v.object({
	name: v.pipe(
		v.string(),
		v.trim(),
		v.nonEmpty("お名前を入力してください。"),
		v.maxLength(
			CONTACT_LIMITS.name,
			`お名前は${CONTACT_LIMITS.name}文字以内で入力してください。`,
		),
	),
	email: v.pipe(
		v.string(),
		v.trim(),
		v.nonEmpty("メールアドレスを入力してください。"),
		v.maxLength(
			CONTACT_LIMITS.email,
			`メールアドレスは${CONTACT_LIMITS.email}文字以内で入力してください。`,
		),
		v.email("メールアドレスの形式が正しくありません。"),
	),
	message: v.pipe(
		v.string(),
		v.trim(),
		v.nonEmpty("お問い合わせ内容を入力してください。"),
		v.maxLength(
			CONTACT_LIMITS.message,
			`お問い合わせ内容は${CONTACT_LIMITS.message}文字以内で入力してください。`,
		),
	),
});

export type ContactInput = v.InferOutput<typeof ContactInputSchema>;
export type ContactField = keyof ContactInput;
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

/** What the action hands back to the form; success leaves the page instead. */
export type ContactState =
	| { status: "idle" }
	| { status: "invalid"; values: ContactValues; errors: ContactErrors }
	| { status: "failed"; values: ContactValues; message: string };
