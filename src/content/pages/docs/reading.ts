import { faq, make } from "./shared";
import type { PageDoc } from "../types";

/* Guides and blog posts. These are short placeholders that explain the idea in plain terms and state no figure, rate or
   saving. Each is rewritten in full, with sources, before it can be confirmed (src/routes.ts, needs). */

export const guides: PageDoc[] = [
  make({
    path: "/how-solar-works/", kind: "guide",
    title: "How Solar Panels Work | SolarLink",
    description: "A plain explanation of how a home solar system turns sunlight into electricity, and what each part does.",
    h1: "How solar panels work", lead: "Sunlight to the sockets in your wall, in four parts.",
    blocks: [
      { type: "prose", heading: "From sunlight to power", paragraphs: ["Solar panels contain cells that make direct current when light falls on them. The more sun, the more power.", "An inverter turns that direct current into the alternating current your lights and appliances use, and keeps it in step with the grid."] },
      { type: "diagram", heading: "How the power flows", mode: "hybrid" },
      { type: "steps", heading: "The four parts", items: [
        { title: "Panels", text: "Make direct current from sunlight." },
        { title: "Inverter", text: "Converts it to household power and manages the grid link." },
        { title: "Battery (optional)", text: "Stores power for the evening and for cuts. Only hybrid and off-grid systems have one." },
        { title: "Meter", text: "With net metering, it records what you take from the grid and what you send to it." },
      ] },
      faq("Questions", [["Do panels work on cloudy days?", "Yes, but they make less. Output follows the light."], ["What sizes of system exist?", "Home systems start small and grow with the bill. We size yours from your bill and your roof."]]),
    ],
    related: [{ label: "On-grid, hybrid and off-grid", href: "/blog/on-grid-vs-hybrid-vs-off-grid-pakistan/" }, { label: "Solar systems", href: "/solar-systems/" }],
  }),
  make({
    path: "/net-metering-guide/", kind: "guide",
    title: "Net Metering in Pakistan: A Guide | SolarLink",
    description: "What net metering is, who can apply and how the application works. Rules are set by the regulator and change.",
    h1: "Net metering in Pakistan", lead: "What it is, how the application runs and what to check, written for people who are thinking about solar.",
    blocks: [
      { type: "prose", heading: "What net metering is", paragraphs: ["With net metering your solar system is connected to the grid through a two-way meter. Power you do not use goes to the grid, and the meter records it so your bill can be reduced.", "The rules, including how exported power is credited, are made by the regulator and have changed. This guide is being rewritten against the current regulation and will cite it."] },
      { type: "steps", heading: "How the application runs", items: [
        { title: "Apply", text: "Your system details and documents go to your distribution company." },
        { title: "Inspect", text: "The company inspects the site." },
        { title: "Approve", text: "The company approves the connection." },
        { title: "Install the meter", text: "A two-way meter is fitted and the system goes live." },
      ] },
      faq("Questions", [["Can SolarLink file it for me?", "Yes. We prepare and file the application and follow it through."]]),
    ],
    related: [{ label: "Net metering support", href: "/services/net-metering-support/" }, { label: "Common mistakes", href: "/blog/net-metering-common-mistakes-pakistan/" }],
  }),
];
