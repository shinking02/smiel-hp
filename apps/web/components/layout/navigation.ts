export interface NavItem {
	href: string;
	label: string;
}

export const SITE_NAME = "手話ダンス教室 スマイル";

export const BLOG_NAV: NavItem = { href: "/blogs", label: "ブログ" };
export const CONTACT_NAV: NavItem = { href: "/contact", label: "お問い合わせ" };

export const FOOTER_NAV: readonly NavItem[] = [
	{ href: "/", label: "トップ" },
	BLOG_NAV,
	CONTACT_NAV,
];
