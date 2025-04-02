// next.config.ts
import type { NextConfig } from "next";
// Import webpack type for custom webpack configuration
import type { Configuration, RuleSetRule } from "webpack"; // Import RuleSetRule type

const nextConfig: NextConfig = {
  // React Strict Mode is recommended for identifying potential problems
  reactStrictMode: true, 

  // Configure allowed remote domains for next/image optimization
  images: {
    remotePatterns: [
      // Allow images from Sanity's CDN
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: `/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/**`,
      },
      // Allow images from Unsplash
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', 
      },
    ],
  },

  // Custom Webpack configuration based on SVGR documentation pattern
  webpack(config: Configuration) {
    // --- SVGR Loader Configuration ---

    // 1. Find the default Next.js rule for handling SVG files.
    // This rule varies slightly between Next.js versions, so finding it dynamically is best.
    const fileLoaderRule = config.module?.rules?.find((rule): rule is RuleSetRule =>
      typeof rule === 'object' && rule?.test instanceof RegExp && rule.test.test('.svg')
    );

    config.module?.rules?.push(
      // 2. Reapply the found rule, but only for imports ending in ?url
      // This preserves the default Next.js behavior for specific imports like:
      // import logoUrl from './logo.svg?url';
      {
        ...(fileLoaderRule as RuleSetRule), // Spread the original rule config
        test: /\.svg$/i,
        resourceQuery: /url/, // Only apply to *.svg?url imports
      },
      // 3. Convert all other SVG imports (without ?url) to React components using SVGR
      {
        test: /\.svg$/i,
        // Apply rule only to modules that were issued (imported) by JS/TS files
        issuer: fileLoaderRule?.issuer ? { and: [fileLoaderRule.issuer] } : undefined, 
        // Exclude SVGs imported with ?url or other potential resource queries handled elsewhere
        resourceQuery: { not: [/url/] }, 
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              // Your previously defined SVGR options:
              svgo: true, 
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: { overrides: { removeViewBox: false } },
                  },
                ],
              },
              titleProp: true, 
              ref: true, 
              // Ensure SVGs are treated as modules for proper tree shaking, etc.
              exportType: 'default', 
            },
          },
        ],
      }
    );

    // 4. Modify the original SVG rule to exclude all .svg files
    // This prevents the default loader from processing SVGs that are now handled by SVGR or the ?url rule
    if (fileLoaderRule && typeof fileLoaderRule === 'object') {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    // Return the modified webpack config
    return config;
  },

  /* Add other Next.js config options here if needed */
};

export default nextConfig;
