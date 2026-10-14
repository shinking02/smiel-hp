import { LinkButton } from "@/components/ui/link-button";

const Accent = ({ children }: { children: string }) => (
	<span className="text-5xl text-brand-600 md:text-6xl lg:text-7xl">
		{children}
	</span>
);

export const Hero = () => (
	<section aria-labelledby="hero-title" className="overflow-hidden">
		<div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-12 md:min-h-[calc(88dvh-4rem)] md:grid-cols-[1.7fr_1fr] md:gap-14 md:py-16">
			<div className="relative">
				<div
					aria-hidden
					className="absolute inset-0 rotate-3 rounded-3xl bg-brand-100"
				/>
				<img
					src="/images/hero.webp"
					alt="手話ダンスを練習している会員たち"
					width={1600}
					height={1200}
					fetchPriority="high"
					className="relative aspect-4/3 w-full rounded-3xl object-cover shadow-xl shadow-brand-900/10"
				/>
			</div>
			<div>
				<h1
					id="hero-title"
					className="font-bold text-4xl leading-tight tracking-wide md:text-5xl lg:text-6xl"
				>
					<Accent>手話</Accent>で<Accent>踊</Accent>ろう
				</h1>
				<p className="mt-6 text-zinc-700 leading-loose [word-break:auto-phrase]">
					私たち「スマイル」は60人程度で活動している手話ダンスグループです。名前のように笑顔で、楽しく活動しています。
				</p>
				<div className="mt-8">
					<LinkButton href="/contact">見学・体験のお問い合わせ</LinkButton>
				</div>
			</div>
		</div>
	</section>
);
