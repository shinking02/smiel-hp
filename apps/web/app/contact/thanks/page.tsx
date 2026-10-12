import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/link-button";

export const metadata: Metadata = {
	title: "お問い合わせを受け付けました",
	robots: { index: false },
};

const ContactThanksPage = () => (
	<div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
		<h1 className="font-bold text-3xl md:text-4xl">
			お問い合わせを受け付けました
		</h1>
		<div className="mt-6 space-y-4 text-zinc-700 leading-loose">
			<p>このたびはお問い合わせいただき、誠にありがとうございます。</p>
			<p>
				通常、3日以内にご連絡を差し上げております。万が一ご連絡がない場合は、迷惑メールフォルダをご確認いただき、お手数ですが再度お問い合わせいただけますと幸いです。
			</p>
		</div>
		<div className="mt-8">
			<LinkButton href="/">トップへ戻る</LinkButton>
		</div>
	</div>
);

export default ContactThanksPage;
