import { ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { blogPageHref, pageItems } from "./pagination";

const ITEM =
	"inline-flex size-11 items-center justify-center rounded-full font-semibold tabular-nums";

interface StepLinkProps {
	page: number;
	count: number;
	label: string;
	icon: LucideIcon;
}

// An edge keeps its slot so the numbers do not shift from page to page.
const StepLink = ({ page, count, label, icon: Icon }: StepLinkProps) => {
	if (page < 1 || page > count) {
		return (
			<span aria-hidden className={`${ITEM} text-zinc-300`}>
				<Icon className="size-5" />
			</span>
		);
	}

	return (
		<Link
			href={blogPageHref(page)}
			aria-label={label}
			className={`${ITEM} text-zinc-700 transition-colors duration-200 hover:bg-zinc-100`}
		>
			<Icon aria-hidden className="size-5" />
		</Link>
	);
};

interface PaginationNavProps {
	current: number;
	count: number;
}

export const PaginationNav = ({ current, count }: PaginationNavProps) => (
	<nav aria-label="ページ送り" className="flex justify-center">
		<ul className="flex items-center gap-1">
			<li>
				<StepLink
					page={current - 1}
					count={count}
					label="前のページ"
					icon={ChevronLeft}
				/>
			</li>
			{pageItems(current, count).map((item, index) => (
				<li key={item === "gap" ? `gap-${index}` : item}>
					{item === "gap" ? (
						<span aria-hidden className={`${ITEM} text-zinc-400`}>
							…
						</span>
					) : (
						<Link
							href={blogPageHref(item)}
							aria-label={`${item}ページ目`}
							aria-current={item === current ? "page" : undefined}
							className={`${ITEM} transition-colors duration-200 ${item === current ? "bg-brand-700 text-white" : "text-zinc-700 hover:bg-zinc-100"}`}
						>
							{item}
						</Link>
					)}
				</li>
			))}
			<li>
				<StepLink
					page={current + 1}
					count={count}
					label="次のページ"
					icon={ChevronRight}
				/>
			</li>
		</ul>
	</nav>
);
