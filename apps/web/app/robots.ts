import type { MetadataRoute } from "next";
import { clientEnv } from "@/env.client";

const robots = (): MetadataRoute.Robots =>
	clientEnv.appEnv === "production"
		? { rules: { userAgent: "*", allow: "/" } }
		: { rules: { userAgent: "*", disallow: "/" } };

export default robots;
