"use client";

import { Send } from "lucide-react";
import type { SubmitEvent } from "react";
import { PRIMARY_BUTTON } from "@/components/ui/button-style";
import { CONTROL, Field } from "./field";

// Sending is not wired up yet; this only keeps the browser from submitting.
const holdSubmit = (event: SubmitEvent<HTMLFormElement>) => {
	event.preventDefault();
};

export const ContactForm = () => (
	<form onSubmit={holdSubmit} className="flex flex-col gap-6">
		<Field htmlFor="contact-name" label="お名前" required>
			<input
				id="contact-name"
				name="name"
				type="text"
				autoComplete="name"
				required
				maxLength={100}
				placeholder="山田 花子"
				className={CONTROL}
			/>
		</Field>
		<Field htmlFor="contact-email" label="メールアドレス" required>
			<input
				id="contact-email"
				name="email"
				type="email"
				autoComplete="email"
				required
				maxLength={254}
				placeholder="example@example.com"
				className={CONTROL}
			/>
		</Field>
		<Field htmlFor="contact-message" label="お問い合わせ内容" required>
			<textarea
				id="contact-message"
				name="message"
				required
				maxLength={2000}
				rows={8}
				placeholder="見学・体験のご希望日や、気になる活動場所などをお書きください。"
				className={`${CONTROL} resize-y leading-relaxed`}
			/>
		</Field>
		<div className="flex flex-col items-start gap-4 border-zinc-200 border-t pt-6">
			<p className="text-sm text-zinc-600 leading-relaxed">
				入力いただいた情報は、お問い合わせへの回答以外には使用しません。
			</p>
			<button type="submit" className={PRIMARY_BUTTON}>
				送信する
				<Send aria-hidden className="size-4 shrink-0" />
			</button>
		</div>
	</form>
);
