/*
  The single source for every business fact and all copy.
  Facts are { value, confirmed, source }. A node with `confirmed: false` is never shown
  in a production build (see src/lib/facts.ts); scripts/check-content.mjs enforces that.
  Facts come from ../growth/Notes/Business Profile.md only. "Website says" = confirmed: false.
  This file is read by Node directly (type stripping): use `import type` and relative `.ts` imports only.
*/

export type Fact<T = string> = { value: T; confirmed: boolean; source: string };
/** A content object that is itself a claim (a service, a brand). Same rule as a Fact. */
export type Flagged = { confirmed: boolean; source: string };

export const PLACEHOLDER = "[confirm with client]";

const CLIENT = "Client, WhatsApp, 16 Nov 2026";
const AMEER = "Ameer, 13 Nov 2026 (Business Profile)";
const WEB = "Website says (solarlink.com.pk crawl, 13 Nov 2026), Business Profile. Unconfirmed";
const TODO = "Business Profile: nothing on file. Ask the client";

const ok = <T>(value: T, source: string): Fact<T> => ({ value, confirmed: true, source });
const web = <T>(value: T, source = WEB): Fact<T> => ({ value, confirmed: false, source });
const todo = (): Fact<string> => ({ value: PLACEHOLDER, confirmed: false, source: TODO });

export type OutletSlug = "lahore" | "islamabad" | "sargodha";

export type Outlet = {
  slug: OutletSlug;
  city: string;
  role: "head-office" | "outlet";
  status: "live";
  addressLines: Fact<string[]>;
  postcode: Fact<string>;
  phones: Fact<string[]>;
  whatsapp: Fact<string>;
  hours: Fact<string>;
  geo: Fact<{ lat: number; lng: number } | null>;
  mapUrl: Fact<string | null>;
  path: string;
};

const hours = () => web("Mon to Sat 9:00 AM to 6:00 PM, Sunday closed", `${WEB}. Same for every outlet? Ask the client`);
const noGeo = (): Fact<{ lat: number; lng: number } | null> => ({ value: null, confirmed: false, source: "Map pins: ask the client" });
const noMap = (): Fact<string | null> => ({ value: null, confirmed: false, source: "Map link: ask the client" });

export const outlets: Outlet[] = [
  {
    slug: "lahore",
    city: "Lahore",
    role: "head-office",
    status: "live",
    addressLines: web(
      ["Shop No. 05, Munawar Center", "Opp. State Bank Building, 30-The Mall Road", "Lahore"],
      `${WEB}. Client confirmed on 16 Nov 2026 that Munawar Center is the only Lahore shop`,
    ),
    postcode: web("54000", `${WEB}. Page text says 54000, schema says 54700: unresolved`),
    phones: web(["042-37117713", "042-37117714"]),
    whatsapp: web("0321-8425777"),
    hours: hours(),
    geo: { value: { lat: 31.5651, lng: 74.3578 }, confirmed: false, source: "Old site schema, unverified" },
    mapUrl: noMap(),
    path: "/outlets/lahore/",
  },
  {
    slug: "islamabad",
    city: "Islamabad",
    role: "outlet",
    status: "live",
    addressLines: web(["House No. 514, North Service Road", "Sector I-14/3", "Islamabad"], `${WEB}. Client confirmed the address on 16 Nov 2026`),
    postcode: web("44000"),
    phones: web(["051-5204555"]),
    whatsapp: web("0339-3555000"),
    hours: hours(),
    geo: noGeo(),
    mapUrl: noMap(),
    path: "/outlets/islamabad/",
  },
  {
    slug: "sargodha",
    city: "Sargodha",
    role: "outlet",
    status: "live",
    addressLines: web(["Block No. 05, Aslahy Wali Gali", "Near Company Bagh", "Sargodha"], `${WEB}. Client confirmed the address on 16 Nov 2026`),
    postcode: web("40100"),
    phones: web(["048-3720111"]),
    whatsapp: web("0313-7084973"),
    hours: hours(),
    geo: noGeo(),
    mapUrl: noMap(),
    path: "/outlets/sargodha/",
  },
];

