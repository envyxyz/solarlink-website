# Homepage blueprint

Read `DESIGN.md` first. Facts come from `growth/Notes/Business Profile.md`; anything marked "website says" there is unconfirmed and must stay a flagged placeholder in content.

## Thesis

SolarLink is the link between the sun and your meter: one company that sizes it, supplies it, installs it and files the net metering. The page proves that in order: size it yourself, see who trusts the kit, see what we do, see it built, come to a shop.

## Order

| # | Section | Job | Shape | Source of the pattern |
|---|---|---|---|---|
| 0 | Nav | find things, one primary action | floating glass pill | faers header without badges |
| 1 | Hero: live sizing | the signature; start a quote in the first screen | image stage with two glass cards | faers configurator + inspo-1 hero |
| 2 | Brand belt | the equipment brands SolarLink installs | marquee, faded edges | business-alliance logo strip |
| 3 | About and numbers | who we are in four numbers | text left, 2 by 2 stats right | business-alliance about |
| 4 | What we do | four services | heading left, four cards right | nexarch services grid |
| 5 | The link | how a system works, panel to grid | wide line diagram on a sunken stage | "what is faer" diagrams |
| 6 | Shop preview | panels, inverters, batteries, UPS | night stage with a product carousel | creaenergy dark section + coat card |
| 7 | Projects | built work | heading left, three tall image cards | nexarch "spaces that make a difference" |
| 8 | Reviews | real Google reviews with date | row of cards, one inverted | nexarch testimonials |
| 9 | Outlets | Lahore, Islamabad, Sargodha | three cards: address, phone, WhatsApp, directions | |
| 10 | Questions | five most asked, link to the full FAQ | accordion | |
| 11 | Closing call | one last quote prompt | image stage with a glass card | inspo-1 closing block |
| 12 | Footer | everything else | night stage, giant faded wordmark | inspo-1 footer |

## 1. Hero spec

Desktop (64rem and up): an image stage inset by the gutter, top edge 12px below the floating nav (the stage starts at 96px; the nav bottom is at 84px), height `min(100svh - 120px, 860px)`, radius `--r-stage`. Background: the CGI house render, house on the right, calm sky on the left.

- **Top left**, inside the stage with 48 to 64px padding: the h1 in `display`, ink colour, max 11ch. Under it one `lead` sentence, max 36ch. The h1 and image paint at once, no entry animation.
- **Bottom left**: the sizing card, glass, 400px wide, radius `--r-card`, padding 24px.
  - Row 1: label "Your monthly bill" and a `SegmentedControl` on the right: "Rs" | "Units".
  - Row 2: the value in `figure` size with tabular figures (`Rs 45,000` or `600 units`).
  - Row 3: `Slider`. Rs mode 5,000 to 300,000 in steps of 1,000. Units mode 100 to 5,000 in steps of 50.
  - Row 4: primary `Button` 52px, full width: "Send this system on WhatsApp", with the round WhatsApp `IconButton` twin. Under it a `caption`: "Estimate only. A free site survey confirms the size."
- **Bottom right**: the result card, glass, three `Chip stat` rows that pop with spring.bubbly when the value changes: system size (`10 kW`), panels (`18 panels`), monthly generation (`1,200 units`). A small `caption` names the assumptions.
- **On the roof**: panels are drawn on one `<canvas>` that fills the hero art box, on the roof plane. The roof's four corners are stored as percentages of the image in content; a homography maps a flat grid onto that quad, so the grid sits in correct perspective at every size. Each panel is projected and drawn as vectors at the device pixel ratio: aluminium frame, dark cell area, cell lines (only where their spacing is 3 device pixels or more), a thin front edge. One sheen gradient runs across the whole array and one contact shadow sits under it. Popping in and out are drawn on the canvas with the same spring and fade. Changing the value adds or removes panels one at a time, 30ms apart, each popping with spring.bubbly from `scale(0.8)`. Maximum panels = what fits the roof; above that the card says "Larger than this roof: we will design a ground or multi-roof system."
- A thin lime link line runs from the roof edge down to the result card and draws once on load (after the image has painted).

