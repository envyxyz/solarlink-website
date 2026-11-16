import type { MetadataRoute } from "next";
import { seo } from "@/content";
import { canonical } from "@/lib/seo";

export const dynamic = "force-static";

/** One entry per indexable route in content.seo. lastmod is the date the content changed, never the build date. */
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(seo)
    .filter((e) => e.indexable)
    .map((e) => ({ url: canonical(e.path), lastModified: e.lastmod }));
}
