import { routes } from "@/routes";
import type { PageBlock, PageDoc } from "../types";
import { faq, make, pics } from "./shared";

const PENDING = "The full text is being finalised and will be published here.";

/* Sitemap: built from src/routes.ts so it never lists a path that does not exist. */
const label = (primary: string) => {
  const s = primary.replace(/\bpakistan\b/g, "Pakistan").replace(/\bkw\b/g, "kW").replace(/\bnepra\b/gi, "NEPRA");
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const sections: [string, (p: string) => boolean][] = [
  ["Company", (p) => p === "/" || ["/about-us/", "/contact-us/", "/get-quote/", "/faqs/", "/solar-financing/", "/terms/", "/privacy-policy/", "/sitemap/"].includes(p)],
  ["Services", (p) => p.startsWith("/services/")],
  ["Solar systems", (p) => p.startsWith("/solar-systems/")],
  ["Products", (p) => p.startsWith("/products/")],
  ["Outlets", (p) => p.startsWith("/outlets/")],
  ["Projects and blog", (p) => p === "/projects/" || p === "/blog/"],
  ["Guides", (p) => p === "/resources/" || p === "/net-metering-guide/" || p === "/how-solar-works/"],
  ["Tools", (p) => p.startsWith("/tools/") || p === "/solar-calculator/"],
];

const launch = routes.filter((r) => r.stage === "launch");

const sitemapBlocks: PageBlock[] = sections.map(([heading, match]) => ({
  type: "links" as const,
  heading,
  items: launch.filter((r) => match(r.path)).map((r) => ({
    label: r.path === "/" ? "Home" : label(r.primary),
    text: r.path === "/" ? "The SolarLink home page" : `Page about ${r.primary}`,
    href: r.path,
  })),
})).filter((b) => b.items.length > 0);

const legalFacts = (heading: string, items: [string, string][]): PageBlock => ({
  type: "facts",
  heading,
  items: items.map(([label, value]) => ({ label, value })),
});

export const legalDocs: PageDoc[] = [
  make({
    path: "/terms/", kind: "legal",
    title: "SolarLink Terms | SolarLink",
    description: "The terms for using the SolarLink website. The full text is being finalised; this page lists what it will cover.",
    h1: "Terms",
    lead: "These are the terms for using the SolarLink website. The full text is being finalised and is not yet final.",
    blocks: [
      legalFacts("What the terms will cover", [
        ["Using this website", `What you may and may not do on the site. ${PENDING}`],
        ["Information on the site", `How to read the guides, tools and product pages. ${PENDING}`],
        ["Quotes and orders", `How a quote or order is agreed with the shop. ${PENDING}`],
        ["Warranty and support", `Where warranty terms are written down. ${PENDING}`],
        ["Contact", "Questions about these terms can go to your nearest outlet."],
      ]),
      { type: "prose", heading: "Until the text is final", paragraphs: ["Nothing on the website is a binding offer. Ask the shop for any price, availability or warranty term in writing before you decide."] },
    ],
    related: [{ label: "Privacy policy", href: "/privacy-policy/" }, { label: "Contact us", href: "/contact-us/" }],
  }),
  make({
    path: "/privacy-policy/", kind: "legal",
    title: "SolarLink Privacy Policy | SolarLink",
    description: "What the SolarLink website forms collect, and where the full privacy policy stands. The complete text is being finalised.",
    h1: "Privacy policy",
    lead: "This page says what the website forms ask for. The full policy text is being finalised and is not yet final.",
    blocks: [
      legalFacts("What the forms ask for", [
        ["Name", "So the shop knows who to reply to."],
        ["Phone number", "So the shop can call or message you back."],
        ["City", "So your message reaches the right outlet."],
        ["Message", "Whatever you choose to write about your project."],
        ["Bill details", "Only if you type them into a form or calculator yourself."],
      ]),
      { type: "prose", heading: "The full policy", paragraphs: [`How this information is kept, who receives it and for how long is not set out here yet. ${PENDING}`, "If you have a question about your details, ask your nearest outlet."] },
    ],
    related: [{ label: "Terms", href: "/terms/" }, { label: "Contact us", href: "/contact-us/" }],
  }),
  make({
    path: "/sitemap/", kind: "legal",
    title: "SolarLink Sitemap | SolarLink",
    description: "Every page on the SolarLink website in one list, grouped by section.",
    h1: "Sitemap",
    lead: "Every page on the website, grouped by section.",
    blocks: sitemapBlocks,
    related: [{ label: "Home", href: "/" }, { label: "Contact us", href: "/contact-us/" }],
  }),
];

const brands: [string, string, string, string, keyof typeof pics, string, string, string[], [string, string][]][] = [
  ["/products/inverters/growatt/", "Growatt", "Growatt Inverter Price in Pakistan", "inverter", "inverter",
    "Growatt is an inverter brand. This page explains how to compare its inverters with others.",
    "Compare any inverter on the same few points before you ask for a price.",
    ["Type: on-grid, hybrid or off-grid", "Power rating in kW, and single or three phase", "Warranty terms, in writing", "Whether the inverter can connect to a monitoring app"],
    [["Is a Growatt inverter in stock?", "Availability changes, so the shop confirms it. Ask your nearest outlet."]]],
  ["/products/inverters/fronus/", "Fronus", "Fronus Inverter Price in Pakistan", "inverter", "inverter",
    "Fronus is an inverter brand. This page explains how to compare its inverters with others.",
    "Compare any inverter on the same few points before you ask for a price.",
    ["Type: on-grid, hybrid or off-grid", "Power rating in kW, and single or three phase", "Warranty terms, in writing", "Whether the inverter can connect to a monitoring app"],
    [["Is a Fronus inverter in stock?", "Availability changes, so the shop confirms it. Ask your nearest outlet."]]],
  ["/products/solar-panels/longi/", "Longi", "Longi Solar Panel Price in Pakistan", "panel", "panel",
    "Longi is a solar panel brand. This page explains how to compare its panels with others.",
    "Compare any panel on the same few points before you ask for a price.",
    ["Rating in watts per panel", "Panel type and physical size", "Warranty terms for the panel and its output, in writing", "How many fit on your roof"],
    [["Are Longi panels in stock?", "Availability changes, so the shop confirms it. Ask your nearest outlet."]]],
  ["/products/solar-panels/canadian-solar/", "Canadian Solar", "Canadian Solar Panel Price in Pakistan", "panel", "panel",
    "Canadian Solar is a solar panel brand. This page explains how to compare its panels with others.",
    "Compare any panel on the same few points before you ask for a price.",
    ["Rating in watts per panel", "Panel type and physical size", "Warranty terms for the panel and its output, in writing", "How many fit on your roof"],
    [["Are Canadian Solar panels in stock?", "Availability changes, so the shop confirms it. Ask your nearest outlet."]]],
];

export const brandDocs: PageDoc[] = brands.map(([path, name, title, , pic, lead, intro, facts, q]) => {
  const isInverter = path.includes("/inverters/");
  return make({
    path, kind: "product",
    title: `${title} | SolarLink`,
    description: `How to compare ${name} ${isInverter ? "inverters" : "solar panels"} with other brands, and what to ask the shop. Availability is confirmed by the shop.`,
    h1: `${name} ${isInverter ? "inverters" : "solar panels"}`,
    lead,
    image: pics[pic],
    blocks: [
      { type: "prose", heading: `Comparing ${name}`, paragraphs: [intro, "Ask for every term in writing, and compare brands on the same points rather than on the name alone."] },
      { type: "facts", heading: "What to look at", items: facts.map((v, i) => ({ label: `Point ${i + 1}`, value: v })) },
      { type: "prose", heading: "Models, availability and price", paragraphs: ["Models, availability and prices are not listed here. Ask your nearest outlet, or send us a message, and the shop will confirm what is available."] },
      { type: "brands", heading: "Brands" },
      faq(`Questions about ${name}`, q),
    ],
    related: [
      { label: isInverter ? "All inverters" : "All solar panels", href: isInverter ? "/products/inverters/" : "/products/solar-panels/" },
      { label: "All products", href: "/products/" },
      { label: "Contact us", href: "/contact-us/" },
    ],
  });
});
