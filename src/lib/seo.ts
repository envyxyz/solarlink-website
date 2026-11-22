import type { Metadata } from "next";
import { business, ogImage, seo, type SeoEntry } from "@/content";
import { absoluteUrl } from "./links";
import { preview, show } from "./facts";

export const siteUrl = show(business.siteUrl) as string;

/** Canonical form: apex, https, lowercase path, trailing slash. */
export function canonical(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return absoluteUrl(p.endsWith("/") ? p : `${p}/`);
}

/** Metadata for a route, built only from content.seo. */
export const buildMetadata = (key: string, overrides: Partial<SeoEntry> = {}): Metadata => metadataFor({ ...seo[key], ...overrides });

/**
 * Metadata for any entry: a content.seo route or a page doc. `article` marks guides and posts (og:type article with
 * the modified time). Preview builds (SOLARLINK_PREVIEW and dev) are noindex on every page; production never is,
 * except the 404.
 */
export function metadataFor(e: SeoEntry, { article = false }: { article?: boolean } = {}): Metadata {
  const url = canonical(e.path);
  const name = show(business.name) as string;
  const image = { url: absoluteUrl(ogImage.path), width: ogImage.width, height: ogImage.height, alt: ogImage.alt };
  return {
    title: e.title,
    description: e.description,
    alternates: { canonical: url },
    robots: e.indexable && !preview ? undefined : { index: false, follow: false },
    openGraph: {
      ...(article ? { type: "article" as const, modifiedTime: e.lastmod } : { type: "website" as const }),
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
