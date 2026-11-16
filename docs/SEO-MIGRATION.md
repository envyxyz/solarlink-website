# SEO migration: solarlink.com.pk to the new build

Written 16 Nov 2026. This file wins over design and copy wherever they clash. Skills: `website-seo` (migration.md, technical.md, lessons.md).

## What the baseline says

- Baseline: `../.agency/raw/seo/seo-baseline.json` (crawl 16 Nov 2026 of the 48 sitemap URLs) and `../.agency/raw/seo/hops.log`. Extra detail: `../.agency/raw/website/site.json` (crawl 13 Nov 2026).
- The sitemap and every canonical tag declare trailing-slash URLs such as `/services/residential-solar/`. **36 of the 48 return 404.** The pages really live at `.html` paths (`/services/residential-solar.html`). Only the home page, the four hubs, `/faqs.html` and the six outlet `.html` pages answer from their sitemap form.
- Google has been told the "real" URL is a page that does not exist. The new build makes the declared form the real one and 301s every live `.html` form to it in one hop. No rank is lost by the move because the declared form never worked.
- `www` serves a full 200 copy, `http://www` takes two hops, `/index.html` answers 200 (hops.log: 7 FAIL).
- The 10 blog posts are "Coming soon" stubs (about 320 words, no article). Their titles end in "Coming Soon".
- Search Console data is not in hand yet. Until it is, the live title is the only evidence of a ranking phrase.

Title and word-count notes for the table:
- Dashes in live titles are shown as " - " and pipes as `\|`.
- Words without a star come from the baseline (main content). A star means whole-page text from the 13 Nov crawl, so it runs a little high. `snapshot.mjs` replaces both with one count.
- "Action": `keep` = the live URL stays as is. `301` = the live URL redirects, and the new URL is a new 200 page.

## URL table