Phone (under 48rem): the stage is the image at 4:5 with the h1 above it on `--ground`; panels still pop on the roof; the sizing card sits under the image as a solid `--surface` card (no glass over nothing) with the three results as a row of chips above the slider. Primary button stays in the first screen at 390 by 844.

Sizing maths (all constants in `content.ts` with a `source` and a `confirmed` flag):
```
units      = mode === "Rs" ? bill / ratePerUnit : units
systemKw   = units / (30 * sunHours * performanceRatio)   // round up to the next 0.5 kW
panels     = ceil(systemKw * 1000 / panelWatts)
generation = round(systemKw * 30 * sunHours * performanceRatio, to 10 units)
```
Starting constants, all unconfirmed placeholders: `ratePerUnit` 50, `sunHours` 5, `performanceRatio` 0.78, `panelWatts` 580. No price and no savings figure is shown until the client confirms rates (`priceMode`).

WhatsApp message (prefilled, from content template): "Assalam o Alaikum SolarLink. My monthly bill is about Rs 45,000. Your website sized a 10 kW system (18 panels). Please arrange a free site survey." Sent to the Lahore number until the visitor picks a city.

## 2. Brand belt

No visible label: the belt (accessible name from content) is the moving row across the page width. Brand logos, greyscale at 80% opacity, moving slowly, edges faded. Hover: the belt stops, the hovered logo turns full colour at 100% opacity and scale 1.1 with spring.bubbly. Brands come from content with `confirmed: false` until the client confirms the list (website says: Canadian Solar, Growatt, Fronus, LONGi, Huawei, GoodWe). Wordmarks set in type are used until official logo files are supplied.

## 3 to 12, in brief

3. **About and numbers.** h2 "One company from survey to net metering." A lead paragraph from the business profile's medium description. Four `StatBlock`s, each with a source; unconfirmed ones render as a neutral dash in production builds. Candidates: founded year, cities, kW installed, projects.
4. **What we do.** Four `Card`s: Homes, Business and industry, Farms and tubewells, Net metering. Each: a CGI image tile, a `title`, two lines, a text link.
5. **The link.** `LinkDiagram` on a sunken stage: sun, panel, inverter, home, battery, grid, joined by the lime line; five short captions. A `SegmentedControl` switches On-grid | Hybrid | Off-grid and the line re-routes (battery and grid appear or drop out).
6. **Shop preview.** Night stage. h2 "Panels, inverters and batteries, over the counter." `SegmentedControl` for the four categories, a row of `ProductCard`s, a text link to all products. Prices follow `priceMode`.
7. **Projects.** Three `ProjectCard`s from content, link to all projects.
8. **Reviews.** Real Google reviews typed into content with name, date and outlet, plus the rating and count with an as-of date. No review schema.
9. **Outlets.** Three cards from content. Lahore first, marked head office. Tap-to-call and WhatsApp per outlet.
10. **Questions.** Five from the existing FAQ, rewritten to 40 to 60 word answers.
11. **Closing call.** Image stage (dusk render of the same house, panels on, lights on) with a glass card: h2, primary button "Get a free quote", quiet button "Call the Lahore shop".
12. **Footer.** Outlets, hours, link columns, socials, legal name and NTN when supplied, giant faded "SolarLink" wordmark clipped by the stage edge.

## Performance and SEO floor for this page

- The server HTML holds the full h1, all section text and links. The sizing card works without JavaScript as a link to the quote page.
- LCP is the hero image (preloaded AVIF, under 180 KB at 1440 wide) or the h1. Target LCP under 2.0 s on a mid phone, CLS 0, total JavaScript for the page within the budget in CLAUDE.md rule 11 (React and Next baseline plus 50 KB).
- One h1. Title, description, canonical, Open Graph, `SolarEnergyCompany` or `LocalBusiness` schema for each live outlet, `Organization`, `WebSite`, `BreadcrumbList`. No `AggregateRating`.
- Lenis loads when the page is idle (fine pointer, no reduced motion only); the page is complete and usable before it arrives. There is no animation library.
