import { optimizeContentImages } from "./content-images";

// The article column is max-w-3xl less its 1rem padding on each side.
const CONTENT_IMAGES = {
	widths: [480, 720, 960, 1200, 1500],
	sizes: "(min-width: 48rem) 46rem, calc(100vw - 2rem)",
} as const;

// Covers what the rich editor emits: paragraphs, lists, emphasis, links and
// figures wrapping an image.
const RICH_TEXT = [
	"text-zinc-800 leading-loose wrap-anywhere",
	"[&>*+*]:mt-5",
	"[&_figure]:my-8 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-2xl",
	"[&_ul]:list-disc [&_ol]:list-decimal [&_ul,&_ol]:pl-6 [&_li+li]:mt-1",
	"[&_strong]:font-bold",
	"[&_a]:text-brand-700 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-brand-800",
	"[&_h2]:mt-12 [&_h2]:font-bold [&_h2]:text-2xl [&_h3]:mt-10 [&_h3]:font-bold [&_h3]:text-xl",
].join(" ");

interface PostContentProps {
	html: string;
}

// The HTML comes from the group's own microCMS editors, not from visitors.
export const PostContent = ({ html }: PostContentProps) => (
	<div
		className={RICH_TEXT}
		// biome-ignore lint/security/noDangerouslySetInnerHtml: authored in microCMS by the site owners
		dangerouslySetInnerHTML={{
			__html: optimizeContentImages(html, CONTENT_IMAGES),
		}}
	/>
);
