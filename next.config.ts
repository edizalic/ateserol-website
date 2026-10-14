import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    // Next.js clones request bodies whenever proxy.ts/middleware is present.
    // The default 10MB cap also forces full in-memory buffering of uploads.
    proxyClientMaxBodySize: '50mb',
  },
};

export default nextConfig;
