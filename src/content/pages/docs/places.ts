import { outlets } from "@/content";
import type { OutletSlug } from "@/content";
import { show } from "@/lib/facts";
import { faq, make } from "./shared";
import type { PageBlock, PageDoc } from "../types";

/*
  Outlet pages (23 Nov 2026 rewrite) and project drafts. Outlet details come only from the facts in src/content.ts.
  Sun figures: Global Solar Atlas (World Bank Group, ESMAP, Solargis) and PVGIS, read 23 Nov 2026, from
  docs/research/agy-2026-11-23/sun.md. Net metering and tariff text: NEPRA notifications as compiled in
  docs/research/agy-2026-11-23/net-billing.md and tariffs.md. That research is AI-compiled and every figure in it must be
  checked against the NEPRA text before launch. Rawalpindi is closed: no doc here lists it (its URLs 301 to /outlets/islamabad/).
*/

const num = (n: number) => n.toLocaleString("en-US");
/** Yearly kWh for a system of `kw`, from a yield in kWh per kW, rounded to the nearest hundred. */
const yearly = (kw: number, y: number) => num(Math.round((kw * y) / 100) * 100);

const nepra = "NEPRA replaced its 2015 net metering rules with the Prosumer Regulations 2026 (S.R.O. 251(I)/2026, notified on 9 February 2026). Under them, power you use yourself behind the meter is never billed. Only the surplus goes to the grid, and it is credited at an export rate that sits below the retail rate you pay for imports, instead of one unit for one unit as before. A system up to 25 kW needs the distribution company's approval and no separate NEPRA concurrence (S.R.O. 1330(I)/2026, 6 August 2026). The system can't be larger than your sanctioned load. People who signed an agreement under the 2015 rules keep its terms until it ends, unless they enlarge the system (S.R.O. 547(I)/2026). We took these from the NEPRA notifications as compiled in November 2026, so read the current text on nepra.org.pk and ask the shop what applies to your meter.";

const paperwork = (disco: string, sdo: string) => ({
  type: "steps" as const,
  heading: `What ${disco} asks for`,
  items: [
    { title: "Design and papers", text: "An engineer draws the single line diagram and lists the equipment. You supply an application form, a copy of your CNIC, a recent paid bill and an indemnity bond. The inverter has to meet the IEC 62109 safety standard." },
    { title: "Submission", text: `The file goes to ${sdo}, or to ${disco}'s online portal where it is open.` },
    { title: "Technical check", text: `${disco} checks the distribution transformer, which can't carry more than 80% of its rating in solar, and may ask for a load flow study on very large systems.` },
    { title: "Demand notice and inspection", text: `${disco} issues a demand notice for its fees and the two-way meter, then sends engineers to check earthing, isolators and the anti-islanding trip.` },
    { title: "Agreement and meter", text: `You sign the distributed generation agreement. ${disco}'s meter lab fits the two-way meter and the connection goes live.` },
  ],
});

type Copy = {
  disco: string;
  discoLong: string;
  sdo: string;
  /** Global Solar Atlas and PVGIS yields, kWh per kW per year. */
  gsa: number;
  pvgis: number;
  area: string[];
  areaNote: string;
  intro: string;
  sun: string[];
  work: { label: string; text: string; href: string }[];
  mode: "on-grid" | "hybrid" | "off-grid";
  extra: PageBlock[];
  projects: { label: string; text: string; href: string }[];
  qa: [string, string][];
  title: string;
  description: string;
};

