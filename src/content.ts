/*
  The single source for every business fact and all copy.
  Facts are { value, confirmed, source }. A node with `confirmed: false` is never shown
  in a production build (see src/lib/facts.ts); scripts/check-content.mjs enforces that.
  Facts come from ../growth/Notes/Business Profile.md only. "Website says" = confirmed: false.
  This file is read by Node directly (type stripping): use `import type` and relative `.ts` imports only.
*/

export type Fact<T = string> = {
  value: T;
  confirmed: boolean;
  source: string;
  /**
   * An unconfirmed value that production may show because the UI labels the result as an estimate and
   * names the assumption (the sizing constants). check-content and show() both honour it.
   */
  shownAsEstimate?: boolean;
};
/** A content object that is itself a claim (a service, a brand). Same rule as a Fact. */
export type Flagged = { confirmed: boolean; source: string };

export const PLACEHOLDER = "[confirm with client]";

const CLIENT = "Client, WhatsApp, 16 Nov 2026";
const AMEER = "Ameer, 13 Nov 2026 (Business Profile)";
const WEB = "Website says (solarlink.com.pk crawl, 13 Nov 2026), Business Profile. Unconfirmed";
const TODO = "Business Profile: nothing on file. Ask the client";

const ok = <T>(value: T, source: string): Fact<T> => ({ value, confirmed: true, source });
const web = <T>(value: T, source = WEB): Fact<T> => ({ value, confirmed: false, source });
const estimate = <T>(value: T, source: string): Fact<T> => ({ value, confirmed: false, shownAsEstimate: true, source });
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
  /** The part of town, for the short area line on the homepage. */
  area: Fact<string>;
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
    addressLines: ok(
      ["Shop No. 05, Munawar Center", "Opp. State Bank Building, 30-The Mall Road", "Lahore"],
      "Client, on WhatsApp, 16 Nov 2026 (Munawar Center is the only Lahore shop)",
    ),
    area: ok("The Mall", "Client, on WhatsApp, 16 Nov 2026 (Munawar Center, The Mall)"),
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
    addressLines: ok(["House No. 514, North Service Road", "Sector I-14/3", "Islamabad"], "Client, on WhatsApp, 16 Nov 2026"),
    area: ok("I-14", "Client, on WhatsApp, 16 Nov 2026 (Sector I-14/3)"),
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
    addressLines: ok(["Block No. 05, Aslahy Wali Gali", "Near Company Bagh", "Sargodha"], "Client, on WhatsApp, 16 Nov 2026"),
    area: ok("Company Bagh", "Client, on WhatsApp, 16 Nov 2026 (near Company Bagh)"),
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

/** The homepage numbers (section 3). Only confirmed ones show as numbers; with fewer than two the section shows the cities instead. */
export const aboutStats: { stat: Fact<string | number>; label: string }[] = [
  { stat: ok(outlets.length, CLIENT), label: "Cities with a SolarLink shop" },
  { stat: todo(), label: "Years installing solar" },
  { stat: todo(), label: "kW installed" },
  { stat: todo(), label: "Projects completed" },
];

export type Service = Flagged & { slug: string; title: string; short: string; path: string };

export const services: Service[] = [
  { slug: "residential-solar", title: "Solar for homes", short: "Home systems, sized to your bill, supplied and installed.", path: "/services/residential-solar/", confirmed: true, source: AMEER },
  { slug: "commercial-solar", title: "Solar for business", short: "Shops, offices and commercial sites.", path: "/services/commercial-solar/", confirmed: true, source: AMEER },
  { slug: "industrial-solar", title: "Solar for industry", short: "Factories and large-scale plants.", path: "/services/industrial-solar/", confirmed: true, source: AMEER },
  { slug: "agricultural-solar", title: "Solar for farms and tubewells", short: "Farm power and solar tubewells.", path: "/services/agricultural-solar/", confirmed: false, source: WEB },
  { slug: "net-metering-support", title: "Net metering support", short: "The application, approval and commissioning, filed for you.", path: "/services/net-metering-support/", confirmed: true, source: AMEER },
];

/** `wdth` and `weight` set the wordmark's type (Mona Sans axes) until official logo files arrive. */
export type Brand = Flagged & { name: string; wdth: number; weight: number };
const brandRows: [string, number, number][] = [
  ["Canadian Solar", 110, 650],
  ["Growatt", 125, 800],
  ["Fronus", 100, 700],
  ["LONGi", 125, 800],
  ["Huawei", 90, 600],
  ["GoodWe", 105, 700],
];
export const brands: Brand[] = brandRows.map(([name, wdth, weight]) => ({
  name,
  wdth,
  weight,
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
  // Unconfirmed starting constants. Shown in production only because the hero labels the result as an
  // estimate and names these assumptions (hero.assumptions in content/home.ts).
  ratePerUnit: estimate(50, "docs/HOMEPAGE.md starting constant. Client has not confirmed rates"),
  sunHours: estimate(5, "docs/HOMEPAGE.md starting constant, unconfirmed"),
  performanceRatio: estimate(0.78, "docs/HOMEPAGE.md starting constant, unconfirmed"),
  panelWatts: estimate(580, "Business Profile: Canadian Solar 580 W, website says"),
  // Slider ranges (docs/HOMEPAGE.md section 1).
  rs: { min: 5000, max: 300000, step: 1000, start: 45000 },
  units: { min: 100, max: 5000, step: 50 },
  /** Roof corners inside the parapet, percent of the hero image: left, back, right, front. */
  roof: { tl: [46.8, 25.2], tr: [65.6, 16.2], br: [94.4, 20.9], bl: [80.0, 37.6] } as const,
  /** Flat roof plane in plane units; panels are portrait 1:2. Fill order starts at the front corner. */
  grid: { w: 1000, h: 1180, panelW: 100, panelH: 200, gap: 10, cols: 8, rows: 5 },
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
    h1: "Solar sized to your bill.",
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
export { nav, footer } from "./content/nav.ts";
export { hero, belt } from "./content/home.ts";
export { about } from "./content/home/about.ts";
export { servicesSection } from "./content/home/services.ts";
export { link } from "./content/home/link.ts";
import { ui, priceMode } from "./content/ui.ts";
import { nav, footer } from "./content/nav.ts";
import { hero, belt } from "./content/home.ts";
import { about } from "./content/home/about.ts";
import { servicesSection } from "./content/home/services.ts";
import { link } from "./content/home/link.ts";

export const content = { business, outlets, services, brands, products, projects, reviews, reviewSummary, faqs, sizing, aboutStats, nav, footer, hero, belt, about, servicesSection, link, seo, ui, priceMode };
export default content;
