import { outlets } from "../src/content.ts";
import { waHref } from "../src/lib/phone.ts";
import { quoteMessage } from "../src/lib/quote.ts";
import { validate } from "./schema.ts";

type Env = {
  ASSETS: Fetcher;
  LEADS: KVNamespace;
  /** Cloudflare rate-limit binding (wrangler.jsonc `ratelimits`). Missing in a bare `wrangler dev`: then no limit. */
  RATE?: RateLimit;
  /** "1" lets the Worker hand out outlet numbers that are not client-confirmed yet (review builds only). */
  SHOW_UNCONFIRMED?: string;
};

const LEAD_TTL_SECONDS = 180 * 24 * 60 * 60;
const MAX_BODY_BYTES = 4096;

const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "cache-control": "no-store" } });

async function quote(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") return json({ error: "method" }, 405);
  // A browser form on our own site always sends Origin; a cross-site page does not get to post here.
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return json({ error: "origin" }, 403);

  // Ceiling: 5 submissions a minute per IP (the binding's limit lives in wrangler.jsonc). Before parsing, so a flood stays cheap.
  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  if (env.RATE && !(await env.RATE.limit({ key: ip })).success) return json({ error: "rate" }, 429);

  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) return json({ error: "size" }, 413);
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return json({ error: "json" }, 400);
  }

  const v = validate(raw);
  if (!v.ok) return v.reason === "invalid" ? json({ error: "invalid", fields: v.fields }, 400) : json({ error: v.reason }, 400);
  const q = v.data;

  const outlet = outlets.find((o) => o.slug === q.city);
  if (!outlet) return json({ error: "invalid", fields: ["city"] }, 400);

  // Store first, WhatsApp second. A storage failure never blocks the visitor: log it (no personal data) and carry on.
  const id = `${new Date().toISOString()}_${crypto.randomUUID()}`;
  const { website: _honeypot, elapsed: _elapsed, ...lead } = q;
  let stored = true;
  try {
    await env.LEADS.put(`lead:${id}`, JSON.stringify({ ...lead, outlet: outlet.slug, receivedAt: new Date().toISOString() }), { expirationTtl: LEAD_TTL_SECONDS });
  } catch (e) {
    stored = false;
    console.error("quote: storing the lead failed", e instanceof Error ? e.message : "unknown");
  }

  // The visitor's own text goes in the wa.me link. An unconfirmed number is not handed out unless this is a review build.
  const number = outlet.whatsapp.confirmed || env.SHOW_UNCONFIRMED === "1" ? outlet.whatsapp.value : null;
  const whatsapp = number ? waHref(number, quoteMessage({ ...q, city: outlet.city })) : null;
  return json({ whatsapp, stored });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/quote" || pathname === "/api/quote/") return quote(request, env);
    if (pathname.startsWith("/api/")) return json({ error: "not found" }, 404);
    return env.ASSETS.fetch(request);
  },
};
