import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	agentRules: false,
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "images.microcms-assets.io" },
		],
	},
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// biome-ignore lint/nursery/noFloatingPromises: the adapter documents this call as fire-and-forget
initOpenNextCloudflareForDev({
	environment: "development",
});
