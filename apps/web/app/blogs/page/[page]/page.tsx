import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { BlogIndex } from "@/components/blog/blog-index";
import { blogPageHref, parsePage } from "@/components/blog/pagination";

export const revalidate = 3600;

// Rendered on first visit and then cached, so the build needs no CMS access.
export const generateStaticParams = () => [];

export const generateMetadata = async ({
	params,
}: PageProps<"/blogs/page/[page]">): Promise<Metadata> => {
	const page = parsePage((await params).page);
	if (page === undefined) return {};

	return {
		title: `ブログ（${page}ページ目）`,
		alternates: { canonical: blogPageHref(page) },
	};
};

const BlogsPageN = async ({ params }: PageProps<"/blogs/page/[page]">) => {
	const page = parsePage((await params).page);
	if (page === undefined) notFound();
	if (page === 1) permanentRedirect(blogPageHref(1));

	return <BlogIndex page={page} />;
};

export default BlogsPageN;
