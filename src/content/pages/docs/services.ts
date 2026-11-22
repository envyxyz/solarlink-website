/*
  The five service pages. Written 23 Nov 2026. Every doc stays confirmed:false until the client signs off.
  Public facts (sun yield, NEPRA rules) name their source in the text. No SolarLink price, warranty, time, count or
  brand-dealer claim appears here; the sizing card and WhatsApp quote carry the price conversation.
*/
import { faq, make, pics } from "./shared";
import type { PageBlock } from "../types";

const LASTMOD = "2026-11-23";
const stamp = <T extends ReturnType<typeof make>>(d: T): T => ({ ...d, lastmod: LASTMOD });

const sizing = (lead = "Move the slider to see a rough system size for your bill. It is an estimate: the site survey confirms it."): PageBlock => ({ type: "sizing", heading: "Size it from your bill", lead });
const flow = (mode: "on-grid" | "hybrid" | "off-grid", heading = "How the power flows"): PageBlock => ({ type: "diagram", heading, mode });

const sunNote = "Global Solar Atlas (World Bank Group, ESMAP, Solargis) models a well-placed fixed array at roughly 1,466 kWh per kW a year in Lahore, 1,513 in Sargodha and 1,559 in Islamabad. A real roof with some shade, dust and heat loss makes less than that.";

