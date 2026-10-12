import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

interface LinkButtonProps {
	href: string;
	children: ReactNode;
}

export const LinkButton = ({ href, children }: LinkButtonProps) => (
	<Link
		href={href}
		className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-700 px-6 font-semibold text-white transition-colors duration-200 hover:bg-brand-800"
	>
		{children}
		<ArrowRight
			aria-hidden
			className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
		/>
	</Link>
);
