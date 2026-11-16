# SolarLink website: PRD

Status: direction set 16 Nov 2026. Owner: Ameer. Client contact: Abdul Gaffar (role to confirm).
Product truth: `PRODUCT.md`. Visual rules: `DESIGN.md`. Homepage: `docs/HOMEPAGE.md`. URLs and redirects: `docs/SEO-MIGRATION.md`. Queries: `docs/KEYWORD-MAP.md`.

## 1. Goal and KPIs

Turn visitors into WhatsApp conversations with the nearest outlet. Conversions, in order: **WhatsApp quote**, **call**, **directions tap**, **form quote** (stored, then opens WhatsApp).

Targets, 90 days after launch (baselines are not measured yet; set them in week 1):
- Quote starts and WhatsApp sends per session, tracked as GA4 events from day one.
- Core Web Vitals green in field data: LCP 2.0 s, CLS 0, INP 200 ms on a mid-range Android over 4G.
- Lighthouse mobile 95+ in all four categories on every page type.
- No loss of the old site's indexed pages: every URL in `SEO-MIGRATION.md` answers 200 or one 301.
- Lead capture: 100% of form leads stored, with a count the client can see. [confirm how the client wants to read them]

## 2. Users

Home owners, business owners, farmers, equipment buyers, net metering applicants, comparers. Detail in `PRODUCT.md`.

## 3. Research summary

Verified (our own crawl, 13 and 16 Nov 2026): the old site is a static Astro build; 36 of 48 sitemap URLs return 404; canonicals point at the same 404s; `www` serves a second copy; quote forms only open WhatsApp and store nothing; a 57-question FAQ, 10 projects and 4 service pages carry real depth; the 10 blog posts are "coming soon" stubs.

Unverified (other-model research in `docs/research/`; do not copy as fact):
- Keyword ideas and "who ranks now" in `keywords.md`. We use the ideas only as candidates and confirm in Search Console and Google by hand.
- Store patterns in `store-research.md`: show price per watt, show stock, filters by brand and phase, "ask for price" on volatile items, no cash on delivery for heavy gear. Used as design ideas only; prices and policies in it are not ours.
- Motion notes in `motion-study.md`: already folded into `DESIGN.md`.

Client-side: nothing about SolarLink's actual rates, stock or prices is in hand.

## 4. Sitemap and final URLs

**Master list (owner decision, 16 Nov 2026): `src/routes.ts`.** It is the fuller plan from the first foundation and adds to the tree below: `/solar-systems/` with type and size pages, `/tools/` calculators, `/solar-financing/`, `/warranty-and-support/`, `/terms/` and brand pages. Where this section and `src/routes.ts` differ, `src/routes.ts` wins. Reconciled 16 Nov 2026: the privacy page is `/privacy-policy/` in both. Still to reconcile before the inner pages start: `docs/KEYWORD-MAP.md` against the longer `docs/research/keyword-map-full.md`. A page whose `needs` are unmet waits; it is not shipped thin.

Trailing slash, lowercase, apex, https. `[page]` = built in its own chat. Homepage first.

```
/                                   Home (docs/HOMEPAGE.md)
/about-us/                          About
/contact-us/                        Contact: all outlets, form
/get-quote/                         Quote flow (stores a copy, then opens WhatsApp)
/solar-calculator/                  Full calculator (same sizing code as the hero)
/faqs/                              FAQ (57 questions on the old site)
/how-solar-works/                   Guide
/net-metering-guide/                Guide
/resources/                         Hub for guides and FAQs
/sitemap/                           Human sitemap
/privacy-policy/                    Privacy policy (new: quote form stores leads)

/services/                          Hub
/services/residential-solar/
/services/commercial-solar/
/services/industrial-solar/         (live and linked in the nav, missing from the old sitemap)
/services/agricultural-solar/
/services/net-metering-support/

/products/                          Catalogue hub (priceMode applies)
/products/solar-panels/
/products/inverters/
/products/batteries/
/products/accessories/              Mounting, cables, protection, UPS [confirm UPS home]

/projects/                          Hub
/projects/<slug>/                   10 pages, slugs unchanged (see SEO-MIGRATION.md)

/blog/                              Hub
/blog/<slug>/                       10 planned posts; each ships only when real

/outlets/                           Index (new page at a live URL)
/outlets/lahore/   /outlets/islamabad/   /outlets/sargodha/

/sitemap.xml  /robots.txt  /llms.txt  404 page
```

