import { business, outlets, outletsSection, ui, type OutletSlug } from "@/content";
import { show } from "./facts";
import { telHref, waHref } from "./phone";

export { telHref, waHref };

/** WhatsApp link for an outlet, or null when its number is not shown: a WhatsApp control then needs another label (the quote page) or goes away. */
export function outletWhatsApp(slug: OutletSlug, text: string = ui.whatsapp.message): string | null {
  const outlet = outlets.find((o) => o.slug === slug) ?? outlets[0];
  const number = show(outlet.whatsapp);
  return number ? waHref(number, text) : null;
}

/** Google Maps search for an address (the confirmed address lines, city included). */
export const mapsHref = (addressLines: string[]) => `${outletsSection.mapsSearch}${encodeURIComponent(addressLines.join(", "))}`;

export const absoluteUrl = (path: string) => `${show(business.siteUrl)}${path}`;
