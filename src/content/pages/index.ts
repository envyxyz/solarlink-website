/*
  Every inner page that has written content. Each doc carries its own `confirmed` flag: while it is false a production
  build does not generate the page (docs/PHASES.md). `pageDocs` feeds the catch-all route, the sitemap and the breadcrumbs.
  One file per kind in src/content/pages/docs/ (the first file there switches the route on, see next.config.ts).
  Everything there is placeholder wording (18 Nov 2026) and unconfirmed. The sample docs that show each template live in
  src/content/kit.ts and exist only outside production builds.
*/
import { routeByPath } from "@/routes";
import { companyDocs } from "./docs/company";
import { brandDocs, legalDocs } from "./docs/extra";
import { articles, guides } from "./docs/reading";
import { hubs } from "./docs/hubs";
import { outletDocs, projectDocs } from "./docs/places";
import { products } from "./docs/products";
import { services } from "./docs/services";
import { systems } from "./docs/systems";
import { tools } from "./docs/tools";
import type { PageDoc } from "./types";

const lists = { services, systems, products, outlets: outletDocs, projects: projectDocs, guides, articles };

export const pageDocs: PageDoc[] = [...Object.values(lists).flat(), ...hubs(lists), ...companyDocs, ...legalDocs, ...brandDocs, ...tools];

/** A doc whose path is not a planned route is a mistake: fail the build rather than ship an unplanned URL. */
for (const d of pageDocs) if (!routeByPath.has(d.path)) throw new Error(`${d.path} is not in src/routes.ts`);
export type { PageDoc, PageBlock, PageKind, PageImage } from "./types";
