# SEO migration rules

The new site replaces a live site at solarlink.com.pk. On anything about URLs, titles, redirects, indexing or content depth, this file wins over every other document, including the design.

Baseline taken 2026-11-15: `docs/qa/seo-baseline-live-2026-11-15.json` (every sitemap URL: status, title, canonical, words, links, schema) and `docs/qa/hops-live-2026-11-15.txt` (redirect behaviour).

## What the live site looks like to Google today

The old site is in worse shape than a normal migration. This changes the job: most of the work is repair, and there is little ranking to lose and a lot to gain.

| Finding | Detail |
|---|---|
| **36 of 48 sitemap URLs answer 404** | The sitemap, the canonical tags and llms.txt all name trailing-slash URLs (`/services/residential-solar/`). The server only answers the `.html` form. Every service, product, project, blog and guide page is affected |
| **Canonicals point at 404s** | Each `.html` page that does load names a canonical that does not. Google has no valid URL to index for those pages |
| **`www` serves a full copy** | `https://www.solarlink.com.pk/` answers 200 with no redirect, so two copies of the site exist |
| **`/index.html` answers 200** | A third copy of the home page |
| **Thin and stub pages** | Multan and Gilgit outlets: 22 words each. Ten blog posts: about 200 words of "coming soon". Three product pages under 100 words |
| **Ten project pages are placeholders** | Placeholder image, placeholder bills, one shared date |
| **Self-declared rating in schema** | "4.8 from 47 reviews" on every page |
| **Orphans** | Gilgit, Multan, Rawalpindi outlets, `/products/` and `/services/` have no link from another sitemap page |
| **The favicon** | `favicon.svg` is the Astro framework's default logo |

Only 12 sitemap URLs answer 200: the home page, `/blog/`, `/faqs.html`, `/products/`, `/projects/`, `/services/` and the six outlet pages.

**Still unknown:** which URL forms Google has actually indexed and which queries bring clicks. That needs Search Console (see "Needed before launch"). Until it arrives, every form the old site ever answered is treated as live.

## The canonical form

`https://solarlink.com.pk/path/` : https, apex host, lowercase, trailing slash.

Why trailing slash: it is the form the old sitemap, canonicals and llms.txt already declare, it is what a static build produces naturally (`path/index.html`), and it lets one rule catch every other form.

Every other form answers **one 301** straight to the canonical URL: `http://`, `www.`, no trailing slash, `.html`, `/index.html`. Never a chain, never a 302 or 307. `public/.htaccess` holds the rules for the current host (cPanel). They are untested against the real server until staging exists; `hops.mjs` is the test.

## URL map

Every old URL keeps its path (in slash form) or redirects once. `src/routes.ts` is the list; `legacy` on a route names the old paths that redirect to it.

| Old URL | New URL | Note |
|---|---|---|
| `/` , `/index.html`, `/home_facelift.html` | `/` | |
| `/about-us.html`, `/contact-us.html`, `/get-quote.html`, `/resources.html`, `/how-solar-works.html`, `/net-metering-guide.html`, `/solar-calculator.html`, `/sitemap.html`, `/terms.html` | same path, slash form | |
| `/faqs.html` | `/faqs/` | The one page whose live canonical is the `.html` form; 3,636 words, the largest page on the site. Keep all of it |
| `/services/*.html` (5 pages + index) | `/services/*/` | |
| `/products/*.html` (4 pages + index) | `/products/*/` | |
| `/outlets/*.html` (6 pages) | `/outlets/*/` | Canonical branch pages, decided 2026-08-23 |
| `/locations/*.html` (6 pages) | `/outlets/*/` | Merged duplicates. If Search Console shows `/locations/*` is what ranks, raise it with the client before launch; do not flip silently |
| `/projects/*.html` (10 pages + index) | `/projects/*/` if the job is real, else `/projects/` | Client must confirm each |
| `/blog/*.html` (10 posts + index) | `/blog/*/` | Slugs kept; articles written in full before launch |
| `/solar-quote-punjab.html` | `/get-quote/` | Old ad landing page |
| Old image paths under `/images/` | kept, or 301 to the new file | Inventory: `docs/research/content-inventory/images.csv` |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt` | same file names | Search Console already knows them |

## Rules for the build

1. **Slugs never change.** Not for style, not for keywords.
2. **No page gets thinner.** A page that had real content keeps every topic, section and FAQ it had. Word counts to hold or beat (words in `<main>`): FAQs 3,636; net-metering guide 2,137; residential solar 2,030; how solar works 1,875; commercial 1,316; agricultural 1,310; Lahore 1,239; Sargodha 1,231; Islamabad 1,203; industrial 1,053; net-metering support 1,057; about 1,036; home 1,022. `diff.mjs` fails a page that loses more than 30%.
3. **Thin pages get real content or are not published.** A stub is never copied across as a stub.
4. **Titles keep their ranking phrase.** Once Search Console data arrives, each page's top query stays in its title word for word. Until then the phrases in the live titles ("Solar Installation in Lahore", "Net Metering Guide Pakistan", and so on) are kept.
5. **Internal links are kept or improved.** Every page has links from three or more relevant pages; nothing is orphaned.
6. **Only production is indexable.** `BaseHead.astro` sends `noindex` unless `PUBLIC_SITE_ENV=production`. Staging is also password-protected. Dev-only pages never reach the production build, and a blocked page is never also `noindex`.
7. **The sitemap lists only canonical 200 URLs,** with `lastmod` set to the date the content last changed, not the build date.
8. **No self-declared `AggregateRating`.** Schema states only facts shown on the page.
9. **English stays at the root.** Urdu, if added, goes on new URLs under `/ur/` with hreflang.

## Needed before launch (the client or agency must supply)

- Search Console access or exports: Performance by page and by query (3 and 16 months), and the Pages indexing report. Put exports in `docs/research/gsc/`.
- The existing Search Console verification, GA4 and any tag-manager or pixel IDs, so history continues.
- Google Business Profile details for each outlet: exact name, categories, phone, hours, website link, review count.
- Hosting decision (stay on cPanel or move), and access to test redirects on a staging host.

## Launch day and after

Follow `website-seo` section 5 and its `references/migration.md` sections 4 and 6: back up, deploy, run `hops.mjs`, `snapshot.mjs` and `diff.mjs` against production, submit the sitemap, inspect and request indexing for the top pages, then the 14-day watch. No large changes for two to four weeks after launch.
