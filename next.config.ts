import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this app so Next never infers a parent
  // directory (e.g. from a stray lockfile above blogs-app), which breaks
  // module resolution during dev static generation.
  turbopack: { root: __dirname },
};

export default nextConfig;
