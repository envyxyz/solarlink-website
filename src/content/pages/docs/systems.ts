import { faq, make, pics } from "./shared";
import type { PageDoc } from "../types";

const quote = "Price is not shown here. Send a recent bill and we will quote for your roof and your load.";

const kinds: [string, string, string, string, string, string[]][] = [
  ["on-grid", "On-grid", "on grid solar system", "Panels and an inverter feed your building and the grid. No battery, so the lowest cost and the simplest design.", "It works while the grid is on: an on-grid inverter switches off when the grid is down, for safety.",
    ["Homes and businesses with a steady grid", "Paired with net metering to credit extra power", "No battery to replace"]],
  ["hybrid", "Hybrid", "hybrid solar system", "A hybrid inverter works with a battery, so chosen loads keep running when the grid is off, and it can still connect to the grid.", "The battery adds cost and has a service life, so we size it to the loads you want covered.",
    ["Areas with frequent power cuts", "Backup for fans, lights, a fridge and a router", "Can be added to later"]],
  ["off-grid", "Off-grid", "off grid solar system", "A system with no grid connection: panels, a battery bank and an inverter supply everything.", "It must be sized to the whole load including the nights, so it is the largest design per unit of power used.",
    ["Farms, remote houses and sites with no grid", "Pumps and cabins", "Battery bank sized to the nights"]],
];

const sizes = [3, 5, 10, 15, 20];

const type = (k: (typeof kinds)[number]): PageDoc =>
  make({
    path: `/solar-systems/${k[0]}/`, kind: "system",
    title: `${k[1]} Solar System in Pakistan | SolarLink`,
    description: `${k[1]} solar systems explained, with what they suit and what they need. SolarLink supplies and installs them.`,
    h1: `${k[1]} solar system`, lead: k[3],
    image: k[0] === "off-grid" ? pics.farms : pics.homes,
    blocks: [
      { type: "prose", heading: "How it works", paragraphs: [k[3], k[4]] },
      { type: "facts", heading: "Good to know", items: k[5].map((v, i) => ({ label: ["Suits", "Pairs with", "Keep in mind"][i], value: v })) },
      faq(`Questions about ${k[1].toLowerCase()} systems`, [
        ["How do I choose between the three types?", "It depends on how reliable your grid is and what you need to run in a cut. Send us a recent bill and tell us about your power cuts, and we will advise."],
      ]),
    ],
    related: [{ label: "All solar systems", href: "/solar-systems/" }, { label: "Home solar", href: "/services/residential-solar/" }],
  });

const size = (kw: number): PageDoc =>
  make({
    path: `/solar-systems/${kw}kw/`, kind: "system",
    title: `${kw}kW Solar System Price in Pakistan | SolarLink`,
    description: `${kw} kW solar system for Pakistan: what it is made of and how to ask for a quote. SolarLink supplies and installs.`,
    h1: `${kw} kW solar system`, lead: `A ${kw} kW system is the rated power of its panels added together. How much it suits you depends on your bill, your roof and your hours of use.`,
    image: kw >= 10 ? pics.business : pics.homes,
    blocks: [
      { type: "facts", heading: "At a glance", items: [
        { label: "Rated size", value: `${kw} kW` },
        { label: "Panels at 580 W", value: `${Math.ceil((kw * 1000) / 580)}` },
        { label: "System types", value: "On-grid, hybrid or off-grid" },
        { label: "Price", value: "Quoted after a survey" },
      ] },
      { type: "prose", heading: "What it is made of", paragraphs: ["Solar panels, one or more inverters, mounting structure, cables, breakers and earthing, and a battery if the system is hybrid or off-grid.", quote] },
      faq(`Questions about a ${kw} kW system`, [
        ["Is a " + kw + " kW system right for me?", "Send a recent bill. We compare it with the size and check the roof before we suggest anything."],
        ["Does it need a battery?", "Only if you want backup in a power cut. An on-grid system has none."],
      ]),
    ],
    related: [{ label: "On-grid systems", href: "/solar-systems/on-grid/" }, { label: "Hybrid systems", href: "/solar-systems/hybrid/" }, { label: "All solar systems", href: "/solar-systems/" }],
  });

export const systems = [...kinds.map(type), ...sizes.map(size)];
