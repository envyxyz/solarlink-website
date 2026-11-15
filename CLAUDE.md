# SolarLink website

The new solarlink.com.pk, built from scratch. It replaces the static site in the sibling folder `../solarlink-2.0` (read-only reference: never edit it from here).

## Read first

| File | For |
|---|---|
| `PRODUCT.md` | Who the site is for, what is known, what must never be invented |
| `DESIGN.md` | Colour, type, shape and motion tokens. Locked |
| `docs/DESIGN-DIRECTION.md` | Layout, hero, navigation, motion. **Does not exist yet: waits for the owner's reference sites.** No page design before it does |
| `docs/PRD.md` | Scope, features, open questions for the client |
| `docs/SEO-MIGRATION.md` | URL, redirect, title and depth rules. Wins over design and copy |
| `docs/SEO.md`, `docs/KEYWORD-MAP.md` | Strategy and the target query per page |
| `docs/BANNED-CLAIMS.md` | Claims that cannot be used without written confirmation |
| `docs/IDEAS.md` | Tools and 3D concepts |
| `docs/PHASES.md` | Build order and the dated log |

## Stack

Astro 7 (static output, trailing slashes) · TypeScript strict · Tailwind 4 through the Vite plugin · React 19 islands for tools only · fonts through Astro's Fonts API · pnpm. No backend. Motion and 3D libraries are added in the phase that first needs them, not before.

Astro was chosen over Next.js because this is a content site that must score well on cheap phones: Astro ships HTML with no JavaScript unless a component asks for it.

## Hard rules

1. **Repeated information lives in `src/content.ts`.** No phone number, address, hours, brand list, nav label, call to action or WhatsApp message is typed in a component or page.
2. **Client details are pending.** Values wrapped in `pending()` are what the old site shows, not approved facts. Do not present them as final, and do not launch while `pnpm check:content --strict` fails.
3. **Never invent a fact.** Prices, warranty, counts, ratings, reviews, staff, certifications, dealer status, time promises, savings and payback figures come only from the client in writing. If it is missing, the page says to ask the outlet. `pnpm check:content` blocks the patterns.
4. **Tokens only.** Colours, type, radii and durations come from `src/styles/tokens.css` through the Tailwind aliases in `global.css`. No raw hex, `rgb()` or `hsl()` anywhere else (`pnpm check:tokens`). No default Tailwind palette classes: they are switched off.
5. **Routes come from `src/routes.ts`.** A page that is not in it is not built. One primary query per path. Slugs of legacy pages never change.
6. **Canonical URL form is fixed:** `https://solarlink.com.pk/path/`. Internal links use the final URL with its trailing slash.
7. **Only production is indexable.** Never remove the `PUBLIC_SITE_ENV` guard in `BaseHead.astro`. No dev or test page reaches the production build. Never pair a robots.txt block with `noindex`.
8. **No thin pages.** A page whose `needs` in `routes.ts` are unmet is not shipped as a stub.
9. **The h1 paints at once.** Never animated in. Nothing 3D or heavy loads before the main content.
10. **One accent per view.** Green marks the single most important thing. Green is never text on a light surface.
11. **Public data carries its source.** Tariffs, net-metering rules and sun figures live in one data file with the source document and its date; every tool shows that date. AI-compiled research in `docs/research/` is a list of leads, not a source.
12. **No self-declared ratings in schema.** JSON-LD states only what the page shows.
13. **Accessibility:** WCAG 2.2 AA, keyboard reachable, visible focus, reduced motion honoured, text never under 16 px.
14. **Reuse before adding.** Check for an existing component or token first. Reach for a dependency last.
15. **Secrets stay out.** Keys go in `.env.local`; `.env.example` lists the names.

## Commands

```
pnpm dev               start the dev server
pnpm build             static build into dist/
pnpm check             type-check
pnpm check:tokens      no raw colours outside tokens.css
pnpm check:contrast    WCAG contrast for every allowed colour pair
pnpm check:content     routes, nav links, banned claims; lists values pending approval
pnpm verify            all of the above, then build
```

SEO scripts (`snapshot.mjs`, `diff.mjs`, `hops.mjs`) live in the `website-seo` skill; `docs/SEO-MIGRATION.md` says when to run them.

## How work is done

- One phase per chat, in the order in `docs/PHASES.md`. Start by reading the files in the table above.
- Ask before changing anything in `DESIGN.md`, `docs/DESIGN-DIRECTION.md` or `docs/SEO-MIGRATION.md`.
- A phase is done when `pnpm verify` passes, screenshots at 1440 and 390 px in dark and light have been looked at and approved, and `docs/PHASES.md` has a dated entry.
- Git: work on a branch, one commit per phase, push. `main` is not deployed anywhere yet; when it is, nothing reaches it without the client's approval.