const L: Copy = {
  disco: "LESCO", discoLong: "LESCO, the Lahore Electric Supply Company", sdo: "the LESCO sub-division office for your meter",
  gsa: 1465.6, pvgis: 1612.9,
  area: ["DHA Phases 1 to 9", "Bahria Town, all phases", "Johar Town", "Gulberg", "Model Town", "Garden Town", "Wapda Town", "Cantt and Askari", "Iqbal Town", "Allama Iqbal Town", "Valencia Town", "Shadman", "Faisal Town", "Township", "Cavalry Ground", "Pak Arab Housing Society", "Raiwind Road", "Bedian Road"],
  areaNote: "Lahore",
  title: "Solar Installation in Lahore | Solar Company | SolarLink",
  description: "SolarLink's head office on The Mall, Lahore: solar systems, panels, inverters and batteries, with LESCO net metering filed for you. Visit, call or message.",
  intro: "Walk in, call or message us about a system, a product or a LESCO net metering application.",
  sun: [
    "Lahore sits at 31.5 degrees north. The Global Solar Atlas (World Bank Group, ESMAP and Solargis, read 23 November 2026) puts a fixed, south-facing array at its best tilt, about 28 degrees, near 1,466 kWh per kW of panels a year, which is 5.1 peak sun hours a day averaged over twelve months. PVGIS, the European Commission's tool, is kinder: about 1,613 kWh per kW with 14% system losses built in. The two sources differ by roughly a tenth, so plan on the lower one.",
    `On that lower figure a 10 kW system makes about ${yearly(10, 1465.6)} kWh a year, or around 1,200 kWh in an average month. A real roof does worse than the textbook: shade from a water tank, panels laid almost flat, dust and summer heat each take a share. The site survey is where the real figure comes from.`,
    "The year is uneven. On a tilted panel the Global Solar Atlas shows Lahore peaking in April and May at about 6.3 peak sun hours a day, dropping to 4.8 in July when monsoon cloud arrives, and sinking to 3.5 to 3.8 in December and January while smog and fog sit over the city. A system that covers your bill in May will not in January. Net metering credit, or a battery, is how you decide to handle that gap.",
    "Why the bill matters more than the sunshine: LESCO bills homes on the uniform residential slab tariff. NEPRA's decision of 11 February 2026 (gazetted as S.R.O. 279(I)/2026, as compiled on 23 November 2026) lists an unprotected household at Rs 22.44 a unit in the first 100 units, rising to Rs 47.20 above 700, before fuel and quarterly adjustments and tax. Rates change, so check your own bill. The point holds either way: solar removes your most expensive units first, so a high-bill home gains more per kW than a low-bill one.",
  ],
  work: [
    { label: "Solar for homes", text: "Rooftop systems sized from your LESCO bill, on-grid or hybrid.", href: "/services/residential-solar/" },
    { label: "Solar for business", text: "Shops, offices and commercial sites in Lahore, sized around daytime load.", href: "/services/commercial-solar/" },
    { label: "Net metering support", text: "The LESCO application, approval and commissioning, filed for you.", href: "/services/net-metering-support/" },
    { label: "Panels, inverters and batteries", text: "Ask the shop what is in stock. Stock and prices change, so none are listed here.", href: "/products/" },
    { label: "Solar for farms and tubewells", text: "Farm power and tubewell systems on the edge of the city and beyond. Ask the shop.", href: "/services/agricultural-solar/" },
  ],
  mode: "on-grid",
  extra: [],
  projects: [
    { label: "Bahria Town Phase 2, 10 kW on-grid", text: "A home system. Draft page, details await the owner.", href: "/projects/bahria-town-phase-2-lahore-10kw/" },
    { label: "DHA Phase 5, 15 kW on-grid", text: "A large home system. Draft page, details await the owner.", href: "/projects/dha-phase-5-lahore-15kw/" },
    { label: "Gulberg III, 20 kW commercial", text: "A commercial roof. Draft page, details await the owner.", href: "/projects/gulberg-iii-lahore-20kw-commercial/" },
    { label: "Johar Town, 4.5 kW on-grid", text: "A compact home system. Draft page, details await the owner.", href: "/projects/johar-town-lahore-4-5kw/" },
    { label: "Model Town, 6 kW on-grid", text: "A home system with net metering. Draft page, details await the owner.", href: "/projects/model-town-lahore-6kw/" },
  ],
  qa: [
    ["How do I choose a solar company in Lahore?", "Ask for a written quote that lists the panels, inverter, structure and cables by model, a site visit before any number is fixed, who files the LESCO paperwork, and an address you can walk into. Our red flags guide goes through the warning signs in more detail."],
    ["How much does solar cost in Lahore?", "We don't publish a price here, because the cost moves with the size, the inverter type, whether you want a battery, and the roof structure. Send a recent LESCO bill and we'll write an itemised quote after a survey."],
    ["Do you work in DHA and Bahria Town?", "The old SolarLink site listed DHA and Bahria Town among the areas it served. The shop will confirm cover for your street when you call, and the survey settles it."],
    ["How long does a job take?", "The survey sets the schedule, because the roof, the equipment order and the size all change it. The net metering approval runs on LESCO's timetable, not ours, and the shop can tell you where your file stands."],
    ["Will my solar run during a power cut?", "Not if it's on-grid. An on-grid inverter shuts off when the grid fails, as a safety rule for line workers. A hybrid system with a battery keeps chosen loads running; the battery size decides for how long."],
    ["Is net metering available in Lahore?", "Yes, through LESCO, under the NEPRA Prosumer Regulations 2026. Exports are credited at an export rate below the retail rate, so a system sized to your own daytime use usually fits better than one sized to export. The shop files the application for you."],
    ["Is this the only SolarLink shop in Lahore?", "Yes. The Munawar Center shop on The Mall is both the Lahore shop and the head office."],
  ],
};

