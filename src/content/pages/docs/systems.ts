/*
  System pages: the three types (on-grid, hybrid, off-grid) and the five sizes (3, 5, 10, 15, 20 kW). Written 23 Nov 2026.
  The size pages carry price queries, but prices are banned (CLAUDE.md rule 9), so they explain what the size runs,
  how many panels and how much roof it takes, what decides the cost, and route to the sizing card and the WhatsApp quote.
  Yield figures are modelled values from Global Solar Atlas (World Bank Group, ESMAP, Solargis), Lahore to Islamabad,
  per docs/research/agy-2026-11-23/sun.md. Panel maths uses 580 W panels and 2.6 m2 per panel (typical for the class).
*/
import { faq, make, pics } from "./shared";
import type { PageBlock, PageDoc } from "../types";

const LASTMOD = "2026-11-23";
const done = (d: PageDoc): PageDoc => ({ ...d, lastmod: LASTMOD });

const sizingBlock = (lead: string): PageBlock => ({ type: "sizing", heading: "Size it from your bill", lead });

/* ---------- Types ---------- */

const onGrid = done(make({
  path: "/solar-systems/on-grid/", kind: "system",
  title: "On Grid Solar System in Pakistan | SolarLink",
  description: "How an on grid solar system works in Pakistan, who it suits, what it needs, and how net metering fits in. SolarLink supplies and installs.",
  h1: "On-grid solar system",
  lead: "Panels and an inverter feed your building and the grid. No battery, so it is the lowest-cost and simplest design.",
  image: pics.homes,
  blocks: [
    { type: "prose", heading: "How an on-grid system works", paragraphs: [
      "Panels on the roof make direct current. A grid-tied inverter converts it to alternating current in step with the grid and feeds your distribution board. Whatever your building uses in that moment comes from the panels first; the grid tops up the rest, and at night the grid supplies everything. If the panels make more than you use, the surplus flows out through the meter.",
      "There is no battery, which is the whole point. The grid is your storage. That removes the most expensive and shortest-lived part of a solar installation and leaves a design with very little to go wrong: panels, an inverter, cables and a structure.",
    ] },
    { type: "diagram", heading: "How the power flows", mode: "on-grid" },
    { type: "feature", heading: "On-grid in one line", text: "Solar by day, grid by night, no battery to buy or replace. It cuts the bill; it does not keep the lights on in a cut.", tone: "sunken" },
    { type: "prose", heading: "The catch: it switches off when the grid does", paragraphs: [
      "A grid-tied inverter stops when the grid fails. That is an anti-islanding safety rule: a roof that kept feeding a dead line could electrocute a lineman repairing it. So a house with only an on-grid system is dark in a cut, even at noon with full sun. If your area loses power for hours, that is the single most important thing to weigh.",
      "Some homes accept it because cuts are short or rare, and a small UPS or generator covers the gap. Others find it unacceptable and move to a hybrid design. Our guide to on-grid, hybrid and off-grid goes through the decision.",
    ] },
    { type: "facts", heading: "Good to know", items: [
      { label: "Suits", value: "Homes and businesses with a steady grid and a big daytime load: offices, shops, schools, clinics and houses with ACs running by day" },
      { label: "Pairs with", value: "Net metering: surplus goes to the grid and is credited, subject to the 2026 prosumer rules" },
      { label: "Keep in mind", value: "No backup in a cut. The inverter has a service life, and the array needs periodic cleaning" },
      { label: "Parts", value: "Panels, structure, on-grid inverter, DC and AC cables, breakers, surge protection and earthing" },
    ] },
    { type: "prose", heading: "What it can and cannot do for your bill", paragraphs: [
      "On-grid solar replaces the units you would have bought from the grid in the daytime, starting with the dearest slab. In a slab tariff the last units cost the most, so a system that trims the top slab can save more rupees than its share of units would suggest. NEPRA's residential tariff of February 2026 (S.R.O. 279(I)/2026) steps from a few rupees a unit in the protected slabs to well above Rs 40 a unit at the top for unprotected consumers; check the current sheet for your company before you work the numbers.",
      "It does not touch fixed charges, taxes on what you still import, or units used after sunset. Net billing, as reported for the 2026 prosumer regulations, credits exports at a lower rate than you pay for imports, so the best results come from using solar power in the building rather than exporting it.",
    ] },
    { type: "prose", heading: "What to ask in a quote", paragraphs: [
      "Ask for the inverter's model and its maximum input voltage and current, and the panel's rated power and temperature coefficient. Check that the panel string voltage stays inside the inverter's window on the hottest and coldest day. Ask who handles the net metering application and whether the price includes it. Ask what is covered if the inverter fails in the first years, and who comes out.",
    ] },
    { type: "steps", heading: "How an on-grid job runs", items: [
      { title: "Bill and roof", text: "You send a recent bill and photos of the roof." },
      { title: "Survey and design", text: "We check area, direction and shade, and choose the size and the inverter." },
      { title: "Installation", text: "Structure, panels, inverter, cabling, protection and earthing." },
      { title: "Net metering", text: "Application, inspection and the bi-directional meter." },
      { title: "Switch-on", text: "The system goes live once the meter is fitted and the agreement signed." },
    ] },
    faq("Questions about on-grid systems", [
      ["How do I choose between the three types?", "It depends on how reliable your grid is and what you need to run in a cut. A steady grid and a daytime load point to on-grid. Frequent long outages point to hybrid. No grid at all means off-grid. Send a recent bill and tell us about your power cuts and we will advise."],
      ["Does an on-grid system work during load-shedding?", "No. The inverter shuts off when the grid fails, as a safety rule. Add a battery and a hybrid inverter if you need backup."],
      ["Do I need net metering with an on-grid system?", "You do not need it to run the system, but without it you cannot legally export, and surplus has no value. Most owners apply."],
      ["Can I add a battery later?", "Sometimes. It is easier if you chose an inverter that can be upgraded or a hybrid-ready model. Say so at the quote stage."],
      ["How much roof does it need?", "About 5 to 6 square metres of panel per kW, and a little more for walkways and spacing. A 5 kW system needs roughly 30 to 35 square metres."],
    ]),
    { type: "sizing", heading: "Size it from your bill", lead: "Move the slider to see a rough system size for your bill. It is an estimate: the site survey confirms it." },
    { type: "links", heading: "Read next", items: [
      { label: "Hybrid systems", text: "Add a battery for backup in a cut.", href: "/solar-systems/hybrid/" },
      { label: "Net metering support", text: "How we file and follow the application.", href: "/services/net-metering-support/" },
      { label: "How solar works", text: "A plain guide from sunlight to the meter.", href: "/how-solar-works/" },
    ] },
  ],
  related: [{ label: "All solar systems", href: "/solar-systems/" }, { label: "Home solar", href: "/services/residential-solar/" }, { label: "Hybrid systems", href: "/solar-systems/hybrid/" }, { label: "Get a quote", href: "/get-quote/" }],
}));