Redirects: every `.html` form to the slash form; Rawalpindi to `/outlets/islamabad/`; Multan and Gilgit to `/outlets/`. Later (not now): `/products/<category>/<product>/` detail pages once the client supplies a product list.

**Navigation** (5 links plus one button): Services, Products, Projects, Outlets, Resources; primary button "Get a free quote". Contact, About and FAQ sit in the footer and the phone sheet. The footer lists every service, product category, outlet and guide so no old internal link is lost.

## 5. Homepage

Order and specs are in `docs/HOMEPAGE.md`: nav, live sizing hero, brand belt, about and numbers, what we do, the link, shop preview, projects, reviews, outlets, questions, closing call, footer.

## 6. Features

### 6.1 Live sizing hero
- Slider for the monthly bill (Rs or units). Constants, formulas and roof homography as in `HOMEPAGE.md`. The code lives in one module (`src/lib/sizing.ts`) used by the hero, the calculator page and the WhatsApp text.
- Constants (`ratePerUnit`, `sunHours`, `performanceRatio`, `panelWatts`) come from `content.ts`, each with a source and `confirmed`. A system size is shown; no price or saving is shown until the client confirms rates.
- No JavaScript: the card is a link to `/get-quote/`.

### 6.2 Quote flow
- Steps: city (sets the WhatsApp number), roof or site type, monthly bill, name and phone. Four fields at most. Phone is asked last.
- Submit: the form posts to the Worker at `/api/quote`. The Worker validates every field, drops spam (honeypot, time trap), rate-limits by IP, stores a copy of the lead, then returns the WhatsApp link with the prefilled message. The page opens WhatsApp. If storing fails, WhatsApp still opens and the failure is logged.
- Storage target: Cloudflare KV or D1, plus an email or WhatsApp alert to the outlet. [confirm with client: who receives alerts, which email]
- No personal data in URLs or analytics events.

### 6.3 Product catalogue and priceMode
- `products` in content; `ProductCard` and `Price` read them. `priceMode` per site and per product: `show` (Rs amount), `ask` ("Ask for today's rate" plus WhatsApp), `hidden` (nothing). Launch default is `ask` until the client confirms rates.
- Store-ready fields: brand, model, category, spec line, watts or kW or Ah, stock, warranty, price per watt, image, WhatsApp text. Cart and checkout are out of scope.
- Category pages are real pages with text, not just grids. Filters by brand and type when the list is long enough to need them.

### 6.4 Reviews
- Real Google reviews typed into content with author, date and outlet, plus rating and count with an as-of date. Refreshed by hand on a schedule; stale numbers are removed. No `AggregateRating` markup.
- Google review text and the count are captured from the listings. [confirm with client which listings and permission to quote]

### 6.5 Outlets
- Lahore (head office), Islamabad, Sargodha. Each: address, phone, WhatsApp, hours, directions, map link, schema. Map pins and the Lahore postcode are to confirm. Per-outlet WhatsApp numbers route the buttons.

### 6.6 Link diagram
- `LinkDiagram` explains sun, panel, inverter, home, battery and grid, with On-grid, Hybrid and Off-grid views. Reused on service and guide pages.

## 7. Content model

All copy and facts in `src/content.ts`, long lists in `src/content/*.ts`. Typed with TypeScript. Every fact is `{ value, confirmed: boolean, source: string }`. A build check fails a production build when an unconfirmed fact would display as true, or a placeholder remains (`[confirm with client]`).

