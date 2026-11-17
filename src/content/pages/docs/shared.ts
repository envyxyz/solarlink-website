/*
  Shared bits for the placeholder inner pages. Every doc here is confirmed:false, so it shows in dev and preview builds
  only. The wording states no business fact (no price, warranty, time or count); general solar explanations are plain
  technical background. Photos are stand-ins from the old site and the home page renders (see docs/PHASES.md).
*/
import type { PageDoc, PageImage } from "../types";

export const SRC = "Placeholder written 18 Nov 2026. Wording, photos and details await the client (see src/routes.ts, needs)";
export const LASTMOD = "2026-11-18";

const img = (src: string, alt: string, width = 800, height = 600): PageImage => ({ src, alt, width, height });

export const pics = {
  homes: img("/images/service-homes-800.webp", "Solar panels on the roof of a house"),
  business: img("/images/service-business-800.webp", "Solar installation at a commercial site"),
  farms: img("/images/service-farms-800.webp", "Solar panels at a farm"),
  netmetering: img("/images/service-netmetering-800.webp", "An electricity meter beside a solar inverter"),
  panel: img("/images/product-panel-640.webp", "A solar panel", 640, 640),
  inverter: img("/images/product-inverter-640.webp", "A solar inverter", 640, 640),
  battery: img("/images/product-battery-640.webp", "A solar battery", 640, 640),
  hero: img("/images/hero-1376.webp", "A solar home at the end of the day", 1376, 774),
};

/** Fills the fields every doc shares. */
export const make = (d: Omit<PageDoc, "lastmod" | "confirmed" | "source">): PageDoc => ({ ...d, lastmod: LASTMOD, confirmed: false, source: SRC });

export const faq = (heading: string, rows: [string, string][]) => ({
  type: "faq" as const,
  heading,
  items: rows.map(([question, answer], i) => ({ id: `q${i + 1}`, question, answer })),
});
