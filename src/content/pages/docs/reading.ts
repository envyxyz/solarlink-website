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

const post = (slug: string, title: string, h1: string, lead: string, paras: string[], related: [string, string][]): PageDoc =>
  make({
    path: `/blog/${slug}/`, kind: "article",
    title: `${title} | SolarLink`, description: lead, h1, lead,
    blocks: [{ type: "prose", heading: "The short version", paragraphs: paras }],
    related: related.map(([label, href]) => ({ label, href })),
  });

export const articles: PageDoc[] = [
  post("growatt-vs-fronus-inverter-comparison", "Growatt vs Fronus Inverter", "Growatt vs Fronus inverters", "Two inverter brands people ask about, and the questions to ask before choosing either.", ["Brand matters less than fit: the type, the size and the support behind it. Compare the inverter type, the power rating, the warranty terms in writing and who services it near you.", "We are writing a full side-by-side with sources."], [["Inverters", "/products/inverters/"]]),
  post("how-to-size-solar-system-pakistan", "How to Size a Solar System", "How to size a solar system", "Your bill and your roof decide the size. Here is how to read them.", ["Start from the units on your bill, not the amount in rupees. Look at several months, because use changes with the season. Then check the roof area and shade.", "The estimate becomes a design after a site survey."], [["3 kW system", "/solar-systems/3kw/"], ["10 kW system", "/solar-systems/10kw/"]]),
  post("net-metering-common-mistakes-pakistan", "Net Metering Application Mistakes", "Common net metering mistakes", "Applications are delayed by small errors. These are the ones to avoid.", ["Missing documents, a system that does not match what was applied for, and a meter or connection that is not in the applicant's name are common causes of delay.", "Check every form before you submit, or let us file it."], [["Net metering guide", "/net-metering-guide/"]]),
  post("net-metering-lesco-application-guide", "LESCO Net Metering Application", "Net metering with LESCO", "The steps of a net metering application with the Lahore distribution company.", ["The steps follow the pattern in our net metering guide: apply, inspect, approve, install the meter. Forms and fees are set by the company and change, so check them before you apply.", "We are rewriting this post against the current rules."], [["Net metering guide", "/net-metering-guide/"]]),
  post("net-metering-vs-battery-storage-pakistan", "Net Metering vs Battery Storage", "Net metering or a battery?", "Two ways to use solar power you do not use right away.", ["Net metering sends extra power to the grid for a credit. A battery keeps it for later and gives backup in a power cut. Which is better depends on how reliable your grid is and what the current net metering rules pay.", "Many homes choose one; some use both with a hybrid inverter."], [["Hybrid systems", "/solar-systems/hybrid/"], ["Batteries", "/products/batteries/"]]),
  post("on-grid-vs-hybrid-vs-off-grid-pakistan", "On-grid vs Hybrid vs Off-grid Solar", "On-grid, hybrid or off-grid?", "The three kinds of system, what each needs and who each suits.", ["On-grid has no battery and works with the grid. Hybrid adds a battery for backup. Off-grid has no grid at all and needs a battery bank sized for the nights.", "The deciding questions are how often the power goes off and what must keep running."], [["On-grid", "/solar-systems/on-grid/"], ["Hybrid", "/solar-systems/hybrid/"], ["Off-grid", "/solar-systems/off-grid/"]]),
  post("solar-installation-red-flags-pakistan", "How to Choose a Solar Company", "Red flags when choosing an installer", "What to ask before you sign with any solar company.", ["Ask for the full list of components with brand and model, the warranty terms in writing, who files the net metering application and who services the system later.", "Be careful of a quote that cannot be itemised."], [["Home solar", "/services/residential-solar/"]]),
  post("solar-panel-brands-comparison-pakistan", "Best Solar Panel Brands in Pakistan", "Solar panel brands compared", "How to compare panel brands without relying on a ranking.", ["Look at the rated power, the panel type, the maker's warranty and whether the model is stocked locally for replacement.", "A full comparison with sources is being written."], [["Solar panels", "/products/solar-panels/"]]),
  post("solar-panel-cleaning-maintenance-pakistan", "Solar Panel Cleaning", "Cleaning and caring for your panels", "Dust lowers output. A few habits keep panels working well.", ["Dust and bird droppings block light. Clean the panels when the sun is low, with water and a soft cloth, and keep clear of the edges and cables.", "Never climb onto a wet roof. If you cannot reach the panels safely, ask us."], [["Home solar", "/services/residential-solar/"]]),
  post("solar-roi-payback-period-pakistan", "Solar Payback Period in Pakistan", "How long does solar take to pay back?", "Payback depends on the system cost, your bill and the tariff. Here is how to work it out.", ["Divide the cost of the system by the bill it removes each year. Use your own bills and an actual quote, not a general number.", "Tariffs and net metering terms change, so a payback figure should always carry a date."], [["Get a quote", "/get-quote/"]]),
];
