import { z } from "zod";
import { outlets } from "../src/content.ts";
import { BILL_MODES, cleanPhone, LIMITS, MIN_ELAPSED_MS, PHONE_RE, PROPERTIES } from "../src/lib/quote.ts";

const slugs = outlets.map((o) => o.slug) as [string, ...string[]];
const noControl = (s: string) => !/[\u0000-\u001f\u007f]/.test(s);

/** Every field the form sends. `.strict()`: an unknown key is a rejected request. */
export const quoteSchema = z
  .object({
    name: z.string().trim().min(2).max(LIMITS.name).refine(noControl),
    phone: z.string().max(LIMITS.phone).transform(cleanPhone).pipe(z.string().regex(PHONE_RE)),
    city: z.enum(slugs),
    property: z.enum(PROPERTIES),
    bill: z.number().int().min(1).max(LIMITS.bill).optional(),
    billMode: z.enum(BILL_MODES).optional(),
    // Line breaks become spaces: the text goes into one WhatsApp message.
    message: z.string().max(LIMITS.message).transform((s) => s.replace(/\s+/g, " ").trim()).refine(noControl).optional(),
    /** Honeypot: hidden from people, so any value means a bot. */
    website: z.string().max(200).optional(),
    /** Milliseconds the form was on screen before submit. The browser clock is not trusted, so no timestamp. */
    elapsed: z.number().int().min(0).max(2_000_000_000),
  })
  .strict();

export type Quote = z.infer<typeof quoteSchema>;

export type Verdict = { ok: true; data: Quote } | { ok: false; reason: "invalid"; fields: string[] } | { ok: false; reason: "spam" | "fast" };

export function validate(raw: unknown): Verdict {
  const r = quoteSchema.safeParse(raw);
  if (!r.success) {
    const fields = [...new Set(r.error.issues.map((i) => String(i.path[0] ?? "form")))];
    return { ok: false, reason: "invalid", fields };
  }
  if (r.data.website) return { ok: false, reason: "spam" };
  if (r.data.elapsed < MIN_ELAPSED_MS) return { ok: false, reason: "fast" };
  return { ok: true, data: r.data };
}
