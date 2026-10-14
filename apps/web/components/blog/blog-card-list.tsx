import type { PostSummary } from "@/server/blog";
import { BlogCard, type TitleLevel } from "./blog-card";

interface BlogCardListProps {
	posts: readonly PostSummary[];
	titleAs?: TitleLevel;
	/** How many leading cards load their image right away. */
	eagerCount?: number;
}

export const BlogCardList = ({
	posts,
	titleAs = "h3",
	eagerCount = 0,
}: BlogCardListProps) => (
	<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{posts.map((post, index) => (
			<BlogCard
				key={post.id}
				post={post}
				titleAs={titleAs}
				eager={index < eagerCount}
			/>
		))}
	</ul>
);
