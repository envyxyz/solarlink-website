/*
  The tools hub and the five tool pages (23 Nov 2026). Each page reads without JavaScript: the maths, the assumptions and
  the questions are plain text, and the calculator is one `tool` block (src/components/tools). All docs are draft
  (unconfirmed) like the rest. The wording states no price, rate, saving, warranty or time. The bill and net billing pages
  show an "Awaiting verified tariff data" state until src/data/tariffs.ts holds confirmed figures.
*/
import type { PageBlock, PageDoc } from "../types";
import { faq, make } from "./shared";

const related = (...hrefs: [string, string][]) => hrefs.map(([label, href]) => ({ label, href }));

const SOLAR = "/solar-calculator/";
const LOAD = "/tools/load-calculator/";
const BATTERY = "/tools/battery-backup-calculator/";
const BILL = "/tools/bill-breakdown/";
const NET = "/tools/net-billing-calculator/";

const tool = (path: string, title: string, h1: string, lead: string, description: string, blocks: PageBlock[], rel: PageDoc["related"]): PageDoc =>
  make({ path, kind: "tool", title: `${title} | SolarLink`, description, h1, lead, blocks, related: rel });

const prose = (heading: string, ...paragraphs: string[]): PageBlock => ({ type: "prose", heading, paragraphs });

