# SolarLink website: product requirements

Status: foundation set 2026-11-15. Page design has not started and does not start until the owner sends reference sites.

## Goal

Replace solarlink.com.pk with a fast, minimal, futuristic site that ranks in its cities, explains solar with tools people return to, and turns visits into WhatsApp conversations with the right outlet.

### How success is measured

| Measure | Source | Baseline |
|---|---|---|
| WhatsApp chats and calls started from the site, per outlet | Click events (GA4, PostHog) | Not measured today |
| Tool completions and the share that end in WhatsApp | PostHog | None |
| Indexed pages; clicks and impressions per page | Search Console | Needs access. Today 36 of 48 sitemap URLs are 404 |
| Map-pack position for "solar company in <city>", per outlet | Searched from each outlet monthly | Needs recording |
| Returning visitors to tool pages | GA4 | None |
| Lighthouse mobile | CI | Targets in `docs/SEO.md` |

## Users

See `PRODUCT.md`: homeowner, business owner, factory manager, farmer, existing-system owner, SolarLink staff.

## Research summary

Files in `docs/research/`. Everything compiled by the AI research assistant is unverified and marked so.

- **The old site** (`content-inventory/`, `docs/qa/`): 60 HTML files; real content on services, guides, FAQs and three outlet pages; placeholders for all projects and blog posts; 950-odd claims needing confirmation; contradictions in addresses, phone numbers, warranty and office count. Technically broken for search (`docs/SEO-MIGRATION.md`).
- **Competitors** (`agy/1a-competitors.md`, `1b-competitors.md`; eight installers): English only; long forms (5 to 11 fields); three have WhatsApp buttons; two have calculators, neither shows savings under current rules; none has 3D, city pages, or Urdu; none shows end-to-end prices. They lead with scale claims and brand logos.
- **Search results** (`agy/4a-serp.md`, `4b-serp.md`): price-table pages win price queries, listicles and city pages win city queries, guides win net-metering queries, working tools win calculator queries.
- **Keywords** (`agy/2-keywords-en.json`, 2,901 real autocomplete queries; `agy/3-keywords-ur.json`): the big families are system size plus price (3, 5, 10, 15, 20 kW), panel, inverter and battery prices, brand names, net metering and net billing, financing and installments, and city names. Roman Urdu price and "kitne ka" questions are common.
- **Tools worldwide** (`agy/6-tool-ideas.md`): the memorable ones ask for very little (an address or a bill) and show one clear result.

## Sitemap

75 pages planned: 67 at launch, 8 next. The list, with each page's target query and what it needs from the client, is `src/routes.ts`; `docs/KEYWORD-MAP.md` explains it.

| Section | Pages | Notes |
|---|---|---|
| Home and company | `/`, about, contact, get-quote, FAQs, solar-financing, (next) warranty-and-support | |
| Services | hub + residential, commercial, industrial, agricultural, net-metering support | All legacy URLs |
| Solar systems | hub + on-grid, hybrid, off-grid + 3, 5, 10, 15, 20 kW | New. Carries the price searches |
| Products | hub + panels, inverters, batteries, accessories; (next) four brand pages | Brand pages only for brands the client truly stocks |
| Outlets | hub + Lahore, Islamabad, Rawalpindi, Sargodha, Multan, Gilgit | Multan and Gilgit depend on the client's answer |
| Projects | hub + 10 case studies | Each needs real photos and confirmation |
| Guides | resources hub, net-metering guide, how solar works | |
| Blog | hub + 10 posts | Slugs exist; articles to be written |
| Tools | hub, solar calculator + 4 tools at launch, 3 next | `docs/IDEAS.md` |
| Legal | terms, privacy policy, HTML sitemap | |

Navigation (header): Solar systems · Services · Products · Tools · Projects · Outlets, plus one WhatsApp action. Footer lists every hub and outlet. Defined in `src/content.ts`.

## Homepage order

