import { describe, expect, it } from "vitest";
import { formatPublishedDate } from "./published-date";

describe("formatPublishedDate", () => {
	it("formats the date in Japanese", () => {
		expect(formatPublishedDate("2024-05-01T03:00:00.000Z")).toBe(
			"2024年5月1日",
		);
	});

	it("reads the date in Tokyo rather than UTC", () => {
		expect(formatPublishedDate("2024-04-30T15:00:00.000Z")).toBe(
			"2024年5月1日",
		);
	});
});
