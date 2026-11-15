/*
  Every page the site will have, in one list. It is the plan now and becomes the source for
  sitemap.xml, breadcrumbs, internal-link checks and the redirect map as pages are built.
  docs/KEYWORD-MAP.md explains the choices; docs/SEO-MIGRATION.md explains the legacy rules.

  Rules: one primary query per path, never two. A path with `legacy` already exists on the
  live site: its slug never changes. `needs` is what must come from the client before the
  page can be written; a page with unmet needs is not built as a thin placeholder.
*/

export type RouteKind = "home" | "hub" | "service" | "system" | "product" | "outlet" | "project" | "guide" | "article" | "tool" | "company" | "legal";
export type RouteStage = "launch" | "next";

export interface Route {
  path: string;
  kind: RouteKind;
  /** The one query this page is built to answer. */
  primary: string;
  stage: RouteStage;
  /** Old URLs that must answer one 301 to this path. The ".html" twin of `path` is always redirected and is not listed. */
  legacy?: string[];
  /** Client input the page cannot be written without. */
  needs?: string;
  /** False keeps the page out of the index and the sitemap. */
  index?: boolean;
}

const project = (slug: string): Route => ({
  path: `/projects/${slug}/`,
  kind: "project",
  primary: `solar installation ${slug.replace(/-/g, " ")}`,
  stage: "launch",
  needs: "The live page is a placeholder (no photos, bills marked 'Placeholder'). Confirm it is a real job and send photos, system list and date; otherwise this URL 301s to /projects/.",
});

const article = (slug: string, primary: string): Route => ({
  path: `/blog/${slug}/`,
  kind: "article",
  primary,
  stage: "launch",
  needs: "The live post is a 'coming soon' stub of about 200 words. Write the full article before launch; facts and figures need a source.",
});

