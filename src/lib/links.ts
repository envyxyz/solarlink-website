import { business, outlets, nav, ui, type OutletSlug } from "@/content";
import { show } from "./facts";

const digits = (display: string) => display.replace(/\D/g, "").replace(/^0/, "");

/** `0321-8425777` -> `tel:+92321...`. Generated from content, never typed by hand. */
export const telHref = (display: string) => `tel:+92${digits(display)}`;

/** `https://wa.me/92...?text=...`. */
export const waHref = (display: string, text: string) =>
  `https://wa.me/92${digits(display)}?text=${encodeURIComponent(text)}`;

/** WhatsApp link for an outlet; falls back to the quote page when the number is not shown. */
export function outletWhatsApp(slug: OutletSlug, text: string = ui.whatsapp.message): string {
  const outlet = outlets.find((o) => o.slug === slug) ?? outlets[0];
  const number = show(outlet.whatsapp);
  return number ? waHref(number, text) : nav.quote.href;
}

export const absoluteUrl = (path: string) => `${show(business.siteUrl)}${path}`;
