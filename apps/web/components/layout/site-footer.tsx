import Link from "next/link";
import { Logo } from "./logo";
import { FOOTER_NAV, SITE_NAME } from "./navigation";

export const SiteFooter = () => (
	<footer className="bg-zinc-900 text-zinc-300">
		<div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:items-start md:justify-between">
			<div className="flex flex-col gap-3">
				<Link
					href="/"
					className="flex w-fit items-center gap-2 rounded-sm font-bold text-white"
				>
					<Logo className="size-8 shrink-0" />
					{SITE_NAME}
				</Link>
				<p className="text-sm leading-relaxed">
					名前のように笑顔で、楽しく活動しています。
				</p>
			</div>
			<nav aria-label="フッター">
				<ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
					{FOOTER_NAV.map((item) => (
						<li key={item.href}>
							<Link
								href={item.href}
								className="rounded-sm underline-offset-4 transition-colors duration-200 hover:text-white hover:underline"
							>
								{item.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
		<div className="border-zinc-800 border-t">
			<p className="mx-auto max-w-6xl px-4 py-6 text-xs text-zinc-400">
				<small>© 2024 {SITE_NAME}</small>
			</p>
		</div>
	</footer>
);