const hybrid = done(make({
  path: "/solar-systems/hybrid/", kind: "system",
  title: "Hybrid Solar System in Pakistan | SolarLink",
  description: "Hybrid solar system explained for Pakistan: battery backup plus grid savings, what to put on the backup circuit, and how to size the battery.",
  h1: "Hybrid solar system",
  lead: "A hybrid inverter works with a battery, so chosen loads keep running when the grid is off, and it can still connect to the grid.",
  image: pics.homes,
  blocks: [
    { type: "prose", heading: "How a hybrid system works", paragraphs: [
      "A hybrid system has panels, a hybrid inverter and a battery, and it stays connected to the grid. In daylight the panels feed your loads and charge the battery. When the sun goes down the battery supplies the loads on the backup circuit. When the grid fails the inverter disconnects from it and keeps the backup circuit alive, then reconnects when the grid returns.",
      "That makes it the answer to the question a pure on-grid system cannot answer: what happens in a cut. It also gives you more control over when you buy from the grid, for example topping the battery up off-peak where the tariff differs by time of day.",
    ] },
    { type: "diagram", heading: "How the power flows", mode: "hybrid" },
    { type: "feature", heading: "Hybrid in one line", text: "A system that saves on the bill and keeps what matters on in a cut, at the price of a battery.", tone: "sunken" },
    { type: "prose", heading: "The backup circuit decides everything", paragraphs: [
      "You do not back up the whole house. The usual layout is a backup panel carrying lights, fans, a fridge, the router and perhaps one AC, with the heavy loads (geysers, irons, extra ACs, a motor) left on the main panel. The size of the battery and the inverter follows from what is on that backup panel and for how long you want it.",
      "A worked example: lights, fans, a fridge and a router draw about 600 W together. Over a four hour evening cut that is 2.4 kWh. Add one inverter AC at about 1.2 kW running two of those hours and you add 2.4 kWh more. A usable battery of 5 kWh covers it with a small margin. The battery backup calculator on this site does that sum for your own appliance list.",
    ] },
    { type: "facts", heading: "Good to know", items: [
      { label: "Suits", value: "Areas with frequent or long power cuts; homes with a fridge, fans and a router that must not stop; small shops and clinics with a critical load" },
      { label: "Pairs with", value: "The grid for the bill saving, and net metering where you want to export a surplus" },
      { label: "Keep in mind", value: "A battery adds cost and has a service life, and it needs a ventilated, shaded place; size it to the loads, not to the roof" },
      { label: "Parts", value: "Panels, structure, hybrid inverter, battery with its protection, a backup panel and the usual cables and earthing" },
    ] },
    { type: "prose", heading: "Battery chemistry in brief", paragraphs: [
      "Lithium iron phosphate (LiFePO4) batteries are the common choice now: they allow a deeper daily discharge, last more cycles and need little upkeep. Lead-acid, including tubular types, costs less per kWh up front but is usually run to a shallower depth, and wants topping up with water in the flooded kind. Neither is better in every case, and the products page explains how to read a battery datasheet.",
      "What matters is usable capacity in kWh, the number of cycles to a stated end-of-life capacity at a stated depth of discharge, and the maximum continuous output in kW. A battery that can hold energy but cannot deliver the AC's start-up current will trip, so compare output as well as capacity.",
    ] },
    { type: "prose", heading: "Hybrid and the 2026 rules", paragraphs: [
      "A hybrid system can be connected for net metering like an on-grid one. Because exports are credited at a lower rate than imports under net billing (NEPRA prosumer regulations, S.R.O. 251(I)/2026, as reported), there is a case for charging the battery from surplus solar and using it in the evening, rather than exporting at noon and importing at night. The saving depends on your tariff and how the inverter is set, and we check both.",
    ] },
    { type: "steps", heading: "How a hybrid job runs", items: [
      { title: "List what must stay on", text: "Appliance by appliance, with watts and hours. The load calculator helps." },
      { title: "Survey", text: "Roof, battery location, the electrical panel and where the backup panel can go." },
      { title: "Design", text: "Array, hybrid inverter, battery capacity and output, and the backup panel wiring." },
      { title: "Installation", text: "Structure, panels, inverter, battery, backup circuit, earthing and protection." },
      { title: "Net metering", text: "Filed if you want to export." },
      { title: "Handover", text: "We set the battery limits, test a simulated cut and explain the app." },
    ] },
    faq("Questions about hybrid systems", [
      ["What is the difference between hybrid and on-grid?", "A hybrid system has a battery and keeps chosen loads running in a cut. An on-grid system has no battery and shuts off with the grid."],
      ["How big a battery do I need?", "Add up the watts on the backup circuit, multiply by the hours you want covered and compare it with the usable capacity of the battery. The battery backup calculator does the sum."],
      ["Can a hybrid system run my AC at night?", "Only if the battery and inverter can deliver the AC's power for the hours you want, which is a large battery. Most homes back up fans, lights and a fridge, and run the AC on the grid or by day."],
      ["Can I start on-grid and add a battery later?", "Yes if you choose a hybrid-ready inverter at the start. It costs a little more at the outset and saves a replacement later."],
      ["How long does a battery last?", "It depends on the chemistry, the depth of discharge and the heat. Read the cycle life and the end-of-life capacity on the datasheet and keep it somewhere cool."],
      ["Do I still need net metering?", "Only if you want to export. A hybrid system that never exports can run without it, but check the rules for your connection."],
    ]),
    sizingBlock("Move the slider to see a rough array size for your bill. The battery is sized separately, from your backup loads."),
    { type: "links", heading: "Read next", items: [
      { label: "Battery backup calculator", text: "Work out battery size from your appliances.", href: "/tools/battery-backup-calculator/" },
      { label: "Batteries", text: "Types and how to read a datasheet.", href: "/products/batteries/" },
      { label: "On-grid systems", text: "The lower-cost design without backup.", href: "/solar-systems/on-grid/" },
    ] },
  ],
  related: [{ label: "All solar systems", href: "/solar-systems/" }, { label: "Home solar", href: "/services/residential-solar/" }, { label: "On-grid systems", href: "/solar-systems/on-grid/" }, { label: "Get a quote", href: "/get-quote/" }],
}));

