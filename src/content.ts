/*
  The one place for information that repeats across pages: the business's details, outlets,
  service and product lists, navigation, calls to action and WhatsApp messages.
  Components import from here and never type a phone number, address or label themselves.
  Long articles (blog posts, guides) live in content collections, added in Phase 7.

  CLIENT APPROVAL: SolarLink has not yet approved its own details. Every value wrapped in
  pending() below is what the current live site shows (read 2026-11-15) and is not final.
  When the client confirms a value, change pending(...) to confirmed(...) with where the
  confirmation came from. `pnpm check:content` lists what is still pending, and
  `pnpm check:content --strict` (run before any launch) fails while anything is.
  Never add a fact here that the client has not given in writing. docs/BANNED-CLAIMS.md
  lists the claims from the old site that must not be reused without confirmation.
*/

export interface Fact<T> {
  value: T;
  approved: boolean;
  source: string;
}

const pending = <T>(value: T, source = "live site solarlink.com.pk, read 2026-11-15"): Fact<T> => ({ value, approved: false, source });
// Used once the client signs off a value: confirmed("042-...", "WhatsApp from owner, 2026-11-20")
export const confirmed = <T>(value: T, source: string): Fact<T> => ({ value, approved: true, source });

/* ---------- Brand ---------- */

export const site = {
  name: "SolarLink", // as drawn in the logo; the old site mixed "Solarlink" and "SolarLink"
  tagline: "Solar Solution & Installation", // the line under the logo
  url: "https://solarlink.com.pk",
  locale: "en-PK",
  legalName: pending<string | null>(null, "not stated anywhere on the live site"),
  foundedYear: pending(2018),
  email: pending("info@solarlink.com.pk"),
  hours: pending({ days: "Monday to Saturday", open: "09:00", close: "18:00", closed: "Sunday" }),
  social: pending({
    facebook: "https://www.facebook.com/solarlinkpk",
    instagram: "https://www.instagram.com/solarlinkpk",
    youtube: "https://www.youtube.com/@Solarlinkcompanyofficial",
    tiktok: "https://www.tiktok.com/@solarlink.pk",
    linkedin: "https://www.linkedin.com/company/solarlinkpk",
  }),
} as const;

/* ---------- Outlets ---------- */

export type OutletSlug = "lahore" | "islamabad" | "rawalpindi" | "sargodha" | "multan" | "gilgit";

export interface Outlet {
  slug: OutletSlug;
  city: string;
  /** "open" has a confirmed address; "unconfirmed" is listed by the client but has no details yet. */
  status: "open" | "unconfirmed";
  role: "Head office" | "Branch";
  /** Power distribution company for the city. Public fact, used by the tools. */
  disco: string;
  address: Fact<string | null>;
  landlines: Fact<string[]>;
  /** National format, as people dial it. */
  mobile: Fact<string | null>;
  /** Digits only with country code, for wa.me links. */
  whatsapp: Fact<string | null>;
  mapUrl: Fact<string | null>;
  /** The old site used four different Lahore coordinates; take these from the Google Business Profile pin. */
  geo: Fact<{ lat: number; lng: number } | null>;
}

export const outlets: Outlet[] = [
  {
    slug: "lahore",
    city: "Lahore",
    status: "open",
    role: "Head office",
    disco: "LESCO",
    address: pending<string | null>("Shop No. 05, Munawar Center, Opp. State Bank Building, 30-The Mall Road, Lahore 54000", "live site; another page spells it Munawer Center with postcode 54700"),
    landlines: pending(["042-37117713", "042-37117714"], "live site; the second line is missing from some pages"),
    mobile: pending<string | null>("0321-8425777"),
    whatsapp: pending<string | null>("923218425777"),
    mapUrl: pending<string | null>(null, "needs the Google Business Profile share link"),
    geo: pending<{ lat: number; lng: number } | null>(null, "needs the Google Business Profile pin"),
  },
  {
    slug: "islamabad",
    city: "Islamabad",
    status: "open",
    role: "Branch",
    disco: "IESCO",
    address: pending<string | null>("House No. 514, North Service Road, Sector I-14/3, Islamabad 44000"),
    landlines: pending(["051-5204555"]),
    mobile: pending<string | null>("0339-3555000"),
    whatsapp: pending<string | null>("923393555000"),
    mapUrl: pending<string | null>(null, "needs the Google Business Profile share link"),
    geo: pending<{ lat: number; lng: number } | null>(null, "needs the Google Business Profile pin"),
  },
  {
    slug: "rawalpindi",
    city: "Rawalpindi",
    status: "open",
    role: "Branch",
    disco: "IESCO",
    address: pending<string | null>("Shop No. 05, PWD Main Road, Opp. Shaafi Hospital, Rawalpindi 45400"),
    landlines: pending(["051-5708488"]),
    mobile: pending<string | null>("0323-5551795"),
    whatsapp: pending<string | null>("923235551795"),
    mapUrl: pending<string | null>(null, "needs the Google Business Profile share link"),
    geo: pending<{ lat: number; lng: number } | null>(null, "needs the Google Business Profile pin"),
  },
  {
    slug: "sargodha",
    city: "Sargodha",
    status: "open",
    role: "Branch",
    disco: "FESCO",
    address: pending<string | null>("Block No. 05, Aslahy Wali Gali, Near Company Bagh, Sargodha 40100"),
    landlines: pending(["048-3720111"]),
    mobile: pending<string | null>("0313-7084973"),
    whatsapp: pending<string | null>("923137084973"),
    mapUrl: pending<string | null>(null, "needs the Google Business Profile share link"),
    geo: pending<{ lat: number; lng: number } | null>(null, "needs the Google Business Profile pin"),
  },
  {
    slug: "multan",
    city: "Multan",
    status: "unconfirmed",
    role: "Branch",
    disco: "MEPCO",
    address: pending<string | null>(null, "live site shows a 22-word 'coming soon' stub with no address"),
    landlines: pending<string[]>([], "none on the live site"),
    mobile: pending<string | null>(null, "none on the live site"),
    whatsapp: pending<string | null>(null, "none on the live site"),
    mapUrl: pending<string | null>(null, "none on the live site"),
    geo: pending<{ lat: number; lng: number } | null>(null, "none on the live site"),
  },
  {
    slug: "gilgit",
    city: "Gilgit",
    status: "unconfirmed",
    role: "Branch",
    disco: "Gilgit-Baltistan Water and Power Department",
    address: pending<string | null>(null, "live site shows a 22-word 'coming soon' stub with no address"),
    landlines: pending<string[]>([], "none on the live site"),
    mobile: pending<string | null>(null, "none on the live site"),
    whatsapp: pending<string | null>(null, "none on the live site"),
    mapUrl: pending<string | null>(null, "none on the live site"),
    geo: pending<{ lat: number; lng: number } | null>(null, "none on the live site"),
  },
];