| Old live URL | New URL | Action | Live title | Words | Note |
|---|---|---|---|---|---|
| / | / | keep | Solarlink - Premier Solar Solutions & Tier-1 Installations in Pakistan | 1022 |  |
| /about-us.html | /about-us/ | 301 | About Solarlink - Punjab's Trusted Solar Company | 1153* |  |
| /blog/ | /blog/ | keep | Solar Energy Blog - Tips, News & Guides \| Solarlink | 276 |  |
| /blog/growatt-vs-fronus-inverter-comparison.html | /blog/growatt-vs-fronus-inverter-comparison/ | 301 | Growatt vs Fronus Inverter: Which Should You Choose for Pakistan? - Coming Soon \| SolarLink | 319* | Coming-soon stub; ships only when the real post exists |
| /blog/how-to-size-solar-system-pakistan.html | /blog/how-to-size-solar-system-pakistan/ | 301 | How to Size a Solar System in Pakistan: kW Calculator & Rules of Thumb - Coming Soon \| SolarLink | 334* | Coming-soon stub; ships only when the real post exists |
| /blog/net-metering-common-mistakes-pakistan.html | /blog/net-metering-common-mistakes-pakistan/ | 301 | 7 Net Metering Mistakes That Delay Your Application in Pakistan - Coming Soon \| SolarLink | 318* | Coming-soon stub; ships only when the real post exists |
| /blog/net-metering-lesco-application-guide.html | /blog/net-metering-lesco-application-guide/ | 301 | LESCO Net Metering Application: Documents, Process & Timeline (2026) - Coming Soon \| SolarLink | 319* | Coming-soon stub; ships only when the real post exists |
| /blog/net-metering-vs-battery-storage-pakistan.html | /blog/net-metering-vs-battery-storage-pakistan/ | 301 | Net Metering vs Battery Storage: Which Saves More Money in Pakistan? - Coming Soon \| SolarLink | 322* | Coming-soon stub; ships only when the real post exists |
| /blog/on-grid-vs-hybrid-vs-off-grid-pakistan.html | /blog/on-grid-vs-hybrid-vs-off-grid-pakistan/ | 301 | On-Grid vs Hybrid vs Off-Grid Solar: Which is Right for Pakistan in 2026? - Coming Soon \| SolarLink | 326* | Coming-soon stub; ships only when the real post exists |
| /blog/solar-installation-red-flags-pakistan.html | /blog/solar-installation-red-flags-pakistan/ | 301 | 10 Red Flags When Choosing a Solar Company in Pakistan - Coming Soon \| SolarLink | 324* | Coming-soon stub; ships only when the real post exists |
| /blog/solar-panel-brands-comparison-pakistan.html | /blog/solar-panel-brands-comparison-pakistan/ | 301 | Tier-1 Solar Panel Brands in Pakistan 2026: Canadian Solar, JA Solar & More - Coming Soon \| SolarLink | 329* | Coming-soon stub; ships only when the real post exists |
| /blog/solar-panel-cleaning-maintenance-pakistan.html | /blog/solar-panel-cleaning-maintenance-pakistan/ | 301 | Solar Panel Cleaning & Maintenance in Pakistan: What You Actually Need to Do - Coming Soon \| SolarLink | 325* | Coming-soon stub; ships only when the real post exists |
| /blog/solar-roi-payback-period-pakistan.html | /blog/solar-roi-payback-period-pakistan/ | 301 | Solar ROI in Pakistan 2026: Real Payback Period Calculations - Coming Soon \| SolarLink | 325* | Coming-soon stub; ships only when the real post exists |
| /contact-us.html | /contact-us/ | 301 | Contact Solarlink - Lahore, Islamabad, Rawalpindi & Sargodha | 405* |  |
| /faqs.html | /faqs/ | 301 | Frequently Asked Questions (FAQs) \| Solarlink | 3636 | Declared canonical is the .html form; moves to /faqs/ |
| /get-quote.html | /get-quote/ | 301 | Get a Free Solar Quote \| SolarLink | 247* |  |
| /how-solar-works.html | /how-solar-works/ | 301 | How Solar Panels Work in Pakistan - Simple Guide \| Solarlink | 1992* |  |
| /net-metering-guide.html | /net-metering-guide/ | 301 | Net Metering Guide Pakistan - Step by Step \| Solarlink | 2254* |  |
| /outlets/ | /outlets/ | keep | (server directory listing, no real page) | 46* | New real outlets index built at the same URL |
| /outlets/gilgit.html | /outlets/ | 301 | SolarLink Gilgit \| Gilgit Branch | 22 | Coming-soon page, no content |
| /outlets/islamabad.html | /outlets/islamabad/ | 301 | Solar Installation in Islamabad \| SolarLink - Islamabad Outlet | 1203 |  |
| /outlets/lahore.html | /outlets/lahore/ | 301 | Solar Installation in Lahore \| SolarLink - Lahore | 1239 |  |
| /outlets/multan.html | /outlets/ | 301 | SolarLink Multan \| Multan Branch | 22 | Coming-soon page, no content |
| /outlets/rawalpindi.html | /outlets/islamabad/ | 301 | Solar Installation in Rawalpindi \| SolarLink - Rawalpindi Branch | 314 | Outlet closed (client, 16 Nov 2026) |
| /outlets/sargodha.html | /outlets/sargodha/ | 301 | Solar Installation in Sargodha \| SolarLink - Sargodha Branch | 1231 |  |
| /products/ | /products/ | keep | Solar Products in Pakistan \| Solarlink | 261 |  |
| /products/accessories.html | /products/accessories/ | 301 | Solar Accessories & Mounting Structures \| Solarlink | 199* |  |
| /products/batteries.html | /products/batteries/ | 301 | Solar Batteries & Storage Solutions Pakistan \| Solarlink | 199* |  |
| /products/inverters.html | /products/inverters/ | 301 | Growatt & Fronus Inverters - Best Price Pakistan \| Solarlink | 466* |  |
| /products/solar-panels.html | /products/solar-panels/ | 301 | Tier-1 Solar Panels in Pakistan - Canadian & More \| Solarlink | 213* |  |
| /projects/ | /projects/ | keep | Solar Installation Projects in Punjab & Islamabad \| Solarlink | 547 |  |
| /projects/bahria-town-phase-2-lahore-10kw.html | /projects/bahria-town-phase-2-lahore-10kw/ | 301 | Bahria Town Phase 2, Lahore - 10kW On-Grid Solar \| SolarLink | 378* |  |
| /projects/bahria-town-phase-6-islamabad-10kw.html | /projects/bahria-town-phase-6-islamabad-10kw/ | 301 | Bahria Town Phase 6, Islamabad - 10kW On-Grid Solar \| SolarLink | 377* |  |
| /projects/company-bagh-sargodha-10kw-farm.html | /projects/company-bagh-sargodha-10kw-farm/ | 301 | Near Company Bagh, Sargodha - 10kW On-Grid Solar \| SolarLink | 370* |  |
| /projects/company-bagh-sargodha-4-5kw.html | /projects/company-bagh-sargodha-4-5kw/ | 301 | Near Company Bagh, Sargodha - 4.5kW On-Grid Solar \| SolarLink | 365* |  |
| /projects/dha-phase-5-lahore-15kw.html | /projects/dha-phase-5-lahore-15kw/ | 301 | DHA Phase 5, Lahore - 15kW On-Grid Solar \| SolarLink | 379* |  |
| /projects/gulberg-iii-lahore-20kw-commercial.html | /projects/gulberg-iii-lahore-20kw-commercial/ | 301 | Gulberg III, Lahore - 20kW On-Grid Solar \| SolarLink | 363* |  |
| /projects/johar-town-lahore-4-5kw.html | /projects/johar-town-lahore-4-5kw/ | 301 | Johar Town, Lahore - 4.5kW On-Grid Solar \| SolarLink | 368* |  |
| /projects/model-town-lahore-6kw.html | /projects/model-town-lahore-6kw/ | 301 | Model Town, Lahore - 6kW On-Grid Solar \| SolarLink | 368* |  |
| /projects/pwd-rawalpindi-12kw-hybrid.html | /projects/pwd-rawalpindi-12kw-hybrid/ | 301 | PWD Housing Scheme, Rawalpindi - 12kW Hybrid Solar \| SolarLink | 369* | Built work, kept; outlet links point to Islamabad; confirm with client |
| /projects/sector-i14-islamabad-8kw-hybrid.html | /projects/sector-i14-islamabad-8kw-hybrid/ | 301 | Sector I-14/3, Islamabad - 8kW Hybrid Solar \| SolarLink | 363* |  |
| /resources.html | /resources/ | 301 | Solar Resources \| Guides, FAQs & Net Metering Help - SolarLink Pakistan | 350* |  |
| /services/ | /services/ | keep | Solar Services in Pakistan \| Solarlink | 300 |  |
| /services/agricultural-solar.html | /services/agricultural-solar/ | 301 | Agricultural Solar & Tubewell Solutions in Punjab \| Solarlink | 1427* |  |
| /services/commercial-solar.html | /services/commercial-solar/ | 301 | Commercial Solar Installation for Businesses \| Solarlink | 1433* |  |
| /services/industrial-solar.html | /services/industrial-solar/ | 301 | Industrial & Large-Scale Solar Solutions \| Solarlink | 1177* | Live 200, linked from the nav, not in the sitemap; canonical already declares the slash form |
| /services/net-metering-support.html | /services/net-metering-support/ | 301 | Net Metering Pakistan - Apply & Save More \| Solarlink | 1174* |  |
| /services/residential-solar.html | /services/residential-solar/ | 301 | Residential Solar Systems for Homes in Pakistan \| Solarlink | 2147* |  |
| /sitemap.html | /sitemap/ | 301 | Website Sitemap \| SolarLink | 292* | Declared canonical /sitemap/ returns 404 today |
| /solar-calculator.html | /solar-calculator/ | 301 | Solar Savings & System Sizing Calculator \| Solarlink Pakistan | 791* | Declared canonical /solar-calculator/ returns 404 today |

