// Pinned to Tokyo so a post dated just after midnight JST does not render as
// the previous day on the UTC Worker.
const FORMAT = new Intl.DateTimeFormat("ja-JP", {
	timeZone: "Asia/Tokyo",
	year: "numeric",
	month: "long",
	day: "numeric",
});

export const formatPublishedDate = (isoTimestamp: string): string =>
	FORMAT.format(new Date(isoTimestamp));
