const ENTITIES: Record<string, string> = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: '"',
	"#39": "'",
	nbsp: " ",
};

const decodeEntities = (text: string): string =>
	text.replace(
		/&(amp|lt|gt|quot|#39|nbsp);/g,
		(_, name: string) => ENTITIES[name] ?? "",
	);

/** Plain text from the start of the post, for search results and share cards. */
export const excerptOf = (html: string, maxLength: number): string => {
	const text = decodeEntities(html.replace(/<[^>]*>/g, " "))
		.replace(/\s+/g, " ")
		.trim();

	return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
};
