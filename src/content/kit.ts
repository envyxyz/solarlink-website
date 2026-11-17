// Strings and sample values for the dev kitchen sink only. Not site content: nothing here is a business fact,
// and the route that reads this file is not in production builds. Class names are listed in full so Tailwind sees them.

const kit = {
  title: "Kit",
  note: "Dev only. Not in production builds, not in the sitemap, noindex. Hover, focus and press states need a pointer or keyboard: tab through each control.",
  grounds: { light: "On ground", night: "On night" },
  groups: {
    colour: "Colour",
    type: "Type",
    space: "Space",
    shape: "Shape and depth",
    motion: "Motion",
    components: "Components",
  },
  colours: [
    { name: "ground", cls: "bg-ground" },
    { name: "surface", cls: "bg-surface" },
    { name: "sunken", cls: "bg-sunken" },
    { name: "ink", cls: "bg-ink" },
    { name: "ink-2", cls: "bg-ink-2" },
    { name: "ink-3", cls: "bg-ink-3" },
    { name: "line", cls: "bg-line" },
    { name: "lime", cls: "bg-lime" },
    { name: "lime-press", cls: "bg-lime-press" },
    { name: "lime-wash", cls: "bg-lime-wash" },
    { name: "night", cls: "bg-night" },
    { name: "night-surface", cls: "bg-night-surface" },
    { name: "night-raised", cls: "bg-night-raised" },
    { name: "night-ink", cls: "bg-night-ink" },
    { name: "night-ink-2", cls: "bg-night-ink-2" },
    { name: "night-line", cls: "bg-night-line" },
    { name: "error", cls: "bg-error" },
  ],
  typeSample: "Panels, inverters and batteries",
  typeStyles: [
    { name: "display", cls: "text-display" },
    { name: "h2", cls: "text-h2" },
    { name: "h3", cls: "text-h3" },
    { name: "title", cls: "text-title" },
    { name: "lead", cls: "text-lead" },
    { name: "body", cls: "text-body" },
    { name: "small", cls: "text-small" },
    { name: "caption", cls: "text-caption" },
    { name: "figure", cls: "text-figure" },
    { name: "control", cls: "text-control" },
  ],
  figureSample: "10 kW",
  space: [
    { name: "4", cls: "w-1" },
    { name: "8", cls: "w-2" },
    { name: "12", cls: "w-3" },
    { name: "16", cls: "w-4" },
    { name: "20", cls: "w-5" },
    { name: "24", cls: "w-6" },
    { name: "32", cls: "w-8" },
    { name: "40", cls: "w-10" },
    { name: "48", cls: "w-12" },
    { name: "64", cls: "w-16" },
    { name: "80", cls: "w-20" },
    { name: "96", cls: "w-24" },
    { name: "128", cls: "w-32" },
    { name: "160", cls: "w-40" },
  ],
  radii: [
    { name: "stage", cls: "rounded-stage" },
    { name: "card", cls: "rounded-card" },
    { name: "tile", cls: "rounded-tile" },
    { name: "input", cls: "rounded-input" },
    { name: "pill", cls: "rounded-pill" },
  ],
  depth: { rest: "Resting: tone only", float: "Floating: shadow-float", glass: "Glass on imagery", glassNight: "Glass on night imagery" },
  motion: {
    springs: ["snappy", "bubbly", "soft"] as const,
    replay: "Replay",
    entry: "Entry: rises 24px and fades once",
    pop: "Pop: scale 0.8 to 1 with spring.bubbly",
    press: "Press: scales to 0.97",
    hover: "Hover card: rises 4px, image zooms to 1.04",
    magnet: "Magnetic primary button",
  },
  buttons: {
    variants: [
      { variant: "primary", label: "Get a free quote" },
      { variant: "dark", label: "Call the shop" },
      { variant: "quiet", label: "See the project" },
      { variant: "text", label: "Read the guide" },
    ] as const,
    states: { default: "Default", disabled: "Disabled", loading: "Loading", lg: "52px" },
    twin: "Send on WhatsApp",
    twinLabel: "Open WhatsApp",
    iconLabel: "Next",
    iconRow: "Icon buttons",
  },
  chips: { static: "Static", selectable: ["Panels", "Inverters", "Batteries", "UPS"], stat: [{ value: "10 kW", label: "system" }, { value: "18", label: "panels" }, { value: "1,200", label: "units a month" }] },
  stage: { image: "Image stage", night: "Night stage", sunken: "Sunken stage", imageAlt: "Sample render of a flat-roof house with solar panels" },
  card: { title: "Sample product card", spec: "One spec line goes here", imageAlt: "Sample render" },
  heading: { title: "One company from survey to net metering", lead: "A lead paragraph sits on the right, one to two lines long." },
  stats: { label: "A confirmed sample number", unconfirmedLabel: "An unconfirmed number (dash in production)" },
  slider: { label: "Monthly bill", states: { default: "Default", disabled: "Disabled" } },
  segmented: { label: "Unit", options: [{ value: "rs", label: "Rs" }, { value: "units", label: "Units" }], three: [{ value: "on", label: "On-grid" }, { value: "hybrid", label: "Hybrid" }, { value: "off", label: "Off-grid" }] },
  fields: {
    name: "Your name",
    namePlaceholder: "Full name",
    hint: "As it should appear on the quote",
    phone: "Phone number",
    error: "Enter a phone number we can call",
    city: "City",
    cityOptions: [{ value: "lahore", label: "Lahore" }, { value: "islamabad", label: "Islamabad" }, { value: "sargodha", label: "Sargodha" }],
    cityPlaceholder: "Choose a city",
    notes: "Anything we should know",
    disabled: "Disabled field",
    loading: "Loading field",
  },
  accordion: [
    { id: "a", question: "How big a system do I need?", answer: "It depends on your monthly bill and your roof. The sizing tool gives an estimate, and a free site survey confirms it." },
    { id: "b", question: "Can I see a sample answer?", answer: "This is sample text for the kit. Real answers are 40 to 60 words and come from the FAQ in content." },
  ],
  price: { show: "Mode: show", ask: "Mode: ask", hidden: "Mode: hidden (nothing between the brackets)", amount: 45000, bigAmount: 1250000 },
  marquee: { plain: "Plain belt", logo: "Logo belt (greyscale, hover for colour)", items: ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf"] },
  whatsapp: { pill: "Pill with message", icon: "Icon only", loading: "Loading" },
} as const;

/** Temporary sample reviews to prove the Reviews section. Dev kit only: never imported by the homepage. */
export const sampleReviews = [
  { text: "Sample review text one, long enough to wrap onto a few lines so the card shows its shape.", name: "Sample Name One", date: "January 2026", outlet: "Lahore", confirmed: false, source: "Kit sample" },
  { text: "Sample review text two, on the ink card in the middle, to check the light text on the dark ground.", name: "Sample Name Two", date: "February 2026", outlet: "Islamabad", confirmed: false, source: "Kit sample" },
  { text: "Sample review text three.", name: "Sample Name Three", date: "March 2026", outlet: "Sargodha", confirmed: false, source: "Kit sample" },
];
export const sampleGoogleUrl = "https://www.google.com/";

export default kit;

// One sample PageDoc per template kind, for /dev/pages/<kind>/. Placeholder wording only: it states no business fact.
import type { PageDoc, PageKind } from "@/content/pages";

const sampleBlocks: PageDoc["blocks"] = [
  { type: "prose", heading: "What this page covers", paragraphs: ["Sample paragraph one. It shows the measure and the rhythm of running text.", "Sample paragraph two. A real page has its own words here."] },
  { type: "facts", heading: "Key details", items: [{ label: "Sample label", value: "Sample value" }, { label: "Another label", value: "Another value" }] },
  { type: "steps", heading: "How it goes", items: [{ title: "Sample step one", text: "Sample text." }, { title: "Sample step two", text: "Sample text." }] },
  { type: "faq", heading: "Questions", items: [{ id: "q1", question: "A sample question?", answer: "A sample answer." }] },
];

const sample = (kind: PageKind, path: string): PageDoc => ({
  path,
  kind,
  title: `Sample ${kind} page | SolarLink`,
  description: "Template preview. Not a real page.",
  h1: `Sample ${kind} page`,
  lead: "One supporting sentence under the heading, the same measure on every page type.",
  lastmod: "2026-11-18",
  blocks: sampleBlocks,
  related: [{ label: "A related page", href: "/" }],
  confirmed: false,
  source: "Dev kit sample",
});

export const kitPages: Record<PageKind, PageDoc> = {
  hub: sample("hub", "/sample-hub/"),
  company: sample("company", "/sample-company/"),
  legal: sample("legal", "/sample-legal/"),
  service: sample("service", "/services/sample/"),
  system: sample("system", "/solar-systems/sample/"),
  product: sample("product", "/products/sample/"),
  outlet: sample("outlet", "/outlets/sample/"),
  project: sample("project", "/projects/sample/"),
  guide: sample("guide", "/sample-guide/"),
  article: sample("article", "/blog/sample/"),
};
