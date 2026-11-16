# SolarLink website

Marketing site and shop window for SolarLink, a solar company in Pakistan (Lahore head office, Islamabad, Sargodha). Replaces the live site at solarlink.com.pk on the same domain. Lives in `website/` inside the client folder `solarlink/`, which holds the brand, growth notes and the agency research.

Client contact: Abdul Gaffar (role to confirm). Brand is written **SolarLink**. English only.

## Read first

| File | What it owns |
|---|---|
| `PRODUCT.md` | Users, purpose, confirmed facts, what must never be invented |
| `DESIGN.md` | Tokens and visual rules. Final. Wins over habit and references |
| `docs/HOMEPAGE.md` | Homepage blueprint. Final |
| `docs/PRD.md` | Goals, sitemap, features, content model, budgets, open questions |
| `docs/SEO-MIGRATION.md` | Every live URL, redirects, must and avoid rules, launch checks. Wins over design and copy |
| `docs/KEYWORD-MAP.md` | Primary query and title phrase per URL |
| `docs/PHASES.md` | Dated log: what is done, what is next |
| `../growth/Notes/Business Profile.md` | The client's facts. "Website says" means unconfirmed |
| `docs/research/` | Other-model research. Ideas only; its numbers are unverified |

Brand assets: `../growth/Brand/`. Raw audit data: `../.agency/raw/`. Copy into `public/` only what ships.

## Stack

Next.js App Router, **static export** (`output: 'export'`, `trailingSlash: true`, `images.unoptimized`, pre-sized AVIF and WebP) · React · TypeScript strict · Tailwind CSS v4 · shadcn/ui restyled to our tokens · Motion · Lenis · lucide-react · Zod (Worker) · Playwright + axe · Lighthouse CI · **pnpm** · Cloudflare Workers (static assets plus one small Worker for `/api/*`).

Check current docs with context7 before using a library API. Add no dependency for what a few lines or the platform does.

## Hard rules

1. **Copy lives only in `src/content.ts`** (long lists in `src/content/*.ts`). Components hold no literal text, aria-label, phone, address, price or brand name. Each fact is `{ value, confirmed, source }`. The build check fails production when an unconfirmed fact shows as true or a `[confirm with client]` placeholder remains.
2. **Tokens only.** Colour, type, space, radius, shadow, duration and easing come from `DESIGN.md` tokens in `src/app/globals.css`. No raw hex, no arbitrary Tailwind values. Need a new value? Add the token to `DESIGN.md` first.
3. **Reuse first.** Check `src/components` and `src/components/ui` before writing a component. A new component needs a line in `DESIGN.md` first.
4. **One accent per view.** Lime is a fill with ink text on it. Lime text only on night. No kickers, no gradient text, no glass on glass, no cards inside cards, no decorative section numbers.
5. **Icons:** lucide-react, stroke 1.75, 20 or 24px, `currentColor`, never in tinted squares. WhatsApp uses its official glyph. No emoji as icons.
6. **Motion:** only `transform` and `opacity`. Springs and grammar as in `DESIGN.md`. The h1 and the hero image never animate in. Nothing is scroll-gated or pinned. Lenis only with a fine pointer and no reduced-motion. Honour `prefers-reduced-motion` and `prefers-reduced-transparency`.
7. **Phone formats.** Display as the content file holds it (for example `0321-8425777`, `042-37117713`). Dial with `tel:+92...` (drop the leading 0, no dashes). WhatsApp is `https://wa.me/92...` with `?text=` from the content template. Generate every link from the content number; never type one by hand.
8. **Numbers and units.** `Rs 45,000` with no decimals and a non-breaking space; `10 kW`; `580 W`. Tabular figures for any number that changes.
9. **No invented claims.** Banned unless the client confirmed it in writing and it is in content with a source:
   prices and rates; 4.8 stars or any rating; review counts (47, 71, 111); "350+ Islamabad installs"; "400+ Rawalpindi installs"; "#1 installer"; "top installer"; "51 to 200 professionals" or any team size; "bills drop 70% to 100%"; "payback 3 to 5 years"; "10 kW for PKR 12 to 16 lakh"; "certified installers"; "0% markup"; installment plans; "zero bill"; "lifetime support"; "same day"; "genuine"; any warranty length; any install time; years in business; "Tier-1" as a promise; "authorised dealer" or "authorised installer" for any brand.
   A script (`pnpm check:claims`) greps content and built HTML for these. Write `[confirm with client]` instead.