const offGrid = done(make({
  path: "/solar-systems/off-grid/", kind: "system",
  title: "Off Grid Solar System in Pakistan | SolarLink",
  description: "Off grid solar systems for farms, remote houses and sites with no grid: panels, battery bank and inverter, sized to the whole load including the night.",
  h1: "Off-grid solar system",
  lead: "A system with no grid connection: panels, a battery bank and an inverter supply everything.",
  image: pics.farms,
  blocks: [
    { type: "prose", heading: "How an off-grid system works", paragraphs: [
      "Panels charge a battery bank through a charge controller, or through the inverter if it has one built in. The inverter turns battery power into alternating current for the building. There is no grid to fall back on, so everything you use, day and night, comes from the panels and the batteries. A backup generator is sometimes added for long cloudy spells.",
      "Because there is no second supply, off-grid design is the least forgiving. An undersized battery means the lights go out at two in the morning. An undersized array means the battery never fills in December. So the sizing starts from the worst month, not the average one.",
    ] },
    { type: "diagram", heading: "How the power flows", mode: "off-grid" },
    { type: "feature", heading: "Off-grid in one line", text: "Power where the grid does not reach, and it has to carry the night too.", tone: "sunken" },
    { type: "prose", heading: "Sizing from the worst month", paragraphs: [
      "Global Solar Atlas puts daily irradiation at a good tilt in Lahore at about 3.5 kWh per square metre in January against 6.3 in May, with similar spreads in Islamabad and Sargodha. A system sized for May will fall short in winter, and one sized for January will waste a lot in spring. Off-grid designers choose the worst month the owner cannot live without, then accept a generator for the odd bad week.",
      "The sum has four steps: list every load with its watts and hours, add them to a daily kWh, size the battery for the night plus a day or more of autonomy, then size the array to recharge the battery and carry the day load in that worst month.",
    ] },
    { type: "facts", heading: "Good to know", items: [
      { label: "Suits", value: "Farms, remote houses and cabins, pumps, communication sites and anywhere the grid does not reach or costs too much to extend" },
      { label: "Pairs with", value: "A generator as a rare backup, and efficient loads: DC or inverter appliances, LED lights, a chest freezer instead of an upright" },
      { label: "Keep in mind", value: "It must be sized to the whole load including the nights, so it is the largest design per unit of power used" },
      { label: "Parts", value: "Panels, structure, charge controller or off-grid inverter, battery bank, protection, cabling and earthing" },
    ] },
    { type: "prose", heading: "Battery bank and voltage", paragraphs: [
      "Off-grid banks are usually at 24 V or 48 V, because higher voltage means lower current and thinner, cheaper cable. The bank holds the night plus some days of reserve. Lithium iron phosphate allows deeper daily cycling; lead-acid is cheaper to buy and heavier to carry. Whichever you choose, ventilation, a stable base and a fused disconnect are part of the job.",
      "Keep the heavy, short-duration loads in check. A motor that draws three times its rated power at start-up, or a kettle that pulls 2 kW, can trip an inverter far smaller than the battery bank it sits on. We size the inverter to the largest start-up, not only the daily energy.",
    ] },
    { type: "prose", heading: "Water pumping is a special case", paragraphs: [
      "A solar tubewell is off-grid, but it usually does without batteries: the pump runs from the sun and the water is stored in a tank or channel instead. That is cheaper than storing electricity, and it is covered on the farms page.",
    ] },
    { type: "steps", heading: "How an off-grid job runs", items: [
      { title: "Load list", text: "Every appliance, its watts, the hours you use it and whether it has a start-up surge." },
      { title: "Survey", text: "Site, shade, the battery place and the cable runs." },
      { title: "Design", text: "Battery capacity and voltage, array size, charge controller, inverter and protection." },
      { title: "Installation", text: "Structure, panels, controller, batteries, inverter, earthing and a labelled disconnect." },
      { title: "Commissioning", text: "Charging, load tests and a briefing on what to switch off in a poor week." },
    ] },
    faq("Questions about off-grid systems", [
      ["How much does an off-grid system cost compared with on-grid?", "More per kW of load, because it needs a battery bank and a larger array to cover the nights. We quote after seeing your load list."],
      ["Can an off-grid system run an air conditioner?", "Yes, with a large enough inverter and battery, but an AC is the first load to size a system out of reach. Consider a fan, evaporative cooling or a day-only AC."],
      ["Do I need a generator as well?", "Not always. It is a common backup for the odd week of cloud or smog in winter."],
      ["Can I connect it to the grid later?", "A different inverter is needed for a grid-tied or hybrid design. It is simpler to plan for it now if the grid is coming."],
      ["How long do the batteries last?", "It depends on the chemistry, the depth of discharge and the heat. Check the cycle life on the datasheet."],
    ]),
    { type: "links", heading: "Read next", items: [
      { label: "Solar for farms and tubewells", text: "Pumps that run directly from the sun.", href: "/services/agricultural-solar/" },
      { label: "Batteries", text: "Types and how to compare them.", href: "/products/batteries/" },
      { label: "Load calculator", text: "Add up your appliances.", href: "/tools/load-calculator/" },
      { label: "Hybrid systems", text: "If the grid is near, consider this first.", href: "/solar-systems/hybrid/" },
    ] },
  ],
  related: [{ label: "All solar systems", href: "/solar-systems/" }, { label: "Farm solar", href: "/services/agricultural-solar/" }, { label: "Batteries", href: "/products/batteries/" }, { label: "Get a quote", href: "/get-quote/" }],
}));

