# Cloudflare Worker Security Review

## Critical
- **worker/index.ts:30** - Body buffered into memory before size check allows OOM/DoS.
  Fix: Check `Content-Length` header upfront (`if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return json({ error: "size" }, 413);`).
- **worker/index.ts:24** - Origin validation allows missing `Origin` header (`if (origin && origin !== ...)`), enabling non-browser bot and script abuse.
  Fix: Require matching origin: `if (!origin || origin !== new URL(request.url).origin) return json({ error: "origin" }, 403);`.

## High
- **src/components/quote/QuoteForm.tsx:104** - Client fallback bypasses rate-limiting and anti-spam rejection by navigating to WhatsApp on 429/403/400.
  Fix: Do not redirect or set done on error; check `res.status === 429 || body?.error === "spam" || body?.error === "fast"` and show error alert.
- **worker/index.ts:27** - Rate-limit bypass via IPv6 subnet rotation on raw `cf-connecting-ip`.
  Fix: Truncate IPv6 addresses to `/64` prefix before calling `env.RATE.limit({ key: ipKey })`.
- **worker/schema.ts:22** - `elapsed` anti-bot check is client-supplied and trivially spoofed by automated bots.
  Fix: Replace client integer with a server-signed timestamp token or Cloudflare Turnstile verification.
- **worker/index.ts:32** - Missing `Content-Type: application/json` check permits cross-site form submissions without preflight.
  Fix: Add `if (!request.headers.get("content-type")?.startsWith("application/json")) return json({ error: "content-type" }, 415);`.

## Medium
- **worker/index.ts:18** - Worker API responses lack security headers (HSTS, nosniff, frame-ancestors) as `_headers` only applies to static assets.
  Fix: Add `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, and `Strict-Transport-Security` directly to `json()` helper.
- **worker/schema.ts:18** - `message` lacks control character strip and phishing URL filtering before inclusion in WhatsApp text and KV.
  Fix: Add `.refine(noControl)` and reject messages matching URL patterns (`https?://`).
- **src/components/quote/QuoteForm.tsx:110** - PII leakage into browser history via GET query string in `window.location.assign(url)`.
  Fix: Use `window.location.replace(url)` or keep navigation user-initiated via the button click.
- **worker/schema.ts:12** - `PHONE_RE` accepts invalid/dummy numbers like `00000000000`.
  Fix: Restrict regex to valid Pakistani mobile (`03\d{9}`) and landline area codes (`0[24-8]\d{8,9}`).
- **worker/index.ts:28** - Rate limiter fails open silently if `env.RATE` binding is unconfigured or throws.
  Fix: Fail closed or log alert in production when `env.RATE` is undefined or throws.

## Low
- **wrangler.jsonc:14** - Placeholder KV namespace ID `"REPLACE_WITH_KV_NAMESPACE_ID"` will fail lead storage in deployment.
  Fix: Create and bind the production KV namespace ID in `wrangler.jsonc`.
- **worker/index.ts:31** - `text.length` checks UTF-16 code units instead of UTF-8 byte size, allowing multi-byte payloads up to 16KB.
  Fix: Check `new TextEncoder().encode(text).length > MAX_BODY_BYTES`.
- **worker/index.ts:21** - 405 Method Not Allowed omits required `Allow: POST` header.
  Fix: Add `{ headers: { Allow: "POST", "cache-control": "no-store" } }` to 405 response.
- **worker/index.ts:15** - Long 180-day unencrypted KV retention period for customer PII leads.
  Fix: Reduce `LEAD_TTL_SECONDS` to business operational need (e.g. 30-60 days).
