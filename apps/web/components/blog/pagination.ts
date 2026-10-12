export const POSTS_PER_PAGE = 12;

export const blogPageHref = (page: number): string =>
	page === 1 ? "/blogs" : `/blogs/page/${page}`;

export const pageCountOf = (totalCount: number): number =>
	Math.max(1, Math.ceil(totalCount / POSTS_PER_PAGE));

const CANONICAL_PAGE = /^[1-9]\d*$/;

/** Only canonical numbers pass, so `02` or `1.0` cannot mint duplicate pages. */
export const parsePage = (raw: string): number | undefined =>
	CANONICAL_PAGE.test(raw) ? Number(raw) : undefined;

export type PageItem = number | "gap";

/**
 * The first, last and neighbouring pages, with a gap marker where pages are
 * skipped. A gap that would hide only one page shows that page instead.
 */
export const pageItems = (current: number, count: number): PageItem[] => {
	const shown = [...new Set([1, current - 1, current, current + 1, count])]
		.filter((page) => page >= 1 && page <= count)
		.sort((a, b) => a - b);

	const items: PageItem[] = [];
	let previous = 0;
	for (const page of shown) {
		if (page - previous === 2) items.push(previous + 1);
		if (page - previous > 2) items.push("gap");
		items.push(page);
		previous = page;
	}

	return items;
};