/* ---------- Sizes ---------- */

type Size = {
  kw: number;
  panels: number;
  panelKw: string; // installed panel rating, kW
  panelM2: number;
  roofM2: string;
  yearly: string; // kWh a year, Lahore to Islamabad modelled
  daily: string; // units a day
  monthly: string;
  suits: string;
  runs: string;
  electrical: string;
  fit: string; // paragraph on what sizing rule applies
  image: PageDoc["image"];
  faqs: [string, string][];
  next: [number, number];
};

const data: Size[] = [
  {
    kw: 3, panels: 6, panelKw: "3.48", panelM2: 16, roofM2: "20 to 25", yearly: "4,400 to 4,700", daily: "12 to 13", monthly: "370 to 390",
    suits: "A small to medium house that uses around 300 to 400 units a month, where the bills are driven by fans, lights, a fridge and one or two ACs on a single-phase connection.",
    runs: "In the daytime, a fridge, a washing machine, lights, fans, a TV, a router and one 1 ton inverter AC at the same time, with the grid covering what the panels cannot. A 3 kW system does not run three ACs on its own.",
    electrical: "Most 3 kW homes are on a single-phase supply. The sanctioned load on the meter must be at least the system size for net metering, so a house with a small sanctioned load may need an increase first. A 3 kW array fits a single-phase on-grid or hybrid inverter.",
    fit: "At this size the roof is rarely the limit; the bill and the sanctioned load are. It suits the first step into solar for a house with moderate use, and a hybrid version with a 5 kWh battery is a common way to keep fans, lights and a fridge on through a cut.",
    image: pics.homes, next: [5, 10],
    faqs: [
      ["How many units does a 3 kW system make?", "Modelled yield for a well-placed fixed array in Lahore, Sargodha and Islamabad is roughly 1,466 to 1,559 kWh per kW a year (Global Solar Atlas), so about 4,400 to 4,700 kWh from 3 kW, or 12 to 13 units a day on average. Dust, shade and heat make real output lower, and winter days make far less than May ones."],
      ["Can a 3 kW system run an AC?", "Yes, one inverter AC of 1 to 1.5 ton in the daytime. It will not carry two or three ACs alone."],
      ["Is 3 kW enough for my house?", "If you use about 300 to 400 units a month, it can cover most of it. Above that, a larger system is likely. Send a bill and we compare."],
    ],
  },
  {
    kw: 5, panels: 9, panelKw: "5.22", panelM2: 23, roofM2: "30 to 35", yearly: "7,300 to 7,800", daily: "20 to 21", monthly: "610 to 650",
    suits: "A medium house using about 500 to 700 units a month, with two or three ACs in summer, or a small shop or office with a steady daytime load.",
    runs: "In the sun, two inverter ACs along with the usual household load, or a shop's lights, a cooler, a fridge and a computer. At night everything is on the grid unless you add a battery.",
    electrical: "A 5 kW system can use a single-phase inverter on many connections, though some distribution companies prefer a three-phase connection above a certain size. Check the sanctioned load on your bill: the system cannot exceed it under the 2026 prosumer rules (S.R.O. 251(I)/2026, as reported).",
    fit: "It is the size most houses with a summer bill spike land on: big enough to take the top slab off the bill and small enough for an ordinary roof. Plan for about 30 to 35 square metres of clear, unshaded roof.",
    image: pics.homes, next: [3, 10],
    faqs: [
      ["How many units does a 5 kW system make?", "Roughly 7,300 to 7,800 kWh a year in modelled conditions (Global Solar Atlas, optimal tilt), which is about 20 to 21 units a day on average. Real roofs make less, and December is a fraction of May."],
      ["How many panels is 5 kW?", "Nine panels of 580 W, which is 5.22 kW of panels. Eight is 4.64 kW. The inverter is sized to match, usually at 5 kW."],
      ["Can a 5 kW system run my ACs?", "It can run two inverter ACs in the daytime along with the other loads. At night they run on the grid, or on a battery if you add one."],
      ["Do I need a hybrid inverter at 5 kW?", "Only if you want backup in a cut. For bill savings alone, an on-grid inverter does the job at lower cost."],
    ],
  },
  {
    kw: 10, panels: 18, panelKw: "10.44", panelM2: 47, roofM2: "60 to 70", yearly: "14,700 to 15,600", daily: "40 to 43", monthly: "1,220 to 1,300",
    suits: "A large house using about 1,000 to 1,300 units a month, or a shop, clinic, school or small office with a big daytime load.",
    runs: "In the sun, four or five ACs with the rest of a large household, or a small workshop's machines and lights. A battery for backup would be sized separately to the loads you choose.",
    electrical: "At 10 kW most connections are three-phase, and a three-phase inverter is the usual choice. The sanctioned load must cover the system. Where the roof is a mix of directions, two inverter inputs, one per roof face, make better use of it than a single string.",
    fit: "This is where roof area starts to bite. At 60 to 70 square metres of clear roof, a double-storey house may have to split the array across two roofs. Check the shade of water tanks, staircases and neighbours' buildings, because one shaded panel in a string can lower the whole string.",
    image: pics.business, next: [5, 15],
    faqs: [
      ["How many units does a 10 kW system make?", "Modelled at about 14,700 to 15,600 kWh a year for a well-placed fixed array (Global Solar Atlas), or roughly 40 to 43 units a day on average. Actual output depends on shade, dust and the inverter."],
      ["How much roof does 10 kW need?", "Eighteen panels of 580 W cover about 47 square metres. With walkways and row spacing, plan for 60 to 70 square metres."],
      ["Is it three-phase?", "Usually. Confirm with your meter and the distribution company, and size the inverter for it."],
      ["Will it need a transformer check for net metering?", "The distribution company checks the transformer on your feeder before it approves the connection. As reported, the cap is 80 percent of the transformer rating across all systems on it."],
    ],
  },
  {
    kw: 15, panels: 26, panelKw: "15.08", panelM2: 68, roofM2: "85 to 105", yearly: "22,000 to 23,400", daily: "60 to 64", monthly: "1,830 to 1,950",
    suits: "A very large house, a guest house, a small hotel, a clinic or a mid-sized shop or office floor using about 1,500 to 2,000 units a month.",
    runs: "Most of the daytime load of a big household with several ACs, or a commercial premises with refrigeration, lights and equipment. Heavy industrial machines need a closer look at start-up current.",
    electrical: "Three-phase, with a three-phase inverter or two smaller ones. At this size the cable runs, the distribution board capacity and the earthing are real design items, not afterthoughts. The sanctioned load must be at least the system size.",
    fit: "Because the array is large, the structure and the roof need a check: concrete slab or sheet, wind load and the direction of the slope. A 15 kW commercial site tends to use most of the output on the spot, which keeps the export question small.",
    image: pics.business, next: [10, 20],
    faqs: [
      ["How many units does a 15 kW system make?", "Roughly 22,000 to 23,400 kWh a year in modelled conditions (Global Solar Atlas), or around 60 to 64 units a day on average. Real output is lower."],
      ["How many panels is 15 kW?", "Twenty-six panels of 580 W, which is 15.08 kW of panels, covering about 68 square metres."],
      ["Is 15 kW a home or commercial system?", "Both. A large house or a business can be at this size. It matters for the tariff category, so check how your connection is billed."],
      ["Do I need approval above 15 kW?", "A net metering application is needed at any size. The regulator's concurrence requirements depend on the size and have changed during 2026, so we check the current text when we file."],
    ],
  },
  {
    kw: 20, panels: 35, panelKw: "20.30", panelM2: 91, roofM2: "115 to 140", yearly: "29,300 to 31,200", daily: "80 to 85", monthly: "2,440 to 2,600",
    suits: "A commercial building, a school, a factory floor with moderate load, a large farmhouse or a mixed-use building using about 2,000 to 2,800 units a month.",
    runs: "The daytime load of most medium commercial sites: ACs, lights, refrigeration, computers and small machines. For motors and heavy plant, the demand in kW matters more than the units.",
    electrical: "Three-phase, usually two or three inverters or one larger unit, with proper protection on both sides and a measured earth. The main panel, the cable size and the transformer all have to take the extra current. The sanctioned load must be at least 20 kW.",
    fit: "At 115 to 140 square metres of roof, this is a project with a structural check, a layout drawing and a shutdown plan for the tie-in. It is also the size where monitoring each inverter pays off, because one weak string can go unnoticed for months.",
    image: pics.business, next: [15, 10],
    faqs: [
      ["How many units does a 20 kW system make?", "Roughly 29,300 to 31,200 kWh a year in modelled conditions (Global Solar Atlas), or about 80 to 85 units a day on average. Plan on less after shade, dust and heat."],
      ["How much roof does 20 kW need?", "Thirty-five panels of 580 W cover about 91 square metres. With spacing and walkways, plan for 115 to 140 square metres."],
      ["Does a 20 kW system need a load-flow study?", "As reported, a load-flow study is required from 250 kW. Below that the distribution company checks the transformer capacity. Confirm with them for your feeder."],
      ["Should I add a battery?", "Only if an outage costs you more than the battery would. Most 20 kW systems are on-grid. A battery on one critical circuit is the usual compromise."],
    ],
  },
];

