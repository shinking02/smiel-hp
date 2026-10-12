import { ImageOff } from "lucide-react";
import Link from "next/link";
import { responsiveMicrocmsImage } from "@/lib/microcms-image";
import type { PostSummary } from "@/server/blog";
import { formatPublishedDate } from "./published-date";

const THUMBNAIL = {
	widths: [240, 360, 480, 600, 800, 960],
	aspectRatio: 3 / 2,
} as const;
// Mirrors the grid in BlogCardList: a 7rem column on phones, then two and four
// columns inside the 72rem container, less its 1rem padding and gaps.
const THUMBNAIL_SIZES = [
	"(min-width: 72rem) 16.75rem",
	"(min-width: 64rem) calc((100vw - 5rem) / 4)",
	"(min-width: 40rem) calc((100vw - 3rem) / 2)",
	"7rem",
].join(", ");

interface ThumbnailProps {
	eyecatch: PostSummary["eyecatch"];
	eager: boolean;
}

// The title already names the post, so the picture is decorative.
const Thumbnail = ({ eyecatch, eager }: ThumbnailProps) => {
	if (eyecatch === undefined) {
		return (
			<div className="grid size-full place-items-center text-zinc-400">
				<ImageOff aria-hidden className="size-6" />
			</div>
		);
	}

	const { src, srcSet, width, height } = responsiveMicrocmsImage(
		eyecatch.url,
		THUMBNAIL,
	);

	return (
		<img
			src={src}
			srcSet={srcSet}
			sizes={THUMBNAIL_SIZES}
			alt=""
			width={width}
			height={height}
			loading={eager ? "eager" : "lazy"}
			decoding="async"
			className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
		/>
	);
};

export type TitleLevel = "h2" | "h3";

interface BlogCardProps {
	post: PostSummary;
	/** The card sits under the page title on the index, under a section elsewhere. */
	titleAs: TitleLevel;
	/** Cards in the first view skip lazy loading, which would delay them. */
	eager: boolean;
}

export const BlogCard = ({ post, titleAs: Title, eager }: BlogCardProps) => (
	<li className="group relative flex overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-shadow duration-200 hover:shadow-md has-focus-visible:outline-2 has-focus-visible:outline-brand-600 has-focus-visible:outline-offset-2 sm:flex-col">
		<div className="aspect-4/3 w-28 shrink-0 overflow-hidden bg-zinc-100 sm:aspect-3/2 sm:w-full">
			<Thumbnail eyecatch={post.eyecatch} eager={eager} />
		</div>
		<div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
			<Title className="line-clamp-2 font-bold leading-snug">
				<Link
					href={`/blogs/${post.id}`}
					className="after:absolute after:inset-0 focus-visible:outline-none"
				>
					{post.title}
				</Link>
			</Title>
			<time dateTime={post.date} className="text-sm text-zinc-600">
				{formatPublishedDate(post.date)}
			</time>
		</div>
	</li>
);
