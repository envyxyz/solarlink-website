# SEO strategy

How this site is built to rank and to be the source AI answers cite. `docs/SEO-MIGRATION.md` wins where the two overlap (URLs, redirects, titles of existing pages). Page-by-page targets are in `docs/KEYWORD-MAP.md`; off-site steps are in `docs/GBP.md`, `docs/CITATIONS.md` and `docs/LINKS.md`.

## Where things stand

- The live site is mostly invisible to Google by accident: 36 of its 48 sitemap URLs answer 404 and the working pages name canonicals that do not exist. Fixing that alone should lift it.
- The search results reviewed for this plan (unverified, AI-compiled: `docs/research/agy/4a-serp.md`, `4b-serp.md`) show a consistent pattern: **price queries are won by price-table pages, "solar company in <city>" by listicle blogs and city pages, net-metering queries by guides, and calculator queries by working tools.** One content site appears across most of them by publishing all four kinds.
- The eight competitor installers reviewed have no city pages, no Urdu, no savings calculator under the current rules, and no 3D. Their strength is scale claims and brand lists that SolarLink cannot and should not copy.

## The plan in five moves

1. **Repair.** One canonical URL per page, every other form a single 301, a sitemap of only live pages, no self-declared ratings, no stubs. (Phases 1, 8, 10.)
2. **Own the cities.** Six outlet pages with real local substance: the address and how to find it, the distribution company and its net-metering process there, jobs done in named areas with real photos, local conditions, the people at that outlet. Matched by a Google Business Profile per staffed outlet. The map pack is won mostly off the site: `docs/GBP.md`.
3. **Answer the price question honestly.** Size pages (3, 5, 10, 15, 20 kW) and product pages are what people search for. Each explains what the size runs, what it produces per city, the roof it needs, the parts in it, and what moves the price. Whether a figure is shown is the client's call (`priceMode`); a page with real, dated prices will outrank one without, and a page with stale or invented prices is worse than none.
4. **Be the current source on net metering.** The rules changed and searchers are confused. One guide rewritten against the regulation itself, dated, updated the week anything changes, with the net-billing calculator beside it.
5. **Tools as link and return magnets.** Each tool is a page that ranks for its own question, gives people a reason to come back, and is the kind of page forums and news sites link to. `docs/IDEAS.md`.

## Rules for every page

- One primary query per URL (`src/routes.ts`; `pnpm check:content` fails on a duplicate).
- Title: primary phrase first, a differentiator, then `| SolarLink`. 50 to 60 characters. Unique. No phone numbers, prices or city lists.
- One h1 that matches the title's meaning and paints at once.
- Questions people type become h2 or h3 headings, each followed by a 40 to 60 word answer that makes sense alone.
- The substance test: what does this page have that the top three results do not? First-hand detail, local truth, a tool, or real data. If the answer is "nothing", the page is not built.
- Depth to hold or beat: service pages 1,000 to 2,000 useful words; outlet pages 1,200 or more; guides 1,800 or more; size pages 800 or more; tools 400 or more of explanation under the tool. Measured in the built page's `<main>`.
- Pages of one kind (outlets, sizes, projects) share under 20% of their body text. No name-swapped templates.
- Every page is linked from three or more relevant pages and sits within three clicks of home.
- Facts come from `src/content.ts` or a sourced data file. Copy is written with the `anti-ai-slop-writing` skill and read by a person before it ships.
- All content is in the server HTML. Tools enhance a page that already says something without JavaScript.

## Structured data

JSON-LD, facts that match the visible page only.

| Where | Types |
|---|---|
| Home | `Organization`, `WebSite` |
| Each outlet | The most specific `LocalBusiness` subtype that fits, with that outlet's own address, phone, hours, geo, `sameAs` (its Google Maps URL), `parentOrganization` |
| Service pages | `Service` with `provider` and `areaServed` only where true |
| Guides and articles | `Article` with real `datePublished` and `dateModified`, a named author |
| Tools | `WebApplication` |
| FAQ sections | `FAQPage` where the questions are visible (no rich result expected; it is read by AI engines) |
| Everywhere | `BreadcrumbList` |

Never: `AggregateRating` or `Review` about SolarLink itself, a `dateModified` that did not happen, `Product` with a price nobody confirmed.

## Language

- English at the root. `lang="en-PK"`.
- Roman Urdu the way people type it ("solar lagwane ka kharcha", "5 kw solar system kitne ka hai", "net metering kya hai") goes into FAQ questions and some headings on the English pages. Spellings are kept as searched, not corrected. List: `docs/research/agy/3-keywords-ur-summary.md`.
- Urdu-script pages under `/ur/` are a later stage, for the five highest-traffic pages, each read by a native speaker, with hreflang both ways. Not machine translation at scale.

## AI search

- `robots.txt` blocks nothing; the host's and any CDN's bot settings are checked after every change.
- Answers are written to be quoted: the question as a heading, the direct answer first, the figure with its source and date.
- `llms.txt` is generated from `src/content.ts` and the route list, never typed by hand (the old one names URLs that 404).
- Being cited depends more on being mentioned elsewhere than on anything on the site: `docs/LINKS.md`.

## Speed

Budgets on a mid-range phone: LCP 2.5 s or less, INP 200 ms or less, CLS 0.1 or less; Lighthouse mobile 95 or more for SEO, accessibility and best practices, 90 or more for performance. How: static HTML with no JavaScript by default, islands only for tools, fonts self-hosted and subset, images in AVIF or WebP with sizes set, maps and video behind a tap-to-load image, 3D loaded only on request, analytics after first interaction.

## Measuring

- Before launch: this repo's baseline snapshot, plus Search Console and Business Profile numbers once access exists.
- After launch: the monthly loop in the `website-seo` skill (indexing report, pages against last month, queries at positions 4 to 20, map-pack position per city, AI answer checks, one real content improvement).
- GA4 on the existing property; PostHog for how the tools are used (which inputs, where people stop, which results lead to WhatsApp).

## Not known yet

Search volumes (the keyword lists are autocomplete, not volumes). What the site ranks for today. The state of each Business Profile. Which brands the client can truthfully claim. Each of these changes priorities and is on the client list in `docs/PRD.md`.
