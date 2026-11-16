# Idea bank: tools, 3D and daily-use features

The aim: a site people remember, come back to and use as a calculator, and that SolarLink's own staff open every day while talking to customers. Each tool is its own page that can rank for the question it answers, and each ends in a WhatsApp message that already carries the customer's numbers.

Sources: `docs/research/agy/6-tool-ideas.md` (16 tools from Tesla, Enpal, Otovo, Octopus, Google Sunroof and others, plus a long list of ideas) and the competitor review in `1a-competitors.md` and `1b-competitors.md`. Any figure in those notes (payback years, export rates, savings percentages) came from an AI assistant and is unverified; none is used here.

## What competitors do not have

From the eight Pakistani solar sites reviewed:

- Nobody shows the money. The few calculators give a system size; none shows the bill before and after under the current billing rules.
- Nobody models load shedding: what stays on, for how long, on which battery.
- Nobody uses 3D or lets a visitor see panels on a roof like theirs.
- Nobody speaks Urdu or Roman Urdu. Every site is English only.
- Forms are long (5 to 11 fields). Only three of eight have a WhatsApp button.
- Almost nobody has city pages. Listicle blogs take the "solar company in <city>" searches instead.

That is the opening: plain tools that answer the questions customers actually ask, on every phone, ending in WhatsApp.

## The signature piece: the SolarLink Console

One memorable object carried across the site, rather than a different widget on every page. A single panel, styled like an instrument (dark surface, volt-green readings, mono figures), where a visitor sets three things: **city, monthly units or bill, and what must stay on during an outage.** Everything else on the site reads from it:

- the home page shows their system size, units made per month and what it runs;
- each tool page opens with their numbers already filled in;
- system-size pages mark "this is the size for your bill";
- the WhatsApp button's message carries the summary.

The values stay in the browser (local storage), so a returning visitor finds their home already set up. That is the "come back to it" hook, and it needs no account and no backend.

## Tools, in build order

Difficulty: S is days, M is one to two weeks, L is more. "Needs" is the data that must be verified or supplied first.

### At launch

| # | Tool and URL | What it answers | Inputs | Shows | Why they come back | Staff use | Needs | Size |
|---|---|---|---|---|---|---|---|---|
| 1 | **Solar calculator** `/solar-calculator/` | "What size system do I need and what does it do to my bill?" | City, monthly units or bill amount, connection type | System size, panels, roof area, units made per month by season, bill before and after | Re-run when tariffs change or usage grows | The first screen in any walk-in conversation | Verified tariff table per distribution company; sun data per city; SolarLink's sizing rules | M |
| 2 | **Bill breakdown** `/tools/bill-breakdown/` | "Why is my bill this much?" | Distribution company, units, protected or not, peak and off-peak if on time-of-use | Each slab, each tax and surcharge, and the slab line they are close to crossing | Every month when the bill arrives | Explains to a customer where their money goes before talking solar | Verified NEPRA slab rates and surcharges with notification date | S |
| 3 | **Net billing calculator** `/tools/net-billing-calculator/` | "Is solar still worth it under the new rules?" | System size, day and night share of use, battery or none | Units used directly, units exported, export credit, what a battery changes | Re-run when rules or rates change | Answers the most common worry with their own numbers | The current regulation and export rate, read from the NEPRA document itself | M |
| 4 | **Load calculator** `/tools/load-calculator/` | "What can I run on solar?" | Tap appliances: fans, lights, fridge, inverter ACs by tonnage, water motor, iron, washing machine | Running load, starting surge, inverter size, daytime and night split | Planning a new AC or appliance | Replaces the paper load sheet at the counter | Appliance wattage table (standard values, sourced) | S |
| 5 | **Battery backup calculator** `/tools/battery-backup-calculator/` | "How long will my lights and fans last in an outage?" | Chosen loads, outage hours, battery type | Hours of backup, battery size needed, what to switch off to last the night | Before summer; after adding load | Sizing batteries live with the customer | Battery depth-of-discharge values per type | S |

### Next

