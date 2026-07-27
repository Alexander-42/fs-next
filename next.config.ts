import type { NextConfig } from "next";
import createMdx from "@next/mdx"

const nextConfig: NextConfig = {
  // Pin the workspace root to this app so Next never infers a parent
  // directory (e.g. from a stray lockfile above blogs-app), which breaks
  // module resolution during dev static generation.
  pageExtensions: ['ts', 'tsx'],
  turbopack: { root: __dirname },
};

const withMdx = createMdx({
  extension: /\.(md|mdx)$/,
})

export default withMdx(nextConfig);
