import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/second_site",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;