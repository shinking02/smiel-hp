import { notFound } from "next/navigation";
import { getPostPage } from "@/server/blog";
import { BlogCardList } from "./blog-card-list";
import { POSTS_PER_PAGE, pageCountOf } from "./pagination";
import { PaginationNav } from "./pagination-nav";

// The first row of the four column grid is what loads in the first view.
const EAGER_COUNT = 4;

interface BlogIndexProps {
	page: number;
}

export const BlogIndex = async ({ page }: BlogIndexProps) => {
	const { posts, totalCount } = await getPostPage({
		offset: (page - 1) * POSTS_PER_PAGE,
		limit: POSTS_PER_PAGE,
	});
	const pageCount = pageCountOf(totalCount);
	if (page > pageCount) notFound();

	return (
		<div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
			<h1 className="font-bold text-3xl md:text-4xl">ブログ</h1>
			<div className="mt-8 md:mt-12">
				{posts.length === 0 ? (
					<p className="text-zinc-600">まだ記事がありません。</p>
				) : (
					<BlogCardList posts={posts} titleAs="h2" eagerCount={EAGER_COUNT} />
				)}
			</div>
			{pageCount > 1 && (
				<div className="mt-12">
					<PaginationNav current={page} count={pageCount} />
				</div>
			)}
		</div>
	);
};
