import { describe, expect, it } from "vitest";
import { optimizeContentImages } from "./content-images";

const SRC = "https://images.microcms-assets.io/assets/abc/def/photo.jpeg";
const OPTIONS = { widths: [400, 800], sizes: "100vw" } as const;
const PARAMS = "fit=crop&amp;auto=compress&amp;fm=webp";

describe("optimizeContentImages", () => {
	it("replaces an upload with a resized, lazily loaded set", () => {
		const html = `<figure><img src="${SRC}" alt="" width="4000" height="3000"></figure>`;

		expect(optimizeContentImages(html, OPTIONS)).toBe(
			[
				"<figure><img",
				`src="${SRC}?w=800&amp;h=600&amp;${PARAMS}"`,
				`srcset="${SRC}?w=400&amp;h=300&amp;${PARAMS} 400w, ${SRC}?w=800&amp;h=600&amp;${PARAMS} 800w"`,
				'sizes="100vw"',
				'width="800"',
				'height="600"',
				'alt=""',
				'loading="lazy"',
				'decoding="async"></figure>',
			].join(" "),
		);
	});

	it("never asks for more pixels than the original has", () => {
		const html = `<img src="${SRC}" alt="" width="600" height="300">`;

		expect(optimizeContentImages(html, OPTIONS)).toContain(
			`srcset="${SRC}?w=400&amp;h=200&amp;${PARAMS} 400w"`,
		);
	});

	it("serves a small original at its own width", () => {
		const html = `<img src="${SRC}" alt="" width="300" height="300">`;

		expect(optimizeContentImages(html, OPTIONS)).toContain('width="300"');
	});

	it("keeps the alternative text", () => {
		const html = `<img src="${SRC}" alt="発表会" width="400" height="300">`;

		expect(optimizeContentImages(html, OPTIONS)).toContain('alt="発表会"');
	});

	it.each([
		[
			"another host",
			'<img src="https://example.com/a.jpg" width="400" height="300">',
		],
		["no size", `<img src="${SRC}" alt="">`],
	])("leaves an image with %s untouched", (_, html) => {
		expect(optimizeContentImages(html, OPTIONS)).toBe(html);
	});

	it("leaves the surrounding markup alone", () => {
		const html = "<p>こんにちは<br><strong>スマイル</strong></p>";

		expect(optimizeContentImages(html, OPTIONS)).toBe(html);
	});
});
