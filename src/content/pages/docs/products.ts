/*
  Product guides: panels, inverters, batteries, accessories. Written 23 Nov 2026. These explain types and how to choose.
  No prices, no brand-dealer or stock claims: the shop block and the brands belt stay hidden in production until the
  client confirms what is stocked. Technical statements are general solar background.
*/
import { faq, make, pics } from "./shared";
import type { PageDoc } from "../types";

const LASTMOD = "2026-11-23";
const done = (d: PageDoc): PageDoc => ({ ...d, lastmod: LASTMOD });

const stock = "Stock and prices change, so they are not listed here. Ask your nearest shop or send us a message and we will tell you what is available.";

const panels = done(make({
  path: "/products/solar-panels/", kind: "product",
  title: "Solar Panels in Pakistan | SolarLink",
  description: "How to choose solar panels in Pakistan: types, wattage, efficiency, size and what to read on the datasheet before you compare quotes.",
  h1: "Solar panels",
  lead: "Panels turn sunlight into direct current. Their rating in watts, and how many you fit on the roof, set the size of the system.",
  image: pics.panel,
  blocks: [
    { type: "prose", heading: "What a panel does", paragraphs: [
      "A panel is a sheet of solar cells wired in series behind a sheet of glass, held in an aluminium frame. Sunlight knocks electrons loose in the silicon and the cells push them out as direct current. A modern panel for roofs is 2.2 to 2.3 metres tall and just over a metre wide, weighs around 25 to 30 kg, and is rated between about 450 and 700 W. Large rooftop systems today commonly use panels in the 550 to 600 W class.",
      "The rating is measured under test conditions: 1,000 watts of sun per square metre at a cell temperature of 25 degrees Celsius. A roof in Lahore in June runs a lot hotter than that, and output falls with heat, so a panel rarely delivers its full rating. This is why the datasheet matters.",
    ] },
    { type: "facts", heading: "What to look at", items: [
      { label: "Power", value: "Rating in watts per panel at test conditions. More watts per panel means fewer panels for the same system size" },
      { label: "Efficiency", value: "Percent of sunlight converted. Higher means more watts from the same roof area" },
      { label: "Temperature coefficient", value: "How much power is lost per degree above 25 C. Smaller loss is better in Punjab's heat" },
      { label: "Build", value: "Cell type, frame, glass, junction box and bypass diodes" },
      { label: "Size and weight", value: "Length, width and kilograms, which decide the structure and how many fit" },
      { label: "Fit", value: "Roof space, direction and shade" },
    ] },
    { type: "shop", heading: "Panels in the shops", category: "panels" },
    { type: "brands", heading: "Brands" },
    { type: "prose", heading: "Panel types in plain words", paragraphs: [
      "Almost all rooftop panels sold now are crystalline silicon. Monocrystalline cells are the standard: more efficient and a uniform dark colour. Polycrystalline panels, with a blue speckled look, are older, less efficient and now rare for new systems. You will also meet terms for newer cell designs on datasheets, such as PERC, TOPCon and half-cut cells. Half-cut cells split each cell in two, which lowers resistive losses and lets a panel lose less when a corner is shaded. TOPCon and similar designs add a little more efficiency and a lower temperature loss.",
      "Bifacial panels have a transparent or glass back and collect reflected light. They add output on a bright ground or white roof, and less on a dark roof. They cost more, so ask whether your roof surface makes it worth it.",
    ] },
    { type: "prose", heading: "How many you need", paragraphs: [
      "Divide the system size by the panel rating. A 5 kW system with 580 W panels uses 9 panels (8.6 rounded up); 10 kW uses 18; 20 kW uses 35. A larger panel means fewer of them, but each one is heavier and harder to carry up a staircase. Each 580 W panel covers about 2.6 square metres, so a 10 kW array is about 47 square metres of panels before you leave room for walkways.",
      "The system size pages show the figures for 3, 5, 10, 15 and 20 kW. The sizing card turns a monthly bill into a first number.",
    ] },
    { type: "prose", heading: "How to compare two quotes", paragraphs: [
      "Make sure both quote the same watts. Ask for the model number and read its datasheet: rated power, efficiency, temperature coefficient, dimensions, and the standards it has been tested to. Ask what the manufacturer's product and performance terms are, who honours them in Pakistan and how a claim works. A lower price per watt is no saving if the panels are bigger, hotter or harder to service.",
      "Check also that the panels' voltage fits the inverter. A mismatch between string voltage and the inverter's window is a design error, and no panel brand repairs it.",
      stock,
    ] },
    faq("Questions about solar panels", [
      ["Which panel should I choose?", "It depends on your roof space and budget. Tell us the roof and we will suggest panels that fit. Prefer a monocrystalline panel of 550 W or more with a low temperature coefficient and a datasheet you can read."],
      ["Is a higher wattage panel always better?", "Not by itself. It means fewer panels, but also a bigger and heavier one. Compare watts per square metre and the price per watt, and check that your structure and your inverter suit it."],
      ["What is the difference between mono and poly panels?", "Monocrystalline panels are more efficient and are the standard today. Polycrystalline panels are older and less efficient, and mostly seen in older stock."],
      ["How long do solar panels last?", "A good panel keeps producing for decades, losing a small fraction of its output each year. The exact rate and terms are on the manufacturer's datasheet and warranty, which you should read."],
      ["Do panels work on cloudy days?", "Yes, at reduced output. Heavy cloud and monsoon days can cut output sharply."],
      ["How often should I clean them?", "Dust is the main loss in Punjab. Rinse them with clean water early in the morning or after sunset, and more often after a dust storm."],
    ]),
    { type: "links", heading: "Read next", items: [
      { label: "5 kW system", text: "What nine panels of 580 W make, and what it suits.", href: "/solar-systems/5kw/" },
      { label: "10 kW system", text: "Eighteen panels, three-phase, and the roof it needs.", href: "/solar-systems/10kw/" },
      { label: "Solar calculator", text: "Turn a bill into a system size.", href: "/solar-calculator/" },
    ] },
  ],
  related: [{ label: "All products", href: "/products/" }, { label: "Solar systems", href: "/solar-systems/" }, { label: "Inverters", href: "/products/inverters/" }, { label: "Get a quote", href: "/get-quote/" }],
}));