Also kept at the same path: `/robots.txt`, `/sitemap.xml` (rewritten), `/llms.txt` (live, 200; rewrite with only confirmed facts), `/favicon.ico`, `/images/brand/og-banner.jpg` (the live og:image path; keep the file or 301 it). Inventory every other old image path from the live HTML before launch and keep or 301 each one.

New URLs with no old equivalent: `/privacy/` (needed because the quote form stores leads) and the 404 page. Everything else in the new sitemap exists above.

## Rules for this rebuild

Must:
1. Every URL in the table answers 200, or one 301 hop to the new URL. No chains, no 302 or 307, no redirect to the home page.
2. Final URL form: `https://solarlink.com.pk/path/`. Apex, https, trailing slash, lowercase. Internal links, canonicals, sitemap and schema all use it. Never link to a redirect.
3. Keep each live title's ranking phrase word for word (see `KEYWORD-MAP.md`); add words around it. Fix the brand spelling to SolarLink, which is not a ranking phrase. Cut titles to about 60 characters; the home title is 70 today.
4. A page never loses more than 30% of its live words or internal links (`diff.mjs` fails it). Thin pages (products 4 pages, outlets index, Gilgit) only grow.
5. Keep every internal link the live pages carry, in nav, footer and hubs: all services (five), four product categories, ten projects, all guides and the three live outlets.
6. Rawalpindi is closed: remove it from nav, footer, schema, copy and the contact form city list. Its outlet URL 301s to Islamabad. The Rawalpindi project page stays as built work, flagged for the client.
7. Multan and Gilgit have no content: 301 to `/outlets/`. No new coming-soon pages.
8. A blog stub never ships. Until a real post exists its `.html` URL 301s to `/blog/`; the day the post is published, change that one redirect to the post's own URL.
9. Schema: keep `LocalBusiness` or `SolarEnergyCompany` per live outlet, `Organization`, `WebSite`, `BreadcrumbList`. `FAQPage` and `HowTo` only where the text is visible on the page. **Drop `AggregateRating`** (the 4.8 from 47 has no source).
10. Language: `<html lang="en-PK">`. One language, so drop `hreflang`. The live x-default has no return link on `/blog/`.
11. Search Console and Bing verification, plus the existing GA4 tag `G-50GMQWKL7R` if the client owns that property, go in before launch. Analytics load after first interaction.
12. Previews are `noindex` by header and never in the sitemap. Production has no `noindex`. Never pair `Disallow` with `noindex`. Dev pages are not in the production build.
13. After any Cloudflare dashboard change, re-check bot settings (AI Crawl Control, Bot Fight Mode, managed robots.txt) and the live `robots.txt`.
14. `lastmod` is the date the page's content changed, not the build date.