/** Outlet that answers when a visitor's city has no outlet of its own. */
export const defaultOutlet: OutletSlug = "lahore";

/* ---------- What SolarLink sells ---------- */
/* Names and one-line descriptions only. Prices, warranty terms, brand lists and counts are
   client facts and stay out until confirmed (see docs/PRD.md, "Open questions"). */

export const services = [
  { slug: "residential-solar", name: "Residential solar", line: "Solar systems for homes, sized from the electricity bill." },
  { slug: "commercial-solar", name: "Commercial solar", line: "Solar for shops, offices, schools and clinics." },
  { slug: "industrial-solar", name: "Industrial solar", line: "Large systems for factories and warehouses." },
  { slug: "agricultural-solar", name: "Agricultural solar", line: "Solar for tube wells and farms." },
  { slug: "net-metering-support", name: "Net metering support", line: "The application, inspection and meter handled with the distribution company." },
] as const;

export const systemTypes = [
  { slug: "on-grid", name: "On-grid", line: "Runs with the grid and exports the surplus. No backup during an outage." },
  { slug: "hybrid", name: "Hybrid", line: "Grid, panels and a battery together. Keeps chosen loads running during an outage." },
  { slug: "off-grid", name: "Off-grid", line: "Panels and batteries with no grid connection." },
] as const;

/** Sizes with a page each. The list follows what people search for (docs/KEYWORD-MAP.md). */
export const systemSizesKw = [3, 5, 10, 15, 20] as const;

export const productCategories = [
  { slug: "solar-panels", name: "Solar panels" },
  { slug: "inverters", name: "Inverters" },
  { slug: "batteries", name: "Batteries" },
  { slug: "accessories", name: "Accessories and mounting" },
] as const;

/** Brands the old site names. Which ones SolarLink stocks or holds a dealership for is unconfirmed. */
export const brands = pending(["Growatt", "Fronus", "Canadian Solar", "LONGi"], "live site; pages disagree on the list");

/* ---------- Calls to action ---------- */

export const cta = {
  quote: "Get a quote on WhatsApp",
  call: "Call",
  calculator: "Open the calculator",
  visit: "Visit an outlet",
} as const;

/** Prefilled WhatsApp messages. {city} and {detail} are filled by the page or tool that opens the chat. */
export const whatsappMessages = {
  general: "Assalam o Alaikum, I would like a solar quote.",
  city: "Assalam o Alaikum, I would like a solar quote in {city}.",
  fromTool: "Assalam o Alaikum, I used the {tool} on your website. {detail}",
  netMetering: "Assalam o Alaikum, I need help with a net metering application in {city}.",
} as const;

/** wa.me link for an outlet, or null while its number is unknown. */
export function whatsappLink(slug: OutletSlug, message: string): string | null {
  const outlet = outlets.find((o) => o.slug === slug) ?? outlets.find((o) => o.slug === defaultOutlet);
  const number = outlet?.whatsapp.value;
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : null;
}

/* ---------- Navigation ---------- */
/* Paths come from src/routes.ts; `pnpm check:content` fails if a link points at a path that is not there. */

export const nav = {
  header: [
    { label: "Solar systems", path: "/solar-systems/" },
    { label: "Services", path: "/services/" },
    { label: "Products", path: "/products/" },
    { label: "Tools", path: "/tools/" },
    { label: "Projects", path: "/projects/" },
    { label: "Outlets", path: "/outlets/" },
  ],
  footer: {
    Company: [
      { label: "About us", path: "/about-us/" },
      { label: "Projects", path: "/projects/" },
      { label: "Contact", path: "/contact-us/" },
      { label: "Get a quote", path: "/get-quote/" },
    ],
    Learn: [
      { label: "Net metering guide", path: "/net-metering-guide/" },
      { label: "How solar works", path: "/how-solar-works/" },
      { label: "Blog", path: "/blog/" },
      { label: "FAQs", path: "/faqs/" },
      { label: "Resources", path: "/resources/" },
    ],
    Tools: [
      { label: "Solar calculator", path: "/solar-calculator/" },
      { label: "All tools", path: "/tools/" },
    ],
    Legal: [
      { label: "Terms", path: "/terms/" },
      { label: "Privacy policy", path: "/privacy-policy/" },
      { label: "Sitemap", path: "/sitemap/" },
    ],
  },
} as const;
