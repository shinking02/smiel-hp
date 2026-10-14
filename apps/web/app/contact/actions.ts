"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ContactState } from "@/lib/contact-input";
import { createContactDeps } from "@/server/contact/deps";
import { submitContact } from "@/server/contact/submit";

export const sendContact = async (
	_previous: ContactState,
	formData: FormData,
): Promise<ContactState> => {
	const remoteIp = (await headers()).get("cf-connecting-ip") ?? undefined;
	const result = await submitContact(formData, createContactDeps(remoteIp));
	if (result.status === "sent") redirect("/contact/thanks");

	return result;
};
