import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        optimizePackageImports: ["@chakra-ui/react"],
    },
    webpack: (config, { dev }) => {
        if (dev) {
            config.watchOptions = {
                poll: 2000,
                aggregateTimeout: 300,
            };
        }
        return config;
    },
};

export default nextConfig;
