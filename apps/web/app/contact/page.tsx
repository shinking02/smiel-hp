import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
	title: "お問い合わせ",
	description:
		"手話ダンス教室 スマイルへの見学・体験のお申し込みや、ご質問はこちらからお送りください。",
	alternates: { canonical: "/contact" },
};

const ContactPage = () => (
	<div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
		<h1 className="font-bold text-3xl md:text-4xl">お問い合わせ</h1>
		<div className="mt-6 space-y-2 text-zinc-700 leading-loose">
			<p>興味を持っていただき、ありがとうございます。</p>
			<p>
				見学・体験のお申し込みやご質問は、下記のフォームよりお送りください。
			</p>
		</div>
		<div className="mt-10">
			<ContactForm />
		</div>
	</div>
);

export default ContactPage;
