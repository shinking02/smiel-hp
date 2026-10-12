import "server-only";

import { isMicroCMSRequestError } from "microcms-js-sdk";
import { cache } from "react";
// biome-ignore lint/performance/noNamespaceImport: valibot exports generic names like object and string
import * as v from "valibot";
import { openMicrocms } from "./microcms";

const ENDPOINT = "blogs";

const PostSummarySchema = v.object({
	id: v.pipe(v.string(), v.nonEmpty()),
	title: v.string(),
	date: v.pipe(v.string(), v.isoTimestamp()),
	eyecatch: v.optional(
		v.object({
			url: v.pipe(v.string(), v.url()),
		}),
	),
});

const PostSchema = v.object({
	...PostSummarySchema.entries,
	/** Rich editor HTML, authored by the group in microCMS. */
	content: v.string(),
});

export type PostSummary = v.InferOutput<typeof PostSummarySchema>;
export type Post = v.InferOutput<typeof PostSchema>;

export interface PostPage {
	posts: PostSummary[];
	totalCount: number;
}

const SUMMARY_FIELDS = Object.keys(PostSummarySchema.entries);
const POST_FIELDS = Object.keys(PostSchema.entries);

export const getPostPage = async ({
	offset,
	limit,
}: {
	offset: number;
	limit: number;
}): Promise<PostPage> => {
	const { contents, totalCount } = await openMicrocms().getList({
		endpoint: ENDPOINT,
		queries: { offset, limit, fields: SUMMARY_FIELDS, orders: "-date" },
	});

	return { posts: v.parse(v.array(PostSummarySchema), contents), totalCount };
};

export const getLatestPosts = async (limit: number): Promise<PostSummary[]> =>
	(await getPostPage({ offset: 0, limit })).posts;

/** Cached per request, since the metadata and the page both ask for it. */
export const getPost = cache(async (id: string): Promise<Post | undefined> => {
	try {
		const post = await openMicrocms().getListDetail({
			endpoint: ENDPOINT,
			contentId: id,
			queries: { fields: POST_FIELDS },
		});

		return v.parse(PostSchema, post);
	} catch (error) {
		if (isMicroCMSRequestError(error) && error.status === 404) return undefined;
		throw error;
	}
});
