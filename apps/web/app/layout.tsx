import type { Metadata, Viewport } from "next";
import { SITE_NAME } from "@/components/layout/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { clientEnv } from "@/env.client";
import { serverEnv } from "@/env.server";
import "./globals.css";

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: "#ffffff",
};

export const metadata: Metadata = {
	metadataBase: new URL(serverEnv.siteUrl),
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`,
	},
	description:
		"私たち「スマイル」は50人程度で活動している手話ダンスグループです。名前のように笑顔で、楽しく活動しています。",
	robots:
		clientEnv.appEnv === "production"
			? undefined
			: { index: false, follow: false },
	openGraph: {
		type: "website",
		locale: "ja_JP",
		siteName: SITE_NAME,
		url: "/",
	},
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
	return (
		<html lang="ja" data-scroll-behavior="smooth">
			<body className="flex min-h-dvh flex-col bg-white text-zinc-950 antialiased">
				<a
					href="#main"
					className="sr-only rounded-full bg-brand-700 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
				>
					本文へスキップ
				</a>
				<SiteHeader />
				<main id="main" className="flex-1">
					{children}
				</main>
				<SiteFooter />
			</body>
		</html>
	);
};

export default RootLayout;