const size = (s: Size): PageDoc => {
  const { kw } = s;
  return done(make({
    path: `/solar-systems/${kw}kw/`, kind: "system",
    title: `${kw}kW Solar System Price in Pakistan | SolarLink`,
    description: `What a ${kw}kW solar system runs: about ${s.panels} panels, ${s.roofM2} m2 of roof, ${s.daily} units a day. What sets the price, and how to get a quote.`,
    h1: `${kw} kW solar system`,
    lead: `A ${kw} kW system is the rated power of its panels added together: about ${s.panels} panels of 580 W. We do not print a price here, because it turns on your roof, your inverter choice and whether you want a battery, but this page tells you what the size does and what moves the cost.`,
    image: s.image,
    blocks: [
      { type: "facts", heading: "At a glance", items: [
        { label: "Rated size", value: `${kw} kW` },
        { label: "Panels at 580 W", value: `${s.panels} (${s.panelKw} kW of panels)` },
        { label: "Panel area", value: `About ${s.panelM2} square metres` },
        { label: "Roof to plan for", value: `${s.roofM2} square metres of clear roof` },
        { label: "Output, modelled", value: `${s.daily} units a day on average, ${s.yearly} kWh a year` },
        { label: "System types", value: "On-grid, hybrid or off-grid" },
        { label: "Price", value: "Quoted in writing after a survey" },
      ] },
      { type: "prose", heading: `What a ${kw} kW system suits`, paragraphs: [s.suits, s.runs] },
      { type: "prose", heading: "What it makes, and what that depends on", paragraphs: [
        `Global Solar Atlas, the World Bank Group and Solargis tool, models a fixed array at a good tilt in Lahore at about 1,466 kWh per kW a year, in Sargodha at 1,513 and in Islamabad at 1,559. For ${kw} kW that is ${s.yearly} kWh a year, or about ${s.monthly} units a month, a smooth average that hides a lot of spread: spring is the strongest, December and January the weakest, and a monsoon week dips any array. A real roof loses some of it to shade, dust, cable loss and heat.`,
        "Use it as a ceiling, not a promise. A well-kept array on a clear roof can come close to it; a dusty one with a shaded corner will not. The inverter's monitoring screen is the honest meter after installation.",
      ] },
      { type: "prose", heading: "Panels, roof and wiring", paragraphs: [
        `${s.panels} panels of 580 W is ${s.panelKw} kW of panels, so the panel total sits a little above ${kw} kW; the inverter is chosen to suit it. Each panel is about 2.6 square metres, which gives about ${s.panelM2} square metres of panel. With walkways for cleaning and row spacing to avoid self-shading, plan for ${s.roofM2} square metres of clear roof. Rating, dimensions and weight come from the datasheet of the panel actually quoted, so check them.`,
        s.electrical,
      ] },
      { type: "prose", heading: "How it fits", paragraphs: [s.fit] },
      { type: "prose", heading: "What decides the cost", paragraphs: [
        "The price of a system of this size moves with a handful of choices, and a written quote should show each of them.",
        "The inverter: on-grid costs the least, hybrid more, and the brand and warranty terms change it again. The battery, if any: it is often the biggest single line, and its size depends on the loads you back up. The panels: rating, type and make. The structure and roof work: a flat concrete roof, a tilted metal roof and a ground mount cost different amounts. The cabling, protection and earthing, which rise with distance and with three-phase. And the paperwork: the net metering application and meter fees from your distribution company.",
        "Market rates for panels and inverters move, so a figure quoted last year may not hold. That is why SolarLink gives a written price for your site rather than a number on a web page.",
      ] },
      { type: "feature", heading: "Get the number for your house", text: "Use the card below to turn your bill into a rough size, then send it on WhatsApp. We confirm the size at a site survey and send a written quote you can compare.", tone: "night" },
      sizingBlock(`Move the slider to your bill. If it lands near ${kw} kW, this page is the one to read; if not, the card will tell you which size to look at.`),
      { type: "steps", heading: "From bill to switch-on", items: [
        { title: "Send a bill", text: "A photo of a recent bill, plus roof photos if you have them." },
        { title: "Survey", text: "We check the roof, shade, the electrical panel and the meter, and confirm the size." },
        { title: "Written quote", text: "System size, equipment list and price, so you can compare line by line." },
        { title: "Installation", text: "Structure, panels, inverter, cabling, protection and earthing, tested before handover." },
        { title: "Net metering", text: "We prepare and file the application with your distribution company." },
      ] },
      faq(`Questions about a ${kw} kW system`, [
        ...s.faqs,
        [`What is the price of a ${kw} kW solar system in Pakistan?`, "It depends on the inverter type, the battery, the panels, the roof work and the paperwork, so a single figure would mislead. Use the sizing card or send a recent bill on WhatsApp, and you will get a written quote for your site."],
        ["Does it need a battery?", "Only if you want backup in a power cut. An on-grid system has none and costs less."],
      ]),
      { type: "links", heading: "Other sizes and guides", items: [
        { label: `${s.next[0]} kW system`, text: "The next size to compare.", href: `/solar-systems/${s.next[0]}kw/` },
        { label: `${s.next[1]} kW system`, text: "Another common size.", href: `/solar-systems/${s.next[1]}kw/` },
        { label: "Solar calculator", text: "Work out size from units or rupees.", href: "/solar-calculator/" },
        { label: "Load calculator", text: "Add up what you want to run.", href: "/tools/load-calculator/" },
      ] },
    ],
    related: [{ label: "On-grid systems", href: "/solar-systems/on-grid/" }, { label: "Hybrid systems", href: "/solar-systems/hybrid/" }, { label: "All solar systems", href: "/solar-systems/" }, { label: "Get a quote", href: "/get-quote/" }],
  }));
};

export const systems: PageDoc[] = [onGrid, hybrid, offGrid, ...data.map(size)];
