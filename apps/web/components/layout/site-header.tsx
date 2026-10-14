import Link from "next/link";
import { Logo } from "./logo";
import { BLOG_NAV, CONTACT_NAV, SITE_NAME } from "./navigation";

export const SiteHeader = () => (
	<header className="sticky top-0 z-40 border-zinc-200/80 border-b bg-white/85 backdrop-blur-md">
		<div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
			<Link href="/" className="flex items-center gap-2 rounded-sm font-bold">
				<Logo className="size-8 shrink-0" />
				<span className="sm:hidden">スマイル</span>
				<span className="hidden sm:inline">{SITE_NAME}</span>
			</Link>
			<nav aria-label="メイン">
				<ul className="flex items-center gap-1 text-sm">
					<li>
						<Link
							href={BLOG_NAV.href}
							className="inline-flex min-h-10 items-center rounded-full px-4 font-semibold text-zinc-700 transition-colors duration-200 hover:bg-zinc-100 hover:text-zinc-950"
						>
							{BLOG_NAV.label}
						</Link>
					</li>
					<li>
						<Link
							href={CONTACT_NAV.href}
							className="inline-flex min-h-10 items-center rounded-full bg-brand-700 px-4 font-semibold text-white transition-colors duration-200 hover:bg-brand-800"
						>
							{CONTACT_NAV.label}
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	</header>
);
