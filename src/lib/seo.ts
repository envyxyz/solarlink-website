import type { Metadata } from "next";
import { business, seo, type SeoEntry } from "@/content";
import { absoluteUrl } from "./links";
import { show } from "./facts";

export const siteUrl = show(business.siteUrl) as string;

/** Canonical form: apex, https, lowercase path, trailing slash. */
export function canonical(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return absoluteUrl(p.endsWith("/") ? p : `${p}/`);
}

/** Metadata for a route, built only from content.seo. */
export function buildMetadata(key: string, overrides: Partial<SeoEntry> = {}): Metadata {
  const e = { ...seo[key], ...overrides };
  const url = canonical(e.path);
  const name = show(business.name) as string;
  return {
    title: e.title,
    description: e.description,
    alternates: { canonical: url },
    robots: e.indexable ? undefined : { index: false, follow: false },
    openGraph: {
      type: "website",
      siteName: name,
      title: e.title,
      description: e.description,
      url,
      locale: business.locale.replace("-", "_"),
    },
    twitter: { card: "summary", title: e.title, description: e.description },
  };
}
