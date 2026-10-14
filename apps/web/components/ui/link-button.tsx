import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { PRIMARY_BUTTON } from "./button-style";

interface LinkButtonProps {
	href: string;
	children: ReactNode;
}

export const LinkButton = ({ href, children }: LinkButtonProps) => (
	<Link href={href} className={PRIMARY_BUTTON}>
		{children}
		<ArrowRight
			aria-hidden
			className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
		/>
	</Link>
);