const I: Copy = {
  disco: "IESCO", discoLong: "IESCO, the Islamabad Electric Supply Company", sdo: "the IESCO sub-division office for your meter",
  gsa: 1559.1, pvgis: 1606.6,
  area: ["F-6, F-7 and F-8", "F-10 and F-11", "G-9 and G-10", "G-11 and G-13", "E-7 and E-11", "Bahria Town Islamabad, Phases 1 to 8", "DHA Islamabad", "PWD Colony", "Gulberg Islamabad", "Park View City"],
  areaNote: "Islamabad",
  title: "Solar Installation in Islamabad | Solar Company | SolarLink",
  description: "SolarLink's Islamabad shop on North Service Road, Sector I-14/3: solar systems, panels, inverters and batteries, with IESCO net metering filed for you.",
  intro: "Walk in, call or message us about a system, a product or an IESCO net metering application.",
  sun: [
    "Islamabad sits at 33.7 degrees north, and the Global Solar Atlas (World Bank Group, ESMAP and Solargis, read 23 November 2026) rates it the strongest of our three cities: about 1,559 kWh per kW of panels a year at the best tilt, near 30 degrees, or 5.4 peak sun hours a day over the year. PVGIS from the European Commission says about 1,607 kWh per kW with 14% system losses, so here the two sources nearly agree.",
    `A 10 kW system on that basis makes about ${yearly(10, 1559.1)} kWh a year, roughly 1,300 kWh in an average month. Cooler air helps: panels lose output as they heat up, and a highland city at the foot of the Margalla Hills runs cooler than the plains. Shade still counts, so the survey checks trees and neighbouring buildings against the roof.`,
    "The monthly pattern is gentler than Lahore's. Irradiation on a tilted panel peaks in May and June at 6.5 to 6.7 peak sun hours a day, stays above 5.4 through the monsoon months of July and August, and bottoms out near 3.9 to 4.0 in December and January (Global Solar Atlas monthly averages). February is a soft spot at 4.5. Plan the system for the whole year, not for June.",
    "Islamabad homes tend to be large, with several air conditioners, so the first question is how much of the daytime load you want solar to carry. A 10 kW array with 580 W panels takes 18 panels (10,000 divided by 580, rounded up), and an 8 kW array takes 14. The 580 W size is the panel the old SolarLink site listed, which is not confirmed, so treat it as an example of the arithmetic, not a stock list. The survey decides the real count from your roof and your meter readings.",
  ],
  work: [
    { label: "Solar for homes", text: "Rooftop systems sized from your IESCO bill, on-grid or hybrid.", href: "/services/residential-solar/" },
    { label: "Solar for business", text: "Shops, offices and plazas, sized around daytime load.", href: "/services/commercial-solar/" },
    { label: "Net metering support", text: "The IESCO application, approval and commissioning, filed for you.", href: "/services/net-metering-support/" },
    { label: "Hybrid systems", text: "A battery behind a hybrid inverter keeps chosen loads on when the grid drops.", href: "/solar-systems/hybrid/" },
    { label: "Panels, inverters and batteries", text: "Ask the shop what is in stock. Stock and prices change, so none are listed here.", href: "/products/" },
  ],
  mode: "hybrid",
  extra: [],
  projects: [
    { label: "Bahria Town Phase 6, 10 kW on-grid", text: "A home system. Draft page, details await the owner.", href: "/projects/bahria-town-phase-6-islamabad-10kw/" },
    { label: "Sector I-14/3, 8 kW hybrid", text: "A home system with a battery. Draft page, details await the owner.", href: "/projects/sector-i14-islamabad-8kw-hybrid/" },
    { label: "PWD housing scheme, 12 kW hybrid", text: "A home system with a battery, listed on the old site under Rawalpindi. Draft page, details await the owner.", href: "/projects/pwd-rawalpindi-12kw-hybrid/" },
  ],
  qa: [
    ["Where is the SolarLink shop in Islamabad?", "House No. 514, North Service Road, Sector I-14/3, Islamabad. Phone, WhatsApp and hours are in the box at the top of this page."],
    ["Is net metering available in Islamabad?", "Yes, through IESCO, under the NEPRA Prosumer Regulations 2026. The shop prepares the file, submits it to your IESCO sub-division and follows it through inspection and the two-way meter. Exports are credited at a rate below the retail rate, so size the system to your own daytime use first."],
    ["How many solar panels does an Islamabad home need?", "It comes from your units, not from a rule. A home running two or three air conditioners often lands in the 8 kW to 10 kW range, which is 14 to 18 panels of 580 W, but a bill and a roof visit settle it. Send the last twelve months of units if you have them."],
    ["Is there a SolarLink office in Rawalpindi?", "No. The Rawalpindi office has closed, and the Islamabad shop on North Service Road is the one to contact. Ask whether we can cover a site on the Rawalpindi side [confirm with client]."],
    ["Can I pay for a system in parts?", "We don't publish payment terms here. Ask the shop what is available for your case, and see our financing page for what we can say today."],
    ["Do you serve Bahria Town and DHA Islamabad?", "The old SolarLink site listed both, along with the F, G and E sectors. The shop confirms cover for your plot on the phone, and the survey settles it."],
    ["Which system suits Islamabad, on-grid or hybrid?", "On-grid costs less and suits a home where cuts are short and rare. Hybrid adds a battery, so fans, lights, a fridge and a router keep running through longer outages. Our hybrid page shows how the energy flows."],
  ],
};

