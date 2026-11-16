/*
  Homepage copy for the hero and the brand belt. Plain strings only, so client components can import
  it directly. Templates use {n}, {bill}, {kw}, {panels}, {rate}, {sun}, {watts}. " " is a
  non-breaking space (DESIGN.md: a unit sits beside its number). Re-exported from src/content.ts.
*/
export const hero = {
  lead: "Tell us what you pay each month. See the system that covers it, then send it to our team in one tap.",
  imageAlt: "Render of a flat-roofed house with solar panels on its roof",
  sizingLabel: "Size your system",
  billLabel: "Your monthly bill",
  unitLabel: "Bill unit",
  modes: [
    { value: "rs", label: "Rs" },
    { value: "units", label: "Units" },
  ],
  sliderLabel: "Monthly bill",
  valueRs: "Rs {n}",
  valueUnits: "{n} units",
  valueTextRs: "Rupees {n} a month",
  valueTextUnits: "{n} units a month",
  resultLabel: "Your system",
  stats: { size: "System size", panels: "Panels", units: "Units a month" },
  kw: "{n} kW",
  panelOne: "{n} panel",
  panelMany: "{n} panels",
  roofCap: "Larger than this roof: we will design a ground or multi-roof system.",
  /** Names the starting constants plainly; the numbers come from content.sizing. */
  assumptions: "Estimate. Assumes Rs {rate} a unit, {sun} sun hours a day and {watts} W panels. Your own bill's rate may differ.",
  /** Said once, after the slider stops: {kw}, {panels} (already with its unit word) and {units}. */
  announce: "{kw} system, {panels}, {units} units a month.",
  cta: "Send this system on WhatsApp",
  note: "Estimate only. A free site survey confirms the size.",
  /** Sent to the Lahore number until the visitor picks a city. */
  whatsappMessage:
    "Assalam o Alaikum SolarLink. My monthly bill is about {bill}. Your website sized a {kw} system ({panels}). Please arrange a free site survey.",
  noJs: { text: "Tell us your monthly bill and we will size your system.", cta: "Get a free quote" },
};

export const belt = {
  aria: "Solar equipment brands SolarLink installs",
  /** Labels of the pause and play button beside the moving belt. */
  pause: { pause: "Pause the brand list", play: "Play the brand list" },
};
