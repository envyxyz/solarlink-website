import { make, pics } from "./shared";
import type { PageBlock, PageDoc } from "../types";

/** An index page: a short introduction and a card for each child page. `from` is the list of docs it lists. */
const hub = (path: string, title: string, h1: string, lead: string, from: PageDoc[], heading: string, image?: PageDoc["image"], extra: PageBlock[] = [], before: PageBlock[] = []): PageDoc =>
  make({
    path, kind: "hub", title: `${title} | SolarLink`, description: lead, h1, lead, image,
    blocks: [...before, { type: "links", heading, items: from.map((d) => ({ label: d.h1, text: d.lead, href: d.path, image: d.image })) }, ...extra],
    related: [{ label: "Get a quote", href: "/get-quote/" }],
  });

export const hubs = (all: { services: PageDoc[]; systems: PageDoc[]; products: PageDoc[]; outlets: PageDoc[]; projects: PageDoc[]; guides: PageDoc[]; articles: PageDoc[] }) => [
  hub("/services/", "Solar Services in Pakistan", "Services", "Solar for homes, businesses, industry and farms, and the net metering paperwork that goes with it.", all.services, "What we do", pics.homes, [], [{ type: "feature", heading: "Solar for every building", text: "Every system starts from your bill and your roof: we survey the site, size the system, supply and install it, and file the net metering application.", tone: "night" }]),
  hub("/solar-systems/", "Solar System Price in Pakistan", "Solar systems", "By type and by size. Prices are quoted after a survey, so none are listed here.", all.systems, "Types and sizes", pics.homes, [{ type: "diagram", heading: "How the power flows", mode: "hybrid" }, { type: "sizing", heading: "Size it from your bill", lead: "Move the slider to see a rough system size for your bill. It is an estimate: the site survey confirms it." }]),
  hub("/products/", "Solar Products in Pakistan", "Products", "Panels, inverters, batteries and the parts that hold a system together.", all.products, "What we supply", pics.panel, [{ type: "shop", heading: "Panels in the shops", category: "panels" }, { type: "brands", heading: "Brands" }]),
  hub("/outlets/", "SolarLink Outlets", "Outlets", "Our head office in Lahore and shops in Islamabad and Sargodha.", all.outlets, "Find a shop", pics.hero),
  hub("/projects/", "Solar Installation Projects in Pakistan", "Projects", "Systems we have installed. Details and photos are being confirmed with each owner.", all.projects, "Recent work", undefined, [], [{ type: "projects", heading: "Recent work" }]),
  hub("/resources/", "Solar Guides for Pakistan", "Guides", "Plain explanations of how solar works and how net metering runs.", all.guides, "Read the guides"),
  hub("/blog/", "Solar Energy Blog Pakistan", "Blog", "Short reads on choosing, sizing and looking after a solar system.", all.articles, "Latest posts"),
];