| # | Tool and URL | What it answers | Note | Size |
|---|---|---|---|---|
| 6 | **AC on solar** `/tools/ac-on-solar/` | "Kitne AC chalenge?" How many ACs a system runs by day and by night | The single most asked walk-in question. Three sliders, one picture | S |
| 7 | **Roof planner** `/tools/roof-planner/` | "How many panels fit on my roof?" | Pick plot size in marla or kanal, tick the obstacles (water tank, mumty, stairs). The 3D piece of the site: see below | M |
| 8 | **Tube-well calculator** `/tools/tubewell-solar-calculator/` | Pump horsepower, depth and hours to panels, drive size and diesel replaced | For the Sargodha farm market. Needs SolarLink's agricultural team's sizing rules | M |
| 9 | **On-grid, hybrid or off-grid?** (on `/solar-systems/`) | Four questions, one recommendation with the reason | A decision aid inside the hub page, not a page of its own | S |
| 10 | **Tubular to lithium** (on `/products/batteries/`) | Cost over five years of replacing tubular batteries against one lithium pack | Needs real replacement intervals and prices from SolarLink | S |
| 11 | **Quote sheet** | Any tool's result as a clean one-page summary to save as PDF or send on WhatsApp, to show the family | Uses the browser's print to PDF: no server needed | S |
| 12 | **Net-metering application tracker** (on `/services/net-metering-support/`) | The steps, documents and who does what, as a checklist the customer ticks off | Steps taken from the distribution company's own published procedure | S |

### Later, if the first ones earn their keep

- **Bill photo reader:** photograph the paper bill; the tool reads units and tariff. Needs a small backend and a vision model, and a privacy note.
- **Roman Urdu assistant:** a chat that answers from the site's own content in the language the customer writes in. Knowledge comes only from approved content; it never quotes a price.
- **Summer heat and dust loss:** what 45°C and a month of dust do to output; sells cleaning visits. Needs sourced loss figures.
- **Solar against a bank deposit:** payback framed as a return. Only with a clear "estimate, not advice" line and sourced rates.
- **EV and e-bike charging on solar.**
- **Customer area:** warranty card, service requests, net-metering status. Needs accounts and a backend; a different project.

## 3D, kept simple

A real-time 3D scene on the home page would cost the Lighthouse score that ranking depends on, on exactly the mid-range Android phones most visitors use. So 3D is used in four small, cheap ways, each with a still image that shows first and stays if the device is slow or the visitor prefers reduced motion:

1. **The energy-flow house (home page and `/how-solar-works/`).** An isometric cutaway of a Pakistani house drawn in SVG: panels, inverter, battery, meter, grid. A time slider from morning to night moves volt-green pulses along the wires and changes where power comes from. No WebGL: it is SVG and CSS transforms, so it runs on anything. This is the image people remember.
2. **The roof planner.** One small house model (under 300 KB) with a flat roof, water tank and mumty. Panels snap on in fours as the size changes. Loaded only when the visitor opens the tool; a 2D top view is the fallback.
3. **The product turntable (product pages).** An inverter or battery the visitor drags to rotate: a pre-rendered sequence of about 36 images, not a live model. Hotspots name the parts.
4. **Depth in the Console.** CSS 3D only: the panel tilts a few degrees under the cursor or with the phone, and readings sit on layers. Cheap, and it gives the "instrument" feel.

Rules: nothing 3D loads before the page's main content has painted; every piece has a poster image; the h1 never animates in; the whole site passes with JavaScript switched off, with the tools as the only exception.

## Daily-use ideas for the business (beyond the site visitor)

- **Counter mode.** A staff link opens any tool full-screen with large type and no navigation, for the showroom tablet. Staff fill it in with the walk-in customer, then send the result to the customer's WhatsApp.
- **QR on every quote and brochure** opening the calculator with that customer's numbers already in it.
- **The monthly bill habit.** A "check this month's bill" link customers save: bill breakdown first, the solar comparison under it.
- **Outage planner card.** The backup result as a shareable image: "With this system your fans, lights and fridge stay on for N hours."
- **After-install page for each customer size** ("your 10 kW system: what to expect each season, how to read the inverter app, when to clean"), linked by QR from the handover folder. Useful content that also earns its place in search.
- **Seasonal reminders** on the site, driven by date: cleaning before summer, battery check before monsoon.
- **Rate-change notes.** When NEPRA changes a tariff or rule, one dated update on the guide and the tools' data file. Being the site that is current is itself the ranking strategy for the net-metering searches.

## What makes this honest

Every tool states its assumptions under the result and shows the date and source of its tariff data. No tool prints a price unless SolarLink supplies one and chooses to show it (`priceMode` in the PRD). Results are labelled estimates, and the next step is always a real person on WhatsApp.
