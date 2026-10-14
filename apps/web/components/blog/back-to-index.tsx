import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BLOG_NAV } from "@/components/layout/navigation";

// A plain link rather than history.back(): it works for visitors who land
// here from a search result or a shared URL.
export const BackToIndex = () => (
	<Link
		href={BLOG_NAV.href}
		className="group inline-flex items-center gap-1 rounded-sm font-semibold text-brand-700 text-sm hover:text-brand-800"
	>
		<ArrowLeft
			aria-hidden
			className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5"
		/>
		{BLOG_NAV.label}一覧へ
	</Link>
);
