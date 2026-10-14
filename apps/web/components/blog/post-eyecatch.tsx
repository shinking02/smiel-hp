import { responsiveMicrocmsImage } from "@/lib/microcms-image";

const EYECATCH = {
	widths: [480, 720, 960, 1200, 1500],
	aspectRatio: 3 / 2,
} as const;
const EYECATCH_SIZES = "(min-width: 48rem) 46rem, calc(100vw - 2rem)";

interface PostEyecatchProps {
	url: string;
}

// The heading right above names the post, so the picture is decorative. It is
// the largest thing in the first view, so it loads first.
export const PostEyecatch = ({ url }: PostEyecatchProps) => {
	const { src, srcSet, width, height } = responsiveMicrocmsImage(url, EYECATCH);

	return (
		<img
			src={src}
			srcSet={srcSet}
			sizes={EYECATCH_SIZES}
			alt=""
			width={width}
			height={height}
			fetchPriority="high"
			className="aspect-3/2 w-full rounded-2xl bg-zinc-100 object-cover"
		/>
	);
};
