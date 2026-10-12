import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/blog-index";

export const revalidate = 3600;

export const metadata: Metadata = {
	title: "ブログ",
	alternates: { canonical: "/blogs" },
};

const BlogsPage = () => <BlogIndex page={1} />;

export default BlogsPage;