const toolDocs: PageDoc[] = [
  tool(
    SOLAR,
    "Solar Calculator Pakistan: System Size From Your Bill",
    "Solar calculator",
    "Move the slider to your monthly bill or units and see the system size and panel count that would cover it.",
    "Turn your monthly bill or units into a solar system size in kW and a panel count. An estimate: a free site survey confirms it.",
    [
      { type: "tool", tool: "solar", heading: "Size your system", lead: "Choose Rs or units, then move the slider. The city only decides which shop receives your result if you send it." },
      prose(
        "How the size is worked out",
        "A bill in rupees is divided by an assumed rate per unit to get the units you use. Units a month are then divided by what one kilowatt of panels makes in a month.",
        "One kilowatt makes about 30 days times the sun hours a day times a performance factor. The starting values sit beside the result, so you can see exactly what the estimate assumes. The system size rounds up to the next half kilowatt and the panel count rounds up to a whole panel.",
        "This tool gives a size, not a price or a saving. Those depend on your roof, your meter and the equipment you choose, and they come after a survey.",
      ),
      prose("What the estimate leaves out", "Shade, roof direction and tilt change how much a real roof makes. So does how much of your use falls at night, and whether you add a battery. The site survey checks all of these."),
      faq("Questions about the solar calculator", [
        ["How many solar panels do I need?", "It depends on your monthly units. The calculator divides your units by what one kilowatt makes in a month, then divides the system size by the panel wattage shown in the assumptions."],
        ["Why does it ask for my city?", "Only to send your result to the nearest SolarLink shop on WhatsApp. The system size does not change with the city."],
        ["Is this the final system size?", "No. It is an estimate from your bill. A site survey checks your roof, shade and meter before a size is agreed."],
        ["Does it show a price or my savings?", "No. A price or a saving needs a survey and your actual tariff, so the calculator shows neither."],
        ["Can I start from my appliances instead of my bill?", "Yes. Add them in the load calculator, then use the button on this page to take your total as units a month."],
      ]),
    ],
    related(["Load calculator", LOAD], ["Battery backup calculator", BATTERY], ["All solar tools", "/tools/"]),
  ),
  tool(
    LOAD,
    "Solar Load Calculator Pakistan",
    "Load calculator",
    "List the appliances you run and see your daytime load, night load and peak load in watts and kWh a day.",
    "Add up your appliances to find your daytime load, night load and peak load in watts and kWh a day, before you size solar or a battery.",
    [
      { type: "tool", tool: "load", heading: "Add up your appliances", lead: "Set a quantity for each appliance you run. Once a quantity is set, the row opens so you can change its watts and hours." },
      prose(
        "How the maths works",
        "An appliance's energy is its watts times its quantity times the hours it runs, divided by 1,000 to give kWh. Daytime hours and night hours are counted separately, so you can see what the sun can power directly and what a battery would have to cover at night.",
        "The load in watts is what is switched on in that half of the day. Peak load adds up everything that runs at any time, as if it were all on together, which is the safe way to size an inverter. Your total kWh a day times 30 gives units a month, the figure the solar calculator uses.",
      ),
      prose(
        "Watts and the label",
        "The wattages are typical running values for common appliances. The label on yours gives the real number; if it lists amps and volts, multiply them.",
        "Motors in pumps, fridges and air conditioners draw several times their running watts for a moment when they start. An inverter has to cope with that, so size it above the peak load shown. Tell us the appliances and we allow for it.",
      ),
      faq("Questions about the load calculator", [
        ["What is the difference between daytime and night load?", "Daytime load is what runs between sunrise and sunset, when panels are making power. Night load is what runs after sunset, which is what a battery would carry."],
        ["Why is peak load higher than my night load?", "Peak load counts everything that runs at any time of day as if it were on together, so it is at least as large as either half."],
        ["Are the watts exact?", "No. They are typical values for each kind of appliance. Replace them with the figure on your own label for a better answer."],
        ["What do I do with the result?", "Take the night load to the battery backup calculator, or the daily total to the solar calculator. Both pick your numbers up from this page."],
      ]),
    ],
    related(["Solar calculator", SOLAR], ["Battery backup calculator", BATTERY], ["All solar tools", "/tools/"]),
  ),
  tool(
    BATTERY,
    "Solar Battery Backup Calculator",
    "Battery backup calculator",
    "Enter the load you want to keep running and for how many hours, and see the battery size in kWh and amp-hours.",
    "Work out the battery you need for your backup load: kWh and amp-hours from watts, hours, voltage, depth of discharge and inverter efficiency.",
    [
      { type: "tool", tool: "battery", heading: "Size your battery", lead: "Every assumption is a box you can change. Start with the load and the hours you want." },
      prose(
        "How the maths works",
        "The energy your load takes is its watts times the hours, divided by 1,000. The battery has to hold more than that: the inverter loses some energy turning battery power into mains power, and you should not drain a battery completely.",
        "So the battery size in kWh is the load energy divided by the inverter efficiency and divided by the usable share of the battery. Amp-hours are the battery energy in watt-hours divided by the battery voltage, rounded up.",
      ),
      prose(
        "Choosing the assumptions",
        "Depth of discharge is the share of the battery you let the system use. A battery used deeper wears out sooner, and the right share depends on the battery type, so check the data sheet of the battery you are considering.",
        "Battery voltage is set by the inverter. The same energy is fewer amp-hours at a higher voltage, so compare batteries in kWh and use amp-hours only for the voltage you will actually run. Inverter efficiency is on the inverter's label or data sheet.",
      ),
      faq("Questions about the battery calculator", [
        ["Should I look at kWh or amp-hours?", "kWh compares batteries at any voltage. Amp-hours only mean something together with the battery voltage, so the calculator shows both."],
        ["Why is the battery bigger than load times hours?", "Because of the inverter losses and the share of the battery you do not use. Both are shown as assumptions you can change."],
        ["Does this size the solar panels?", "No. Panels charge the battery during the day. Size them with the solar calculator."],
        ["Where do I get my load?", "From the load calculator. Its night load can fill the load box with one tap."],
      ]),
    ],
    related(["Load calculator", LOAD], ["Solar calculator", SOLAR], ["All solar tools", "/tools/"]),
  ),
  tool(
    BILL,
    "Electricity Bill Calculator Pakistan",
    "Bill breakdown",
    "See how an electricity bill is built from slabs, fixed charges and taxes. This calculator is waiting for verified tariff data.",
    "How an electricity bill in Pakistan is built from slabs, fixed charges and taxes. The calculator turns on once the rates are verified.",
    [
      { type: "tool", tool: "bill", heading: "Break down your bill", lead: "This needs the official rates for your distribution company." },
      prose(
        "What a bill is made of",
        "A bill adds the units you used, priced slab by slab, to fixed charges and taxes. Which rates apply depends on your distribution company and your category, and rates change by notification.",
        "We will publish numbers here only after we have checked them against the official notification and can show its date.",
      ),
      faq("Questions about the bill breakdown", [
        ["Why are there no numbers yet?", "The rates have to match the current official notification for your distribution company. Until we have checked them, we show none rather than a wrong bill."],
        ["Where can I see my own slab and charges?", "On your bill: the units, the charges and the taxes are listed there. Your distribution company also publishes its tariff."],
        ["Can I still size a solar system?", "Yes. The solar calculator works from your bill or your units and does not need tariff data."],
      ]),
    ],
    related(["Solar calculator", SOLAR], ["Net billing calculator", NET], ["All solar tools", "/tools/"]),
  ),
  tool(
    NET,
    "Net Billing Calculator Pakistan",
    "Net billing calculator",
    "Estimate what you send to the grid and what you take from it. This calculator is waiting for verified tariff and export-rate data.",
    "How net billing accounts for the units your solar system exports. The calculator turns on once the tariff and export rate are verified.",
    [
      { type: "tool", tool: "net-billing", heading: "Work out your net bill", lead: "This needs the current tariff and the export rate from the regulation itself." },
      prose(
        "What net billing does",
        "With net billing, the units your system sends to the grid are credited at an export rate, and the units you take from the grid are charged at your tariff. Your bill is the difference.",
        "The rates and the rules come from the regulator and can change. We will turn this calculator on only with figures we have checked and dated.",
      ),
      faq("Questions about net billing", [
        ["Why are there no numbers yet?", "The export rate and the tariff must come from the current regulation. Until we have verified them, we show none."],
        ["Is net billing the same as net metering?", "Both are ways the grid accounts for the units your system exports. The exact rules and rates are set by the regulator, so read the net metering guide and ask us about your case."],
        ["Can I still size a solar system?", "Yes. The solar calculator does not need tariff data."],
      ]),
    ],
    related(["Net metering guide", "/net-metering-guide/"], ["Bill breakdown", BILL], ["Solar calculator", SOLAR]),
  ),
];

const hub = make({
  path: "/tools/",
  kind: "hub",
  title: "Solar Tools Pakistan | SolarLink",
  description: "Calculators for sizing a solar system, backing it up with a battery and understanding your electricity bill.",
  h1: "Solar tools",
  lead: "Calculators for sizing a solar system, backing it up with a battery and understanding your electricity bill.",
  blocks: [
    { type: "links", heading: "Pick a tool", items: toolDocs.map((d) => ({ label: d.h1, text: d.lead, href: d.path })) },
    prose("Your numbers stay with you", "The tools keep what you enter in this browser so you can move from one to the next. Nothing is sent anywhere until you tap the WhatsApp button, and then it goes only to the shop you chose.", "Every result is an estimate. A free site survey confirms the size."),
  ],
  related: related(["Get a quote", "/get-quote/"]),
});

export const tools: PageDoc[] = [hub, ...toolDocs];
