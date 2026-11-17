import { faq, make, pics } from "./shared";
import type { PageDoc } from "../types";

const rows: [string, string, string, string, keyof typeof pics, [string, string][], string, string][] = [
  ["solar-panels", "Solar panels", "Solar Panel Price in Pakistan", "Panels turn sunlight into direct current. Their rating in watts, and how many you fit on the roof, set the size of the system.", "panel",
    [["Power", "Rating in watts per panel"], ["Build", "Panel type and size"], ["Fit", "Roof space and direction"]], "Which panel should I choose?", "It depends on your roof space and budget. Tell us the roof and we will suggest panels that fit."],
  ["inverters", "Inverters", "Solar Inverter Price in Pakistan", "The inverter turns the panels' direct current into the alternating current your building uses, and manages the grid connection.", "inverter",
    [["Type", "On-grid, hybrid or off-grid"], ["Power", "Rating in kW"], ["Phase", "Single or three phase"]], "Which inverter type do I need?", "On-grid if you only want to cut the bill, hybrid if you want battery backup. The size follows your system."],
  ["batteries", "Batteries", "Solar Battery Price in Pakistan", "A battery stores solar power for the evening and for power cuts. Only hybrid and off-grid systems use one.", "battery",
    [["Capacity", "Stored energy in kWh"], ["Chemistry", "Battery type"], ["Voltage", "Matches the inverter"]], "How big a battery do I need?", "It depends on the loads you want covered and for how long. We size it with you."],
  ["accessories", "Mounting and accessories", "Solar Mounting Structure", "Structure, cables, breakers, earthing and protection hold the system together and keep it safe.", "panel",
    [["Structure", "Roof or ground mounting"], ["Cabling", "DC and AC cables and breakers"], ["Protection", "Earthing and lightning protection"]], "Do you supply the structure and cables?", "Yes, we supply and install the whole system. Ask us what your design needs."],
];

export const products: PageDoc[] = rows.map(([slug, name, title, lead, pic, facts, q, a]) =>
  make({
    path: `/products/${slug}/`, kind: "product",
    title: `${title} | SolarLink`,
    description: `${name} for solar systems in Pakistan, supplied and installed by SolarLink. Ask a shop for what is in stock.`,
    h1: name, lead,
    image: pics[pic],
    blocks: [
      { type: "facts", heading: "What to look at", items: facts.map(([label, value]) => ({ label, value })) },
      ...(slug === "accessories" ? [] : [{ type: "shop" as const, heading: `${name} in the shops`, category: slug === "solar-panels" ? "panels" : slug }]),
      { type: "brands", heading: "Brands" },
      { type: "prose", heading: "Brands, models and price", paragraphs: ["Stock and prices change, so they are not listed here. Ask your nearest shop or send us a message and we will tell you what is available."] },
      faq(`Questions about ${name.toLowerCase()}`, [[q, a]]),
    ],
    related: [{ label: "All products", href: "/products/" }, { label: "Solar systems", href: "/solar-systems/" }],
  }),
);
