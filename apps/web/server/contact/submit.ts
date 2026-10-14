// biome-ignore lint/performance/noNamespaceImport: valibot exports generic names like object and string
import * as v from "valibot";
import {
	type ContactErrors,
	type ContactField,
	type ContactInput,
	ContactInputSchema,
	type ContactState,
	type ContactValues,
} from "@/lib/contact-input";
import type { ContactMail } from "./mail";

/** The field the Turnstile widget adds to the form it sits in. */
export const TURNSTILE_FIELD = "cf-turnstile-response";

export interface ContactDeps {
	verifyHuman: (token: string) => Promise<boolean>;
	composeMail: (input: ContactInput) => ContactMail;
	sendMail: (mail: ContactMail) => Promise<void>;
}

export type ContactResult =
	| { status: "sent" }
	| Exclude<ContactState, { status: "idle" }>;

const FIELDS: readonly ContactField[] = ["name", "email", "message"];

const textOf = (formData: FormData, name: string): string => {
	const value = formData.get(name);
	return typeof value === "string" ? value : "";
};

const errorsOf = (
	issues: v.InferIssue<typeof ContactInputSchema>[],
): ContactErrors => {
	const errors: ContactErrors = {};
	for (const issue of issues) {
		const field = v.getDotPath(issue);
		if (FIELDS.includes(field as ContactField)) {
			errors[field as ContactField] ??= issue.message;
		}
	}
	return errors;
};

const SEND_FAILED =
	"送信できませんでした。時間をおいて、もう一度お試しください。";
const NOT_VERIFIED =
	"送信前の確認が完了していません。確認が終わってから、もう一度送信してください。";

/**
 * Checks the input before the challenge, so a typo costs the visitor nothing
 * and only plausible messages spend a siteverify call.
 */
export const submitContact = async (
	formData: FormData,
	deps: ContactDeps,
): Promise<ContactResult> => {
	const values: ContactValues = {
		name: textOf(formData, "name"),
		email: textOf(formData, "email"),
		message: textOf(formData, "message"),
	};

	const parsed = v.safeParse(ContactInputSchema, values);
	if (!parsed.success) {
		return { status: "invalid", values, errors: errorsOf(parsed.issues) };
	}

	const token = textOf(formData, TURNSTILE_FIELD);
	if (token === "" || !(await deps.verifyHuman(token))) {
		return { status: "failed", values, message: NOT_VERIFIED };
	}

	try {
		await deps.sendMail(deps.composeMail(parsed.output));
	} catch (error) {
		console.error("Failed to send a contact mail", error);
		return { status: "failed", values, message: SEND_FAILED };
	}

	return { status: "sent" };
};
