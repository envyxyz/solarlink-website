import { waHref } from "../phone.ts";

export type HandoffOutlet = { slug: string; city: string; whatsapp: string | null };

/** WhatsApp link to the chosen outlet with the text, or the quote page when that outlet's number is not shown. */
export function handoff(outlets: HandoffOutlet[], slug: string, text: string, quoteHref: string): { href: string; whatsapp: boolean } {
  const number = (outlets.find((o) => o.slug === slug) ?? outlets[0])?.whatsapp ?? null;
  return number ? { href: waHref(number, text), whatsapp: true } : { href: quoteHref, whatsapp: false };
}
