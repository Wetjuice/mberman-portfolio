import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/portfolio-main/taste-skill-demo",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
