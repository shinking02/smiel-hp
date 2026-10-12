// microCMS serves images through imgix, so resizing is a matter of query
// parameters and needs no image optimizer on the Worker.

export interface ResponsiveImageOptions {
	widths: readonly [number, ...number[]];
	/** Width over height. The image is cropped to it before delivery, so no
	 * pixels are sent only to be hidden by `object-cover`. */
	aspectRatio: number;
}

export interface ResponsiveImage {
	src: string;
	srcSet: string;
	width: number;
	height: number;
}

const heightOf = (width: number, aspectRatio: number): number =>
	Math.round(width / aspectRatio);

const cropped = (url: string, width: number, aspectRatio: number): string => {
	const croppedUrl = new URL(url);
	// A stray `q` would win over `auto=compress`, so nothing is carried over.
	croppedUrl.search = "";
	croppedUrl.searchParams.set("w", String(width));
	croppedUrl.searchParams.set("h", String(heightOf(width, aspectRatio)));
	croppedUrl.searchParams.set("fit", "crop");
	croppedUrl.searchParams.set("auto", "compress");
	croppedUrl.searchParams.set("fm", "webp");

	return croppedUrl.toString();
};

export const responsiveMicrocmsImage = (
	url: string,
	{ widths, aspectRatio }: ResponsiveImageOptions,
): ResponsiveImage => {
	const widest = Math.max(...widths);

	return {
		src: cropped(url, widest, aspectRatio),
		srcSet: widths
			.map((width) => `${cropped(url, width, aspectRatio)} ${width}w`)
			.join(", "),
		width: widest,
		height: heightOf(widest, aspectRatio),
	};
};
