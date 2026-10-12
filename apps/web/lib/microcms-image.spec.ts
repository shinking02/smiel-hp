import { describe, expect, it } from "vitest";
import { responsiveMicrocmsImage } from "./microcms-image";

const URL_BASE = "https://images.microcms-assets.io/assets/abc/def/photo.jpg";
const PARAMS = "fit=crop&auto=compress&fm=webp";

describe("responsiveMicrocmsImage", () => {
	it("lists one cropped candidate per width", () => {
		const { srcSet } = responsiveMicrocmsImage(URL_BASE, {
			widths: [300, 600],
			aspectRatio: 3 / 2,
		});

		expect(srcSet).toBe(
			`${URL_BASE}?w=300&h=200&${PARAMS} 300w, ${URL_BASE}?w=600&h=400&${PARAMS} 600w`,
		);
	});

	it("falls back to the widest candidate and reports its size", () => {
		const image = responsiveMicrocmsImage(URL_BASE, {
			widths: [600, 300],
			aspectRatio: 3 / 2,
		});

		expect(image).toMatchObject({
			src: `${URL_BASE}?w=600&h=400&${PARAMS}`,
			width: 600,
			height: 400,
		});
	});

	it("rounds the height to whole pixels", () => {
		const { height } = responsiveMicrocmsImage(URL_BASE, {
			widths: [100],
			aspectRatio: 3 / 2,
		});

		expect(height).toBe(67);
	});

	it("drops parameters already on the URL", () => {
		const { src } = responsiveMicrocmsImage(`${URL_BASE}?w=10&fm=png&q=90`, {
			widths: [300],
			aspectRatio: 3 / 2,
		});

		expect(src).toBe(`${URL_BASE}?w=300&h=200&${PARAMS}`);
	});
});