const inverters = done(make({
  path: "/products/inverters/", kind: "product",
  title: "Solar Inverters in Pakistan | SolarLink",
  description: "Solar inverters explained for Pakistan: on-grid, hybrid and off-grid types, power rating, phase, MPPT and what to check before you buy.",
  h1: "Solar inverters",
  lead: "The inverter turns the panels' direct current into the alternating current your building uses, and manages the grid connection.",
  image: pics.inverter,
  blocks: [
    { type: "prose", heading: "What an inverter does", paragraphs: [
      "Panels make direct current; your fridge and fans use alternating current. The inverter converts one to the other, in step with the grid, and it does the thinking: it finds the voltage at which the panels give the most power (maximum power point tracking, or MPPT), watches the grid, shuts down safely if the grid fails, and reports what the system is doing.",
      "It is also the part most likely to need attention. Panels have no moving parts and often outlast the inverter, which is why the inverter's make, service support and warranty terms deserve a close look in a quote.",
    ] },
    { type: "facts", heading: "What to look at", items: [
      { label: "Type", value: "On-grid, hybrid or off-grid. The type depends on whether you want a battery and whether the grid is present" },
      { label: "Power", value: "Rating in kW, and the maximum solar input it accepts" },
      { label: "Phase", value: "Single or three phase, matching your supply" },
      { label: "MPPT inputs", value: "How many independent strings it can track, useful when the roof faces more than one way" },
      { label: "Voltage window", value: "The range of panel string voltage it can use, in cold and in heat" },
      { label: "Monitoring", value: "App or portal, and how it connects: wifi, a data stick or a cable" },
    ] },
    { type: "shop", heading: "Inverters in the shops", category: "inverters" },
    { type: "brands", heading: "Brands" },
    { type: "prose", heading: "The three types", paragraphs: [
      "An on-grid inverter works only with the grid. It has no battery connection and shuts off when the grid fails. It is the cheapest and the simplest, and the one that goes with net metering for most homes and businesses.",
      "A hybrid inverter does that and also manages a battery. It decides between the panels, the battery and the grid, and when the grid fails it can run a backup circuit from the battery and the panels. It costs more, and it has more settings to get right.",
      "An off-grid inverter has no grid connection at all. It works with a battery bank, and often has a built-in charge controller and a generator input. It must be sized for the largest surge as well as the daily load.",
    ] },
    { type: "prose", heading: "Sizing the inverter", paragraphs: [
      "The inverter's AC rating is normally close to the array's rating. Many designers install a little more panel power than inverter power, say a ratio of 1.1 to 1.3, because panels seldom reach their rating and the extra power in the morning and evening is useful. A bigger ratio clips the midday peak, so it is a trade the designer makes with the roof and the budget.",
      "Check the maximum input voltage against the panel string. A cold morning raises panel voltage, and a string that is too long can exceed the inverter's limit. This is a design check that the installer should do and show.",
    ] },
    { type: "prose", heading: "Single or three phase", paragraphs: [
      "A single-phase inverter suits a single-phase supply and small systems. Larger systems and three-phase connections use three-phase inverters, which balance the output across the phases. Putting a large single-phase inverter on a three-phase supply can unbalance it and breach the distribution company's limits, so the connection type is the first question we ask.",
    ] },
    { type: "prose", heading: "Service and support", paragraphs: [
      "Ask who repairs it in Pakistan, how long a replacement takes, and whether the shop keeps spares. A well-specified inverter that nobody can service is a liability. Keep the invoice, the serial number and the commissioning report.",
      stock,
    ] },
    faq("Questions about solar inverters", [
      ["Which inverter type do I need?", "On-grid if you only want to cut the bill, hybrid if you want battery backup. The size follows your system."],
      ["Why does my on-grid inverter stop in a power cut?", "It is built to. An inverter that keeps feeding a dead line is a danger to line staff, so it shuts off when it loses the grid."],
      ["What does MPPT mean?", "Maximum power point tracking: the inverter adjusts the load on the panels to pull the most power from them as the sun and the temperature change. More MPPT inputs help when the roof faces more than one way."],
      ["Can I choose an inverter smaller than the array?", "Yes, within the maker's limits. A ratio of panel to inverter power up to roughly 1.3 is common, and the lost peak is small."],
      ["How long does an inverter last?", "Commonly shorter than the panels. The maker's datasheet and warranty give the figures. Heat and dust shorten the life, so give it a shaded, ventilated spot."],
      ["Can I monitor it from my phone?", "Most inverters have an app or a portal. Ask what it needs: wifi, a data stick or a cable."],
    ]),
    { type: "links", heading: "Read next", items: [
      { label: "On-grid systems", text: "How a grid-tied system works.", href: "/solar-systems/on-grid/" },
      { label: "Hybrid systems", text: "Battery backup and the backup circuit.", href: "/solar-systems/hybrid/" },
      { label: "Batteries", text: "What goes with a hybrid inverter.", href: "/products/batteries/" },
    ] },
  ],
  related: [{ label: "All products", href: "/products/" }, { label: "Solar systems", href: "/solar-systems/" }, { label: "Solar panels", href: "/products/solar-panels/" }, { label: "Get a quote", href: "/get-quote/" }],
}));

