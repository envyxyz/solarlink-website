# SolarLink website: product truth

Written 16 Nov 2026. Facts come from `../growth/Notes/Business Profile.md`. "Confirmed" means Ameer or the client said it. "Website says" means it is only on the old site and stays a flagged placeholder (`confirmed: false`) until the client confirms it.

## Purpose

Turn people who pay a high electricity bill, or lose power to load-shedding, into a WhatsApp conversation with the nearest SolarLink shop. The site sizes a system on the first screen, shows the equipment and past work, and makes the next step one tap. It also becomes the shop window for panels, inverters, batteries and UPS, and is built so a real online store can follow.

## Users

| Who | Situation | What they need |
|---|---|---|
| Home owner | High bill, wants to cut it, unsure of the size | A size in seconds, a plain explanation, a human on WhatsApp |
| Shop, office or factory owner | Running costs and outages | Commercial and industrial capability, past work, a site survey |
| Farmer | Diesel or grid tubewell | A tubewell page that talks about pumps, not roofs |
| Buyer of equipment | Needs a panel, inverter, battery or UPS over the counter | What is stocked, a rate, the nearest shop |
| Net metering applicant | Has a system or wants one | A clear process and someone who files it |
| Comparer | Checks three companies before calling | Real reviews, real addresses, real projects |

Most visits are on a phone, many from a Google search or a shared WhatsApp link.

## Positioning

SolarLink is the link between the sun and your meter: one company that sizes it, supplies it, installs it and files the net metering. Plain claims, savings-led, bold. No rival leads with a live sizing tool. Anchor and tone: `DESIGN.md`.

## Operating context

- Company: SolarLink, Lahore head office. Contact person Abdul Gaffar (role to confirm). Domain `solarlink.com.pk`. Founded 2018 is "website says".
- Live outlets (client confirmed 16 Nov 2026): Lahore (Munawar Center, The Mall; one shop only), Islamabad (I-14/3), Sargodha. Rawalpindi is closed. Multan and Gilgit have no content.
- Phones, WhatsApp numbers, hours and postcodes are still "website says". Hours on the old site: Mon to Sat 9 to 6.
- Lead channel: WhatsApp, routed to the nearest outlet's number. Every lead is also stored by the quote Worker so none is lost.
- English only. Currency is Rs, written `Rs 45,000`, no decimals.
- The old site is live and partly broken (36 of 48 sitemap URLs return 404). This build replaces it on the same domain. See `docs/SEO-MIGRATION.md`.

## Capabilities

Services (confirmed list; scope and sizes are "website says"):
- Home solar: on-grid and hybrid. Commercial and industrial solar. Agricultural solar and solar tubewells.
- Net metering support: the application with the DISCO, approval and commissioning.
- Equipment trade: panels, inverters, batteries, UPS and other appliances, mounting, cables, protection.
- Free site survey and written quote; maintenance and after-sales support.

Brands the old site names: Canadian Solar, Growatt, Fronus, LONGi, Huawei, GoodWe. Which are stocked, and any dealer status, is unconfirmed.

## Constraints

- Static site on Cloudflare Workers free plan. One small Worker for `/api/*`. No server-side rendering at request time.
- Budgets: LCP 2.0 s, CLS 0, INP 200 ms, JS under 130 KB gzipped on the homepage, Lighthouse mobile 95+.
- No cart or checkout yet. Prices appear only when the client turns them on (`priceMode`).
- Pages are built one at a time, in their own chats, homepage first.
- Real install photos and logo files are not in hand. Early pages use CGI renders and type-set wordmarks.

## Brand commitments

- Written SolarLink. Logo and name stay; a new identity is built around them.
- Bold and energetic. Every number sourced. Estimates labelled as estimates.
- One lime accent, light base, dark night sections, Mona Sans. See `DESIGN.md`.
- Honest where we do not know: a placeholder is flagged, never dressed up as fact.

## Evidence on hand

- Client confirmed on WhatsApp, 16 Nov 2026: outlet list above and the Rawalpindi closure.
- Old site content: 57 FAQ answers, 4 service pages, 10 project pages, 3 live outlet pages, guides on how solar works and net metering, a calculator. Real depth, but each fact is "website says".
- Google shows 71 reviews on the Lahore listing alone and 111 across four listings (audit, 13 Nov). The rating and the text of each review are not yet captured.
- The research files in `docs/research/` were written by another model. Treat their prices, search volumes and "who ranks" as unverified.

## What must never be invented

Any price, rate per unit, panel or system cost, payback period, bill saving, warranty length, install time, certification, years in business, team size, install count, rating, review count, award, brand dealer status, hours, or map pin. Write `[confirm with client]`.

The banned-claims list is in `CLAUDE.md` and is checked by script. Known conflicts to settle with the client: warranty 1 year (About) or 2 years (Lahore page); install time 1 to 2 days or 2 to 5 days; Lahore postcode 54000 or 54700; "Munawar" or "Munawer" (we use Munawar).

## Principles

1. Size first. The first screen lets a visitor try the product.
2. One company, one story: survey, supply, install, net metering.
3. A real number or no number.
4. WhatsApp is the front door; the phone number is the second.
5. The same facts everywhere: one edit in `src/content.ts` changes the whole site.
6. Keep what ranks. SEO continuity beats a design preference.
7. Build the shop window now, the store later, from the same parts.

## Accessibility

WCAG 2.2 AA. Contrast as set in `DESIGN.md` (lime text only on night). Targets 44px or more. Visible focus on every control. The slider is keyboard and screen-reader complete, and the result is announced politely when it changes. Roof panels are decorative; the numbers carry the meaning. Reduced motion and reduced transparency are honoured. Layouts reflow at 200% zoom. The site works with JavaScript off: the quote link works and all text is in the HTML. Write plainly for readers whose first language may be Urdu.
