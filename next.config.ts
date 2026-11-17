import { existsSync, readdirSync, readFileSync } from "node:fs";
import type { NextConfig } from "next";

// The kit page lives at src/app/dev/kit/page.dev.tsx. Only non-production builds
// know the "dev.tsx" extension, so the route does not exist in `next build`.
const isProd = process.env.NODE_ENV === "production";
// The inner-page route (src/app/[...slug]/page.docs.tsx) exists only when a page doc does: a static export needs at
// least one generated path. Production needs a doc marked `confirmed: true` in src/content/pages/docs/ (the placeholder
// docs are all false, so the route stays off); dev and preview always have it.
const docsDir = "src/content/pages/docs";
const hasDocs = existsSync(docsDir) && readdirSync(docsDir).some((f) => f.endsWith(".ts") && /confirmed:\s*true/.test(readFileSync(`${docsDir}/${f}`, "utf8")));

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ["tsx", "ts", ...(isProd ? [] : ["dev.tsx"]), ...(isProd && !hasDocs && !process.env.SOLARLINK_PREVIEW ? [] : ["docs.tsx"])],
  poweredByHeader: false,
  // Keep light-dark() native: the lowered form resolves at :root and breaks `scheme-light` on a subtree.
  experimental: { lightningCssFeatures: { exclude: ["light-dark"] } },
};

export default nextConfig;
