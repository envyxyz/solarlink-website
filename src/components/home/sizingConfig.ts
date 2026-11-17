import { nav, outlets, sizing } from "@/content";
import { show } from "@/lib/facts";
import type { SizingConfig } from "./SizingProvider";

/** The sizing card's constants and contact, shared by the home hero and the sizing block on inner pages. */
export function sizingConfig(): SizingConfig {
  const lahore = outlets.find((o) => o.slug === "lahore") ?? outlets[0];
  return {
    constants: {
      ratePerUnit: show(sizing.ratePerUnit) as number,
      sunHours: show(sizing.sunHours) as number,
      performanceRatio: show(sizing.performanceRatio) as number,
      panelWatts: show(sizing.panelWatts) as number,
    },
    rs: sizing.rs,
    units: sizing.units,
    roof: sizing.roof,
    grid: sizing.grid,
    whatsapp: show(lahore.whatsapp),
    quoteHref: nav.quote.href,
  };
}
