import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackToIndex } from "@/components/blog/back-to-index";
import { excerptOf } from "@/components/blog/excerpt";
import { PostContent } from "@/components/blog/post-content";
import { PostEyecatch } from "@/components/blog/post-eyecatch";
import { formatPublishedDate } from "@/components/blog/published-date";
import { responsiveMicrocmsImage } from "@/lib/microcms-image";
import { getPost } from "@/server/blog";

export const revalidate = 3600;

// Rendered on first visit and then cached, so the build needs no CMS access.
export const generateStaticParams = () => [];

const DESCRIPTION_LENGTH = 120;
const SHARE_IMAGE = { width: 1200, height: 630 } as const;

export const generateMetadata = async ({
	params,
}: PageProps<"/blogs/[id]">): Promise<Metadata> => {
	const post = await getPost((await params).id);
	if (post === undefined) return {};

	const description = excerptOf(post.content, DESCRIPTION_LENGTH);
	const image =
		post.eyecatch &&
		responsiveMicrocmsImage(post.eyecatch.url, {
			widths: [SHARE_IMAGE.width],
			aspectRatio: SHARE_IMAGE.width / SHARE_IMAGE.height,
		});

	return {
		title: post.title,
		description,
		alternates: { canonical: `/blogs/${post.id}` },
		openGraph: {
			type: "article",
			title: post.title,
			description,
			url: `/blogs/${post.id}`,
			publishedTime: post.date,
			images: image && [{ url: image.src, ...SHARE_IMAGE }],
		},
	};
};

const BlogPostPage = async ({ params }: PageProps<"/blogs/[id]">) => {
	const post = await getPost((await params).id);
	if (post === undefined) notFound();

	return (
		<article className="mx-auto max-w-3xl px-4 py-12 md:py-16">
			<BackToIndex />
			<header className="mt-8">
				<time dateTime={post.date} className="text-sm text-zinc-600">
					{formatPublishedDate(post.date)}
				</time>
				<h1 className="mt-2 font-bold text-3xl leading-snug md:text-4xl">
					{post.title}
				</h1>
			</header>
			{post.eyecatch !== undefined && (
				<div className="mt-8">
					<PostEyecatch url={post.eyecatch.url} />
				</div>
			)}
			<div className="mt-10">
				<PostContent html={post.content} />
			</div>
			<footer className="mt-16 border-zinc-200 border-t pt-8">
				<BackToIndex />
			</footer>
		</article>
	);
};

export default BlogPostPage;
