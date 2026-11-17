import type { NextConfig } from "next";

// The kit page lives at src/app/dev/kit/page.dev.tsx. Only non-production builds
// know the "dev.tsx" extension, so the route does not exist in `next build`.
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: isProd ? ["tsx", "ts"] : ["tsx", "ts", "dev.tsx"],
  poweredByHeader: false,
  // Keep light-dark() native: the lowered form resolves at :root and breaks `scheme-light` on a subtree.
  experimental: { lightningCssFeatures: { exclude: ["light-dark"] } },
};

export default nextConfig;