10. **Accessibility:** WCAG 2.2 AA, targets 44px or more, visible focus on every control, labelled inputs, keyboard-complete flows, reflow at 200% zoom, no information by colour alone. Every image has real alt text from content.
11. **Budgets:** LCP 2.0 s, CLS 0, INP 200 ms, homepage JS (every script the built `index.html` loads, gzipped, `noModule` excluded) at most the React and Next baseline plus 50 KB (baseline measured 16 Nov 2026 with an empty page: 170.6 KB, so the limit is 220.6 KB; `node scripts/js-size.mjs` checks it), Lighthouse mobile 95+ on every page type. No render-blocking third party. Analytics after first interaction. Images have width and height; the hero is preloaded AVIF.
12. **Security:** secrets only in the Worker and `.env.local` (never committed, never printed). Zod on every `/api` input. Honeypot, time trap and rate limit on `/api/quote`. Headers in `public/_headers`: CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors 'none'`. No personal data in URLs or analytics events. Leads are stored before WhatsApp opens.
13. **SEO ground rules:**
    - Canonical URL form is `https://solarlink.com.pk/path/` (apex, https, trailing slash). Internal links and the sitemap use it. Never link to a redirect or a `.html` URL.
    - Titles keep the ranking phrase from `docs/KEYWORD-MAP.md`. One h1, in the server HTML. Every route has title, description, canonical, Open Graph, `BreadcrumbList`.
    - Schema per `docs/HOMEPAGE.md`. No `AggregateRating` or `Review` on our own business. FAQ schema only for visible text.
    - A page never ships thinner than its live version (see `docs/SEO-MIGRATION.md`). No "coming soon" pages. No `noindex` on production. Dev and kitchen-sink routes are not in the production build.
    - Rawalpindi is closed: never list it. Multan and Gilgit do not exist yet.
    - `lastmod` is the date content changed, not the build date.

## Commands

```bash
pnpm dev            # local dev
pnpm build          # static export to out/ (must pass before any commit)
pnpm lint           # eslint (no raw hex, no literal copy, no arbitrary values)
pnpm typecheck      # tsc --noEmit
pnpm check:content  # unconfirmed facts and placeholders (fails production builds)
pnpm check:claims   # banned-claims grep
pnpm check:js       # homepage JS vs baseline + 50 KB (run after build)
pnpm test:e2e       # Playwright + axe
pnpm lhci           # Lighthouse CI against out/
pnpm preview        # wrangler dev: serve out/ with the Worker
pnpm deploy         # wrangler deploy (production; ask Ameer first)
```
Scripts are added in the foundation phase; keep this list in sync. SEO scripts are in `scripts/seo/` (`snapshot.mjs`, `diff.mjs`, `hops.mjs`).

## How phases run

- **One page per chat.** The homepage is first. Each page is designed, then built, in its own chat: read this file and "Read first", reuse components, add only what the page needs.
- Order: design language (done) → homepage blueprint (done) → hero mock → foundation (tokens, content, Worker, checks) → chrome (nav, footer) → homepage → service pages → outlets → products → projects → guides and FAQ → quote flow → SEO, tests, go-live.
- Each phase ends with: `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm check:content` passing; screenshots at 1440 and 390 of what changed shown to Ameer; a dated entry in `docs/PHASES.md`; one commit.
- Visual changes are confirmed by Ameer before the next phase builds on them.
- Skills: `ponytail` while building, `impeccable` before and after UI edits, `apple-design` and `anthropic-skills:motion-framer` for motion, `design-system-audit` for drift, `website-seo` for URLs and checks, `schema` for JSON-LD, `security-review` before launch.
- Delegate bulk or repetitive work (image batches, research, per-page boilerplate, second opinions) to Antigravity (`agy`) per the global rules, and check what comes back.
- Generated images keep a sidecar note (prompt, tool, date) in `design/img/`.

## Git

- GitHub account: `ameer-agilittize` (work default) unless Ameer says personal. Run `gh auth status` before any push. Set the commit name and email per repo, never globally.
- `main` is the only long-lived branch. One commit per phase with a clear message (`phase 4: nav and footer`).
- Never commit `.env*` (except `.env.example`), `node_modules`, `.next`, `out`, `.wrangler`, test reports, `design/img/*.log` or raw client photos.