const batteries = done(make({
  path: "/products/batteries/", kind: "product",
  title: "Solar Batteries & Storage Solutions Pakistan | SolarLink",
  description: "Solar batteries explained: lithium and lead-acid, capacity in kWh, depth of discharge, voltage and how to size a battery for your backup loads.",
  h1: "Solar batteries",
  lead: "A battery stores solar power for the evening and for power cuts. Only hybrid and off-grid systems use one.",
  image: pics.battery,
  blocks: [
    { type: "prose", heading: "What a battery is for", paragraphs: [
      "A battery solves two different problems. The first is backup: keeping lights, fans, a fridge and a router on when the grid fails. The second is shifting energy: storing the afternoon's solar surplus for the evening. On-grid systems with net metering do the second job through the grid, which is why the battery is optional and many systems skip it.",
      "A battery is also the part of a solar system with the shortest life and the highest cost per kWh stored, so size it to the loads you must keep on, not to everything.",
    ] },
    { type: "facts", heading: "What to look at", items: [
      { label: "Capacity", value: "Stored energy in kWh, and the usable part of it after the depth-of-discharge limit" },
      { label: "Chemistry", value: "Lithium iron phosphate or lead-acid, including tubular and gel types" },
      { label: "Voltage", value: "Matches the inverter's battery input: commonly 24 V or 48 V" },
      { label: "Power output", value: "Maximum continuous kW it can deliver, which sets what it can start" },
      { label: "Cycle life", value: "Cycles to a stated end-of-life capacity at a stated depth of discharge" },
      { label: "Protection", value: "Battery management system, breakers and temperature limits" },
    ] },
    { type: "shop", heading: "Batteries in the shops", category: "batteries" },
    { type: "brands", heading: "Brands" },
    { type: "prose", heading: "Lithium and lead-acid", paragraphs: [
      "Lithium iron phosphate (LiFePO4) is the usual choice for new systems. It can be discharged deeply every day, holds its capacity over many cycles, is light, and needs almost no care. A built-in battery management system watches voltage, current and temperature.",
      "Lead-acid batteries cost less per kWh at the shop counter. Solar systems use deep-cycle types, tubular flooded, gel or AGM. They are heavy, are normally run no deeper than about half their rating to last, and flooded types need topping up with distilled water. The price gap narrows once you count the usable capacity and the cycles.",
    ] },
    { type: "prose", heading: "Sizing a battery", paragraphs: [
      "List the loads on the backup circuit with their watts and the hours you want them covered. Multiply and add to get kWh. Divide by the usable fraction of the battery (for example 0.9 for lithium run to 90 percent, 0.5 for lead-acid kept to half). A few examples: lights, fans, a fridge and a router drawing 600 W for four hours is 2.4 kWh. Adding one inverter AC at 1.2 kW for two hours adds 2.4 kWh, for 4.8 kWh in all.",
      "Then check the output: the battery and the inverter must supply the largest load plus its start-up surge. A big battery that cannot deliver enough current trips on the AC's start. The battery backup calculator does the sum for your list.",
    ] },
    { type: "prose", heading: "Where to put it", paragraphs: [
      "Keep a battery in a cool, shaded and ventilated place away from direct sun, water and children, on a level base. Heat shortens battery life more than anything else in a Punjab summer, so a south-facing store room with no ventilation is a bad place. Cables should be short, correctly sized and fused.",
      stock,
    ] },
    faq("Questions about solar batteries", [
      ["How big a battery do I need?", "It depends on the loads you want covered and for how long. We size it with you, and the battery backup calculator gives a first answer."],
      ["Lithium or lead-acid?", "Lithium costs more up front, lasts longer and needs less care. Lead-acid costs less per kWh up front but is run shallower and wants more upkeep. Compare the usable kWh and the cycle life, not the label."],
      ["Do I need a battery with net metering?", "No. With net metering the grid acts as your storage. A battery is for backup, or for using more of your own solar in the evening."],
      ["How long does a battery last?", "It depends on the chemistry, how deeply you discharge it and how hot it runs. The datasheet gives cycles to an end-of-life capacity."],
      ["Can I run an AC from a battery?", "Yes with a large enough battery and inverter, but an AC is hungry. Most homes back up fans, lights and a fridge and leave the AC on the grid."],
      ["Can I add a battery to an existing on-grid system?", "Only with a hybrid inverter, or a battery-ready one, so the answer is often a new inverter. Ask before you buy."],
    ]),
    { type: "links", heading: "Read next", items: [
      { label: "Battery backup calculator", text: "Size a battery from your appliance list.", href: "/tools/battery-backup-calculator/" },
      { label: "Hybrid systems", text: "How a battery fits into a hybrid system.", href: "/solar-systems/hybrid/" },
      { label: "Off-grid systems", text: "Systems that run on batteries alone.", href: "/solar-systems/off-grid/" },
    ] },
  ],
  related: [{ label: "All products", href: "/products/" }, { label: "Solar systems", href: "/solar-systems/" }, { label: "Inverters", href: "/products/inverters/" }, { label: "Get a quote", href: "/get-quote/" }],
}));

