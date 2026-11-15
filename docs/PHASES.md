# Phases and log

One phase per chat. Each starts by reading `CLAUDE.md`, `PRODUCT.md`, `DESIGN.md`, `docs/PRD.md`, `docs/SEO-MIGRATION.md` and this file, and ends with `pnpm verify` passing, screenshots approved (1440 and 390 px, dark and light), a dated entry below, one commit, and a push.

## Order

| # | Phase | Blocked by | Done when |
|---|---|---|---|
| 0 | **Foundation** | | Done 2026-11-15 (see log) |
| 0.5 | **Design direction** | The owner's reference sites | Three homepage structures offered, one chosen; hero and navigation mocked as one HTML file and approved; `docs/DESIGN-DIRECTION.md` written |
| 1 | **Design system in code** | 0.5 | Buttons, fields, cards, chips, navigation, footer built from tokens; a component sheet that never reaches production |
| 2 | **Imagery and 3D assets** (parallel with 1) | Real photos and the vector logo from the client | Icon set and favicon from the vector logo; the energy-flow house drawn; photos cleaned and sized |
| 3 | **Chrome and hero** | 1 | Header, footer, hero and the Console ported from the approved mock |
| 4 | **Home page sections** | 3 | Home complete; holds or beats the old page's substance |
| 5 | **WhatsApp handoff and outlet routing** | Approved outlet details | Every action opens the right outlet's chat with a prefilled message |
| 6 | **Tools** (parallel with 7) | Verified data file; the client's sizing rules | Five launch tools, each with assumptions, data date and tests on the maths |
| 7 | **Inner pages** | Client answers in `docs/PRD.md` | Services, systems, products, outlets, projects, guides, blog. No stub pages |
| 8 | **SEO and analytics** | 7 | `website-seo` sections 3 to 5: titles from the keyword map, schema, sitemap with real dates, redirects tested, llms.txt generated, GA4 and PostHog |
| 9 | **Tests and audits** | 8 | Playwright and axe, Lighthouse CI at budget, `snapshot.mjs` and `hops.mjs` in CI, design-system audit, security review |
| 10 | **Go live** | Client approval; `check:content --strict` passing; Search Console verified | Launch-day steps in `docs/SEO-MIGRATION.md`; the owner's hand-over list |
| 11 | **After launch** | | The monthly ranking loop; next-stage pages and tools |

## Log

### 2026-11-15: Phase 0, foundation

- New repo, separate from `solarlink-2.0`. Astro 7, Tailwind 4, React islands, TypeScript, pnpm.
- Brand colour sampled from the logo: `#95FF15` on black. The old site's `#7ED321` and amber were not the brand's. Green and neutral ramps built in OKLCH; dark and light roles; 30 contrast pairs pass.
- Fonts chosen by rendering 16 display and 14 text candidates beside the logo: Unbounded (display), Outfit (body), Geist Mono (data). Self-hosted through Astro's Fonts API.
- `src/styles/tokens.css`, `src/styles/global.css` (Tailwind mapped to tokens, default palette off), `design/specimen.html`.
- `src/content.ts` with every client detail marked pending; `src/routes.ts` with 75 planned pages.
- Guards: `check:tokens`, `check:contrast`, `check:content` (proved to fire on a planted claim).
- Live-site baseline: `docs/qa/`. Old-site content inventory: `docs/research/content-inventory/`. Research: `docs/research/agy/`.
- Docs: PRODUCT, DESIGN, PRD, SEO, SEO-MIGRATION, KEYWORD-MAP, IDEAS, BANNED-CLAIMS, GBP, CITATIONS, LINKS.
- Draft `public/.htaccess` for one-hop redirects. Untested against the real host.
- Not done, on purpose: any page design, navigation, hero, or copy. Waiting for reference sites and client approval of business details.
