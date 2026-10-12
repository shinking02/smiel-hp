import { describe, expect, it } from "vitest";
import { blogPageHref, pageCountOf, pageItems, parsePage } from "./pagination";

describe("blogPageHref", () => {
	it("keeps the first page on the index URL", () => {
		expect(blogPageHref(1)).toBe("/blogs");
	});

	it("puts later pages under /blogs/page", () => {
		expect(blogPageHref(3)).toBe("/blogs/page/3");
	});
});

describe("pageCountOf", () => {
	it("rounds a partial page up", () => {
		expect(pageCountOf(13)).toBe(2);
	});

	it("still has one page with no posts", () => {
		expect(pageCountOf(0)).toBe(1);
	});
});

describe("parsePage", () => {
	it("reads a positive integer", () => {
		expect(parsePage("12")).toBe(12);
	});

	it.each(["0", "02", "1.0", "-1", "abc", ""])("rejects %j", (raw) => {
		expect(parsePage(raw)).toBeUndefined();
	});
});

describe("pageItems", () => {
	it("lists every page when there are few", () => {
		expect(pageItems(1, 3)).toEqual([1, 2, 3]);
	});

	it("puts gaps around the neighbours of a middle page", () => {
		expect(pageItems(5, 9)).toEqual([1, "gap", 4, 5, 6, "gap", 9]);
	});

	it("shows a lone skipped page instead of a gap", () => {
		expect(pageItems(4, 6)).toEqual([1, 2, 3, 4, 5, 6]);
	});

	it("keeps a single gap at the edges", () => {
		expect(pageItems(1, 6)).toEqual([1, 2, "gap", 6]);
		expect(pageItems(6, 6)).toEqual([1, "gap", 5, 6]);
	});

	it("shows one page alone", () => {
		expect(pageItems(1, 1)).toEqual([1]);
	});
});