Avoid:
- Copying unsourced claims to keep word count: 350+ and 400+ installs, "#1" and "top installer", 51 to 200 staff, 70% to 100% bill cuts, 3 to 5 year payback, 0% markup, the 4.8 from 47 rating. Replace them with real substance (process, local detail, FAQ answers).
- Changing a slug for style. Using `.html` anywhere. Client-side rendering of page text.
- Shipping the Multan, Gilgit or blog "coming soon" pages as indexable pages.
- Two pages with the same primary query. Net metering is the risk: the service page and the guide each have their own query in `KEYWORD-MAP.md`.

## Redirects: `public/_redirects` (Cloudflare syntax)

Paths only; Workers static assets cannot match hosts in this file. Build script generates the no-slash twins of every page in the sitemap (for example `/about-us /about-us/ 301`) if `hops.mjs` shows the platform answering them with 307; fix the 307 before launch, do not accept it.

```
/index.html / 301
/about-us.html /about-us/ 301
/contact-us.html /contact-us/ 301
/faqs.html /faqs/ 301
/get-quote.html /get-quote/ 301
/how-solar-works.html /how-solar-works/ 301
/net-metering-guide.html /net-metering-guide/ 301
/outlets/islamabad.html /outlets/islamabad/ 301
/outlets/lahore.html /outlets/lahore/ 301
/outlets/sargodha.html /outlets/sargodha/ 301
/products/accessories.html /products/accessories/ 301
/products/batteries.html /products/batteries/ 301
/products/inverters.html /products/inverters/ 301
/products/solar-panels.html /products/solar-panels/ 301
/projects/bahria-town-phase-2-lahore-10kw.html /projects/bahria-town-phase-2-lahore-10kw/ 301
/projects/bahria-town-phase-6-islamabad-10kw.html /projects/bahria-town-phase-6-islamabad-10kw/ 301
/projects/company-bagh-sargodha-10kw-farm.html /projects/company-bagh-sargodha-10kw-farm/ 301
/projects/company-bagh-sargodha-4-5kw.html /projects/company-bagh-sargodha-4-5kw/ 301
/projects/dha-phase-5-lahore-15kw.html /projects/dha-phase-5-lahore-15kw/ 301
/projects/gulberg-iii-lahore-20kw-commercial.html /projects/gulberg-iii-lahore-20kw-commercial/ 301
/projects/johar-town-lahore-4-5kw.html /projects/johar-town-lahore-4-5kw/ 301
/projects/model-town-lahore-6kw.html /projects/model-town-lahore-6kw/ 301
/projects/pwd-rawalpindi-12kw-hybrid.html /projects/pwd-rawalpindi-12kw-hybrid/ 301
/projects/sector-i14-islamabad-8kw-hybrid.html /projects/sector-i14-islamabad-8kw-hybrid/ 301
/resources.html /resources/ 301
/services/agricultural-solar.html /services/agricultural-solar/ 301
/services/commercial-solar.html /services/commercial-solar/ 301
/services/net-metering-support.html /services/net-metering-support/ 301
/services/residential-solar.html /services/residential-solar/ 301
/sitemap.html /sitemap/ 301
/solar-calculator.html /solar-calculator/ 301
/services/industrial-solar.html /services/industrial-solar/ 301
/index.html / 301
/outlets/rawalpindi.html /outlets/islamabad/ 301
/outlets/multan.html /outlets/ 301
/outlets/gilgit.html /outlets/ 301
# Blog stubs: remove each line the day its real post is published, and redirect to the post instead
/blog/growatt-vs-fronus-inverter-comparison.html /blog/ 301
/blog/how-to-size-solar-system-pakistan.html /blog/ 301
/blog/net-metering-common-mistakes-pakistan.html /blog/ 301
/blog/net-metering-lesco-application-guide.html /blog/ 301
/blog/net-metering-vs-battery-storage-pakistan.html /blog/ 301
/blog/on-grid-vs-hybrid-vs-off-grid-pakistan.html /blog/ 301
/blog/solar-installation-red-flags-pakistan.html /blog/ 301
/blog/solar-panel-brands-comparison-pakistan.html /blog/ 301
/blog/solar-panel-cleaning-maintenance-pakistan.html /blog/ 301
/blog/solar-roi-payback-period-pakistan.html /blog/ 301
```

