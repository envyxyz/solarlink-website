# SolarLink: product truth

What is known about the business and who the site is for. Design and copy start here. Anything not in this file or in `src/content.ts` is not a fact and must not be written as one.

## Users

- **The homeowner with a bill problem.** Lahore, Islamabad, Rawalpindi, Sargodha. On a mid-range Android phone, often outdoors, on patchy 4G. Has a number in mind (the bill) and one question: what will it cost and what will it save. Asks family before deciding, so needs something to forward on WhatsApp. Reads English, thinks in Urdu, searches in both and in Roman Urdu.
- **The shop, school, clinic or office owner.** Daytime load, wants the payback case in one view.
- **The factory manager.** Wants capacity, references and a person to talk to; the site's job is to look credible and get out of the way.
- **The farmer or landowner around Sargodha.** Tube well running on diesel or an expensive connection. Often reached through a son or nephew on a phone.
- **The owner of an existing system** looking for net-metering help, cleaning, a battery upgrade.
- **SolarLink's own staff**, who explain the same things to walk-in customers every day and need the tools at the counter.

## Purpose

Turn a search or a referral into a WhatsApp conversation with the right outlet, with the customer's numbers already in the message. Second purpose: be the site people open again (to check a bill, size a battery, plan an AC), so SolarLink is the name they know when they are ready.

## Positioning

A regional installer with real offices people can walk into, in cities the national brands serve from a distance. The national competitors sell technology and scale; SolarLink can be the one that shows its working: plain tools, clear numbers, a named outlet.

## Operating context

- Static site, no backend. Leads go to WhatsApp per outlet. Hosting today is cPanel, deployed from GitHub.
- Six outlet pages exist on the old site. Four have addresses (Lahore head office, Islamabad, Rawalpindi, Sargodha). Multan and Gilgit are "coming soon" stubs: unconfirmed.
- The market: load shedding, slab tariffs, and net-metering rules that have recently changed. Customers are confused and price-sensitive; whoever explains clearly wins trust.
- Sells: residential, commercial, industrial and agricultural systems; net-metering paperwork; panels, inverters, batteries, accessories.

## Brand commitments

- The logo's volt green on black. One accent. See `DESIGN.md`.
- Futuristic and minimal: few elements, large clear numbers, nothing decorative that does not explain something.
- 3D and interactivity are used to explain, never to impress.
- Honest by construction: every estimate shows its assumptions and the date of its data.

## Evidence on hand

| Have | Do not have |
|---|---|
| Logo (PNG), brand colour | Vector logo |
| Old site copy for services, guides, FAQs (60 questions), outlets | Any real project photo: all ten projects use a placeholder |
| Four outlet addresses and phone numbers, unconfirmed | Confirmed NAP, map pins, hours |
| Six social profile links | Real team names and photos (the old site's staff list looks like placeholder data) |
| Topics for ten blog posts | The posts themselves (all stubs) |
| | Real reviews with dates and links |
| | Prices, warranty terms, brand and dealer status, registrations |
| | Search Console and analytics access |

## Must never be invented

Prices and packages. Warranty terms. Counts of installs, customers, megawatts, years or staff. Ratings and review counts. Testimonials and customer names. Staff names. Certifications and registrations (AEDB, PPIB, PEC). Dealer or "authorised" status and "Tier-1" wording. Time promises. Savings percentages and payback periods stated as outcomes. Tariffs and net-metering rules without the source document. Whether a branch exists. Full list: `docs/BANNED-CLAIMS.md`.

## Principles

1. Show the working. A number without its assumptions is not shown.
2. One next step per screen, and it is WhatsApp.
3. Fast on a cheap phone before pretty on a laptop.
4. Say what is not known ("ask the outlet") rather than fill the gap.
5. Every page earns its URL with something the top results do not have.

## Accessibility

WCAG 2.2 AA. Token contrast is checked by script. Keyboard reachable throughout, visible focus, reduced motion honoured, tools usable with a screen reader (results announced as text, not only drawn). Base text never under 16 px. Touch targets at least 44 px.
