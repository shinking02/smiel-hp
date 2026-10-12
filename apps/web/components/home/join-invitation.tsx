import { LinkButton } from "@/components/ui/link-button";
import { Section } from "@/components/ui/section";

export const JoinInvitation = () => (
	<Section id="join" title="一緒に踊りませんか" tone="muted">
		<div className="max-w-3xl space-y-4 text-zinc-700 leading-loose">
			<p>
				手話ダンスは、年齢を問わずどなたでも楽しめます。現在、40代から80代の方々が在籍しており、ほとんどの方が手話もダンスも初めての状態から始めています。
			</p>
			<p>
				「手話」と聞くと難しそうに感じるかもしれませんが、ダンスと一緒に覚えることで、自然と身につけることができます。
			</p>
			<p>
				まずは見学や体験から始めてみませんか？お気軽にお問い合わせください。
			</p>
		</div>
		<div className="mt-8">
			<LinkButton href="/contact">お問い合わせ</LinkButton>
		</div>
	</Section>
);
