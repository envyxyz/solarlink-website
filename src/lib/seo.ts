import type { Metadata } from "next";
import { business, ogImage, seo, type SeoEntry } from "@/content";
import { absoluteUrl } from "./links";
import { show } from "./facts";

export const siteUrl = show(business.siteUrl) as string;

/** Canonical form: apex, https, lowercase path, trailing slash. */
export function canonical(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return absoluteUrl(p.endsWith("/") ? p : `${p}/`);
}

/** Metadata for a route, built only from content.seo. */
export const buildMetadata = (key: string, overrides: Partial<SeoEntry> = {}): Metadata => metadataFor({ ...seo[key], ...overrides });

/** Metadata for any entry: a content.seo route or a page doc. */
export function metadataFor(e: SeoEntry): Metadata {
  const url = canonical(e.path);
  const name = show(business.name) as string;
  const image = { url: absoluteUrl(ogImage.path), width: ogImage.width, height: ogImage.height, alt: ogImage.alt };
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
      images: [image],
    },
    twitter: { card: "summary_large_image", title: e.title, description: e.description, images: [{ url: image.url, alt: image.alt }] },
  };
}
