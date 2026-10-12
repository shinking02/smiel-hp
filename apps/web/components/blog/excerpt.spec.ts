import { describe, expect, it } from "vitest";
import { excerptOf } from "./excerpt";

describe("excerptOf", () => {
	it("drops tags and folds whitespace", () => {
		expect(
			excerptOf("<p>雨の日</p><figure><img src=x></figure><p>晴れ</p>", 50),
		).toBe("雨の日 晴れ");
	});

	it("decodes the entities the editor writes", () => {
		expect(excerptOf("<p>A&amp;B &lt;3&gt;</p>", 50)).toBe("A&B <3>");
	});

	it("cuts long text with an ellipsis", () => {
		expect(excerptOf("<p>あいうえお</p>", 3)).toBe("あいう…");
	});
});
