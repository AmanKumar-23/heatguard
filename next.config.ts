import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project directory so Next does not infer a
  // parent folder when unrelated lockfiles exist elsewhere on the machine.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
