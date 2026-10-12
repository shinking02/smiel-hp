import { isMicrocmsImage, responsiveMicrocmsImage } from "@/lib/microcms-image";

export interface ContentImageOptions {
	widths: readonly [number, ...number[]];
	sizes: string;
}

// The rich editor writes every attribute double quoted, which is all these
// patterns need to handle.
const IMG_TAG = /<img\b([^>]*?)\/?>/g;
const ATTRIBUTE = /([a-zA-Z-]+)="([^"]*)"/g;

const escapeAttribute = (value: string): string =>
	value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");

const attributesOf = (source: string): Partial<Record<string, string>> =>
	Object.fromEntries(
		[...source.matchAll(ATTRIBUTE)].map(([, name = "", value = ""]) => [
			name.toLowerCase(),
			value,
		]),
	);

/**
 * The editor embeds uploads at full camera resolution, several megabytes each.
 * This swaps each one for a resized, compressed set the browser picks from, and
 * defers it until it nears the viewport.
 */
export const optimizeContentImages = (
	html: string,
	{ widths, sizes }: ContentImageOptions,
): string =>
	html.replace(IMG_TAG, (tag, source: string) => {
		const attributes = attributesOf(source);
		const src = attributes.src?.replaceAll("&amp;", "&");
		const width = Number(attributes.width);
		const height = Number(attributes.height);
		if (
			src === undefined ||
			!isMicrocmsImage(src) ||
			!(width > 0 && height > 0)
		)
			return tag;

		// Upscaling only adds bytes, so the original width caps the candidates.
		const [first = width, ...rest] = widths.filter(
			(candidate) => candidate <= width,
		);
		const image = responsiveMicrocmsImage(src, {
			widths: [first, ...rest],
			aspectRatio: width / height,
		});

		return [
			"<img",
			`src="${escapeAttribute(image.src)}"`,
			`srcset="${escapeAttribute(image.srcSet)}"`,
			`sizes="${escapeAttribute(sizes)}"`,
			`width="${image.width}"`,
			`height="${image.height}"`,
			`alt="${attributes.alt ?? ""}"`,
			'loading="lazy"',
			'decoding="async">',
		].join(" ");
	});
