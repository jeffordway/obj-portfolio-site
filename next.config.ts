import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "**",
      },
    ],
  },
  // Ensure Sanity Studio works correctly
  typescript: {
    // !! WARN !! Only ignore type errors in production
    ignoreBuildErrors: process.env.NODE_ENV === "production",
  },
  eslint: {
    // !! WARN !! Only ignore ESLint errors in production
    ignoreDuringBuilds: process.env.NODE_ENV === "production",
  },
  // Transpile Sanity packages that use modern JavaScript features
  transpilePackages: ["@sanity"],

  // Configure webpack to handle SVG files
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: { test?: { test?: (path: string) => boolean } }) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/i,
        resourceQuery: { not: [/url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(withNextVideo(nextConfig));
