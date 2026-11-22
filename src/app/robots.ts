import type { MetadataRoute } from "next";
import { preview } from "@/lib/facts";
import { absoluteUrl } from "@/lib/links";

export const dynamic = "force-static";

// Nothing is blocked: a robots.txt Disallow would hide the noindex tag that keeps previews out (CLAUDE.md rule 13).
// A preview build names no sitemap, so nobody is pointed at its draft pages.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(preview ? {} : { sitemap: absoluteUrl("/sitemap.xml") }),
  };
}
