/*
  Copy and starting values for the calculators (load, battery backup, solar size, and the two tariff tools).
  Plain strings and numbers only, so client components can import it. Templates use {slots} filled by fill() in
  src/lib/sizing.ts; " " is a non-breaking space so a unit stays beside its number.
  Appliance watts are typical running values for common appliances, not a SolarLink fact: every row says
  "typical, check the label". Read by node (check-content), so no aliases and no imports here.
*/

export const toolsContent = {
  /** The date the typical values and starting assumptions were written. Shown on every tool. */
  asOf: "23 Nov 2026",
  common: {
    results: "Your result",
    assumptions: "Assumptions",
    asOf: "Assumptions and typical values as of {date}. Estimates only: a site survey confirms them.",
    savedNote: "Your numbers are saved in this browser and shared between the tools. They leave it only when you tap the WhatsApp button.",
    reset: "Reset to the starting values",
    city: "Send to the shop in",
    cta: "Send this on WhatsApp",
    ctaQuote: "Get a free quote",
    note: "Estimate only. A free site survey confirms the size.",
    greeting: "Assalam o Alaikum SolarLink.",
    kw: "{n} kW",
    w: "{n} W",
    kwh: "{n} kWh",
    units: "{n} units",
    ah: "{n} Ah",
    volts: "{n} V",
    hours: "{n} h",
    percent: "{n}%",
    rs: "Rs {n}",
  },
  load: {
    label: "Load calculator",
    listLabel: "Appliances",
    listHint: "Set a quantity for each appliance you run. Watts are typical, check the label.",
    quantity: "Quantity",
    typical: "Typical {w}, check the label",
    watts: "Watts each",
    dayHours: "Daytime hours",
    nightHours: "Night hours",
    assumptions: [
      "Watts are typical running values for common appliances. Replace them with the number on your own label.",
      "Daytime means sunrise to sunset and night is the rest. Each side counts up to {max} hours a day.",
      "Peak load adds up everything that runs at any time of day, as if it were all on together. Motors such as pumps, fridges and air conditioners draw more for a moment when they start: ask us to allow for it.",
    ],
    results: {
      day: "Daytime load",
      night: "Night load",
      peak: "Peak load",
      dayKwh: "Daytime energy a day",
      nightKwh: "Night energy a day",
      totalKwh: "Total energy a day",
    },
    empty: "Add an appliance to see your load.",
    announce: "Daytime load {day}, {dayKwh} a day. Night load {night}, {nightKwh} a day. Peak load {peak}.",
    whatsapp:
      "{greeting} I used your load calculator. My daytime load is {day} ({dayKwh} a day), my night load is {night} ({nightKwh} a day) and my peak load is {peak}. Please advise on a system and arrange a free site survey.",
  },
  battery: {
    label: "Battery backup calculator",
    watts: "Load to back up (W)",
    wattsHint: "The appliances you want to run on battery, in watts.",
    useLoad: "Use my night load from the load calculator ({w})",
    hours: "Hours of backup",
    voltage: "Battery voltage",
    dod: "Usable share of the battery, depth of discharge (%)",
    dodHint: "How much of the battery you let the system use. It depends on the battery type: ask us if unsure.",
    eff: "Inverter efficiency (%)",
    effHint: "Share of the battery energy that reaches your appliances. Check your inverter's label.",
    assumptions: [
      "Energy needed = load in watts times hours, divided by 1,000.",
      "The battery must hold that energy divided by the inverter efficiency and by the usable share of the battery.",
      "Amp-hours = battery energy in watt-hours divided by the battery voltage, rounded up.",
      "Every value above is a starting assumption: change it to match the inverter and battery you are considering.",
    ],
    results: { kwh: "Battery size needed", ah: "Amp-hours at {v}", load: "Energy your load uses" },
    announce: "You need about {kwh} of battery, {ah} at {v}, to run {w} for {h}.",
    whatsapp:
      "{greeting} I used your battery backup calculator. To run {w} for {h} I need about {kwh} of battery ({ah} at {v}), assuming {dod} usable and {eff} inverter efficiency. Please advise and arrange a free site survey.",
  },
  solar: {
    label: "Solar calculator",
    unit: "Bill unit",
    value: "Monthly bill or units",
    useLoad: "Use my load calculator total ({n} a month)",
    assumptions: "Estimate. Assumes Rs {rate} a unit, {sun} sun hours a day and {watts} W panels. Your own bill's rate may differ.",
    results: { kw: "System size", panels: "Panels", generation: "Units a month" },
    announce: "{kw} system, {panels}, about {units} a month.",
    panelOne: "{n} panel",
    panelMany: "{n} panels",
    roofCap: "A system this large needs more space than one roof: we will design a ground or multi-roof system.",
    whatsapp:
      "{greeting} My monthly usage is about {bill}. Your solar calculator sized a {kw} system ({panels}). Please arrange a free site survey in {city}.",
  },
  awaiting: {
    title: "Awaiting verified tariff data",
    text: "This calculator stays off until the electricity rates it needs are checked against the official notification. We would rather show nothing than a wrong bill.",
    next: "Meanwhile, size your system from your bill with the solar calculator.",
    cta: "Open the solar calculator",
    href: "/solar-calculator/",
  },
  /** Typical running watts and starting hours (day and night). Quantities start at zero. */
  appliances: [
    { id: "led-bulb", name: "LED bulb", watts: 10, day: 0, night: 5 },
    { id: "ceiling-fan", name: "Ceiling fan", watts: 75, day: 6, night: 8 },
    { id: "inverter-fan", name: "Inverter ceiling fan", watts: 35, day: 6, night: 8 },
    { id: "pedestal-fan", name: "Pedestal fan", watts: 55, day: 4, night: 4 },
    { id: "air-cooler", name: "Air cooler", watts: 200, day: 4, night: 4 },
    { id: "refrigerator", name: "Refrigerator, average draw", watts: 100, day: 12, night: 12 },
    { id: "freezer", name: "Deep freezer, average draw", watts: 150, day: 12, night: 12 },
    { id: "tv", name: "LED TV, 32 inch", watts: 50, day: 2, night: 4 },
    { id: "router", name: "Wi-Fi router", watts: 12, day: 12, night: 12 },
    { id: "laptop", name: "Laptop", watts: 60, day: 6, night: 2 },
    { id: "desktop", name: "Desktop computer", watts: 200, day: 4, night: 2 },
    { id: "dispenser", name: "Water dispenser", watts: 100, day: 4, night: 2 },
    { id: "washer", name: "Washing machine", watts: 400, day: 1, night: 0 },
    { id: "iron", name: "Clothes iron", watts: 1000, day: 1, night: 0 },
    { id: "microwave", name: "Microwave oven", watts: 1200, day: 0.5, night: 0.5 },
    { id: "pump", name: "Water pump, 1 hp", watts: 750, day: 1, night: 0 },
    { id: "ac-1", name: "Air conditioner, 1 ton inverter", watts: 900, day: 4, night: 6 },
    { id: "ac-15", name: "Air conditioner, 1.5 ton inverter", watts: 1300, day: 4, night: 6 },
    { id: "ac-2", name: "Air conditioner, 2 ton inverter", watts: 1800, day: 4, night: 6 },
  ],
  /** Starting assumptions for the battery calculator. */
  batteryDefaults: { watts: 1000, hours: 4, voltage: 48, dod: 80, eff: 90 },
  maxHours: 12,
  /** Hour inputs move in half hours. */
  hourStep: 0.5,
};
