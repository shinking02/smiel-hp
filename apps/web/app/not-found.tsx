import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/link-button";

export const metadata: Metadata = {
	title: "ページが見つかりません",
};

const NotFound = () => (
	<div className="mx-auto max-w-6xl px-4 py-24 md:py-32">
		<h1 className="font-bold text-3xl md:text-4xl">ページが見つかりません</h1>
		<p className="mt-6 text-zinc-700 leading-loose">
			お探しのページは移動または削除された可能性があります。
		</p>
		<div className="mt-8">
			<LinkButton href="/">トップへ戻る</LinkButton>
		</div>
	</div>
);

export default NotFound;
