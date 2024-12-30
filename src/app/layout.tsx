import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Provider } from "@/components/ui/provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "手話ダンス教室 スマイル",
    description: "私たち「スマイル」は50人程度で活動している手話ダンスグループです。名前のように笑顔で、楽しく活動しています。",
};

export default function RootLayout(props: { children: React.ReactNode }) {
    const { children } = props;
    return (
        <html lang="ja" suppressHydrationWarning>
            <body>
                <Provider forcedTheme="light">
                    <Header />
                    {children}
                    <Footer />
                </Provider>
            </body>
        </html>
    );
}