export const services = [
  stamp(make({
    path: "/services/residential-solar/", kind: "service",
    title: "Residential Solar Systems for Homes in Pakistan | SolarLink",
    description: "Residential solar for homes in Lahore, Islamabad and Sargodha: sized from your bill and roof, supplied and installed, net metering filed for you.",
    h1: "Solar for your home",
    lead: "A system sized to your electricity bill and your roof, supplied and installed by SolarLink, with the net metering paperwork filed for you.",
    image: pics.homes,
    blocks: [
      { type: "prose", heading: "Why homes in Pakistan go solar", paragraphs: [
        "A household bill is a slab tariff: the more units you burn, the higher the rate on the last ones. Once a family runs two or three air conditioners through a Lahore summer, the top slabs do most of the damage, and those are exactly the units a rooftop array replaces first. That is the money case. The second one is the lights: a hybrid system keeps chosen loads running through a cut.",
        "The sun is not the problem here. " + sunNote + " Spring is the strongest stretch, December and January the weakest, and a monsoon week will dip any array. A good design plans for the bad months, not the good ones.",
      ] },
      { type: "prose", heading: "What the slabs mean for your bill", paragraphs: [
        "NEPRA's residential tariff of February 2026 (S.R.O. 279(I)/2026; check your distribution company's current sheet, as rates are adjusted) charges a household under 5 kW of sanctioned load that is not in the protected group Rs 22.44 a unit for the first 100 units and Rs 47.20 a unit above 700, before fuel adjustments and taxes. A household at 900 units pays the top rate on its last 200. Solar takes those units out first, because the array covers the daytime units you would otherwise buy at the top of the ladder.",
        "That is also why the same 5 kW system saves a household using 900 units far more rupees than one using 300: the 300-unit house is mostly in the cheaper slabs already. Ask for the saving to be worked out slab by slab, with your own bill, and treat any single percentage with suspicion.",
      ] },
      { type: "prose", heading: "What a home system is made of", paragraphs: [
        "Panels on the roof turn sunlight into direct current. An inverter converts it to the alternating current your house uses and decides what to do with any surplus. A mounting structure holds the panels at a fixed tilt, and cables, breakers, surge protection and earthing tie it together safely. A hybrid system adds a battery and a hybrid inverter.",
        "SolarLink supplies the whole set and installs it. You deal with one company for the equipment, the work on the roof and the grid paperwork, instead of three.",
      ] },
      { type: "feature", heading: "A system sized to your house, not a package", text: "Two homes with the same bill can need different systems: one has a clear south-facing roof, the other is shaded by a neighbour's building. We size from your bills and the roof in front of us.", image: pics.homes, tone: "sunken" },
      { type: "steps", heading: "From first message to switch-on", items: [
        { title: "Send a recent bill", text: "A photo of your last electricity bill, or the units for the last six months, is enough to start. Summer and winter months differ, so more months give a better answer." },
        { title: "Tell us what you want from it", text: "Lower bill only, or backup through cuts as well? That one answer decides between on-grid and hybrid." },
        { title: "Site survey", text: "An engineer checks the roof area, direction, shade, structure and the electrical panel and meter, then sizes the system." },
        { title: "Proposal", text: "You get the system size, the equipment list and the price in writing, so you can compare it with other quotes line by line." },
        { title: "Supply and installation", text: "Structure, panels, inverter, cabling, protection and earthing, installed on site and tested." },
        { title: "Net metering", text: "We prepare and file the application with your distribution company and follow it through inspection and the meter change." },
        { title: "Handover", text: "You are shown how to read the inverter app or display and what to clean, and what to do if something trips." },
      ] },
      { type: "facts", heading: "Rough size by monthly units", items: [
        { label: "300 units a month", value: "About 3 kW, 6 panels of 580 W" },
        { label: "600 units a month", value: "About 5.5 kW, 10 panels" },
        { label: "1,000 units a month", value: "About 9 kW, 16 panels" },
        { label: "1,500 units a month", value: "About 13 kW, 23 panels" },
        { label: "2,000 units a month", value: "About 17.5 kW, 31 panels" },
      ] },
      { type: "prose", heading: "How to read that table", paragraphs: [
        "The sizes above cover the whole month's units, using the same assumptions as the sizing card on this page: 5 sun hours a day, 78 percent of the rated output reaching your meter, 580 W panels. They are a starting point. Many homes size smaller than a full offset because the roof is small, the sanctioned load caps the system, or the budget is better spent on a battery.",
        "Under the 2026 NEPRA prosumer rules (S.R.O. 251(I)/2026, notified 9 February 2026), a new grid-connected system cannot exceed the sanctioned load of the connection, so a house with a small sanctioned load may need a load increase before a large array is allowed. Check the current text at nepra.org.pk; your distribution company confirms the figure for your meter.",
      ] },
      flow("hybrid", "How a hybrid home system moves power"),
      { type: "prose", heading: "On-grid or hybrid for a house", paragraphs: [
        "An on-grid system is panels, an on-grid inverter and the grid. It costs less than any battery system, has nothing to replace but the inverter eventually, and uses the grid as its storage. Its catch: when the grid goes down, the inverter shuts off by design, so a pure on-grid house sits dark in a cut even at noon. That is an anti-islanding safety rule, not a fault.",
        "A hybrid system adds a battery and a hybrid inverter. Chosen circuits (lights, fans, a fridge, the router, sometimes one AC) stay on in a cut, and the battery can cover the evening. It costs more, the battery has a service life, and you must decide which loads sit on the backup circuit. The battery backup calculator and the guide on on-grid, hybrid and off-grid explain the trade in more detail.",
      ] },
      { type: "prose", heading: "What good equipment means", paragraphs: [
        "Ask for the datasheet of the panel and inverter in the quote: rated power, efficiency, temperature coefficient, and the standards each is tested to. A panel or inverter should also be one the maker supports in Pakistan, because service access matters more at year seven than the sticker does today.",
        "We do not list brands on this page. Which brands SolarLink stocks is a question for your nearest shop, and the answer can change between orders. Whatever is proposed, you should be able to read its model number on your quote and on the box.",
      ] },
      { type: "prose", heading: "What to expect on installation day", paragraphs: [
        "The crew fixes the structure to the roof first, then mounts the panels, then runs DC cables to the inverter and AC cables to your distribution board. Earthing and surge protection go in before the switch-on. Most of the noise is drilling and most of the mess is cable routing, so tell us early if a baby sleeps by day or a part of the roof is used for something else.",
        "Before leaving we test the system, show you the monitoring screen and walk the roof with you. The schedule for your house depends on its size and roof; it is written into the proposal rather than promised on this page.",
      ] },
      { type: "prose", heading: "Cleaning and upkeep", paragraphs: [
        "Dust is the main loss in Punjab. Rinse the panels with clean water early in the morning or after sunset when the glass is cool, and never spray cold water on hot glass. Keep a note of the daily generation figure in the inverter app: a sudden drop on a clear day means something needs checking, whether a shaded corner, a tripped breaker or a dirty array.",
      ] },
      sizing(),
      faq("Questions about home solar", [
        ["How much does a residential solar system cost in Pakistan?", "It depends on the size, the equipment, whether it has a battery, and the roof work. We do not quote a price on this page because the same 5 kW can differ a great deal between an on-grid and a hybrid design. Use the sizing card or send a bill on WhatsApp and you will get a written quote for your house."],
        ["What size solar system do I need for my home?", "Start from your monthly units. As a rule of thumb, divide the units by about 117 to get kW with the sizing card's assumptions. Then limit it by the roof area and the sanctioned load. A site survey confirms the final number."],
        ["How long does residential installation take?", "The crew time depends on the size of the system and how complicated the roof is. The schedule goes in your written proposal, and net metering approval runs on the distribution company's own timetable, which we do not control."],
        ["Will my bill really go to zero?", "No promise of that. Under the 2026 prosumer rules exports are credited at a set rate that is lower than the retail rate, and a connection still has fixed and minimum charges, taxes and the evening units you import. A well-sized system cuts the bill sharply; it does not guarantee a zero."],
        ["What happens to my solar system during load-shedding?", "An on-grid system switches off when the grid fails, as a safety rule. A hybrid system with a battery keeps the loads on the backup circuit running."],
        ["Does SolarLink help with net metering for homes?", "Yes. We prepare the documents, file the application with your distribution company, follow the inspection and attend the meter change."],
        ["What warranty comes with the system?", "Panels and inverters carry the manufacturer's warranty, and installation work can carry the installer's. Get each term in writing in the quote, with the start date and what it covers. [confirm with client]"],
        ["How many solar panels do I need?", "Divide the system size by the panel rating. A 5 kW system with 580 W panels is 9 panels (8.6 rounded up); a 10 kW system is 18. Each panel is roughly 2.6 square metres, so 10 panels need about 26 square metres of clear roof before you allow for walkways and row spacing."],
        ["What is the payback period?", "It is the system cost divided by the yearly bill saving, so it depends on your tariff slab, how much of the output you use yourself and the price you pay. A household on a high slab with daytime load pays back faster than one on a low slab. Ask for the calculation in the proposal and check its assumptions."],
        ["Can solar panels run an AC in Pakistan?", "Yes. On-grid, the AC runs from the panels in the daytime and from the grid otherwise. A 1.5 ton inverter AC draws roughly 1 to 1.5 kW while the compressor runs, so one AC needs around 2 to 3 panels' worth of output in the sun. Running ACs at night needs a battery sized for it."],
        ["Does SolarLink provide after-sales support?", "Call or message the shop that installed your system. The terms of support, and how quickly a visit can be arranged, are set out in the paperwork you receive. [confirm with client]"],
        ["What is the best solar system for a home in Pakistan?", "There is no single best. For a house with few cuts and a high daytime load, on-grid with net metering is the lowest-cost route. For a house that loses power for hours, hybrid with a battery. The right one is the one your bill and your cuts justify."],
      ]),
      { type: "links", heading: "Read next", items: [
        { label: "On-grid solar systems", text: "How an on-grid system works and what it suits.", href: "/solar-systems/on-grid/" },
        { label: "Hybrid solar systems", text: "Battery backup with grid savings.", href: "/solar-systems/hybrid/" },
        { label: "Solar calculator", text: "Work out system size from units or rupees.", href: "/solar-calculator/" },
        { label: "Net metering guide", text: "The rules in plain language, with sources.", href: "/net-metering-guide/" },
      ] },
    ],
    related: [{ label: "On-grid systems", href: "/solar-systems/on-grid/" }, { label: "Hybrid systems", href: "/solar-systems/hybrid/" }, { label: "Net metering support", href: "/services/net-metering-support/" }, { label: "Get a quote", href: "/get-quote/" }],
  })),

  stamp(make({
    path: "/services/commercial-solar/", kind: "service",
    title: "Commercial Solar Installation for Businesses | SolarLink",
    description: "Commercial solar for shops, offices, clinics and warehouses in Punjab and Islamabad: designed around daytime load, installed by SolarLink.",
    h1: "Solar for business",
    lead: "Shops, offices, clinics, schools and warehouses use most of their power in the daytime, which is when solar makes it.",
    image: pics.business,
    blocks: [
      { type: "prose", heading: "Why daytime load matters", paragraphs: [
        "A business that opens at nine and shuts at six runs its air conditioning, lights, computers and machines exactly when a roof array produces most. Power used on the spot never has to be exported, so none of it is credited at an export rate. That is why commercial sites often get a cleaner result from solar than homes whose big load is at night.",
        "The bills are the evidence. A commercial connection often has a time-of-use or peak and off-peak structure, and a fixed charge tied to the sanctioned load or the maximum demand. Solar cuts the units you buy in the day. It does little to the fixed charge, so any honest estimate separates the two.",
      ] },
      { type: "prose", heading: "What we look at first", paragraphs: [
        "We ask for several months of bills, because a shop that is quiet in winter and busy in June needs a different answer from one with steady load. Then we look at the roof or ground, the electrical panel, the sanctioned load, and any plan to add equipment soon.",
        "Three numbers shape the design: how many units you use between sunrise and sunset, your peak demand in kW, and how much usable area you have. A system that is bigger than the daytime load pushes surplus to the grid at the export rate; one that matches it keeps the money in the building.",
      ] },
      { type: "feature", heading: "Built around the hours you are open", text: "We size to the daytime load first and the roof second, so most of what the panels make is used on site.", image: pics.business, tone: "sunken" },
      { type: "steps", heading: "How a commercial job runs", items: [
        { title: "Share your bills", text: "Six to twelve months of bills show seasons, peak demand and the tariff category." },
        { title: "Site survey", text: "Roof or ground space, structure, shade, the electrical panel, cable routes and access for a crane or lift if needed." },
        { title: "Design and proposal", text: "System size, layout, inverter choice and protection, with the load and generation assumptions written out." },
        { title: "Supply", text: "Panels, inverters, structure, cabling and protection are ordered for your design." },
        { title: "Installation", text: "Work is planned around trading hours where the roof allows it." },
        { title: "Net metering", text: "Application, inspection, the bi-directional meter and commissioning, filed and followed for you." },
        { title: "Monitoring and handover", text: "You get a login for generation data and a clear list of what to check each month." },
      ] },
      { type: "facts", heading: "Systems we plan for", items: [
        { label: "Shops and retail", value: "Lights, fridges, ACs and signage on a single or three-phase connection" },
        { label: "Offices and clinics", value: "Steady daytime load, often with UPS equipment already in place" },
        { label: "Schools and halls", value: "High daytime load, quiet nights and holidays; the size plan allows for the holidays" },
        { label: "Warehouses and cold rooms", value: "Large flat roofs; cold rooms may want a battery or generator plan" },
      ] },
      flow("on-grid", "How an on-grid commercial system flows"),
      { type: "prose", heading: "On-grid first, battery only if it earns its place", paragraphs: [
        "Most commercial systems are on-grid: panels, three-phase inverters, and the grid as the night supply. There is no battery to replace and the inverter feeds the building directly. Where an outage costs real money, say a clinic with a vaccine fridge or a shop with a cold room, a hybrid inverter and a battery on the critical circuit can carry just that load while the rest of the building waits.",
        "We keep the battery small and on the critical circuit. Putting a whole building on batteries is rarely worth the cost and the space.",
      ] },
      { type: "prose", heading: "Net metering for a business", paragraphs: [
        "Commercial consumers can apply under the NEPRA (Prosumer) Regulations, 2026 (S.R.O. 251(I)/2026, notified 9 February 2026). As the notification is reported, new connections are billed under net billing: imported units are charged at your tariff and exported units are credited separately at a lower rate set by NEPRA, which is a change from the 1:1 netting of the 2015 regulations. The same report says the installed capacity cannot exceed the sanctioned load, and that the cumulative total on a distribution transformer is capped at 80 percent of its rating.",
        "These rules have been amended during 2026, so check the current text at nepra.org.pk before you commit to a design. We do that check for your case before we file.",
      ] },
      { type: "prose", heading: "Rented premises", paragraphs: [
        "A tenant needs the owner's written permission before anything goes on the roof or the meter changes, and the net metering application is made in the name of the consumer on the bill. If the lease is short, ask whether the system is something you may remove and re-fit elsewhere. A landlord who pays the bill may be the right party to own the system.",
      ] },
      { type: "prose", heading: "Keeping the business running during installation", paragraphs: [
        "Mounting and cabling can be done while you trade. The shutdown that matters is the short one when we tie the inverter into your distribution board, and we schedule it for your quietest hour. For a three-phase connection that outage is brief and planned in advance. Tell us about equipment that cannot lose power, such as servers and cold storage, and we plan around it.",
      ] },
      sizing("A rough size from the monthly bill. For a commercial site the survey and a read of your tariff category change it, so treat this as a first number."),
      faq("Questions about commercial solar", [
        ["How much can a business save with solar?", "It depends on the tariff category, how much of the daytime load the system covers and the system price, so we do not quote a percentage here. Send the bills and we show the calculation with every assumption listed, so you can test it."],
        ["What size commercial system do I need?", "Start from the daytime units and the peak demand in kW, then check the roof or ground area and the sanctioned load. A 10 kW array needs about 55 to 70 square metres of clear roof once you allow for spacing."],
        ["Can a business get net metering?", "Commercial consumers with a grid connection can apply under the NEPRA prosumer regulations. The size is limited by the sanctioned load, and your distribution company checks the transformer. We prepare and file the application."],
        ["How long does a commercial installation take?", "It depends on the size, the structure and the permits. The programme is part of the written proposal after the survey."],
        ["Is solar suitable for rented premises?", "Yes, if the owner agrees in writing and the lease is long enough for the system to make sense. Ask about removal and re-fitting."],
        ["What happens to operations during installation?", "Most of the work happens on the roof. The short shutdown to connect the inverter is planned for your quietest hour."],
        ["Is solar viable with so much load-shedding?", "On-grid solar saves units but switches off in an outage. If outages cost you money, add a battery or hybrid inverter to the critical circuit only."],
        ["Does net metering apply to commercial systems?", "Yes, subject to the same limits: the sanctioned load cap, the transformer limit and the distribution company's inspection."],
      ]),
      { type: "links", heading: "Related", items: [
        { label: "Industrial solar", text: "Larger plants for factories and big sites.", href: "/services/industrial-solar/" },
        { label: "On-grid systems", text: "How the grid-tied design works.", href: "/solar-systems/on-grid/" },
        { label: "Net metering support", text: "How we file and follow the application.", href: "/services/net-metering-support/" },
        { label: "Load calculator", text: "Add up your appliances and see the size they imply.", href: "/tools/load-calculator/" },
      ] },
    ],
    related: [{ label: "Industrial solar", href: "/services/industrial-solar/" }, { label: "On-grid systems", href: "/solar-systems/on-grid/" }, { label: "Net metering support", href: "/services/net-metering-support/" }, { label: "Get a quote", href: "/get-quote/" }],
  })),

  stamp(make({
    path: "/services/industrial-solar/", kind: "service",
    title: "Industrial & Large-Scale Solar Solutions | SolarLink",
    description: "Industrial solar plants for factories and large sites: designed to your load profile, roof or land and connection, then supplied and installed.",
    h1: "Solar for industry",
    lead: "Factories and large sites need a plant designed to their load, their roof or land and their connection, not a catalogue package.",
    image: pics.business,
    blocks: [
      { type: "prose", heading: "Start with the load profile", paragraphs: [
        "An industrial plant is sized from what the site draws hour by hour: which machines run, when the shifts change, and what the peak demand in kW is. Daytime shifts match solar well. A plant that runs around the clock gets less of its energy from panels, but solar still removes the most expensive daytime units.",
        "We ask for twelve months of bills, the connection's tariff and sanctioned load, and, if you have it, a load log from the meter. With that we can model which part of the daytime demand an array covers and how much surplus there would be.",
      ] },
      { type: "feature", heading: "Planned to the load, then to the roof", text: "Every site differs, so we start with a conversation and a survey rather than a package. Roof strength, available land and the transformer decide how big the plant can be.", image: pics.business, tone: "night" },
      { type: "facts", heading: "What we need from you", items: [
        { label: "Bills", value: "Twelve months of electricity bills, and a load log if you have one" },
        { label: "Site", value: "Roof or land available, with photos, drawings and roof material" },
        { label: "Connection", value: "Tariff category, sanctioned load, supply voltage and transformer details" },
        { label: "Goal", value: "What you want solar to cover: units, peak demand, or a part of a shift" },
        { label: "Constraints", value: "Production schedule, shutdown windows and safety rules on site" },
      ] },
      { type: "steps", heading: "How an industrial project runs", items: [
        { title: "Brief and data", text: "We collect the bills, the connection details and photos, and agree what the plant must achieve." },
        { title: "Site survey", text: "Roof structure and condition, available land, shade from chimneys and buildings, cable routes, the main panel and the transformer." },
        { title: "Design", text: "Array layout, string design, inverter and protection choice, cabling, earthing, lightning protection and the metering plan." },
        { title: "Approvals", text: "The application to the distribution company, and where the size requires it, the technical studies." },
        { title: "Supply and build", text: "Equipment is ordered to the design and built in phases that fit your shutdown windows." },
        { title: "Testing and commissioning", text: "Insulation, earthing and protection tests, inverter settings, then the meter and grid connection." },
        { title: "Monitoring", text: "Generation data goes to a dashboard so you can see each inverter against what it should be making." },
      ] },
      { type: "prose", heading: "Roofs and land", paragraphs: [
        "Metal-sheet roofs are common on factories. They are light, so the structure and the fixing method matter: we check the purlins, the sheet condition and any leaks before we put weight on them. On concrete roofs a ballasted or bolted structure is used, depending on the slab. Ground-mounted plants need a soil check, drainage and fencing, and they take more cable.",
        "As a rough rule, a kilowatt of panels covers 5 to 6 square metres, and with row spacing and walkways a flat roof needs 7 to 10 square metres per kW. A 100 kW array can therefore need most of a 1,000 square metre roof. We measure rather than guess.",
      ] },
      { type: "prose", heading: "Three-phase inverters and protection", paragraphs: [
        "Industrial plants use three-phase string inverters or a small number of central inverters, with DC isolators, surge protection on both the DC and AC sides, residual-current and over-current protection, and a proper earth grid. Poor earthing is the commonest cause of nuisance trips and damaged inverters, so we test it, record the reading and hand it over.",
        "Where the plant is large, an export-limiting or zero-export controller can keep the output below the connection's allowed export. That is a design choice to make with your distribution company, not a default.",
      ] },
      { type: "prose", heading: "Grid rules for large plants", paragraphs: [
        "The NEPRA (Prosumer) Regulations, 2026 (S.R.O. 251(I)/2026) cover distributed generation up to 1 MW as the notification is reported. Capacity is limited to the sanctioned load, the total on a distribution transformer is capped at 80 percent of its rating, and larger systems need a load-flow study. Amendments in April and August 2026 changed the approval route for some sizes. The text is at nepra.org.pk and the details of your case are for the distribution company, so we check both before design.",
        "Where a site is not allowed to export, or where net billing leaves little value in exports, a plant sized to the daytime load and run without export is a sound design.",
      ] },
      { type: "prose", heading: "Batteries and generators", paragraphs: [
        "Most industrial plants run without batteries. A generator or the grid supplies the night. A battery is worth modelling only when an outage costs a lot more than the battery, or when a peak-hour tariff makes shifting energy pay. We run the numbers before recommending one, and we say so when the answer is no.",
      ] },
      { type: "faq", heading: "Questions about industrial solar", items: [
        { id: "q1", question: "How big can an industrial solar plant be?", answer: "Under the 2026 prosumer rules the cap on a distributed system is 1 MW, and in every case the size is limited by the sanctioned load, the transformer and the roof or land. Larger plants follow a different route, outside this page." },
        { id: "q2", question: "Will solar cover my whole factory?", answer: "Rarely. It cuts the daytime units. Night shifts, and the fixed and demand charges, stay with the grid unless you add storage, and storage at factory scale is expensive." },
        { id: "q3", question: "How is the price decided?", answer: "By the size, the equipment, the roof or land work and the grid connection. We give a written price after the survey, with the equipment list, so it can be compared with other offers." },
        { id: "q4", question: "Do you handle the approvals?", answer: "Yes. We prepare and file the distribution company application and follow it through inspection and the meter change." },
        { id: "q5", question: "How long does a plant take to build?", answer: "It depends on the size, the structure and the approvals, so the programme is part of the written proposal after the survey." },
        { id: "q6", question: "Can the roof take the weight?", answer: "Often yes, but it has to be checked: sheet condition, purlin size and spacing, and the fixing method. A structural check is part of the survey." },
        { id: "q7", question: "What happens if the grid goes down?", answer: "A grid-tied inverter shuts off in an outage, by design. Keep the generator as it is, or ask us to design a plant with islanding controls and storage." },
      ] },
      { type: "links", heading: "Related", items: [
        { label: "Commercial solar", text: "Smaller business sites, shops and offices.", href: "/services/commercial-solar/" },
        { label: "Net metering support", text: "The application, inspection and meter change.", href: "/services/net-metering-support/" },
        { label: "On-grid systems", text: "How a grid-tied plant works.", href: "/solar-systems/on-grid/" },
        { label: "Get a quote", text: "Send your bills on WhatsApp.", href: "/get-quote/" },
      ] },
    ],
    related: [{ label: "Commercial solar", href: "/services/commercial-solar/" }, { label: "Net metering support", href: "/services/net-metering-support/" }, { label: "On-grid systems", href: "/solar-systems/on-grid/" }],
  })),

  stamp(make({
    path: "/services/agricultural-solar/", kind: "service",
    title: "Agricultural Solar & Tubewell Solutions in Punjab | SolarLink",
    description: "Solar tube wells and farm power in Punjab: the pump runs from the sun, sized to the pump, the water depth and the field. Supplied and installed.",
    h1: "Solar for farms and tubewells",
    lead: "A solar tubewell runs its pump from the sun, so water costs no electricity or diesel while the sun is up.",
    image: pics.farms,
    blocks: [
      { type: "prose", heading: "The farm problem solar solves", paragraphs: [
        "A tubewell runs on one of two things: grid power with its bills and its outages, or diesel with its running cost and its fuel trips. Both leave the farmer waiting on someone else. A solar pump runs when the sun is up, which is when crops need water most, and sunlight costs nothing.",
        "Punjab has the sun for it. Global Solar Atlas puts a well-placed fixed array in Sargodha at about 1,513 kWh per kW a year, with spring and early summer the strongest months, which lines up with the irrigation season for wheat and cotton.",
      ] },
      { type: "feature", heading: "Water from the sun", text: "Panels feed a pump inverter that drives the pump directly. It runs when the sun is out, and the water goes to the field or to a tank.", image: pics.farms, tone: "night" },
      { type: "prose", heading: "How a solar tubewell works", paragraphs: [
        "Panels send direct current to a variable-frequency drive (VFD), or pump inverter. The VFD converts it into the three-phase alternating current an AC pump motor needs and adjusts the pump speed to the sunlight. In the morning the pump starts slowly and picks up as the sun climbs; at noon it runs at full speed; in the evening it tails off.",
        "That matters because a pump only needs the right amount of water at the right pressure. A good drive finds the pump's operating point as the light changes and protects the motor from running dry, from overload and from over-voltage. The VFD is the heart of the system, so the quote should name it.",
      ] },
      flow("off-grid", "How power flows on a stand-alone farm system"),
      { type: "prose", heading: "What decides the size", paragraphs: [
        "Pump power is only part of it. The three numbers that size the array are the pump's rating (in horsepower or kW), the total head, meaning how far down the water is plus the lift to where it is used plus the friction in the pipe, and the daily volume of water you need. Panels are then sized to run that pump at its rated duty during the sunniest hours, usually with some margin for dust and cloud.",
        "As a rule, the array has to be rated a little above the pump's rated power, because the pump starts slowly and panels rarely deliver their rating. The final figure comes from the pump curve, not from a rule of thumb, which is why we ask for the pump details before suggesting anything.",
      ] },
      { type: "facts", heading: "What we need from you", items: [
        { label: "Pump", value: "Horsepower or kW, make and model if known, and whether it is a submersible or a surface pump" },
        { label: "Water depth", value: "Depth to the water in the bore, and the pipe length and lift to the field or tank" },
        { label: "Water need", value: "Area irrigated, the crop, and the hours you now run the pump" },
        { label: "Power today", value: "Grid or diesel, and whether you want to keep it as a backup" },
        { label: "Location", value: "Village or area, with photos of the bore and the land available for panels" },
      ] },
      { type: "steps", heading: "How a farm job runs", items: [
        { title: "Send the pump details", text: "A photo of the pump nameplate and the bore depth is enough for a first answer." },
        { title: "Site visit", text: "We measure the water level, look at the pump and pipework, and choose a spot for the panels with no shade." },
        { title: "Design", text: "Array size, the VFD, the structure and the cable runs, with the daily water output we expect in different seasons." },
        { title: "Installation", text: "Ground structure on concrete or driven piles, panels, drive, cabling and protection." },
        { title: "Commissioning", text: "We run the pump, set the drive and check flow and pressure at the field." },
        { title: "Handover", text: "You learn how to read the drive, what to clean and what each alarm means." },
      ] },
      { type: "prose", heading: "Ground mounting and theft", paragraphs: [
        "Farm arrays are usually on the ground, so the structure needs a solid footing and the panels a clear horizon. Anti-theft fasteners, a fence or a position within sight of the house all help, and we raise the question during the visit. Keep the panels away from shade of trees and from the path of tractors and grain trucks.",
      ] },
      { type: "prose", heading: "Cloudy days and the night", paragraphs: [
        "A solar pump makes less on a cloudy day and nothing at night. The common answer is to pump into a tank, a pond or a channel while the sun is up and use the water later. A battery is rarely worth it for irrigation; storing water is cheaper than storing electricity. A mixed system that keeps a grid or diesel connection as a backup is possible and we can quote it.",
      ] },
      { type: "prose", heading: "Net metering for a farm", paragraphs: [
        "A grid-connected farm can apply for net metering under the NEPRA prosumer regulations, the same as any other consumer, with the size limited by the sanctioned load. A stand-alone solar pump has no grid connection and needs no application. If your connection is an agricultural tariff, check how that affects the numbers, because the rate paid and the export credit are set by category.",
      ] },
      faq("Questions about solar tubewells", [
        ["How does a solar tubewell work?", "Panels feed a drive that runs the pump motor directly. The pump speeds up as the sun climbs and slows as it sets. Water goes to the field, a tank or a channel."],
        ["What does a solar tubewell system cost?", "It depends on the pump rating, the depth of the water and the array size. We give a written price after we see the pump and the bore, with the VFD and the structure listed."],
        ["Do you serve rural areas?", "We work from Lahore, Islamabad and Sargodha, and farms around them are in reach. Tell us the village and we will say whether a site visit is practical."],
        ["Does it work at night or on cloudy days?", "No pumping at night. On a cloudy day it pumps at reduced speed. Use a tank or a channel to carry the water over, or keep the grid or diesel as a backup."],
        ["What is a VFD solar pump system?", "A pump driven through a variable-frequency drive. The drive turns panel power into the three-phase supply the pump motor needs and matches the pump speed to the sunlight."],
        ["Can I get net metering for a farm?", "If the farm has a grid connection, yes, subject to the sanctioned load and the distribution company's checks. A stand-alone pump has no grid connection and needs none."],
        ["Can panels run a tubewell for 24 hours?", "Not without storage, and storage is costly. Plan for the sunny hours and store water, not electricity."],
        ["What size system does a tubewell need?", "It follows the pump power, the depth and the daily volume. A rough guide is an array rated a little above the pump's rating. We check it against the pump curve."],
        ["Can I reuse my existing pump?", "Often yes, if it is a three-phase AC pump in good condition. A single-phase or damaged pump may be better replaced. We check at the visit."],
      ]),
      { type: "links", heading: "Related", items: [
        { label: "Off-grid systems", text: "Systems with no grid connection.", href: "/solar-systems/off-grid/" },
        { label: "Solar calculator", text: "A first size estimate from your bill.", href: "/solar-calculator/" },
        { label: "Sargodha outlet", text: "Our branch for farms around Sargodha.", href: "/outlets/sargodha/" },
        { label: "Projects", text: "Installations we have done.", href: "/projects/" },
      ] },
    ],
    related: [{ label: "Off-grid systems", href: "/solar-systems/off-grid/" }, { label: "Sargodha outlet", href: "/outlets/sargodha/" }, { label: "Projects", href: "/projects/" }],
  })),

  stamp(make({
    path: "/services/net-metering-support/", kind: "service",
    title: "Net Metering Pakistan - Apply | SolarLink",
    description: "SolarLink prepares and files your net metering application and follows it through inspection, the new meter and commissioning.",
    h1: "Net metering support",
    lead: "Net metering connects your solar system to the grid and credits the power you export. We prepare the application and follow it to the new meter.",
    image: pics.netmetering,
    blocks: [
      { type: "prose", heading: "What net metering is, in 2026", paragraphs: [
        "A solar system rarely matches your use second by second. At noon it may make more than the house uses, and at night nothing. With a grid connection under the prosumer rules, the surplus goes out through a bi-directional meter, and the meter records what you export as well as what you import.",
        "The rules changed this year. Under the 2015 regulations, an exported unit and an imported unit were netted one for one. As reported, the NEPRA (Prosumer) Regulations, 2026 (S.R.O. 251(I)/2026, notified 9 February 2026) replaced that for new connections with net billing: imports are billed at your tariff, exports are credited separately at a lower rate NEPRA sets, and any credit above the month's bill carries forward. Users who signed an agreement before 9 February 2026 are reported to keep their original terms for the rest of that agreement. Read the current text at nepra.org.pk before you rely on any of this.",
      ] },
      { type: "feature", heading: "We handle the application", text: "The documents, the filing, the inspection and the meter change run through one team, so nothing waits on a form you did not know about.", image: pics.netmetering, tone: "sunken" },
      { type: "steps", heading: "What we do for you", items: [
        { title: "Check eligibility", text: "We confirm your connection type, sanctioned load and the system size the rules allow, and flag a load increase if you need one." },
        { title: "Prepare the application", text: "The application form, the single-line diagram, equipment datasheets, your ID, a recent bill and the indemnity papers, assembled for your distribution company." },
        { title: "File it", text: "We submit it to the sub-division office or the online portal and follow it for you." },
        { title: "Technical review", text: "The distribution company checks the design and the capacity of the transformer on your feeder. We answer its queries." },
        { title: "Demand notice", text: "The company issues a notice for the meter and testing fees. You pay it; we remind you of the deadline." },
        { title: "Inspection", text: "Its engineers inspect the installation: anti-islanding, earthing and isolators. We attend and fix any observation." },
        { title: "Agreement and meter", text: "You sign the agreement, the new bi-directional meter is fitted and the connection goes live." },
      ] },
      { type: "prose", heading: "Who can apply and how big the system can be", paragraphs: [
        "Residential, commercial, industrial and agricultural consumers on a grid connection can apply. As reported, the system cannot exceed the sanctioned load of the connection, the cumulative total on a distribution transformer is capped at 80 percent of its rating, and the maximum for distributed generation is 1 MW. The August 2026 amendment (S.R.O. 1330(I)/2026) is reported to exempt systems up to 25 kW from direct NEPRA concurrence, leaving only the distribution company's approval.",
        "That is why the application starts with your meter, not your roof. A home with a small sanctioned load may need an increase before a larger system is allowed, and we tell you that before you buy equipment.",
      ] },
      { type: "facts", heading: "Documents you will need", items: [
        { label: "Identity", value: "Copy of the CNIC of the consumer named on the bill" },
        { label: "Bill", value: "A recent electricity bill with the reference number, paid" },
        { label: "Property", value: "Ownership or tenancy papers; owner's consent if you rent" },
        { label: "Design", value: "Single-line diagram and datasheets of the panels and inverter" },
        { label: "Undertaking", value: "Indemnity and agreement forms on the company's format" },
      ] },
      { type: "prose", heading: "The bi-directional meter", paragraphs: [
        "A standard meter counts consumption only. A bi-directional meter counts units imported from the grid and units exported to it, in separate registers, which is what the billing needs. The distribution company supplies and installs it after inspection. The meter and its testing carry fees which the company sets and may revise, so we do not print a figure here.",
        "Until the new meter is fitted and the agreement is signed, the system must stay off the grid. An inverter that exports to an old meter breaks the rules and can lead to a penalty or a disconnection.",
      ] },
      { type: "prose", heading: "Which distribution company", paragraphs: [
        "The company is set by your address and printed on your bill: LESCO for most of Lahore, IESCO around Islamabad, FESCO for Sargodha and its division. Each has its own sub-division offices, forms and queue, and the steps are the same in outline. We file with whichever is yours.",
      ] },
      { type: "prose", heading: "Doing it yourself", paragraphs: [
        "You can apply on your own. The forms are public, and the paperwork is the part that most often goes wrong: a mismatch between the diagram and the installed equipment, a missing datasheet, or a name that does not match the bill. A repeat visit by an inspector costs you weeks. If you have used another installer for the hardware, we can still prepare the file; tell us what was installed and we will check it against the design.",
      ] },
      faq("Questions about net metering", [
        ["What is net metering in Pakistan?", "It is the arrangement that lets a grid-connected solar owner export surplus power and be credited for it. Since the 2026 prosumer rules, the credit is a separate line at an export rate, not a one-for-one unit swap."],
        ["Who is eligible?", "Consumers with a grid connection, within the limits of the sanctioned load, the transformer capacity and the distribution company's approval. Check the current regulations at nepra.org.pk for the size caps."],
        ["How long does approval take?", "It runs on the distribution company's timetable, which varies by office and season. We cannot promise a date, but we chase it and tell you where the file sits."],
        ["What documents are needed?", "Your CNIC, a recent bill, property papers, the single-line diagram, equipment datasheets and the signed forms. We list your exact set at the start."],
        ["Can I apply myself or do I need SolarLink?", "You can apply yourself. We do it as a service because rejected files cost time, and we know what each office asks."],
        ["Does it work with LESCO, IESCO, MEPCO and FESCO?", "Yes. The procedure is the same in outline, and we file with the company named on your bill."],
        ["What is a bi-directional meter and why do I need one?", "It measures imports and exports separately. The billing needs both figures, so the old single-register meter has to be replaced."],
        ["Is my existing 1:1 agreement safe?", "As reported, agreements signed before 9 February 2026 keep their terms for their remaining period, but a material change such as adding inverter capacity may end that protection. Read your agreement and check before you expand."],
      ]),
      { type: "links", heading: "Go deeper", items: [
        { label: "Net metering guide", text: "The rules in plain language, with the regulation cited.", href: "/net-metering-guide/" },
        { label: "Net billing calculator", text: "See what import and export mean for a bill.", href: "/tools/net-billing-calculator/" },
        { label: "Home solar", text: "How a home system is sized and installed.", href: "/services/residential-solar/" },
        { label: "Net metering FAQs", text: "More short answers.", href: "/faqs/" },
      ] },
    ],
    related: [{ label: "Net metering guide", href: "/net-metering-guide/" }, { label: "Home solar", href: "/services/residential-solar/" }, { label: "Commercial solar", href: "/services/commercial-solar/" }, { label: "Get a quote", href: "/get-quote/" }],
  })),
];
