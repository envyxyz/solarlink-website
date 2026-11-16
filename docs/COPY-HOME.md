# Homepage copy deck

Sections 2 to 12 of `HOMEPAGE.md`. Hero is final (h1 "Solar sized to your bill."). Every value below goes into `src/content.ts` as `{ value, confirmed, source }`. `[confirm with client]` must be resolved before production.

## Page meta

- Title (55): `Solar Company in Pakistan | Solar Solutions | SolarLink` (the primary query from `KEYWORD-MAP.md`, then the old title's phrase)
- Meta description (146): `SolarLink sizes, supplies and installs solar for homes, businesses and industry. Shops in Lahore, Islamabad and Sargodha. Get a free site survey.` ("industry", not "farms": the farm service is unconfirmed)
- Share image: `/images/brand/og-banner.jpg`, 1200 by 630 (the live site's banner, kept at its live path). Alt: "SolarLink: Solar Solution & Installation"

## 1. Hero (lines added or changed after QA)

- Estimate line under the result figures, shown at every width: "Estimate. Assumes Rs 50 a unit, 5 sun hours a day and 580 W panels. Your own bill's rate may differ." The numbers are filled from the sizing constants in content.
- Main button: "Send this system on WhatsApp" with the round WhatsApp twin once the Lahore WhatsApp number is confirmed. Until then the button reads "Get a free quote" (the no-JavaScript label), goes to the quote page, and there is no twin.
- Screen readers hear one line half a second after the slider rests: "{size} system, {n} panels, {units} units a month."
- Brand belt (when shown): pause and play button, labels "Pause the brand list" and "Play the brand list".

## 2. Brand belt

- Label: "Equipment we install"
- Brands: [confirm with client] (site says Canadian Solar, Growatt, Fronus, LONGi, Huawei, GoodWe). Show only after confirmation.
- Belt alt/aria: "Solar equipment brands SolarLink installs"

## 3. About and numbers

- h2: One company from survey to net metering.
- Lead: SolarLink is a solar company in Pakistan with shops in Lahore, Islamabad and Sargodha. Cut your bill and stop worrying about load-shedding. SolarLink sizes your system, supplies the panels, inverters and batteries, installs them and files your net metering. One team from the first visit to the last form.
- Button: See what we do (link to section 4)

| value | label | source | confirmed |
|---|---|---|---|
| 3 | Cities with a SolarLink shop | Client, WhatsApp, 16 Nov 2026 (Lahore, Islamabad, Sargodha) | true |
| [confirm with client] | Years installing solar | Business Profile: "website says 2018", unconfirmed | false |
| [confirm with client] | kW installed | none | false |
| [confirm with client] | Projects completed | none | false |

## 4. What we do

- h2: Solar for every kind of meter.
- Lead: Pick your type. We size it, supply it and install it.
- Cards (each: title, two lines, link, image alt):
  1. Homes. "Rooftop solar sized to your monthly bill. On-grid or hybrid, with the net metering filed for you." Link: See home solar. Alt: "Solar panels on the roof of a Pakistani family home"
  2. Business and industry. "Solar for shops, offices and factories, from a small rooftop to a large plant. Cut the daytime bill that eats your margin." Link: See business solar. Alt: "Rows of solar panels on a factory roof"
  3. Farms and tubewells. "Run your tubewell and farm loads on sunlight. Less diesel, less dependence on the grid." Link: See farm solar. Alt: "Solar panels beside a tubewell on farmland"
  4. Net metering. "Send spare power to the grid and earn credit on your bill. We prepare and file the application with your DISCO." Link: See net metering. Alt: "A solar meter and inverter on a wall"

## 5. The link

- h2: From the sun to your meter.
- Lead: See how a solar system moves power. Switch the type to see the route change.
- Captions: 1. "The sun hits the panels." 2. "Panels send power to the inverter." 3. "The inverter runs your home." 4. "Spare power fills the battery." 5. "Spare power goes to the grid."
- Switch labels: On-grid | Hybrid | Off-grid
- On-grid: Tied to the grid, no battery, spare power goes out and you draw at night.
- Hybrid: Tied to the grid with a battery, so lights and fans stay on in load-shedding.
- Off-grid: Runs on batteries alone, for places with no reliable grid.
- Diagram alt: "Diagram of sun, panels, inverter, home, battery and grid joined by a lime line"
- Button: Size my system (to hero sizing card)

## 6. Shop preview

- h2: Panels, inverters and batteries, over the counter.
- Lead: Walk in, or send us the spec you want. We reply with today's rate.
- Price slot on every card: Ask for today's rate
- Card button: Ask on WhatsApp. Link: See all products
- Tab labels: Solar panels | Inverters | Batteries | UPS and backup. Phone labels (under 40rem): Panels | Inverters | Batteries | UPS
- Sample spec lines no longer repeat the name: panels "Half-cut cells, aluminium frame" or "Aluminium frame, tempered glass"; inverters "Battery-ready, wall mounted" or "No battery needed, wall mounted"; batteries "Wall or floor mounted" or "Floor standing"; UPS "Plug-in backup for lights and fans", "Plug-in backup for a few rooms", "Can pair with solar panels". All still samples.
- All 12 items are `sample: true` (generic, no brand, price, warranty or stock). Replace with real stock before launch.

| Category | Sample items | Alt text |
|---|---|---|
| Solar panels | 580 W N-type panel; 550 W mono panel; 450 W mono panel | "A solar panel, front view" |
| Inverters | 5 kW hybrid inverter; 10 kW on-grid inverter; 12 kW hybrid inverter | "A solar inverter on a wall" |
| Batteries | 5 kWh lithium battery; 10 kWh lithium battery; 200 Ah lead-acid battery | "A lithium battery unit" |
| UPS and backup | 1 kVA home UPS; 3 kVA home UPS; 5 kVA solar-ready UPS | "A home UPS unit" |

## 7. Projects

- h2: Built, connected, running.
- Lead: Real systems from our Lahore and Sargodha work.
- Buttons: See the project (per card), See all projects
- Source: live site pages `projects_*.html`. Their before and after bills, photo gallery and customer quote are marked "placeholder" on the live site: do not use them.

| Name | City | Size | Line | Alt |
|---|---|---|---|---|
| DHA Phase 5 | Lahore | 15 kW on-grid | A 15 kW on-grid system for a residential villa, from survey to net metering registration. | "15 kW solar system on a villa roof in DHA Phase 5, Lahore" |
| Gulberg III | Lahore | 20 kW on-grid | A 20 kW on-grid commercial installation, from survey to net metering registration. | "20 kW solar system on a commercial building in Gulberg III, Lahore" |
| Near Company Bagh | Sargodha | 10 kW on-grid | A 10 kW agricultural system powering a tubewell, from survey to net metering registration. | "10 kW solar system powering a tubewell near Company Bagh, Sargodha" |

Photos: [confirm with client] (live pages say real photography is "coming soon"; use renders only if labelled).

## 8. Reviews

- h2: What customers say on Google.
- No usable reviews. `gbp/findings.md` and the JSON files hold only ratings and counts (Lahore listing 4.8 from 71, checked 13 Nov 2026), never review text. Rating and count are banned until the client confirms in writing.
- Placeholder cards (three): name [confirm with client], date [confirm with client], listing [confirm with client], text [confirm with client]. Do not ship this section until real text is typed in.
- Button: Read our reviews on Google. Link: [confirm with client] (the Lahore Google reviews URL).

## 9. Outlets

- h2: Visit a shop.
- Lead: Three shops. Walk in, call or message. While no shop shows a phone or WhatsApp number (production until confirmed): "Three shops. Walk in and talk to us."
- Card buttons: Call this shop | Message on WhatsApp | Get directions

| Field | Lahore (head office) | Islamabad | Sargodha | confirmed |
|---|---|---|---|---|
| Address | Shop No. 05, Munawar Center, Opp. State Bank Building, 30-The Mall Road, Lahore | House No. 514, North Service Road, Sector I-14/3, Islamabad | Block No. 05, Aslahy Wali Gali, Near Company Bagh, Sargodha | true (client, 16 Nov 2026) |
| Postcode | 54000 (schema says 54700) | 44000 | 40100 | false |
| Phone | 042-37117713, 042-37117714 | 051-5204555 | 048-3720111 | false |
| WhatsApp | 0321-8425777 | 0339-3555000 | 0313-7084973 | false |
| Hours | Mon to Sat 9:00 AM to 6:00 PM, Sunday closed | same | same | false (Google shows other hours) |

- Map pins: [confirm with client]
- Alt text: "SolarLink shop front, Lahore" | "SolarLink shop front, Islamabad" | "SolarLink shop front, Sargodha" (photos [confirm with client])

## 10. Questions

- h2: Questions people ask us
- Lead: The five we hear most. The full list is on the FAQ page.
- Button: See all questions

1. **What is a solar energy system?** A solar system turns sunlight into electricity. Panels make DC power. An inverter changes it to AC, which runs your lights, fans and machines. If your system is grid-tied, spare power can go to the national grid through net metering. SolarLink sizes the system to your bill, supplies the kit and installs it.
2. **What types of solar systems does SolarLink install?** SolarLink installs three types. On-grid links to the grid and needs no battery. Hybrid links to the grid and adds a battery, so power stays on in load-shedding. Off-grid runs on batteries alone, for places with no reliable grid. We help you pick the one that fits your bill and your outages.
3. **Can a solar system power my home during load-shedding?** A standard on-grid system switches off when the grid goes down. This is a safety feature. A hybrid system has a battery, so it keeps lights, fans and chosen appliances running through load-shedding. How much it runs depends on the battery size, so tell us which appliances you need and we size it.
4. **What happens on cloudy or rainy days?** Panels work on daylight, not only direct sun. On a cloudy or rainy day they make less power than on a clear day. Rain also washes dust off the panels. We size your system with ordinary weather in mind, so the survey checks your roof, shade and usage.
5. **Do you handle net metering?** Yes. For a grid-tied system, SolarLink prepares and files your net metering application with your DISCO and follows it through to commissioning. Net metering lets spare power go to the grid and earn credit against your bill. Approval timing is set by the DISCO, so ask us about your case.

(Source for 1 to 4: live `faqs.html`, rewritten; 5 from Business Profile "net metering and after-sales", filing detail is "website says".)

## 11. Closing call

- h2: Send your bill. Get your system size.
- Body: Tell us what you pay each month. We size the system and book a free site survey.
- Buttons: Get a free quote (primary) | Call the Lahore shop (quiet)
- Image alt: "A house at dusk with solar panels on the roof and the lights on" is for closing-dusk.jpg when it exists. Until then the hero render stands in, with its own alt: "Render of a flat-roofed house seen from the street in soft morning light, its roof still bare"

## 12. Footer

- Column headings: Shop | Solar | Company | Outlets | Hours | Follow us (Outlets and Hours are the shop block above the columns; Hours show per shop once confirmed; Follow us shows once the handles are confirmed)
- Shop links: Solar panels, Inverters, Batteries, Accessories, All products (UPS and backup has no page in `src/routes.ts` yet, so no link; Accessories is the nearest page that exists)
- Solar links: Home solar, Business solar, Farm solar, Net metering, Projects
- Company links: About SolarLink, Questions, Guides, Blog, Contact, Get a free quote
- Outlets: Lahore (head office), Islamabad, Sargodha (as section 9)
- Hours: Mon to Sat 9:00 AM to 6:00 PM, Sunday closed (unconfirmed)
- Socials: Facebook, Instagram, LinkedIn, TikTok, YouTube (from Business Profile; Pinterest optional)
- Legal links: Privacy (`/privacy-policy/`), Sitemap (`/sitemap/`)
- Legal line: "SolarLink is a trading name of [confirm with client]. NTN [confirm with client]." Shown only once both facts are confirmed. Until then the line is "(c) 2026 SolarLink. All rights reserved."
- Wordmark: SolarLink (decorative; drawn by a CSS pseudo-element, so assistive tech does not see it)

## Unconfirmed items used

- Section 2: full brand list
- Section 3: years installing, kW installed, projects completed (values)
- Section 6: all 12 sample products (stock list)
- Section 7: project photos; project facts come from live pages that call parts of themselves placeholders
- Section 8: all review text, names, dates, listing, Google reviews URL (none found)
- Section 9: postcodes, phones, WhatsApp, hours, map pins, shop photos
- Section 10, Q5: DISCO filing detail ("website says")
- Section 12: legal name, NTN, hours, social handles' login/ownership