export const routes: Route[] = [
  /* Home and company */
  { path: "/", kind: "home", primary: "solar company in pakistan", stage: "launch", legacy: ["/index.html", "/home_facelift.html"] },
  { path: "/about-us/", kind: "company", primary: "solarlink pakistan", stage: "launch", needs: "Real team names and photos, registration details, founding story." },
  { path: "/contact-us/", kind: "company", primary: "solarlink contact number", stage: "launch", needs: "Approved address, phone and hours for every outlet." },
  { path: "/get-quote/", kind: "company", primary: "solar quotation", stage: "launch", legacy: ["/solar-quote-punjab.html"] },
  { path: "/faqs/", kind: "guide", primary: "solar system faqs pakistan", stage: "launch", legacy: ["/faqs.html"] },
  { path: "/solar-financing/", kind: "service", primary: "solar system on installments", stage: "launch", needs: "Whether installments are offered, in which cities, through which bank or in-house, and the terms." },
  { path: "/warranty-and-support/", kind: "company", primary: "solar system warranty pakistan", stage: "next", needs: "Written warranty terms (the old site says 1 year in some places and 2 in others) and the after-sales process." },

  /* Services */
  { path: "/services/", kind: "hub", primary: "solar services in pakistan", stage: "launch" },
  { path: "/services/residential-solar/", kind: "service", primary: "solar system for home", stage: "launch" },
  { path: "/services/commercial-solar/", kind: "service", primary: "commercial solar system", stage: "launch" },
  { path: "/services/industrial-solar/", kind: "service", primary: "industrial solar system", stage: "launch" },
  { path: "/services/agricultural-solar/", kind: "service", primary: "solar tube well", stage: "launch" },
  { path: "/services/net-metering-support/", kind: "service", primary: "net metering application", stage: "launch" },

  /* Solar systems: by type and by size. The size pages carry the price queries. */
  { path: "/solar-systems/", kind: "hub", primary: "solar system price in pakistan", stage: "launch", needs: "Current package prices, or a decision to show a price range with an as-of date, or no price at all." },
  { path: "/solar-systems/on-grid/", kind: "system", primary: "on grid solar system", stage: "launch" },
  { path: "/solar-systems/hybrid/", kind: "system", primary: "hybrid solar system", stage: "launch" },
  { path: "/solar-systems/off-grid/", kind: "system", primary: "off grid solar system", stage: "launch" },
  { path: "/solar-systems/3kw/", kind: "system", primary: "3kw solar system price in pakistan", stage: "launch", needs: "Component list and price policy for this size; one real job of this size." },
  { path: "/solar-systems/5kw/", kind: "system", primary: "5kw solar system price in pakistan", stage: "launch", needs: "Component list and price policy for this size; one real job of this size." },
  { path: "/solar-systems/10kw/", kind: "system", primary: "10kw solar system price in pakistan", stage: "launch", needs: "Component list and price policy for this size; one real job of this size." },
  { path: "/solar-systems/15kw/", kind: "system", primary: "15kw solar system price in pakistan", stage: "launch", needs: "Component list and price policy for this size; one real job of this size." },
  { path: "/solar-systems/20kw/", kind: "system", primary: "20kw solar system price in pakistan", stage: "launch", needs: "Component list and price policy for this size; one real job of this size." },

  /* Products */
  { path: "/products/", kind: "hub", primary: "solar products in pakistan", stage: "launch" },
  { path: "/products/solar-panels/", kind: "product", primary: "solar panel price in pakistan", stage: "launch", needs: "Brands and models actually stocked; price policy." },
  { path: "/products/inverters/", kind: "product", primary: "solar inverter price in pakistan", stage: "launch", needs: "Brands and models actually stocked; price policy." },
  { path: "/products/batteries/", kind: "product", primary: "solar battery price in pakistan", stage: "launch", needs: "Brands and models actually stocked; price policy." },
  { path: "/products/accessories/", kind: "product", primary: "solar mounting structure", stage: "launch", needs: "What is supplied: structures, cables, breakers, earthing." },
  { path: "/products/inverters/growatt/", kind: "product", primary: "growatt inverter price in pakistan", stage: "next", needs: "Dealer status and the models stocked." },
  { path: "/products/inverters/fronus/", kind: "product", primary: "fronus inverter price in pakistan", stage: "next", needs: "Dealer status and the models stocked." },
  { path: "/products/solar-panels/longi/", kind: "product", primary: "longi solar panel price in pakistan", stage: "next", needs: "Dealer status and the models stocked." },
  { path: "/products/solar-panels/canadian-solar/", kind: "product", primary: "canadian solar panel price in pakistan", stage: "next", needs: "Dealer status and the models stocked." },

  /* Outlets: each owns its city. /locations/* was merged into /outlets/* on the old site. */
  { path: "/outlets/", kind: "hub", primary: "solarlink outlets", stage: "launch" },
  { path: "/outlets/lahore/", kind: "outlet", primary: "solar company in lahore", stage: "launch", legacy: ["/locations/lahore.html", "/locations/lahore/"] },
  { path: "/outlets/islamabad/", kind: "outlet", primary: "solar company in islamabad", stage: "launch", legacy: ["/locations/islamabad.html", "/locations/islamabad/"] },
  { path: "/outlets/rawalpindi/", kind: "outlet", primary: "solar company in rawalpindi", stage: "launch", legacy: ["/locations/rawalpindi.html", "/locations/rawalpindi/"], needs: "The live page has 314 words. Local photos, staff, areas served and jobs done in Rawalpindi." },
  { path: "/outlets/sargodha/", kind: "outlet", primary: "solar company in sargodha", stage: "launch", legacy: ["/locations/sargodha.html", "/locations/sargodha/"] },
  { path: "/outlets/multan/", kind: "outlet", primary: "solar company in multan", stage: "launch", legacy: ["/locations/multan.html", "/locations/multan/"], needs: "Whether the Multan branch is open. Address, phone, photos. Until then the page says honestly how Multan customers are served." },
  { path: "/outlets/gilgit/", kind: "outlet", primary: "solar system in gilgit", stage: "launch", legacy: ["/locations/gilgit.html", "/locations/gilgit/"], needs: "Whether the Gilgit branch is open. Address, phone, photos. Gilgit-Baltistan is off the national grid, so the page is about off-grid and hybrid systems." },

  /* Projects */
  { path: "/projects/", kind: "hub", primary: "solar installation projects pakistan", stage: "launch", needs: "Real project photos. Every project on the live site uses a placeholder image." },
  project("bahria-town-phase-2-lahore-10kw"),
  project("bahria-town-phase-6-islamabad-10kw"),
  project("company-bagh-sargodha-10kw-farm"),
  project("company-bagh-sargodha-4-5kw"),
  project("dha-phase-5-lahore-15kw"),
  project("gulberg-iii-lahore-20kw-commercial"),
  project("johar-town-lahore-4-5kw"),
  project("model-town-lahore-6kw"),
  project("pwd-rawalpindi-12kw-hybrid"),
  project("sector-i14-islamabad-8kw-hybrid"),

  /* Guides */
  { path: "/resources/", kind: "hub", primary: "solar guides pakistan", stage: "launch" },
  { path: "/net-metering-guide/", kind: "guide", primary: "net metering in pakistan", stage: "launch", needs: "Rewrite against the current NEPRA regulation, with the regulation cited. The rules changed; the live guide states no buy-back rate." },
  { path: "/how-solar-works/", kind: "guide", primary: "how solar panels work", stage: "launch" },

  /* Blog: the ten live slugs, kept */
  { path: "/blog/", kind: "hub", primary: "solar energy blog pakistan", stage: "launch" },
  article("growatt-vs-fronus-inverter-comparison", "growatt vs fronus inverter"),
  article("how-to-size-solar-system-pakistan", "how to size a solar system"),
  article("net-metering-common-mistakes-pakistan", "net metering application mistakes"),
  article("net-metering-lesco-application-guide", "lesco net metering application"),
  article("net-metering-vs-battery-storage-pakistan", "net metering vs battery storage"),
  article("on-grid-vs-hybrid-vs-off-grid-pakistan", "on grid vs hybrid vs off grid solar"),
  article("solar-installation-red-flags-pakistan", "how to choose a solar company in pakistan"),
  article("solar-panel-brands-comparison-pakistan", "best solar panel brands in pakistan"),
  article("solar-panel-cleaning-maintenance-pakistan", "solar panel cleaning"),
  article("solar-roi-payback-period-pakistan", "solar payback period pakistan"),

  /* Tools: each is a page of its own that ranks for its question and ends in a WhatsApp handoff */
  { path: "/tools/", kind: "hub", primary: "solar tools pakistan", stage: "launch" },
  { path: "/solar-calculator/", kind: "tool", primary: "solar calculator pakistan", stage: "launch", needs: "A verified tariff table and SolarLink's own sizing rules. The live calculator hard-codes 8 package prices and ignores the city." },
  { path: "/tools/bill-breakdown/", kind: "tool", primary: "electricity bill calculator pakistan", stage: "launch", needs: "Verified NEPRA slab rates per distribution company, with the notification date." },
  { path: "/tools/load-calculator/", kind: "tool", primary: "solar load calculator", stage: "launch" },
  { path: "/tools/net-billing-calculator/", kind: "tool", primary: "net billing calculator", stage: "launch", needs: "The current export rate and rules, from the NEPRA regulation itself." },
  { path: "/tools/battery-backup-calculator/", kind: "tool", primary: "solar battery backup calculator", stage: "launch" },
  { path: "/tools/roof-planner/", kind: "tool", primary: "how many solar panels fit on my roof", stage: "next" },
  { path: "/tools/ac-on-solar/", kind: "tool", primary: "how many solar panels to run 1.5 ton ac", stage: "next" },
  { path: "/tools/tubewell-solar-calculator/", kind: "tool", primary: "solar tube well calculator", stage: "next", needs: "SolarLink's pump sizing rules from its agricultural team." },

  /* Legal and utility */
  { path: "/terms/", kind: "legal", primary: "solarlink terms", stage: "launch", needs: "Terms text. The live /terms.html only redirects." },
  { path: "/privacy-policy/", kind: "legal", primary: "solarlink privacy policy", stage: "launch", needs: "What data the forms and tools keep, and who receives it." },
  { path: "/sitemap/", kind: "legal", primary: "solarlink sitemap", stage: "launch" },
];

export const routeByPath = new Map(routes.map((route) => [route.path, route]));