const S: Copy = {
  disco: "FESCO", discoLong: "FESCO, the Faisalabad Electric Supply Company", sdo: "the FESCO sub-division office for your meter",
  gsa: 1512.9, pvgis: 1616.0,
  area: ["Sargodha city", "Bhalwal", "Bhera", "Kot Momin", "Shahpur", "Sillanwali", "Sahiwal (Sargodha)", "Chak Jhumra area", "Farms and tubewells around the city"],
  areaNote: "Sargodha",
  title: "Solar Installation in Sargodha | Solar Company | SolarLink",
  description: "SolarLink's Sargodha shop near Company Bagh: solar for homes, shops and farms, tubewell systems, panels, inverters, batteries and FESCO net metering.",
  intro: "Walk in, call or message us about a home system, a solar tubewell, a product or a FESCO net metering application.",
  sun: [
    "Sargodha lies in central Punjab at 32.1 degrees north. The Global Solar Atlas (World Bank Group, ESMAP and Solargis, read 23 November 2026) gives a fixed array at its best tilt, about 28 degrees, near 1,513 kWh per kW of panels a year, or 5.3 peak sun hours a day. PVGIS from the European Commission reads higher, at about 1,616 kWh per kW with 14% system losses. We plan on the lower number.",
    `A 10 kW roof system on that figure makes about ${yearly(10, 1512.9)} kWh a year, around 1,260 kWh in an average month. Farm roofs and open ground often give a cleaner run than a city roof, since there is less shade and you can set the tilt properly. Dust is the cost: a dry, windy spell puts a film on the glass, and panels on open farmland may need washing more often than ones on a town roof.`,
    "The monthly profile (Global Solar Atlas, tilted surface) peaks at 6.4 to 6.5 peak sun hours a day in April and May, runs near 5.1 in July under the monsoon, and falls to 3.6 in January and 4.0 in December. For a tubewell the shape of that curve matters, because pump output follows the sun: flow is highest in April and May, and lowest in the winter months.",
    "Farm customers have two problems that city homes don't: diesel and an unreliable feeder. A solar pump replaces diesel with sunlight during the day. Whether the same farm connection can also use net metering is a question for FESCO, and we'd rather check your tariff category than guess.",
  ],
  work: [
    { label: "Solar for farms and tubewells", text: "Pump systems for tubewells and irrigation, sized to the motor and the depth.", href: "/services/agricultural-solar/" },
    { label: "Off-grid systems", text: "How a system with no grid connection is built, for pumps and remote sites.", href: "/solar-systems/off-grid/" },
    { label: "Solar for homes", text: "Rooftop systems for Sargodha homes, on-grid or hybrid.", href: "/services/residential-solar/" },
    { label: "Net metering support", text: "The FESCO application, approval and commissioning, filed for you.", href: "/services/net-metering-support/" },
    { label: "Panels, inverters and batteries", text: "Ask the shop what is in stock. Stock and prices change, so none are listed here.", href: "/products/" },
  ],
  mode: "off-grid",
  extra: [
    { type: "prose", heading: "How a solar tubewell is sized", paragraphs: [
      "Sargodha farming runs on citrus orchards and wheat, with dairy beside them, and every one of those wants dependable water. A solar tubewell swaps the diesel engine or the grid motor for panels, a drive that controls the pump motor, wiring and a mounting structure. It pumps while the sun is up, so the water is either used as it arrives, held in a tank or channel, or both.",
      "Motors are sold in horsepower and panels in kilowatts. One horsepower is 746 W, so a 7.5 HP motor draws about 5.6 kW, a 10 HP motor about 7.5 kW and a 20 HP motor about 14.9 kW at full load. The panel array is sized above the motor rating, since panels rarely reach their label power, and the ratio depends on the pump, the drive and how deep the water table sits. The survey fixes it, not a table.",
    ] },
    { type: "steps", heading: "What the survey measures on a farm", items: [
      { title: "Motor and pump", text: "The horsepower on the plate, the pump make and whether it is a surface or a submersible set." },
      { title: "Depth and flow", text: "How far down the water sits, how far it must lift and how much you need in a day." },
      { title: "Water use", text: "The acreage, the crop and whether the water is used straight away or stored." },
      { title: "Array and drive", text: "The panel count, the structure type for open ground or roof, and the pump drive that matches your motor." },
      { title: "Grid or no grid", text: "Whether the farm keeps a grid connection as a backup, and what FESCO allows on that connection." },
    ] },
  ],
  projects: [
    { label: "Near Company Bagh, 10 kW farm", text: "A tubewell system. Draft page, details await the owner.", href: "/projects/company-bagh-sargodha-10kw-farm/" },
    { label: "Near Company Bagh, 4.5 kW on-grid", text: "A home system. Draft page, details await the owner.", href: "/projects/company-bagh-sargodha-4-5kw/" },
  ],
  qa: [
    ["Where is the SolarLink shop in Sargodha?", "Block No. 05, Aslahy Wali Gali, near Company Bagh, Sargodha. Phone, WhatsApp and hours are in the box at the top of this page."],
    ["Do you install solar tubewells in Sargodha?", "Yes, farm systems are part of what the Sargodha shop does. Tell us the motor horsepower, the depth of the water and how you irrigate, and we'll visit before we size it."],
    ["Which electricity company serves Sargodha?", "Bills in Sargodha come from FESCO, the Faisalabad Electric Supply Company. The old SolarLink pages named a different company in places, which looks wrong. The name sits at the top of your bill, so check it there."],
    ["Is net metering available in Sargodha?", "Yes, through FESCO, under the NEPRA Prosumer Regulations 2026 for home and commercial connections. Whether a farm tubewell connection qualifies depends on its tariff category, so ask the shop to check before you plan around export credit."],
    ["How much does a solar tubewell cost?", "We don't publish a price. The cost moves with motor size, well depth, the drive, and the structure. A survey and an itemised quote come first."],
    ["Do you serve Bhalwal, Bhera and Kot Momin?", "The old SolarLink site listed those towns and several more in the district. The shop confirms cover for your village by phone, since the old list is not yet confirmed."],
    ["Does a solar pump work on a cloudy day?", "It works at reduced output, because pump output follows sunlight. In the monsoon months the flow drops, which is why a tank or a larger array can matter for the crop schedule you have."],
  ],
};

