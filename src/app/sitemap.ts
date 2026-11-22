import type { MetadataRoute } from "next";
import { seo } from "@/content";
import { pageDocs } from "@/content/pages";
import { shownList } from "@/lib/facts";
import { canonical } from "@/lib/seo";
import { routeByPath } from "@/routes";

export const dynamic = "force-static";

/**
 * One entry per indexable route: content.seo plus every doc a production build shows (confirmed), minus routes marked
 * `index: false`. lastmod is the date the content changed (the doc's own `lastmod`), never the build date.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const docs = shownList(pageDocs).filter((d) => routeByPath.get(d.path)?.index !== false);
  return [...Object.values(seo), ...docs]
    .filter((e) => ("indexable" in e ? e.indexable : true))
    .map((e) => ({ url: canonical(e.path), lastModified: e.lastmod }));
}
