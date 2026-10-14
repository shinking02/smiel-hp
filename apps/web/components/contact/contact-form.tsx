"use client";

import { CircleAlert, Send } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import { sendContact } from "@/app/contact/actions";
import { PRIMARY_BUTTON } from "@/components/ui/button-style";
import { getContactClientEnv } from "@/env.client";
import { CONTACT_LIMITS, type ContactState } from "@/lib/contact-input";
import { CONTROL, errorProps, Field } from "./field";
import { TurnstileWidget } from "./turnstile-widget";

const INITIAL: ContactState = { status: "idle" };

/** Sends focus to the first field to fix, or to the form-wide message. */
const useFocusOnProblem = (state: ContactState) => {
	const form = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (state.status === "idle") return;
		form.current
			?.querySelector<HTMLElement>('[aria-invalid="true"], [role="alert"]')
			?.focus();
	}, [state]);

	return form;
};

interface SubmitAreaProps {
	state: ContactState;
	pending: boolean;
}

const SubmitArea = ({ state, pending }: SubmitAreaProps) => (
	<div className="flex flex-col items-center gap-4 border-zinc-200 border-t pt-6 text-center">
		<TurnstileWidget
			siteKey={getContactClientEnv().turnstileSiteKey}
			resetKey={state}
		/>
		{state.status === "failed" && (
			<p
				role="alert"
				tabIndex={-1}
				className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-left text-red-800 text-sm leading-relaxed"
			>
				<CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
				{state.message}
			</p>
		)}
		<p className="text-sm text-zinc-600 leading-relaxed">
			入力いただいた情報は、お問い合わせへの回答以外には使用しません。
		</p>
		<button type="submit" disabled={pending} className={PRIMARY_BUTTON}>
			{pending ? "送信しています…" : "送信する"}
			<Send aria-hidden className="size-4 shrink-0" />
		</button>
	</div>
);

export const ContactForm = () => {
	const [state, action, pending] = useActionState(sendContact, INITIAL);
	const form = useFocusOnProblem(state);

	// React resets the form after each attempt; the values come back from the
	// action so a rejected message is not lost.
	const values = state.status === "idle" ? undefined : state.values;
	const errors = state.status === "invalid" ? state.errors : {};

	return (
		<form ref={form} action={action} className="flex flex-col gap-6">
			<Field htmlFor="contact-name" label="お名前" required error={errors.name}>
				<input
					id="contact-name"
					name="name"
					type="text"
					autoComplete="name"
					required
					maxLength={CONTACT_LIMITS.name}
					placeholder="山田 花子"
					defaultValue={values?.name}
					{...errorProps("contact-name", errors.name)}
					className={CONTROL}
				/>
			</Field>
			<Field
				htmlFor="contact-email"
				label="メールアドレス"
				required
				error={errors.email}
			>
				<input
					id="contact-email"
					name="email"
					type="email"
					autoComplete="email"
					required
					maxLength={CONTACT_LIMITS.email}
					placeholder="example@example.com"
					defaultValue={values?.email}
					{...errorProps("contact-email", errors.email)}
					className={CONTROL}
				/>
			</Field>
			<Field
				htmlFor="contact-message"
				label="お問い合わせ内容"
				required
				error={errors.message}
			>
				<textarea
					id="contact-message"
					name="message"
					required
					maxLength={CONTACT_LIMITS.message}
					rows={8}
					placeholder="見学・体験のご希望日や、気になる活動場所などをお書きください。"
					defaultValue={values?.message}
					{...errorProps("contact-message", errors.message)}
					className={`${CONTROL} resize-y leading-relaxed`}
				/>
			</Field>
			<SubmitArea state={state} pending={pending} />
		</form>
	);
};