export const business = {
  name: ok("SolarLink", "Business Profile, Identity: name confirmed, keep"),
  legalName: todo(),
  ntn: todo(),
  founded: web(2018),
  teamSize: todo(),
  domain: ok("solarlink.com.pk", "Business Profile, Identity"),
  siteUrl: ok("https://solarlink.com.pk", "Business Profile, Identity (apex, https)"),
  email: web("info@solarlink.com.pk"),
  contactPerson: ok("Abdul Gaffar", `${AMEER}. Role to confirm`),
  ga4Id: web("G-50GMQWKL7R", "docs/PRD.md open question 10: confirm the client owns this property"),
  locale: "en-PK",
  socials: [
    web({ name: "Facebook", url: "https://facebook.com/solarlinkpk" }),
    web({ name: "Instagram", url: "https://instagram.com/solarlinkpk" }),
    web({ name: "LinkedIn", url: "https://linkedin.com/company/solarlinkpk" }),
    web({ name: "Pinterest", url: "https://pinterest.com/solarlinkpk" }),
    web({ name: "TikTok", url: "https://tiktok.com/@solarlink.pk" }),
    web({ name: "YouTube", url: "https://youtube.com/@Solarlinkcompanyofficial" }),
  ],
  // Written from confirmed facts only: services listed by Ameer (13 Nov 2026) and outlets confirmed 16 Nov 2026.
  descriptions: {
    short: ok(
      "SolarLink installs solar for homes, businesses and industry, handles net metering, and sells panels, inverters and batteries. Lahore, Islamabad, Sargodha.",
      `${AMEER}; ${CLIENT}`,
    ),
    medium: ok(
      "SolarLink designs and installs solar systems for homes, shops, offices and factories, and looks after net metering and after-sales support. We also supply solar panels, inverters, batteries and UPS over the counter. Visit us in Lahore, Islamabad or Sargodha.",
      `${AMEER}; ${CLIENT}`,
    ),
    long: ok(
      "SolarLink is a solar company with its head office in Lahore and outlets in Islamabad and Sargodha. We install solar systems for homes and for commercial and industrial sites, file net metering applications and give after-sales support. We also supply solar panels, inverters and batteries, and other appliances such as UPS. Visit the head office at Munawar Center, The Mall, Lahore, or the Islamabad and Sargodha outlets.",
      `${AMEER}; ${CLIENT}`,
    ),
  },
};

export type Service = Flagged & { slug: string; title: string; short: string; path: string };

export const services: Service[] = [
  { slug: "residential-solar", title: "Solar for homes", short: "Home systems, sized to your bill, supplied and installed.", path: "/services/residential-solar/", confirmed: true, source: AMEER },
  { slug: "commercial-solar", title: "Solar for business", short: "Shops, offices and commercial sites.", path: "/services/commercial-solar/", confirmed: true, source: AMEER },
  { slug: "industrial-solar", title: "Solar for industry", short: "Factories and large-scale plants.", path: "/services/industrial-solar/", confirmed: true, source: AMEER },
  { slug: "agricultural-solar", title: "Solar for farms and tubewells", short: "Farm power and solar tubewells.", path: "/services/agricultural-solar/", confirmed: false, source: WEB },
  { slug: "net-metering-support", title: "Net metering support", short: "The application, approval and commissioning, filed for you.", path: "/services/net-metering-support/", confirmed: true, source: AMEER },
];

export type Brand = Flagged & { name: string };
export const brands: Brand[] = ["Canadian Solar", "Growatt", "Fronus", "LONGi", "Huawei", "GoodWe"].map((name) => ({
  name,
  confirmed: false,
  source: "Website says (brand strip). Which brands are stocked is unconfirmed",
}));

// Empty until the client supplies them. Shapes grow in the page phases.
export type Product = { slug: string };
export type Project = { slug: string };
export type Review = { author: string };
export type Faq = { id: string };
export const products: Product[] = [];
export const projects: Project[] = [];
export const reviews: Review[] = [];
export const faqs: Faq[] = [];
export const reviewSummary = { rating: todo(), count: todo(), asOf: todo() };

export const sizing = {
  ratePerUnit: web(50, "docs/HOMEPAGE.md starting constant. Client has not confirmed rates"),
  sunHours: web(5, "docs/HOMEPAGE.md starting constant, unconfirmed"),
  performanceRatio: web(0.78, "docs/HOMEPAGE.md starting constant, unconfirmed"),
  panelWatts: web(580, "Business Profile: Canadian Solar 580 W, website says"),
};

export const nav = {
  main: [
    { label: "Services", href: "/services/" },
    { label: "Products", href: "/products/" },
    { label: "Projects", href: "/projects/" },
    { label: "Outlets", href: "/outlets/" },
    { label: "Resources", href: "/resources/" },
  ],
  quote: { label: "Get a free quote", href: "/get-quote/" },
};

export type SeoEntry = {
  path: string;
  title: string;
  description: string;
  h1: string;
  /** Date the content last changed (YYYY-MM-DD). Feeds sitemap lastmod. */
  lastmod: string;
  indexable: boolean;
};

export const seo: Record<string, SeoEntry> = {
  home: {
    path: "/",
    title: "Solar Solutions in Pakistan | SolarLink",
    description: business.descriptions.short.value,
    h1: "Solar solutions in Pakistan",
    lastmod: "2026-11-16",
    indexable: true,
  },
  notFound: {
    path: "/404/",
    title: "Page not found | SolarLink",
    description: "This page does not exist. Start from the home page to find a service, a product or a shop.",
    h1: "We could not find that page",
    lastmod: "2026-11-16",
    indexable: false,
  },
};

export { ui, priceMode, type PriceMode } from "./content/ui.ts";
import { ui, priceMode } from "./content/ui.ts";


export const content = { business, outlets, services, brands, products, projects, reviews, reviewSummary, faqs, sizing, nav, seo, ui, priceMode };
export default content;