Not decided. It is set with the design direction after the reference sites arrive. Constraints already fixed: the h1 and the WhatsApp and call actions are in the first view; the Console (below) appears early; the six outlets are reachable from the home page; all 1,000-odd words of substance the current home page has are kept or bettered.

## Features

1. **WhatsApp handoff.** Every action opens `wa.me` for the visitor's outlet with a prefilled message. The outlet is chosen from the city the visitor picked, else Lahore. No long forms: at most three taps.
2. **The Console.** One instrument-style panel (city, monthly units or bill, what must stay on) whose values persist in the browser and feed every tool and the WhatsApp message. `docs/IDEAS.md`.
3. **Tools.** Five at launch: solar calculator, bill breakdown, net billing calculator, load calculator, battery backup calculator. Each a React island on a page that already reads well without it; each states assumptions and data date.
4. **Energy-flow house.** The SVG and CSS isometric explainer with a day-to-night slider. The site's signature image.
5. **Price display switch.** `priceMode` in `src/content.ts`: `hidden` (ask on WhatsApp), `range` (from and to, with an as-of date) or `exact`. Default `hidden` until the client supplies prices and a routine for keeping them current.
6. **Outlet pages** with a tap-to-load map, the outlet's own numbers, and local content.
7. **Counter mode** for staff: any tool full-screen with large type.
8. **Device theme.** Dark by default, light when the device asks; tokens cover both.
9. **Analytics.** GA4 on the existing property and PostHog, loaded after first interaction.

## Content model

- `src/content.ts`: everything repeated (business, outlets, lists, navigation, actions, messages). Client facts are wrapped in `pending()` until approved.
- `src/routes.ts`: the page list, target queries, legacy redirects, client needs.
- `src/data/` (Phase 6): tariffs, net-metering rules, sun figures, appliance loads, each with source and date.
- Content collections (Phase 7): blog posts, guides, projects as Markdown with typed front matter.

## Budgets and non-functional requirements

Performance, accessibility and SEO budgets are in `docs/SEO.md` and `PRODUCT.md`. Also: works with JavaScript off (tools excepted); no layout shift from fonts or images; no third-party script before first interaction; security headers set at the host; no personal data stored (tool inputs stay in the visitor's browser).

## Stack and hosting

Astro 7 static build, React islands, Tailwind 4, TypeScript, pnpm. The output is plain files, so it runs on the current cPanel host unchanged or on Cloudflare (free plan allows commercial use). `public/.htaccess` carries the redirect rules for cPanel; a move to Cloudflare would need the same rules as a `_redirects` file. **Open decision.**

## Out of scope for now

Online payments, customer accounts, a CMS, a chatbot, Urdu-script pages, a bill photo reader. All listed as later ideas.

## Open questions for the client

Nothing below can be assumed. Each blocks the pages named.

1. **Business details, per outlet:** exact name, address, landline, mobile, WhatsApp, hours (Friday break?), map pin. Blocks everything public.
2. **Multan and Gilgit:** are there staffed offices? If not, how are those customers served?
3. **Legal name and registrations** (SECP, NTN, AEDB or PPIB category, PEC) that may be shown.
4. **Brands and dealer status:** which panels, inverters and batteries are actually stocked; any dealership that can be proven.
5. **Prices:** show them or not; if yes, the packages per size and who updates them and how often.
6. **Warranty and after-sales terms** in writing.
7. **Installments:** offered or not, where, through whom, on what terms.
8. **Real projects:** photos, location, size, parts, date, and permission to show each. Which of the ten listed ones are real.
9. **People:** real names, roles and photos for the about and outlet pages.
10. **Reviews:** permission to quote real Google reviews with dates.
11. **Access:** Search Console, GA4, Google Business Profiles, hosting panel.
12. **The logo as a vector file.**
13. **Sizing rules:** how SolarLink sizes a system from a bill, and pump sizing for tube wells, so the tools match what the sales team quotes.
