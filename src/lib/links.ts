import { business, outlets, nav, ui, type OutletSlug } from "@/content";
import { show } from "./facts";
import { telHref, waHref } from "./phone";

export { telHref, waHref };

/** WhatsApp link for an outlet; falls back to the quote page when the number is not shown. */
export function outletWhatsApp(slug: OutletSlug, text: string = ui.whatsapp.message): string {
  const outlet = outlets.find((o) => o.slug === slug) ?? outlets[0];
  const number = show(outlet.whatsapp);
  return number ? waHref(number, text) : nav.quote.href;
}

export const absoluteUrl = (path: string) => `${show(business.siteUrl)}${path}`;
