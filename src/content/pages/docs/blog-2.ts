import { post } from "./post";
import { faq } from "./shared";
import type { PageDoc } from "../types";

/*
  Blog posts, part 2 of 2. Full articles written 23 Nov 2026 from the fact packs in docs/research/agy-2026-11-23/blog.
  Public facts carry their source in the text or in the Sources block. No SolarLink price, warranty, time, count or
  dealer status is stated. Tariff and rule figures are dated where they appear.
*/
const src = (paragraphs: string[]) => ({ type: "prose" as const, heading: "Sources", paragraphs });

export const articles2: PageDoc[] = [
  /* ---------------------------------------------------------------- on-grid, hybrid, off-grid */
  post(
    "on-grid-vs-hybrid-vs-off-grid-pakistan",
    "On-Grid vs Hybrid vs Off-Grid Solar",
    "On-grid vs hybrid vs off-grid solar in Pakistan",
    "On-grid, hybrid and off-grid solar compared for Pakistan: how each works, what it costs to run, and which grid feeder suits which system.",
    [
      "On-grid has no battery and works alongside the grid. Hybrid adds a battery so the house keeps running when the grid drops. Off-grid has no grid connection at all and lives on panels and a battery bank.",
      "The deciding questions are boring ones. How many hours a day does your feeder lose power, and what must keep running when it does?",
    ],
    [["On-grid systems", "/solar-systems/on-grid/"], ["Hybrid systems", "/solar-systems/hybrid/"], ["Off-grid systems", "/solar-systems/off-grid/"], ["Net metering guide", "/net-metering-guide/"]],
    [
      {
        type: "prose",
        heading: "Three architectures, one question",
        paragraphs: [
          "Every rooftop system in Pakistan is one of three designs, and they differ in one part: what happens to the power the panels make when you are not using it, and what you do at night or during a cut.",
          "An on-grid system sends surplus to the grid and pulls from the grid when the sun is down. A hybrid system does the same but can also charge a battery and run your essential circuits from it. An off-grid system has no grid to send to or pull from, so the battery is the whole night shift.",
          "People often start from price and work backwards. A better order is to start from your feeder. A house on a feeder that almost never trips has little use for a battery. A farm with no line at all has no choice. The messy middle, a house that loses two to six hours a day, is where most of the real decisions sit.",
        ],
      },
      { type: "diagram", heading: "How the power flows in each design", lead: "Switch between the three to see where the battery and the grid sit.", mode: "on-grid" },
      {
        type: "prose",
        heading: "On-grid (grid-tied) systems",
        paragraphs: [
          "The panels feed a grid-tied inverter, which converts the DC from the panels into AC at the grid's voltage and frequency and locks onto the grid signal. Your house uses what it needs first. Any surplus flows out through the meter.",
          "There is no battery, so there is little to wear out, and the inverter is a simpler, more efficient machine. Datasheets for grid-tied string inverters from the large makers typically list peak efficiency in the high 90s as a percentage; hybrid inverters, which handle a battery as well, list somewhat lower figures in grid mode. Check the datasheet of the model you are quoted.",
          "Here is the part that surprises people. An on-grid system switches itself off when the grid goes down. This is deliberate. Standards such as IEC 62116 test whether an inverter stops feeding power into a dead line (called anti-islanding), because a rooftop system that keeps a street's wires live would endanger the linemen working on them. So on-grid solar gives you no light during a load-shedding cut, even at noon with full sun. If someone sells you an on-grid system as a load-shedding fix, they have the design wrong.",
          "On-grid systems can be registered for net metering with your distribution company. The rules for how exports are credited changed in 2026, so read our net metering guide and the net billing calculator before you assume any credit rate.",
        ],
      },
      {
        type: "prose",
        heading: "Hybrid systems",
        paragraphs: [
          "A hybrid inverter does three jobs: it runs the panels, it manages a battery and it talks to the grid. When the grid is up, solar feeds the house, the battery charges from surplus and the rest can go to the grid. When the grid drops, the inverter isolates your home from the street and runs your chosen circuits from the battery and the panels together.",
          "The switchover matters. Many hybrid inverters list a transfer time in the millisecond range on their datasheets, short enough that a computer or router usually rides through it. It is a manufacturer figure, so compare the number for the exact model, and do not assume every unit matches it.",
          "The battery is where hybrid gets expensive and where it gets complicated. Lithium iron phosphate (LiFePO4) and tubular lead-acid are the two types you will be offered. Lead-acid costs less at the start, but its cycle life is lower, so you replace it sooner. LiFePO4 costs more up front and usually lists a much higher cycle count. Ask each supplier for the cycle rating and the depth of discharge it assumes, in writing, and compare cost per usable kWh over its life rather than the sticker price.",
          "Round-trip loss is the quiet cost. Energy that goes into a battery and comes out again is not all recovered; lithium batteries typically recover somewhere around nine tenths, lead-acid less. That loss is why a hybrid system running the battery every night makes slightly less useful energy from the same panels than an on-grid system exporting during the day.",
        ],
      },
      {
        type: "prose",
        heading: "Off-grid (stand-alone) systems",
        paragraphs: [
          "Off-grid means no connection to a distribution company at all. Panels charge a battery bank through a charge controller, and an inverter turns the stored power into AC. Nothing else supplies the load, so the design has to survive the worst weather, not the average.",
          "That is why autonomy matters. Guidance from NREL on stand-alone PV systems treats days of autonomy, the number of cloudy days the battery must carry the load alone, as a core design choice. One to two days is a common target. Pakistan's winter fog and monsoon cloud make a mid-winter week the real test, and a bank sized for sunny days alone will run flat.",
          "Many off-grid sites add a generator input. A dry contact on the inverter starts a petrol or diesel set when the battery falls to a set level, and shuts it off after charging. It is a sensible backstop, and it lets you size the battery for a shorter autonomy.",
          "Off-grid suits tubewells far from a line, remote farmhouses and some outbuildings. It is a poor fit for a house already connected to the grid, because you pay for a full battery bank to do what the grid already does for free on most days. A pure stand-alone inverter is also not allowed to connect to the grid, so you cannot drift into net metering later without changing equipment.",
        ],
      },
      {
        type: "facts",
        heading: "The three side by side",
        items: [
          { label: "On-grid: battery", value: "None. Switches off when the grid is down (anti-islanding)." },
          { label: "On-grid: suits", value: "Feeders that rarely lose power; the lowest up-front cost of the three." },
          { label: "On-grid: net metering", value: "Eligible, under the rules in force on the day you apply." },
          { label: "Hybrid: battery", value: "Yes. Runs chosen circuits when the grid drops, with a fast transfer." },
          { label: "Hybrid: suits", value: "Feeders that lose power for hours a day and homes that cannot go dark." },
          { label: "Hybrid: net metering", value: "Eligible with a grid-connected hybrid inverter; confirm with the distribution company." },
          { label: "Off-grid: battery", value: "Yes, sized for days of autonomy, often plus a generator input." },
          { label: "Off-grid: suits", value: "Sites with no grid line: tubewells, remote farms." },
          { label: "Off-grid: net metering", value: "Not possible. No grid connection." },
          { label: "Upkeep", value: "On-grid: cleaning and inspection. Hybrid and off-grid: all that, plus battery replacement over the system's life." },
        ],
      },
      {
        type: "steps",
        heading: "Matching a system to your feeder",
        items: [
          { title: "Write down your real outages", text: "Count the hours of load-shedding on an ordinary week in summer and in winter. Your distribution company's feeder schedule, or a month of notes, beats guessing." },
          { title: "Decide what must stay on", text: "Fridge, fans, lights, a router and a pump are a very different load from a whole house with two air conditioners. A battery sized for the first is affordable; for the second it often is not." },
          { title: "Pick the design", text: "Almost no outages: on-grid. Regular outages of an hour or more, and a need to keep working through them: hybrid. No grid line: off-grid." },
          { title: "Check the net metering position", text: "On-grid and hybrid can apply. Read the current NEPRA rules and your distribution company's checklist before you rely on export credits." },
          { title: "Leave room to change", text: "Some on-grid installs can add a hybrid inverter and battery later; others need the inverter swapped. Ask any installer, in writing, which applies to the design you are quoted." },
        ],
      },
      { type: "tool", tool: "battery", heading: "Work out a battery size", lead: "Add up the appliances that must stay on and see how much battery they need." },
      faq("On-grid, hybrid and off-grid questions", [
        ["What is the difference between on-grid and hybrid solar?", "A hybrid system adds a battery and a hybrid inverter. When the grid is up the two behave much alike; when the grid drops, an on-grid system shuts down and a hybrid system keeps running your chosen circuits from the battery and panels."],
        ["Does an on-grid system work during load-shedding?", "No. Grid-tied inverters stop feeding power when the grid goes down, in line with anti-islanding tests such as IEC 62116, so the house goes dark even at noon. Only a hybrid or off-grid design keeps power on."],
        ["Can I turn an on-grid system into a hybrid one later?", "Sometimes. If the inverter is a grid-tied unit, you usually replace it with a hybrid inverter and add a battery; the panels and frames often stay. Ask the installer to say in writing what a later upgrade would involve before you buy."],
        ["Which system is cheapest to run over its life?", "On-grid, because it has no battery to replace. Batteries in a hybrid or off-grid system are the largest recurring cost, and tubular lead-acid and LiFePO4 differ a good deal in how long they last. Compare cycle ratings in the datasheets."],
        ["Can an off-grid system use net metering?", "No. A stand-alone inverter has no connection to the grid, and it is not permitted to connect. Net metering needs a grid-tied or hybrid inverter that meets the distribution company's requirements."],
        ["When is off-grid the only sensible choice?", "Where there is no grid line at all, such as a remote tubewell or farmhouse. Where the grid exists, on-grid or hybrid usually costs less for the same comfort."],
      ]),
      src([
        "IEC, IEC 62116, Utility-interconnected photovoltaic inverters: test procedure of islanding prevention measures, 2014 edition. iec.ch",
        "National Renewable Energy Laboratory (NREL), Stand-Alone Photovoltaic Systems design guidance, 2022. nrel.gov",
        "NEPRA, Distributed generation and net metering regulations and the 2026 prosumer notification (S.R.O. 251(I)/2026, 9 Feb 2026, as cited in our research; read the notification itself). nepra.org.pk",
        "Inverter manufacturer datasheets (efficiency and transfer-time figures vary by model; read the one you are quoted), 2024.",
        "Battery manufacturer datasheets for LiFePO4 and tubular lead-acid (cycle life, depth of discharge), 2024.",
      ]),
    ],
  ),

  /* ---------------------------------------------------------------- red flags */
  post(
    "solar-installation-red-flags-pakistan",
    "Red Flags When Choosing a Solar Company in Pakistan",
    "Red flags when choosing a solar company in Pakistan",
    "How to choose a solar company in Pakistan: eight red flags in quotes and sales pitches, and the questions that expose them before you pay a rupee.",
    [
      "Ask for the full list of components with brand and model, the warranty terms in writing, who files the net metering application, and who services the system afterwards. Then ask who signs the electrical drawings.",
      "A quote that cannot be itemised, a demand for all the money up front and a generation promise that breaks physics are the three that should end the conversation.",
    ],
    [["Home solar", "/services/residential-solar/"], ["Net metering support", "/services/net-metering-support/"], ["Common net metering mistakes", "/blog/net-metering-common-mistakes-pakistan/"], ["Get a quote", "/get-quote/"]],
    [
      {
        type: "prose",
        heading: "Why this matters more than the panel brand",
        paragraphs: [
          "Solar in Pakistan has grown fast, and the rush has pulled in many installers, from engineering firms to a man with a ladder and a phone. Most are honest. Some cut corners you cannot see from the ground, and you find out at the first storm, the first warranty claim or the first rejected net metering file.",
          "A solar system is a power plant on your roof, built to run for decades. The panels are the easy part to judge. The cables, frames, earthing and paperwork decide whether it is safe, and those are exactly what a thin quote hides.",
          "Here are eight red flags, each with a check you can do yourself.",
        ],
      },
      {
        type: "prose",
        heading: "1. No registration and no named engineer",
        paragraphs: [
          "In Pakistan, solar installers are listed through the Alternative Energy Development Board (AEDB) and its related bodies, and net metering files are submitted to your distribution company with a design behind them. Ask which registration the company holds and verify it with the issuing body, not from a certificate photo on WhatsApp.",
          "Then ask who signs the single line diagram and structural design. Pakistan Engineering Council (PEC) rules expect designs for electrical and structural work to come from a registered engineer, and distribution companies ask for a proper single line diagram with a net metering application. Ask for the engineer's name and PEC number, and check it. If the answer is vague, so is the accountability.",
        ],
      },
      {
        type: "prose",
        heading: "2. Panels that cannot be traced",
        paragraphs: [
          "Panels differ in grade even within a brand. A factory tests every module, and lower-performing units are sometimes sold as cheaper stock. A trader can also relabel stock with a bigger brand's name. You cannot see this from a photo.",
          "What you can do is ask for the serial numbers and the factory test report for the delivery, compare the barcode printed under the glass with the one on the frame, and check the model number against the maker's own datasheet. Ask where the stock came from, and ask for the importer's paperwork, because most panel makers' warranty claims in Pakistan run through an importer.",
          "And treat the word 'Tier 1' with care. Bloomberg NEF's Tier 1 list is a measure of whether banks have financed projects using a maker's modules; it is not an audit of build quality, and it does not apply to the particular pallet delivered to your gate. A sticker or a sales line saying so proves little.",
        ],
      },
      {
        type: "prose",
        heading: "3. Frames made to look cheap and last short",
        paragraphs: [
          "Your panels sit on steel for twenty years or more, in dust storms and monsoon wind. Frames painted with red oxide rust at the welds and the cut edges within a few seasons. Hot-dip galvanised steel carries a zinc coating that protects it, and ASTM A123 is the standard that sets coating thickness by steel grade.",
          "Ask the quote to say what the structure is made of, what the coating thickness is in microns, and how the frame is fixed to the roof. Look at the cut ends on a sample piece. Bare steel at a cut or a thin, patchy finish is a warning.",
        ],
      },
      {
        type: "prose",
        heading: "4. Ordinary wire on the DC side",
        paragraphs: [
          "The cable from the panels to the inverter runs in sun, heat and weather for the life of the system. Solar cable is a specific product: tinned copper, UV resistant, flame retardant, built to standards such as EN 50618 and IEC 62930. Household AC wire, or copper-clad aluminium sold as copper, degrades faster in sunlight and runs hotter under load.",
          "Ask for the cable make and standard on the quote and look at the printing on the sheath. Real solar cable carries the standard and the cross-section along its length. If the answer is 'it is all the same wire', it is not.",
        ],
      },
      {
        type: "prose",
        heading: "5. No surge protection and a thin answer on earthing",
        paragraphs: [
          "A rooftop array is a large metal collector in the open. Lightning, nearby strikes and grid surges can travel down the cables into the inverter. Surge protection devices (SPDs) on the DC and AC sides, and a proper earth connection, are the cheap parts that save the expensive one.",
          "Ask where the SPDs go and what earth resistance the earth pit is tested to. The figure often quoted for solar earthing is below five ohms; ask for the measured value on handover, not a promise. Missing or poor protection can also void the inverter maker's warranty, so read the inverter's installation manual.",
        ],
      },
      {
        type: "prose",
        heading: "6. 'Pay everything now'",
        paragraphs: [
          "A reasonable contract ties payments to progress: a deposit to book, a payment on delivery of equipment, a payment at commissioning, and a final part after the system is energised or net metering is done. The split differs between companies, and there is no single required one.",
          "A demand for the full amount before any work is the red flag. You lose every lever you have, and if the company disappears there is nothing to claim against. Ask for the payment schedule in the written quote, and keep the receipts.",
        ],
      },
      {
        type: "prose",
        heading: "7. Generation claims that break physics",
        paragraphs: [
          "Sunlight is predictable, and a sales pitch should respect it. Global Solar Atlas, from the World Bank's ESMAP programme, shows Punjab's long-run average at somewhere around four to four and a half units of energy per day for every kilowatt of panels, lower in winter and during smog. A 5 kW system therefore makes in the region of 20 to 22 units on an average day, not 30 or 40.",
          "If a pitch promises numbers well above that, year-round, or a promise of no bill at all, with no mention of the grid, it is built to sell. A good proposal shows the sun-hours assumption, the losses and the monthly range, and it says what the number depends on.",
        ],
      },
      {
        type: "prose",
        heading: "8. No office, no stock, no paper trail",
        paragraphs: [
          "A company that exists only on a social media page is hard to find when something goes wrong. Ask for a registered address you can visit, the company's registration with the Securities and Exchange Commission of Pakistan (SECP) if it is a company, and a customer you can phone who had a system fitted a year or more ago.",
          "Also ask in writing who files the net metering application and what happens if the distribution company raises an objection after the frames are up. Some installers finish the roof and drop the paperwork. Read how the application works in our net metering guide so you know what you are asking for.",
        ],
      },
      {
        type: "steps",
        heading: "Seven questions to ask before you sign",
        items: [
          { title: "What is every component, by brand and model?", text: "Panels, inverter, batteries, cable, frames, isolators and SPDs, itemised." },
          { title: "Who signs the drawings?", text: "A named, registered engineer, with the single line diagram attached." },
          { title: "What is the structure and coating?", text: "Steel grade, coating thickness in microns, and how it is anchored." },
          { title: "What does the warranty say, and who honours it?", text: "Terms in writing for panels, inverter and workmanship, and the name of the party you claim from." },
          { title: "Who files net metering, and who pays if it is rejected?", text: "Get the responsibility and the fees on paper." },
          { title: "What is the payment schedule?", text: "Staged against delivery and commissioning, not all up front." },
          { title: "Who services it after the sale?", text: "A phone number, an address and what a visit covers." },
        ],
      },
      faq("Choosing a solar company: your questions", [
        ["How do I check that a solar installer is registered?", "Ask which registration the company holds, then verify it with the body that issued it, such as AEDB. Do not rely on a certificate image sent to you. Also ask for the PEC registration of the engineer who signs the drawings."],
        ["How can I tell if panels are original or relabelled?", "Ask for the serial numbers and factory test report for your delivery, compare the barcode under the glass with the one on the frame, and match the model number to the maker's datasheet. Ask for the importer's paperwork too."],
        ["Is 'Tier 1' a quality guarantee?", "No. Bloomberg NEF's Tier 1 list is a financing bankability measure for projects, not an audit of manufacturing quality or of the batch you receive."],
        ["What is a reasonable payment schedule?", "One tied to progress: a deposit, a payment on delivery, a payment at commissioning and a final part after energising or net metering. Avoid any contract that wants everything before work starts."],
        ["How much should a 5 kW system generate?", "On a Punjab average day, roughly 20 to 22 units, less in winter and smog. Use Global Solar Atlas for your location, and distrust a promise far above it."],
        ["What should I do if I already paid and have doubts?", "Ask for the itemised quote, the serial numbers and the engineer's details in writing, keep all receipts, and have a second, independent engineer inspect before you pay further. If the company refuses, that tells you what you need to know."],
      ]),
      src([
        "Alternative Energy Development Board (AEDB) and Private Power and Infrastructure Board (PPIB): installer registration and net metering guidance. ppib.gov.pk",
        "Pakistan Engineering Council (PEC): registration of professional engineers and engineering practice bye-laws. pec.org.pk",
        "BloombergNEF, PV Module Tier 1 list methodology, 2024. about.bnef.com",
        "ASTM International, ASTM A123/A123M, Standard Specification for Zinc (Hot-Dip Galvanized) Coatings on Iron and Steel Products. astm.org",
        "CENELEC EN 50618 and IEC 62930, Electric cables for photovoltaic systems. iec.ch",
        "IEC 62305, Protection against lightning, and NEPRA distributed generation guidance on earthing and surge protection. iec.ch, nepra.org.pk",
        "World Bank Group and ESMAP, Global Solar Atlas 2.0, retrieved 23 Nov 2026. globalsolaratlas.info",
        "Securities and Exchange Commission of Pakistan (SECP): company registration search. secp.gov.pk",
      ]),
    ],
  ),

  /* ---------------------------------------------------------------- brands */
  post(
    "solar-panel-brands-comparison-pakistan",
    "Solar Panel Brands in Pakistan",
    "Solar panel brands in Pakistan compared",
    "Solar panel brands in Pakistan compared on public datasheet facts: Jinko, LONGi, Canadian Solar and JA Solar, and how to read a datasheet yourself.",
    [
      "No ranking here. Four makers sell widely in Pakistan, and on paper their current n-type modules sit close together. What separates them for you is the exact model, the warranty paperwork and who stands behind the sale.",
      "Learn to read a datasheet, ask for the importer's records, and judge the installer as hard as the panel.",
    ],
    [["Solar panels", "/products/solar-panels/"], ["LONGi panels", "/products/solar-panels/longi/"], ["Canadian Solar panels", "/products/solar-panels/canadian-solar/"], ["Red flags when choosing an installer", "/blog/solar-installation-red-flags-pakistan/"]],
    [
      {
        type: "prose",
        heading: "What this comparison is, and is not",
        paragraphs: [
          "Everything below comes from public manufacturer datasheets and standards bodies, as of the editions we were able to cite in 2024. Datasheets change as a series is revised, so check the current sheet for the model on your quote. We list the makers alphabetically, because we are not ranking them, and nothing here claims SolarLink holds any dealer status with them.",
          "Figures are 'up to' values at standard test conditions in a laboratory: 1,000 watts per square metre of light at a cell temperature of 25 degrees C. A roof in a Lahore summer is nothing like that, which is why the temperature figures matter more than the headline efficiency.",
        ],
      },
      {
        type: "prose",
        heading: "What 'Tier 1' does and does not tell you",
        paragraphs: [
          "Shopkeepers say it, installers put it on banners, and buyers treat it as a quality mark. It is not one. BloombergNEF's Tier 1 list counts a manufacturer as Tier 1 if its modules have been used in a number of large projects that commercial banks financed without recourse over a period of years. That is a statement about how bankers see supply risk on utility projects. It does not audit the factory, the batch or the pallet at your door.",
          "A maker on that list can still ship you a counterfeit or a downgraded unit through a poor channel. A maker off that list can make a perfectly sound panel. Use the label as a clue, not a promise.",
        ],
      },
      {
        type: "prose",
        heading: "Technology: n-type TOPCon against older p-type PERC",
        paragraphs: [
          "Most current panels from these makers use n-type cells. The common design is TOPCon (tunnel oxide passivated contact); LONGi also sells a back-contact design in its Hi-MO X6 range. These replaced the older p-type mono PERC cells that dominated a few years ago.",
          "Three differences show up on a datasheet. Efficiency is higher, typically in the low 22 percent range for the newest modules, against the low 20s for PERC. Annual degradation is lower: the datasheets for the n-type series below list 0.40 percent a year after the first year, against around 0.55 percent for typical PERC. And the temperature coefficient is smaller, which matters in a hot country.",
          "Fraunhofer ISE's Photovoltaics Report describes this shift across the industry; use it for the global picture and the datasheet for your module.",
        ],
      },
      {
        type: "prose",
        heading: "Why the temperature coefficient matters in Punjab",
        paragraphs: [
          "A panel loses power as it heats up. The temperature coefficient of power says how much per degree above 25 degrees C. On a Punjab summer afternoon, cells on a rooftop can reach roughly 65 to 70 degrees C. That is 40 to 45 degrees above the test condition.",
          "Do the sum for a coefficient of minus 0.30 percent per degree: 0.30 times 45 is a loss of 13.5 percent. For a coefficient of minus 0.38 percent per degree, typical of older PERC modules, 0.38 times 45 is 17.1 percent. Same sun, same roof, about three and a half points of output apart at the hottest time of day. Over a year the gap is smaller, since cells run cooler in winter and at dawn and dusk, but the hottest hours are also when your air conditioners draw the most.",
        ],
      },
      {
        type: "prose",
        heading: "Bifacial panels and what the rear side gives you",
        paragraphs: [
          "A bifacial module collects light on the back as well. NREL's studies of bifacial systems report extra yield in the range of about 5 to 15 percent, and it depends heavily on how much light reaches the rear: raised frames over a white or reflective surface do well; flush mounting on a dark roof barely benefit. The datasheet lists a bifaciality factor, up to 80 percent on some Jinko models, which is the rear-side efficiency as a share of the front.",
          "Ask your installer to say where the rear gain comes from on your roof. If they cannot, price the system without it.",
        ],
      },
      {
        type: "facts",
        heading: "Jinko Solar: Tiger Neo n-type",
        items: [
          { label: "Series", value: "Tiger Neo, n-type TOPCon, 580 to 620 W class" },
          { label: "Module efficiency", value: "Up to 22.84 percent, from the 2024 datasheet" },
          { label: "Annual degradation", value: "0.40 percent a year after the first year, per datasheet" },
          { label: "Bifaciality", value: "Up to 80 percent on bifacial variants" },
          { label: "Note", value: "Very high global volume, so many dealers stock it; stock and paperwork quality vary by seller" },
        ],
      },
      {
        type: "facts",
        heading: "LONGi: Hi-MO X6 and Hi-MO 7",
        items: [
          { label: "Cell design", value: "HPBC back-contact on the X6; TOPCon on other lines. Check the series on your quote" },
          { label: "Module efficiency", value: "Up to 22.8 percent on the X6, from its 2024 datasheet" },
          { label: "Warranty structure", value: "A product warranty plus a linear power warranty. Read the years and the end-of-term power retention on the datasheet for your model" },
          { label: "Note", value: "Datasheet lists the guaranteed retained power at the end of the term; compare it across makers" },
        ],
      },
      {
        type: "facts",
        heading: "Canadian Solar: TOPHiKu6 and BiHiKu7",
        items: [
          { label: "Series", value: "TOPHiKu6 (n-type TOPCon), BiHiKu7 (bifacial)" },
          { label: "Module efficiency", value: "Up to 22.5 percent on TOPHiKu6, from its 2024 datasheet" },
          { label: "Mechanical load", value: "Rated for snow and wind loads on the datasheet; the 2024 sheet lists 5,400 Pa and 2,400 Pa" },
          { label: "Note", value: "Heat tolerance is stated through the temperature coefficient; read it for the exact model" },
        ],
      },
      {
        type: "facts",
        heading: "JA Solar: DeepBlue 4.0 Pro",
        items: [
          { label: "Cell design", value: "n-type cells under JA Solar's Bycium+ name" },
          { label: "Module efficiency", value: "Up to 22.5 percent, from the 2024 datasheet" },
          { label: "Temperature coefficient", value: "Minus 0.300 percent per degree C on the datasheet" },
          { label: "Note", value: "Datasheet describes resistance to potential induced degradation (PID); ask for the test report if it matters to your site" },
        ],
      },
      {
        type: "prose",
        heading: "What the comparison tells you, and what it leaves out",
        paragraphs: [
          "Read the four tables together and the headline specifications fall within a point or two of each other. That is the honest answer to 'which should I buy': on paper, the current n-type series from the major makers are close. A 0.1 percent difference in efficiency is worth less than a clean installation, a sound frame and an inverter that matches the array.",
          "What differs is the model number on your quote, whether the module is bifacial, how the warranty is structured, and what stock the seller holds. Compare watts, efficiency, the temperature coefficient, degradation and the power warranty line by line, for the exact model, and ask the installer to show you the sheet.",
        ],
      },
      {
        type: "prose",
        heading: "Protecting your warranty in Pakistan",
        paragraphs: [
          "A panel warranty is a promise from the manufacturer, but you reach it through a chain: the importer, the installer and the serial number of your module. Claims in Pakistan generally need records from an authorised importer, and a serial number that matches the maker's database. Panels bought through a grey channel, or with relabelled or removed serials, can leave you with a warranty that is hard to claim.",
          "Before you pay, ask for the importer's name, the module serial numbers for your delivery, the factory test report and the datasheet for the exact model. After installation, keep copies in one folder together with the warranty card and the invoice. Read more on spotting counterfeit panels and thin quotes in our red flags post.",
        ],
      },
      faq("Panel brand questions", [
        ["Which solar panel brand should I buy in Pakistan?", "There is no honest single answer. The current n-type series from Jinko, LONGi, Canadian Solar and JA Solar list close specifications on paper. The exact model, the importer paperwork and the quality of the installation matter more than the logo."],
        ["What does Tier 1 actually mean?", "It is BloombergNEF's list of manufacturers whose modules have been used in bank-financed projects. It is about bankability, not a check on the factory or on the batch you buy."],
        ["Is n-type better than p-type PERC for Pakistan?", "On the datasheets, n-type TOPCon has higher efficiency, lower annual degradation and a smaller temperature loss, which helps on hot roofs. Check the figures for the model on your quote."],
        ["Do I need bifacial panels?", "Only if the rear side will see reflected light, for example on raised frames over a light surface. NREL studies report extra yield of roughly 5 to 15 percent in good conditions. On a dark flush-mounted roof, the gain is small."],
        ["How do I check a panel is original?", "Compare the serial and barcode under the glass with the frame label, ask for the factory test report and importer records, and match the model to the maker's datasheet. Do not rely on a sticker."],
        ["Does the warranty depend on where I buy?", "Often, yes. Claims usually need importer records and matching serial numbers. Ask who handles claims before you pay, and get that in writing."],
      ]),
      src([
        "BloombergNEF, PV Module Tier 1 methodology, 2024. about.bnef.com",
        "Fraunhofer Institute for Solar Energy Systems (ISE), Photovoltaics Report, 2024. ise.fraunhofer.de",
        "LONGi, Hi-MO X6 datasheet, 2024. longi.com",
        "Jinko Solar, Tiger Neo n-type datasheet, 2024. jinkosolar.com",
        "Canadian Solar, TOPHiKu6 datasheet, 2024. csisolar.com",
        "JA Solar, DeepBlue 4.0 Pro datasheet, 2024. jasolar.com",
        "IEC 61215, Terrestrial photovoltaic modules: design qualification and type approval. iec.ch",
        "NREL, Bifacial PV performance studies, 2023. nrel.gov",
        "AEDB and PPIB, equipment quality and import guidance, 2024. ppib.gov.pk",
      ]),
    ],
  ),

  /* ---------------------------------------------------------------- cleaning */
  post(
    "solar-panel-cleaning-maintenance-pakistan",
    "Solar Panel Cleaning & Maintenance in Pakistan",
    "Solar panel cleaning and maintenance in Pakistan",
    "How to clean solar panels in Pakistan: how often, what time of day, what water to use, and the yearly checks that keep a system safe and producing.",
    [
      "Dust, smog film and bird droppings block light. Wash panels when the sun is low, with water and a soft brush, and keep the water off the connectors and cables.",
      "Never climb onto a wet roof, and never walk on the glass. If you cannot reach the panels safely, ask for help.",
    ],
    [["Home solar", "/services/residential-solar/"], ["Solar panels", "/products/solar-panels/"], ["On-grid, hybrid or off-grid", "/blog/on-grid-vs-hybrid-vs-off-grid-pakistan/"], ["Get a quote", "/get-quote/"]],
    [
      {
        type: "prose",
        heading: "Why Pakistan's roofs get dirty fast",
        paragraphs: [
          "Panels are glass, and glass collects what the air carries. Across Punjab and the Indus basin that means fine soil from fields and construction, ash and smoke during harvest and stubble burning, smog in the winter months, and bird droppings all year. Dry weeks with no rain let it build up, and a thin film does more harm than a single clump of dirt, because it dims every cell.",
          "Studies of soiling across South Asia report that daily output loss from dust is a fraction of a percent, but it compounds across dry weeks. We cannot give you one reliable percentage for your roof. You can measure it. Note the inverter's output for a clear day, wash the panels, then note it on a similarly clear day after. The difference is what dirt costs you.",
        ],
      },
      {
        type: "prose",
        heading: "How often to clean",
        paragraphs: [
          "There is no number that suits every roof. A house beside an unpaved road or a building site needs washing sooner than one in a green, paved street. A sensible habit is to look at the panels once a fortnight and wash when you can see dust or film, and to wash sooner in the smog months and before the weeks of strongest sun.",
          "Rain helps, but only a little. A short shower often leaves a streaky film of mud rather than clean glass. After dust storms and smog spells, expect to wash.",
          "Check your own app. Most inverters log daily energy. If output on similar sunny days drifts down over a few weeks, the panels are probably dirty, or something else is wrong, and either way it is worth a look.",
        ],
      },
      {
        type: "prose",
        heading: "Time of day, and why it is not optional",
        paragraphs: [
          "Wash early in the morning or in the evening, when the glass is cool. Panels in direct afternoon sun can run at 65 to 70 degrees C or more. Cold water on hot glass shocks it, and tempered glass and the silicon cells under it do not like sudden temperature swings. Manufacturers' operation and maintenance manuals warn against it, and the test regime in IEC 61215 exists because modules need to survive thermal cycling, not a hose in the heat.",
          "A practical rule: before about eight in the morning, or after the sun leaves the roof. In winter the glass cools sooner, but the same logic holds. Also, you will lose less energy washing at those times, since little is being produced anyway.",
        ],
      },
      {
        type: "steps",
        heading: "A safe way to wash panels",
        items: [
          { title: "Keep clear of the electrics", text: "Do not touch isolators or wiring. Keep water away from the inverter, the junction boxes and the connectors." },
          { title: "Wet the surface gently", text: "Use a hose with low pressure, or a bucket. Rinse loose dust first so you are not grinding grit into the glass." },
          { title: "Use a soft brush or microfibre pad", text: "A long telescopic brush with soft bristles keeps your feet off the roof edge. Avoid scrapers, steel wool and abrasive powders." },
          { title: "Use mild soap only if you need to", text: "Greasy droppings and smog film sometimes need a drop of mild detergent. Avoid solvents and harsh cleaners; they can harm the coating and seals. Check your manufacturer's manual." },
          { title: "Rinse and squeegee", text: "Rinse off all the soap and wipe the water down with a rubber squeegee so minerals do not dry on the glass." },
          { title: "Look as you go", text: "Cracks, loose cables, a bird nest under the frame, a dark spot on a cell. Photograph anything odd and tell your installer." },
        ],
      },
      {
        type: "prose",
        heading: "Water, pressure and tools",
        paragraphs: [
          "Groundwater in much of Punjab is hard, with a high level of dissolved minerals. If it dries on the glass it leaves white scale that does not wipe off and can dull the anti-reflective coating over years. Use filtered or softened water if you can, and in any case squeegee dry. Rainwater is gentler still.",
          "Pressure washers are a bad idea. A strong jet can force water into the junction box, past the seals on the MC4 connectors, or under the frame. That can trip the inverter's ground-fault alarm, and in the worst cases causes damage. Panel makers and the IEC standards for photovoltaic arrays design for rain and spray, not a high-pressure jet at close range. A garden hose and a soft brush will do the job.",
          "Skip the cleaning products sold from the back of a van, and skip 'coatings' with no datasheet or test report behind them.",
        ],
      },
      {
        type: "prose",
        heading: "Roof safety comes first",
        paragraphs: [
          "Every year people fall from roofs while cleaning panels. A wet panel is as slippery as ice, and moss or dust on a sloping surface is no better. Do not go up in the wet, in strong wind, in the dark, or alone. Do not lean a ladder on the panels, and never stand or kneel on the glass.",
          "Stepping on a panel can crack the silicon cells inside even if the glass looks fine. Micro-cracks form hot spots and reduce output for good, and the damage is not covered under most warranties. If the array is out of reach from a safe position, pay for a professional or a cleaning crew with proper roof fall protection.",
        ],
      },
      {
        type: "facts",
        heading: "The yearly check (annual maintenance)",
        items: [
          { label: "Strings", value: "Measure open-circuit voltage and short-circuit current of each string and compare with the design values." },
          { label: "Hot spots", value: "A thermal camera scan of the array on a clear day shows cells and connectors running hotter than their neighbours." },
          { label: "Earthing", value: "Test the earth pit resistance and check the earth connections; the figure often targeted is below 5 ohms." },
          { label: "Surge protection", value: "Look at the indicator on each SPD and replace any that show they have operated." },
          { label: "Frame and bolts", value: "Check the bolts, clamps and any rust at cut edges before the monsoon. Wind and heat cycles loosen fixings." },
          { label: "Cables and connectors", value: "Check for cracked sheathing, loose connectors, chewed cable and moisture in the junction boxes." },
          { label: "Inverter", value: "Clean the heat-sink fins and air filters every few months, check the fans run, and update the firmware if the maker issues it." },
        ],
      },
      {
        type: "prose",
        heading: "Inverter care in the heat",
        paragraphs: [
          "Inverters lose capacity when they get too hot, and Pakistan's summers push them. Dust blocks the fins and the intake filters, and the inverter then throttles itself to protect the electronics. Keep it in a shaded, ventilated spot and clean the vents with a dry brush or a low-power vacuum every few months, with the unit switched off and isolated according to the manual. The maker's manual, whether Growatt, Huawei or any other, gives the intervals for your model.",
          "Look at the inverter's display or app when you clean. Error codes, frequent restarts and a rising temperature are early signs of a fault that is cheaper to fix now than after a failure.",
        ],
      },
      {
        type: "prose",
        heading: "Doing it yourself or hiring someone",
        paragraphs: [
          "You can wash accessible panels yourself, safely, if you follow the steps above. The electrical checks are a different matter: string voltage and current tests, thermal scans and earth testing need instruments, training and a safe way to isolate the system. They belong to a qualified technician, and a yearly visit is a reasonable habit.",
          "If you pay for a service contract, ask what it covers in writing: how many washes a year, what electrical tests, whether it includes a report, and who is responsible for damage on the roof. Compare that against the cost of lost generation, and judge it on what you can verify, not on the length of the contract.",
        ],
      },
      faq("Panel cleaning questions", [
        ["How often should I clean solar panels in Lahore?", "Look every fortnight and wash when dust or film is visible. In the dry and smog months you will usually need to wash more often than in a clearer spell. Your inverter's daily energy log shows when output has slipped."],
        ["Can I wash panels in the afternoon sun?", "No. Cold water on hot glass risks thermal shock and micro-cracks in the cells. Wash early in the morning or in the evening when the glass is cool."],
        ["Can I use tubewell or tap water?", "You can, but hard water leaves mineral scale as it dries. Use filtered or softened water if you can, and squeegee the glass dry, so the minerals do not set."],
        ["Is a pressure washer safe for solar panels?", "Avoid it. A strong jet can force water past connector seals and into junction boxes, and can trip the inverter. A hose with low pressure and a soft brush are enough."],
        ["What does an annual maintenance visit include?", "String voltage and current tests, a thermal scan for hot spots, an earth resistance check, surge device inspection, a look at frames, bolts and cables, and cleaning of the inverter's vents and filters."],
        ["Does walking on the panels cause damage?", "Yes. Standing or kneeling on glass can crack the cells inside, even if the surface looks intact. The cracks make hot spots and cut output for good."],
      ]),
      src([
        "IEC 61215, Terrestrial photovoltaic modules: design qualification and type approval (thermal cycling and mechanical tests). iec.ch",
        "IEC 62548, Photovoltaic arrays: design requirements, 2016. iec.ch",
        "IEC 62446-1, Photovoltaic systems: requirements for testing, documentation and maintenance, 2018 edition. iec.ch",
        "Panel and inverter manufacturers' operation and maintenance manuals (Growatt, Huawei, Longi, Jinko), 2024. Read the manual for your own model.",
        "ASTM International, ASTM A123/A123M, hot-dip galvanized coatings (frames and fixings). astm.org",
        "PCRET and LUMS Energy Institute, materials on soiling and operation of PV systems in Pakistan, 2023 to 2024, as cited in our research; we state no soiling percentage from them. pcret.gov.pk, lums.edu.pk",
      ]),
    ],
  ),

  /* ---------------------------------------------------------------- payback */
  post(
    "solar-roi-payback-period-pakistan",
    "Solar ROI in Pakistan: Payback Period",
    "How to work out solar payback in Pakistan",
    "How to calculate solar payback in Pakistan: the method, a worked example with labelled sample numbers, and the costs most calculators leave out.",
    [
      "Divide what the system costs by the grid bill it removes in a year. Use your own bills and an actual written quote, not a figure from an advert.",
      "Tariffs and net metering terms change, so any payback number should carry the date it was worked out and the inputs behind it.",
    ],
    [["Get a quote", "/get-quote/"], ["Net billing calculator", "/tools/net-billing-calculator/"], ["Bill breakdown tool", "/tools/bill-breakdown/"], ["Net metering guide", "/net-metering-guide/"]],
    [
      {
        type: "prose",
        heading: "Why one number is a bad answer",
        paragraphs: [
          "'How long until it pays for itself?' is the question everyone asks first, and it has no single answer. The result moves with the cost of the system, how much of the solar power you use yourself, what your slab pays per unit, what the grid credits you for exports, how the panels degrade, and what you spend on upkeep. Two neighbours with the same roof can land years apart.",
          "A sales page that says 'pays back in two years' has chosen the inputs that give that answer. This post shows the method so you can choose your own and check anyone's claim. We state no payback figure for any SolarLink system, because that depends on a quote and a bill we have not seen.",
        ],
      },
      {
        type: "steps",
        heading: "The method in five steps",
        items: [
          { title: "Get the real system cost", text: "A written, itemised quote for the exact design, including frames, cable, protection, installation, and net metering paperwork and meter charges if they are extra." },
          { title: "Find the value of one unit you will stop buying", text: "Look at your last twelve bills. Take the energy charge and the taxes that scale with units, and divide by units used. That is your avoided cost per unit, and it is higher in the upper slabs." },
          { title: "Estimate what the system produces", text: "Roughly four to four and a half units per kW per day on average in Punjab (Global Solar Atlas), less in winter. Use a monthly profile, not a flat figure." },
          { title: "Split the output into used and exported", text: "Power you use behind the meter saves the full avoided cost. Power you export is credited at the export rate, which is usually far lower. Daytime use sets the split." },
          { title: "Add what it costs to keep running", text: "Cleaning and inspection, panel degradation, and a reserve for replacing the inverter, and the battery if you have one." },
        ],
      },
      {
        type: "prose",
        heading: "Step 2 in detail: your avoided cost per unit",
        paragraphs: [
          "Electricity tariffs in Pakistan are slabbed, so the more you use, the more each extra unit costs, and the price also carries fuel charge adjustments, surcharges and taxes. The unit you stop buying with solar is the most expensive one on your bill, the top-slab unit, not the average.",
          "Do not take a rate from a blog. NEPRA publishes tariff notifications, and your distribution company publishes the schedule it bills from. Pull a recent bill, add up the charges that scale with units, divide by units used, and write down the month. Rates change, so this number is dated. Our bill breakdown tool walks through a bill line by line.",
        ],
      },
      {
        type: "prose",
        heading: "Step 4 in detail: exported units are worth less",
        paragraphs: [
          "Under older net metering, an exported unit offset an imported unit one for one. The 2026 rules changed this. According to NEPRA's prosumer regulations notified in February 2026 (S.R.O. 251(I)/2026, as cited in our research as of 23 November 2026; read the notification itself), imports are billed at retail and exports are credited separately, at a rate linked to the national average energy purchase price, which our research puts around Rs 10 to 11 a unit. That is far below the retail price of an upper-slab unit.",
          "The result is simple and important: a unit you use in the daytime is worth much more than a unit you send out. Systems sized to cover daytime use, with the heaviest loads such as air conditioners and pumps running while the sun is up, pay back faster than systems sized to export. If you already have an older agreement, the rules for existing users differ, so check yours. Use the net billing calculator with the current rate.",
        ],
      },
      {
        type: "prose",
        heading: "A worked example, with sample numbers",
        paragraphs: [
          "Everything here is an example, not a quote, not a forecast and not a SolarLink result. The numbers are invented round figures to show how the arithmetic works. Swap in your own.",
          "For example, if a system cost Rs 2,000,000 installed, and it saved Rs 20,000 a month on the grid bill after adjusting for exports, the simple payback is 2,000,000 divided by 240,000 saved a year, which is about 8.3 years. If the same system saved Rs 40,000 a month, the simple payback halves to about 4.2 years. The only thing that changed was the monthly saving, which is why your own bill matters more than anyone's average.",
          "That is the simple version. Now take a more honest one. Suppose that, in this example, the system loses 0.4 percent of output a year (a figure datasheets for n-type modules list), you spend a small sum on cleaning and inspection each year, and you set aside a reserve for an inverter replacement around year ten. Each of these pushes the payback date out by some months. Meanwhile, if grid prices rise, the saving grows and pulls it back in. A spreadsheet with a column per year handles all of it; the sums are not hard, only fiddly.",
        ],
      },
      {
        type: "facts",
        heading: "Sample inputs for the example above (not a promise)",
        items: [
          { label: "Installed cost", value: "Rs 2,000,000 (example)" },
          { label: "Monthly grid-bill saving", value: "Rs 20,000 in the first case, Rs 40,000 in the second (examples)" },
          { label: "Simple payback", value: "Cost divided by yearly saving: about 8.3 years and about 4.2 years" },
          { label: "Annual output loss", value: "0.4 percent a year after the first year (typical n-type datasheet figure)" },
          { label: "Reserve to add", value: "Inverter replacement and yearly upkeep, from your own quotes" },
        ],
      },
      {
        type: "prose",
        heading: "The costs most calculators leave out",
        paragraphs: [
          "Panel degradation: modules lose a little output each year. Datasheets for the current n-type series list around 0.40 percent a year after a first-year drop, and a guaranteed output at the end of the warranty period. Build it into your yearly output.",
          "Inverter replacement: inverters have a shorter life than panels, often in the range of eight to twelve years, according to NREL's life-cycle costing guidance for PV. A realistic 25-year model sets aside money for at least one replacement, and a hybrid system also needs batteries replaced.",
          "Upkeep: cleaning, inspections and the odd repair. Your own washing costs a little water and time; a service contract costs money. Count what you will actually spend.",
          "Borrowing cost and time value: if you borrow to buy the system, interest adds to the cost. If you pay cash, the money could have earned something elsewhere. A payback in years ignores both, so compare it against what else you would do with the funds.",
        ],
      },
      { type: "tool", tool: "net-billing", heading: "Try the net billing calculator", lead: "Enter your monthly units and system size to see how the used and exported split changes the saving." },
      {
        type: "prose",
        heading: "Is it worth it? How to decide",
        paragraphs: [
          "Payback is a rough guide. Two other measures help: the lifetime saving after upkeep, and the cost per unit your solar makes over its life, which you can compare with the price you would otherwise pay the grid. If a system makes power for a few rupees a unit over twenty-five years and you would otherwise pay far more for the same unit, the sums favour solar, whatever the exact payback.",
          "Be wary of results that look too good. A figure far shorter than what a spreadsheet with all the inputs gives probably leaves something out. Ask any installer who quotes you a payback to show the inputs: system cost, avoided cost per unit, units generated, units used on site, and the assumptions for upkeep and replacement.",
        ],
      },
      faq("Solar payback questions", [
        ["What is the payback period of a 10 kW system in Pakistan?", "It depends on your bill, your system cost and how much of the power you use yourself, so we do not state a figure. Work it out with your last twelve bills and a written quote, using the steps above."],
        ["Is solar still worth it after the 2026 net billing rules?", "The rules reduced what exports earn, so daytime self-use matters more. Systems sized to the daytime load still save at the full avoided cost on those units. Run your numbers with the current export rate."],
        ["Why do online payback claims vary so much?", "They use different inputs: the system cost, the slab, the share used on site, and whether degradation, upkeep and inverter replacement are included. A very short payback usually leaves some of these out."],
        ["Should I include inverter replacement?", "Yes. Inverters typically last fewer years than panels, so a 25-year model should reserve money for at least one replacement, plus batteries if you have a hybrid system."],
        ["Does a battery shorten or lengthen payback?", "It usually adds cost, and batteries wear out, so a hybrid system generally pays back more slowly than an equivalent on-grid one. You are also buying backup power, which has its own value to you."],
        ["How often should I redo the calculation?", "Whenever tariffs, the export rate or your usage change, and always before you sign. Put a date on every figure."],
      ]),
      src([
        "NEPRA, Prosumer regulations notification S.R.O. 251(I)/2026, 9 Feb 2026, as cited in our research of 23 Nov 2026. Read the notification itself for the current export rate and terms. nepra.org.pk",
        "NEPRA, electricity tariff notifications and your distribution company's current tariff schedule (LESCO, IESCO, FESCO). nepra.org.pk",
        "World Bank Group and ESMAP, Global Solar Atlas 2.0, retrieved 23 Nov 2026. globalsolaratlas.info",
        "Jinko Solar, Tiger Neo n-type datasheet, and LONGi, Hi-MO X6 datasheet, 2024 (degradation figures). jinkosolar.com, longi.com",
        "NREL, Life-cycle costing guidance for PV systems, 2023 (inverter lifetime and replacement). nrel.gov",
      ]),
    ],
  ),
];
