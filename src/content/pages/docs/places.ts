import { outlets } from "@/content";
import { show } from "@/lib/facts";
import { faq, make } from "./shared";
import type { PageDoc } from "../types";

export const outletDocs: PageDoc[] = outlets.map((o) => {
  const phones = show(o.phones);
  const wa = show(o.whatsapp);
  const hours = show(o.hours);
  const address = show(o.addressLines);
  return make({
    path: o.path, kind: "outlet",
    title: `Solar Company in ${o.city} | SolarLink`,
    description: `SolarLink ${o.role === "head-office" ? "head office" : "shop"} in ${o.city}: solar systems, panels, inverters and batteries. Visit, call or message.`,
    h1: `SolarLink ${o.city}`,
    lead: `${o.role === "head-office" ? "Our head office" : "Our shop"} in ${o.city}. Walk in, call or message us about a system, a product or a net metering application.`,
    blocks: [
      { type: "facts", heading: "Visit us", items: [
        ...(address ? [{ label: "Address", value: address.join(", ") }] : []),
        ...(phones ? [{ label: "Phone", value: phones.join(", ") }] : []),
        ...(wa ? [{ label: "WhatsApp", value: wa }] : []),
        ...(hours ? [{ label: "Hours", value: hours }] : []),
      ] },
      { type: "feature", heading: `Solar in ${o.city}`, text: `Ask the ${o.city} shop about a system, a product or a net metering application.`, tone: "sunken" },
      { type: "prose", heading: `Solar in ${o.city}`, paragraphs: [`The ${o.city} shop supplies and installs home, business and farm systems, supplies panels, inverters and batteries, and files net metering applications. Ask here about what is in stock and book a site survey.`] },
      faq(`Questions about our ${o.city} shop`, [["Can I book a site survey here?", "Yes. Call or message the shop, or send a request through the quote form."]]),
    ],
    related: [{ label: "All outlets", href: "/outlets/" }, { label: "Get a quote", href: "/get-quote/" }],
  });
});

/** [slug, place, city, kw, kind, mode, picture]. The sizes and places come from the live project pages, which call parts of themselves placeholders. */
const rows: [string, string, string, string, string, string][] = [
  ["bahria-town-phase-2-lahore-10kw", "Bahria Town Phase 2", "Lahore", "10 kW", "Home", "On-grid", ],
  ["bahria-town-phase-6-islamabad-10kw", "Bahria Town Phase 6", "Islamabad", "10 kW", "Home", "On-grid", ],
  ["company-bagh-sargodha-10kw-farm", "Near Company Bagh", "Sargodha", "10 kW", "Farm", "On-grid", ],
  ["company-bagh-sargodha-4-5kw", "Near Company Bagh", "Sargodha", "4.5 kW", "Home", "On-grid", ],
  ["dha-phase-5-lahore-15kw", "DHA Phase 5", "Lahore", "15 kW", "Home", "On-grid", ],
  ["gulberg-iii-lahore-20kw-commercial", "Gulberg III", "Lahore", "20 kW", "Commercial", "On-grid", ],
  ["johar-town-lahore-4-5kw", "Johar Town", "Lahore", "4.5 kW", "Home", "On-grid", ],
  ["model-town-lahore-6kw", "Model Town", "Lahore", "6 kW", "Home", "On-grid", ],
  ["pwd-rawalpindi-12kw-hybrid", "PWD", "Islamabad", "12 kW", "Home", "Hybrid", ],
  ["sector-i14-islamabad-8kw-hybrid", "Sector I-14", "Islamabad", "8 kW", "Home", "Hybrid", ],
];

export const projectDocs: PageDoc[] = rows.map(([slug, place, city, kw, kind, mode]) =>
  make({
    path: `/projects/${slug}/`, kind: "project",
    title: `${kw} Solar Installation, ${place}, ${city} | SolarLink`,
    description: `A ${kw} ${mode.toLowerCase()} solar installation at ${place}, ${city}, by SolarLink.`,
    h1: `${kw} ${mode.toLowerCase()} system, ${place}`,
    lead: `A ${kind.toLowerCase()} installation in ${city}. Details and photos are being confirmed with the owner.`,
    blocks: [
      { type: "facts", heading: "Project details", items: [
        { label: "Location", value: `${place}, ${city}` },
        { label: "System size", value: kw },
        { label: "System type", value: mode },
        { label: "Property", value: kind },
      ] },
      { type: "prose", heading: "About this project", paragraphs: ["The system list, the date and the photos for this project are being confirmed with the owner and will appear here."] },
      { type: "projects", heading: "More projects" },
    ],
    related: [{ label: "All projects", href: "/projects/" }, { label: "Get a quote", href: "/get-quote/" }],
  }),
);
