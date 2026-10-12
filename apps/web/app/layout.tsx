import type { Metadata } from "next";
import { clientEnv } from "@/env.client";
import { serverEnv } from "@/env.server";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL(serverEnv.siteUrl),
	title: {
		default: "手話ダンス教室 スマイル",
		template: "%s | 手話ダンス教室 スマイル",
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
		siteName: "手話ダンス教室 スマイル",
		url: "/",
	},
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
	return (
		<html lang="ja">
			<body className="text-zinc-950 antialiased">{children}</body>
		</html>
	);
};

export default RootLayout;
