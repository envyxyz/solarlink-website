import type { MetadataRoute } from "next";
import { seo } from "@/content";
import { pageDocs } from "@/content/pages";
import { shownList } from "@/lib/facts";
import { canonical } from "@/lib/seo";

export const dynamic = "force-static";

/** One entry per indexable route in content.seo. lastmod is the date the content changed, never the build date. */
export default function sitemap(): MetadataRoute.Sitemap {
  const docs = shownList(pageDocs).map((d) => ({ path: d.path, lastmod: d.lastmod, indexable: true }));
  return [...Object.values(seo), ...docs]
    .filter((e) => e.indexable)
    .map((e) => ({ url: canonical(e.path), lastModified: e.lastmod }));
}