const COPY: Record<OutletSlug, Copy> = { lahore: L, islamabad: I, sargodha: S };

export const outletDocs: PageDoc[] = outlets.map((o) => {
  const c = COPY[o.slug];
  const phones = show(o.phones);
  const wa = show(o.whatsapp);
  const hours = show(o.hours);
  const address = show(o.addressLines);
  const area = show(o.area);
  const faqRows = c.qa.map(([q, a]) => [q, a] as [string, string]);
  return make({
    path: o.path, kind: "outlet",
    title: c.title,
    description: c.description,
    h1: `Solar company in ${o.city}`,
    lead: `${o.role === "head-office" ? "Our head office" : "Our shop"} in ${o.city}${area ? `, ${area}` : ""}. ${c.intro}`,
    blocks: [
      { type: "facts", heading: "Visit us", items: [
        ...(address ? [{ label: "Address", value: address.join(", ") }] : []),
        ...(phones ? [{ label: "Phone", value: phones.join(", ") }] : []),
        ...(wa ? [{ label: "WhatsApp", value: wa }] : []),
        ...(hours ? [{ label: "Hours", value: hours }] : []),
        { label: "Electricity company", value: c.discoLong },
      ] },
      { type: "feature", heading: `Solar in ${o.city}`, text: `Bring a recent ${c.disco} bill to the ${o.city} shop. With the bill and a look at the roof, we can size a system and prepare the net metering file.`, tone: "sunken" },
      { type: "prose", heading: `What the sun gives ${o.city}`, paragraphs: c.sun },
      { type: "links", heading: `What the ${o.city} shop does`, items: c.work },
      ...c.extra,
      { type: "prose", heading: `Net metering with ${c.disco}`, paragraphs: [
        `${o.city} homes and businesses are billed by ${c.discoLong}. ${nepra}`,
        `The shop prepares the ${c.disco} file, submits it and follows it through to the two-way meter. Our net metering guide explains each step and the net metering support page covers the service.`,
      ] },
      paperwork(c.disco, c.sdo),
      { type: "diagram", heading: "How the power flows", lead: c.mode === "off-grid" ? "A pump or off-grid system, where panels, a drive and the load work without the grid." : undefined, mode: c.mode },
      { type: "sizing", heading: "Size it from your bill", lead: "Move the slider to see a rough system size for your bill. It is an estimate: the site survey confirms it." },
      { type: "prose", heading: `Areas around ${o.city}`, paragraphs: [
        `The old SolarLink site listed these areas for ${c.areaNote}. The client has not confirmed the list yet, so treat it as a guide and ask the shop about your street: ${c.area.join(", ")}. [confirm with client]`,
      ] },
      { type: "links", heading: `Project drafts near ${o.city}`, items: c.projects },
      faq(`Questions about our ${o.city} shop`, faqRows),
    ],
    related: [
      { label: "All outlets", href: "/outlets/" },
      { label: "Get a quote", href: "/get-quote/" },
      { label: "Net metering guide", href: "/net-metering-guide/" },
      { label: "Solar calculator", href: "/solar-calculator/" },
      ...(o.slug === "lahore" ? [{ label: "LESCO application guide", href: "/blog/net-metering-lesco-application-guide/" }] : []),
    ],
  });
});

