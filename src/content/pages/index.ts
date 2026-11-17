/*
  Every inner page that has written content. Empty on purpose: pages are added one per chat, each with its facts
  confirmed (docs/PHASES.md). `pageDocs` feeds the catch-all route, the sitemap and the breadcrumbs.
  One file per doc in src/content/pages/docs/ (the first file there switches the route on, see next.config.ts).
  The sample docs that show each template live in src/content/kit.ts and exist only outside production builds.
*/
import { routeByPath } from "@/routes";
import type { PageDoc } from "./types";

export const pageDocs: PageDoc[] = [];

/** A doc whose path is not a planned route is a mistake: fail the build rather than ship an unplanned URL. */
for (const d of pageDocs) if (!routeByPath.has(d.path)) throw new Error(`${d.path} is not in src/routes.ts`);
export type { PageDoc, PageBlock, PageKind, PageImage } from "./types";
