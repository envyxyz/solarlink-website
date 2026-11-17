import { existsSync, readdirSync } from "node:fs";
import type { NextConfig } from "next";

// The kit page lives at src/app/dev/kit/page.dev.tsx. Only non-production builds
// know the "dev.tsx" extension, so the route does not exist in `next build`.
const isProd = process.env.NODE_ENV === "production";
// The inner-page route (src/app/[...slug]/page.docs.tsx) exists only when a page doc does: a static export needs at
// least one generated path. Docs are files in src/content/pages/docs/; until the first one lands the route is off.
const hasDocs = existsSync("src/content/pages/docs") && readdirSync("src/content/pages/docs").some((f) => f.endsWith(".ts"));

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ["tsx", "ts", ...(isProd ? [] : ["dev.tsx"]), ...(isProd && !hasDocs ? [] : ["docs.tsx"])],
  poweredByHeader: false,
  // Keep light-dark() native: the lowered form resolves at :root and breaks `scheme-light` on a subtree.
  experimental: { lightningCssFeatures: { exclude: ["light-dark"] } },
};

export default nextConfig;
