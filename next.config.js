/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for serverless deployment
  experimental: {
    serverComponentsExternalPackages: ["@mirohq/miro-api"],
  },

  // Handle trailing slashes consistently
  trailingSlash: false,

  // Image optimization config for Netlify
  images: {
    unoptimized: true,
  },

  // Ensure proper routing for app directory
  async rewrites() {
    return [];
  },

  // Ensure dynamic routes work properly on Netlify
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