const accessories = done(make({
  path: "/products/accessories/", kind: "product",
  title: "Solar Accessories & Mounting Structures | SolarLink",
  description: "Solar mounting structure, cables, breakers, surge protection and earthing explained: what each part does and what to check in a quote.",
  h1: "Mounting structure and accessories",
  lead: "Structure, cables, breakers, earthing and protection hold the system together and keep it safe.",
  image: pics.panel,
  blocks: [
    { type: "prose", heading: "The parts that are not panels", paragraphs: [
      "A solar system is more than panels and an inverter. The parts around them decide whether it survives a storm, whether it trips for no reason and whether it is safe to touch. They are also the easiest place for a cheap quote to cut corners, because the buyer cannot see them once the job is finished.",
      "SolarLink supplies and installs the whole system, so this page lists what a complete job includes and what to ask to see.",
    ] },
    { type: "facts", heading: "What to look at", items: [
      { label: "Structure", value: "Roof or ground mounting: material, thickness, coating, tilt and fixing method" },
      { label: "Cabling", value: "DC solar cable and AC cable, breakers and combiner boxes, sized for current and length" },
      { label: "Protection", value: "DC and AC surge protection, isolators and fuses" },
      { label: "Earthing", value: "Earth pits, conductor size and a recorded resistance reading" },
      { label: "Lightning", value: "Where the site calls for it, a lightning arrestor and bonding" },
      { label: "Monitoring", value: "Data logger or wifi stick, meters and signage" },
    ] },
    { type: "prose", heading: "Mounting structure", paragraphs: [
      "The structure holds the panels at a fixed tilt and direction and carries them through wind. In Pakistan the usual materials are hot-dip galvanised steel and aluminium. Galvanised steel is strong and cheaper; aluminium is light and corrosion resistant, and often used on tilted roofs. The coating thickness and the grade of fasteners matter more than the colour. Look for stainless or galvanised bolts, and rubber or sealant where fixings pass through a waterproof layer.",
      "On a flat concrete roof, the panels are tilted on a frame, bolted to the slab or held down with ballast. On a sheet-metal roof, they clamp to the ribs or purlins. On the ground, the frame sits on concrete footings or driven piles. Tilt is usually close to the latitude, about 28 to 30 degrees for Lahore and Islamabad per Global Solar Atlas, with a lower tilt where the roof is windy or where the owner prefers more summer output.",
    ] },
    { type: "prose", heading: "Cables, breakers and combiner boxes", paragraphs: [
      "DC cable from the panels is a special type: UV-resistant, double-insulated and rated for the voltages and the heat on a roof. Ordinary house wire cracks in the sun. The cable's cross-section is chosen so that the voltage drop stays small, which saves energy and heat. Breakers and fuses on the DC and AC sides isolate the inverter and protect the wiring, and a combiner box brings several strings together in a weather-proof enclosure.",
      "Cables are laid in conduit or tray, clipped away from sharp edges and out of standing water. Connectors should be of the same make on both sides of a joint, because mixed connectors are a known cause of heat and fire.",
    ] },
    { type: "prose", heading: "Surge protection and earthing", paragraphs: [
      "Surge protective devices on the DC and AC sides take the spike from a nearby lightning strike or a grid switching event. Earthing gives a fault current a safe path, and it matters most in dry ground. A proper earth system has a pit or rod, a conductor of the right size, and a measured resistance that the installer writes down. Ask to see the reading.",
      "Lightning protection is a site decision: a tall isolated building or an open farm array may need an arrestor and bonding, while a house among taller buildings may not.",
    ] },
    { type: "prose", heading: "What a quote should list", paragraphs: [
      "A complete quote names the structure material and the coating, the cable type and size, the breakers and isolators, the surge protection, the earthing method and the monitoring. If a quote says only structure and wiring included with no detail, ask for the list. Two quotes with the same panels and inverter can differ a great deal in these lines.",
      stock,
    ] },
    faq("Questions about mounting and accessories", [
      ["Do you supply the structure and cables?", "Yes, we supply and install the whole system. Ask us what your design needs."],
      ["Galvanised steel or aluminium structure?", "Both work. Galvanised steel is strong and economical; aluminium is light and corrosion resistant. The coating and the fixings matter more than the metal."],
      ["What is the right tilt for panels?", "Close to the latitude gives the best yearly output, about 28 to 30 degrees in Lahore and Islamabad per Global Solar Atlas. A lower tilt suits windy roofs."],
      ["Why does the cable matter?", "Solar cable has to survive sun and heat for decades. Undersized cable wastes energy and runs hot, and ordinary wire cracks in the sun."],
      ["Do I need surge protection and earthing?", "Yes. They protect the inverter and the people in the building, and they cost little next to the equipment they guard."],
      ["Can I reuse my old structure?", "Only after an inspection for corrosion and load. A structure that has rusted, bent or shifted is better replaced."],
    ]),
    { type: "links", heading: "Read next", items: [
      { label: "Solar panels", text: "How to choose and compare them.", href: "/products/solar-panels/" },
      { label: "Inverters", text: "Types, ratings and what to check.", href: "/products/inverters/" },
      { label: "Industrial solar", text: "How we plan large roofs and ground arrays.", href: "/services/industrial-solar/" },
    ] },
  ],
  related: [{ label: "All products", href: "/products/" }, { label: "Solar systems", href: "/solar-systems/" }, { label: "Residential solar", href: "/services/residential-solar/" }, { label: "Get a quote", href: "/get-quote/" }],
}));

export const products: PageDoc[] = [panels, inverters, batteries, accessories];
