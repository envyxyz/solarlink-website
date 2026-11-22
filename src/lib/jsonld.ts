import { business, logo, outlets, ui, type Outlet } from "@/content";
import type { PageDoc } from "@/content/pages";
import { show } from "./facts";
import { canonical, siteUrl } from "./seo";
import { absoluteUrl, telHref } from "./links";

/*
  JSON-LD builders. Every value passes through show(), so an unconfirmed fact never reaches
  production markup. No AggregateRating and no Review on our own business.
*/

const name = show(business.name) as string;
const ORG_ID = `${siteUrl}/#organization`;

const strip = <T extends Record<string, unknown>>(o: T) =>
  Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && v !== null)) as T;

export function organizationLd() {
  const sameAs = business.socials.map((s) => show(s)?.url).filter(Boolean);
  return strip({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name,
    url: `${siteUrl}/`,
    logo: absoluteUrl(logo.path),
    description: show(business.descriptions.short),
    legalName: show(business.legalName),
    email: show(business.email),
    sameAs: sameAs.length ? sameAs : undefined,
  });
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name,
    url: `${siteUrl}/`,
    inLanguage: business.locale,
    publisher: { "@id": ORG_ID },
  };
}

// ponytail: schema.org has no solar-installer type. HomeAndConstructionBusiness is the most
// specific LocalBusiness subtype that validates and does not misdescribe the company.
const OUTLET_TYPE = "HomeAndConstructionBusiness";

/** One LocalBusiness per live outlet. Returns null until the address is confirmed. */
export function localBusinessLd(outlet: Outlet) {
  const lines = show(outlet.addressLines);
  if (!lines) return null;
  const geo = show(outlet.geo);
  const phones = show(outlet.phones);
  return strip({
    "@context": "https://schema.org",
    "@type": OUTLET_TYPE,
    "@id": `${absoluteUrl(outlet.path)}#business`,
    name: `${name} ${outlet.city}`,
    url: absoluteUrl(outlet.path),
    parentOrganization: { "@id": ORG_ID },
    address: strip({
      "@type": "PostalAddress",
      streetAddress: lines.slice(0, -1).join(", "),
      addressLocality: outlet.city,
      postalCode: show(outlet.postcode) ?? undefined,
      addressCountry: "PK",
    }),
    telephone: phones?.[0] ? telHref(phones[0]).replace("tel:", "") : undefined,
    geo: geo ? { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng } : undefined,
    hasMap: show(outlet.mapUrl) ?? undefined,
  });
}

export const allOutletsLd = () => outlets.map(localBusinessLd).filter(Boolean);

/** FAQPage for exactly the questions the page shows. */
export const faqLd = (items: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((i) => ({ "@type": "Question", name: i.question, acceptedAnswer: { "@type": "Answer", text: i.answer } })),
});

/** BreadcrumbList for a trail of [label, path]. The home crumb is added here. */
export function breadcrumbLd(trail: [label: string, path: string][]) {
  const items = [[ui.breadcrumb.home, "/"], ...trail] as [string, string][];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([label, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: label,
      item: canonical(path),
    })),
  };
}

/** The Organization by reference: name and url inline, because the full node only sits on the home page. */
const orgRef = { "@type": "Organization", "@id": ORG_ID, name, url: `${siteUrl}/` };

/**
 * Schema for what an inner page is, from its kind: Service, Article, or the outlet's LocalBusiness. Only what the page
 * shows; no price, rating or review. datePublished is left out on purpose (no doc carries a real publish date);
 * dateModified is the doc's lastmod. Project, product, hub, company and legal pages get BreadcrumbList only.
 */
export function docLd(doc: PageDoc) {
  const url = canonical(doc.path);
  const image = doc.image ? absoluteUrl(doc.image.src) : undefined;
  if (doc.kind === "service") {
    return strip({ "@context": "https://schema.org", "@type": "Service", "@id": `${url}#service`, name: doc.h1, description: doc.description, url, image, provider: orgRef });
  }
  if (doc.kind === "guide" || doc.kind === "article") {
    return strip({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: doc.h1,
      description: doc.description,
      mainEntityOfPage: url,
      inLanguage: business.locale,
      dateModified: doc.lastmod,
      image: image ? [image] : undefined,
      author: orgRef,
      publisher: orgRef,
    });
  }
  if (doc.kind === "outlet") {
    const outlet = outlets.find((o) => o.path === doc.path);
    return outlet ? localBusinessLd(outlet) : null;
  }
  return null;
}
