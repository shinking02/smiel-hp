import "server-only";

// biome-ignore lint/performance/noNamespaceImport: valibot exports generic names like object and string
import * as v from "valibot";
import { openMicrocms } from "./microcms";

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

export type PostSummary = v.InferOutput<typeof PostSummarySchema>;

const SUMMARY_FIELDS = ["id", "title", "date", "eyecatch"];

export const getLatestPosts = async (limit: number): Promise<PostSummary[]> => {
	const { contents } = await openMicrocms().getList({
		endpoint: "blogs",
		queries: { limit, fields: SUMMARY_FIELDS, orders: "-date" },
	});

	return v.parse(v.array(PostSummarySchema), contents);
};