/* ---------------------------------------------------------------- projects */

type Kind = "Home" | "Farm" | "Commercial";
type Mode = "On-grid" | "Hybrid";
type Row = {
  slug: string; place: string; city: string; yieldCity: string; y: number; kw: number; kind: Kind; mode: Mode;
  /** What the old page said about this job, paraphrased, with every savings figure left out. */
  old: string;
  titlePlace: string;
};

const rows: Row[] = [
  { slug: "bahria-town-phase-2-lahore-10kw", place: "Bahria Town Phase 2", titlePlace: "Bahria Town Phase 2", city: "Lahore", yieldCity: "Lahore", y: 1465.6, kw: 10, kind: "Home", mode: "On-grid", old: "called it a residential system where SolarLink did the survey, the design, the commissioning and the net metering registration" },
  { slug: "bahria-town-phase-6-islamabad-10kw", place: "Bahria Town Phase 6", titlePlace: "Bahria Town Phase 6", city: "Islamabad", yieldCity: "Islamabad", y: 1559.1, kw: 10, kind: "Home", mode: "On-grid", old: "listed it as a residential system in Bahria Town, Islamabad, with the same survey-to-registration scope" },
  { slug: "company-bagh-sargodha-10kw-farm", place: "Near Company Bagh", titlePlace: "Near Company Bagh", city: "Sargodha", yieldCity: "Sargodha", y: 1512.9, kw: 10, kind: "Farm", mode: "On-grid", old: "described an agricultural system that powers a tubewell and removes fuel and grid costs from the pump" },
  { slug: "company-bagh-sargodha-4-5kw", place: "Near Company Bagh", titlePlace: "Near Company Bagh", city: "Sargodha", yieldCity: "Sargodha", y: 1512.9, kw: 4.5, kind: "Home", mode: "On-grid", old: "listed a small residential system close to the Company Bagh area" },
  { slug: "dha-phase-5-lahore-15kw", place: "DHA Phase 5", titlePlace: "DHA Phase 5", city: "Lahore", yieldCity: "Lahore", y: 1465.6, kw: 15, kind: "Home", mode: "On-grid", old: "described a large residential system for a villa in DHA" },
  { slug: "gulberg-iii-lahore-20kw-commercial", place: "Gulberg III", titlePlace: "Gulberg III", city: "Lahore", yieldCity: "Lahore", y: 1465.6, kw: 20, kind: "Commercial", mode: "On-grid", old: "described a commercial roof in Gulberg III and a drop in the business's running costs" },
  { slug: "johar-town-lahore-4-5kw", place: "Johar Town", titlePlace: "Johar Town", city: "Lahore", yieldCity: "Lahore", y: 1465.6, kw: 4.5, kind: "Home", mode: "On-grid", old: "called it a compact system for a mid-size home in Johar Town" },
  { slug: "model-town-lahore-6kw", place: "Model Town", titlePlace: "Model Town", city: "Lahore", yieldCity: "Lahore", y: 1465.6, kw: 6, kind: "Home", mode: "On-grid", old: "listed a household system in Model Town connected under net metering" },
  { slug: "pwd-rawalpindi-12kw-hybrid", place: "PWD Housing Scheme", titlePlace: "PWD Housing Scheme", city: "Rawalpindi", yieldCity: "Islamabad", y: 1559.1, kw: 12, kind: "Home", mode: "Hybrid", old: "described a residential system with battery storage so the home keeps its power through cuts" },
  { slug: "sector-i14-islamabad-8kw-hybrid", place: "Sector I-14/3", titlePlace: "Sector I-14/3", city: "Islamabad", yieldCity: "Islamabad", y: 1559.1, kw: 8, kind: "Home", mode: "Hybrid", old: "described a residential system with battery backup to ride out load-shedding" },
];


