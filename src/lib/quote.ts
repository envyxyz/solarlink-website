/** Shared by the quote form and the Worker: limits, the phone rule and the WhatsApp text. Relative imports only (Node reads it). */
import { quote } from "../content/quote.ts";
import { fill, formatNumber } from "./sizing.ts";

export const LIMITS = { name: 80, phone: 30, message: 500, bill: 10_000_000 } as const;
/** The Worker rejects a form sent faster than this after it was shown (bots). */
export const MIN_ELAPSED_MS = 3000;
export const PROPERTIES = ["home", "business", "farm"] as const;
export const BILL_MODES = ["rs", "units"] as const;

/** Spaces, dashes and brackets are allowed in what people type; the check runs on the digits. */
export const cleanPhone = (s: string) => s.replace(/[\s\-()]/g, "");
/** +92 or 0 then 9 or 10 digits: mobiles and landlines. */
export const PHONE_RE = /^(?:\+92|0092|92|0)\d{9,10}$/;

export type QuoteFields = {
  name: string;
  property: string;
  city: string; // the outlet's city name
  bill?: number;
  billMode?: string;
  message?: string;
};

/** The text the visitor sends on WhatsApp. */
export function quoteMessage(q: QuoteFields): string {
  const w = quote.whatsapp;
  const parts = [fill(w.intro, { name: q.name, property: w.properties[q.property] ?? q.property, city: q.city })];
  if (q.bill) parts.push(fill(q.billMode === "units" ? w.bill.units : w.bill.rs, { n: formatNumber(q.bill) }));
  if (q.message) parts.push(q.message);
  return parts.join(" ");
}
