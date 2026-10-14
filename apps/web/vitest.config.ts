import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		// Vitest matches both .test and .spec by default; pinned so the two
		// conventions cannot drift into the same codebase.
		include: ["{app,components,lib,server}/**/*.spec.ts"],
		// Vitest does not read the tsconfig paths, so `@` is redeclared here.
		alias: { "@/": `${import.meta.dirname}/` },
		passWithNoTests: true,
	},
});