/** The two paragraphs that explain the kind of system, with the yield worked out from the Global Solar Atlas figure. */
const about = (r: Row): string[] => {
  const e = yearly(r.kw, r.y);
  const yc = r.yieldCity;
  const calc = `At the Global Solar Atlas figure for ${yc} (${num(Math.round(r.y))} kWh per kW a year, read 23 November 2026), ${r.kw} kW of panels would make about ${e} kWh a year before shading and roof angle are counted.${r.city === "Rawalpindi" ? " We used the Islamabad figure because it is the nearest of our three cities." : ""} The real number for this roof isn't known.`;
  if (r.kind === "Farm") return [
    "A tubewell system works in daylight, when the array makes most of its power, and the pump moves water only while the sun is up. The old page called it on-grid, which would mean the farm keeps its grid connection for the hours when the sun is low. Whether that connection can use net metering depends on its tariff category, and that is for the electricity company to say.",
    calc,
  ];
  if (r.kind === "Commercial") return [
    "A shop or office uses most of its power while it is open, and that is also when solar peaks. An on-grid system on a commercial roof feeds the building first and sends any surplus to the grid, so the sizing question is how much daytime load the roof can meet. Commercial connections are on their own tariff, so the savings arithmetic differs from a home.",
    calc,
  ];
  if (r.mode === "Hybrid") return [
    "A hybrid system adds a battery behind a hybrid inverter. The panels feed the house first and charge the battery with what is left. When the grid drops, chosen circuits keep running from the battery. How long they run depends on the battery size and what you plug into those circuits.",
    calc,
  ];
  return [
    "An on-grid home system has no battery. The inverter feeds the house first and sends any surplus to the grid, and the grid carries the load after sunset. It also switches off when the grid fails, as a safety rule, so it gives no backup in a power cut.",
    calc,
  ];
};