Host and scheme (not in `_redirects`): one Cloudflare Redirect Rule: if host is `www.solarlink.com.pk` or scheme is http, 301 to `https://solarlink.com.pk` plus the same path, so `http://www` is one hop. Confirm it also fires before the `_redirects` rules so `http://www/about-us.html` is still one hop. Keep every redirect for at least a year, longer while old links exist.

## Checks

Scripts live in the `website-seo` skill: `scripts/snapshot.mjs`, `scripts/diff.mjs`, `scripts/hops.mjs`. Copy them to `scripts/seo/` in this repo. Run in Git Bash with Node 18 or newer.

Before launch (today, on the live site):
1. Write the live `.html` list to `docs/qa/old-urls.txt` from the table (old URL column). Snapshot the live site with it, because the sitemap lists the 404 forms:
   `node scripts/seo/snapshot.mjs https://solarlink.com.pk --urls docs/qa/old-urls.txt --out docs/qa/pre-launch.json`
2. Export Search Console queries and pages for 16 months (needs client access). Record each page's top query next to the title in `KEYWORD-MAP.md`.
3. Inventory old image paths and backlinks (Search Console Links, Bing, a free backlink checker). Add a row to the table for any linked URL not listed.

On the build (local or a protected preview):
1. `node scripts/seo/snapshot.mjs https://solarlink.com.pk --host http://localhost:3000 --out docs/qa/new-build.json`
2. `node scripts/seo/diff.mjs docs/qa/pre-launch.json docs/qa/new-build.json` (the new sitemap URLs are the slash forms; the old snapshot paths are `.html`, so pass a path map or compare the table by hand for the 301 rows, and run the diff on the `keep` rows). Fix every FAIL. Read every WARN title change.
3. `node scripts/seo/hops.mjs http://localhost:3000 /about-us/ /services/residential-solar/` and one page per type.
4. Banned-claims script, `noindex` scan, sitemap count equals the page list, canonical equals URL on every page.

Launch day (production):
1. Deploy, purge cache, keep a one-click rollback.
2. `hops.mjs https://solarlink.com.pk /about-us/ /faqs/ /outlets/lahore/`: http, www, no-slash and `.html` forms all one 301.
3. `snapshot.mjs ... --out docs/qa/post-launch.json`, then `diff.mjs docs/qa/pre-launch.json docs/qa/post-launch.json`.
4. Search Console: confirm the property verifies, submit `/sitemap.xml`, Test live URL on the home page and the top pages, Request indexing. Bing: submit the sitemap and send IndexNow.
5. Check every Google Business Profile website link still answers 200.

After launch: days 1 to 3 read the Search Console Pages report for new 404s and redirect errors; day 7 and day 14 re-run snapshot and diff; compare clicks per URL at weeks 4 and 8; freeze large changes for 2 to 4 weeks.