| Key | Holds |
|---|---|
| `business` | name, legal name, founded, tagline, descriptions (short, medium, long), email, domain, socials, GA4 id |
| `outlets[]` | slug, city, role (head office or outlet), address lines, postcode, phone, WhatsApp, hours, geo, map URL, `status` (live) |
| `services[]` | slug, title, short, long sections, size range, faqs, image, alt, outlet links |
| `products[]` | slug, category, brand, model, spec line, specs, stock, warranty, `priceMode`, `price`, `pricePerWatt`, image, alt |
| `brands[]` | name, logo file or wordmark, category, `confirmed` |
| `projects[]` | slug, title, city, area, system kW, type (on-grid, hybrid), outlet, image, alt, summary, `confirmed` |
| `reviews[]` | author, date, outlet, text, source URL; plus `reviewSummary` (rating, count, asOf) |
| `faqs[]` | id, question, answer (40 to 60 words), page tags, `homepage` flag |
| `sizing` | `ratePerUnit`, `sunHours`, `performanceRatio`, `panelWatts`, bill ranges, roof quad (percent corners), WhatsApp template |
| `nav` | main links, footer columns, legal links |
| `seo` | per URL: title, description, h1, canonical path, OG image, schema flags |
| `ui` | every other string: buttons, labels, errors, aria labels, price words |

Components never hold literal text, phone, address, price or brand name.

## 8. Budgets

| Metric | Budget |
|---|---|
| LCP | 2.0 s (mid phone, 4G) |
| CLS | 0 |
| INP | 200 ms |
| JavaScript, homepage | at most the React and Next baseline plus 50 KB, gzipped, every script `index.html` loads, `noModule` excluded. Baseline 132.0 KB (empty page, 16 Nov 2026), limit 182.0 KB. Checked by `node scripts/js-size.mjs`. The wheel scroller attaches after the page is idle |
| Lighthouse mobile | 95+ in all four categories |
| Hero image | AVIF under 180 KB at 1440 wide, preloaded |
| Font | one variable Mona Sans file, Latin subset, `swap`, size-adjusted fallback |
| Third parties | none render-blocking; analytics after first interaction; map is an image or link |

## 9. Stack

Next.js App Router as a static export (`output: 'export'`, `trailingSlash: true`, images unoptimized with pre-sized AVIF and WebP) · React · TypeScript strict · Tailwind CSS v4 (`@theme` tokens) · own primitives on native elements (range, radio, dialog, details) styled to the tokens · Web Animations API springs and CSS · own wheel scroller (idle, fine pointer only) · lucide-react · Zod in the Worker · Playwright and axe · Lighthouse CI · pnpm.

## 10. Hosting

Cloudflare Workers on the free plan. Static assets plus one Worker for `/api/*`. `public/_headers` holds security and cache headers; `public/_redirects` holds the redirects. Apex host is canonical; `www` and `http` redirect to it in one hop. Previews carry `noindex` and are never in a sitemap. Check the free-plan request and Worker limits before launch [confirm].

## 11. Out of scope

Cart, checkout and payments; customer accounts; installment plan calculators; a chat assistant; a second language; Multan and Gilgit pages; any page for Rawalpindi other than its redirect; blog posts that are not yet written; scroll-driven video.

## 12. Open questions for the client

Nothing below goes on the site until answered.
1. Legal name, NTN, year founded, team size (all "website says" or empty).
2. Hours for each outlet, including Friday and holidays. Phones and WhatsApp numbers: confirm each.
3. Lahore postcode (54000 or 54700), the "Munawar" spelling, and map pins for all three outlets.
4. Which brands are stocked and any dealer status (Canadian Solar, Growatt, Fronus, LONGi, Huawei, GoodWe).
5. Rate per unit, sun hours and panel wattage for the sizing tool; whether to show prices at all.
6. Workmanship warranty (1 or 2 years) and install time (1 to 2 or 2 to 5 days).
7. Installment plans: do they exist, in which cities, on what terms.
8. Real install photos and permission to use them; logo files.
9. Is the Rawalpindi project page acceptable as built work?
10. Who owns Google Search Console, GA4 `G-50GMQWKL7R` and the Google Business Profiles; who receives quote alerts.
11. Google reviews: permission to quote, and which listings count.
12. Product list for the shop: models, stock, rates.
13. Do you want the 10 planned blog posts written, and who approves the facts in them?