const projectFaq = (r: Row): [string, string][] => [
  ["Is this a real installation?", `The old SolarLink site listed it as one, but the page behind it used placeholder photos and bills. We haven't confirmed the details or the owner's agreement, so read this page as a draft.`],
  [`Can SolarLink size a system like this for me?`, `Send a recent bill and we'll visit the site. ${r.kw} kW is where this job landed, not a rule. Your roof, your units and what you want to run decide your size.`],
];

export const projectDocs: PageDoc[] = rows.map((r) => {
  const kw = String(r.kw);
  const mode = r.mode.toLowerCase();
  const kind = r.kind.toLowerCase();
  const outletHref = r.yieldCity === "Lahore" ? "/outlets/lahore/" : r.yieldCity === "Islamabad" ? "/outlets/islamabad/" : "/outlets/sargodha/";
  const outletLabel = `${r.yieldCity} shop`;
  const typeHref = r.mode === "Hybrid" ? "/solar-systems/hybrid/" : "/solar-systems/on-grid/";
  const serviceHref = r.kind === "Farm" ? "/services/agricultural-solar/" : r.kind === "Commercial" ? "/services/commercial-solar/" : "/services/residential-solar/";
  const noSuffix = `${r.titlePlace}, ${r.city} - ${kw}kW ${r.mode} Solar`;
  const withSuffix = `${noSuffix} | SolarLink`;
  return make({
    path: `/projects/${r.slug}/`, kind: "project",
    title: withSuffix.length < 60 ? withSuffix : noSuffix,
    description: `Draft: a ${kw} kW ${mode} ${kind} solar system at ${r.place}, ${r.city}. Size and type from the old site; photos, bills and equipment await the owner.`,
    h1: `${kw} kW ${mode} solar, ${r.place}, ${r.city}`,
    lead: `A ${kw} kW ${mode} ${kind} system at ${r.place}, ${r.city}. This is a draft: photos, dates and the equipment list are being confirmed.`,
    blocks: [
      { type: "facts", heading: "Project details (draft)", items: [
        { label: "Location", value: `${r.place}, ${r.city}` },
        { label: "System size", value: `${kw} kW` },
        { label: "System type", value: r.mode },
        { label: "Property", value: r.kind },
        { label: "Status", value: "Unconfirmed draft" },
      ] },
      { type: "prose", heading: "What the old page said", paragraphs: [
        `The old SolarLink page ${r.old}. It also quoted before and after bills and a customer comment, but marked its own bills and photos as placeholders, so none of that is repeated here.`,
      ] },
      { type: "prose", heading: "About a system like this", paragraphs: about(r) },
      { type: "prose", heading: "Still to confirm", paragraphs: [
        "Before this page can go live as a real project, the client has to confirm that the job exists and send photos, the date, the equipment list, real bill figures and the owner's agreement to be shown.",
      ] },
      faq("Questions about this project", projectFaq(r)),
      { type: "projects", heading: "More projects" },
    ],
    related: [
      { label: "All projects", href: "/projects/" },
      { label: outletLabel, href: outletHref },
      { label: r.mode === "Hybrid" ? "Hybrid systems" : "On-grid systems", href: typeHref },
      { label: r.kind === "Farm" ? "Solar for farms" : r.kind === "Commercial" ? "Solar for business" : "Solar for homes", href: serviceHref },
      { label: "Get a quote", href: "/get-quote/" },
    ],
  });
});
