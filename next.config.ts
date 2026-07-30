import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Use this worktree as the Turbopack root to avoid traversing its parent repository.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
