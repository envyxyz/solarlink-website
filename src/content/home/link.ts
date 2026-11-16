/*
  Homepage section 5, The link (docs/COPY-HOME.md). Plain strings only: the diagram island imports this directly.
  Captions sit beside their nodes; the home has a name and no caption.
*/
export type LinkMode = "on-grid" | "hybrid" | "off-grid";

export const link = {
  title: "From the sun to your meter.",
  lead: "See how a solar system moves power. Switch the type to see the route change.",
  switchLabel: "System type",
  modes: [
    { value: "on-grid", label: "On-grid", text: "Tied to the grid, no battery, spare power goes out and you draw at night." },
    { value: "hybrid", label: "Hybrid", text: "Tied to the grid with a battery, so lights and fans stay on in load-shedding." },
    { value: "off-grid", label: "Off-grid", text: "Runs on batteries alone, for places with no reliable grid." },
  ] as { value: LinkMode; label: string; text: string }[],
  nodes: {
    sun: { name: "Sun", caption: "The sun hits the panels." },
    panel: { name: "Panels", caption: "Panels send power to the inverter." },
    inverter: { name: "Inverter", caption: "The inverter runs your home." },
    home: { name: "Home", caption: "" },
    battery: { name: "Battery", caption: "Spare power fills the battery." },
    grid: { name: "Grid", caption: "Spare power goes to the grid." },
  },
  alt: "Diagram of sun, panels, inverter, home, battery and grid joined by a lime line",
  cta: "Size my system",
  ctaHref: "#sizing",
};
