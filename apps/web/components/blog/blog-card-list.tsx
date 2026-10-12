import type { PostSummary } from "@/server/blog";
import { BlogCard } from "./blog-card";

interface BlogCardListProps {
	posts: readonly PostSummary[];
}

export const BlogCardList = ({ posts }: BlogCardListProps) => (
	<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{posts.map((post) => (
			<BlogCard key={post.id} post={post} />
		))}
	</ul>
);
