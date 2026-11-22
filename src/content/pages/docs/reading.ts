import { faq, make } from "./shared";
import type { PageDoc } from "../types";

/* The two guides, written 23 Nov 2026. Public facts name their source and date in the text. Net billing rules come from
   docs/research/agy-2026-11-23/net-billing.md (an AI-compiled lead: re-check each S.R.O. at nepra.org.pk before launch);
   sun data from sun.md (Global Solar Atlas); tariffs from tariffs.md. No SolarLink price, warranty or time is stated. */

const LASTMOD = "2026-11-23";
const mk = (d: Parameters<typeof make>[0]): PageDoc => ({ ...make(d), lastmod: LASTMOD });

export const guides: PageDoc[] = [
  mk({
    path: "/how-solar-works/", kind: "guide",
    title: "How Solar Panels Work in Pakistan | SolarLink",
    description: "How a solar system turns sunlight into household power in Pakistan: panels, inverter, battery and meter, how big a system must be, and what to look after.",
    h1: "How solar panels work in Pakistan",
    lead: "From sunlight on a panel to power at your socket, in plain terms, with Pakistani sun data and the numbers that decide how big a system you need.",
    blocks: [
      { type: "facts", heading: "The short version", items: [
        { label: "Panels", value: "Make direct current (DC) when light falls on them. More light, more power." },
        { label: "Inverter", value: "Turns DC into the alternating current (AC) your house runs on, about 230 V at 50 Hz, and keeps in step with the grid." },
        { label: "Size", value: "Decided by the units (kWh) you use, the sun at your address and the space you have. Not by the rupee amount on your bill." },
        { label: "Battery", value: "Optional. Only hybrid and off-grid systems have one." },
        { label: "Meter", value: "On a grid-connected system, a two-way meter counts what you take and what you send." },
      ] },
      { type: "prose", heading: "How panels make electricity", paragraphs: [
        "A solar panel is a glass sandwich of silicon cells. Light knocks electrons loose in the silicon, and the cell's built-in electric field pushes them one way, which is a current. A single cell makes only about half a volt, so a panel wires dozens of cells in series to reach a useful voltage, and a roof wires several panels together into a string.",
        "The current is direct current. A fan or a fridge cannot run on it, and neither can the grid. The inverter's job is to convert it, which is why the inverter, not the panel, is the heart of the system.",
        "A panel's rating, such as 580 W, is its output under standard test conditions: 1,000 watts of sunlight on each square metre at a cell temperature of 25 degrees Celsius. A real roof rarely sees those conditions. On a clear Lahore afternoon the panel can exceed the rating in cool weather and fall short of it in summer heat, because cells lose output as they warm. The datasheet gives this loss as a temperature coefficient, typically a few tenths of a percent per degree above 25 degrees Celsius.",
      ] },
      { type: "diagram", heading: "How the power flows", lead: "Sunlight to panels, panels to inverter, inverter to your loads, the battery and the grid.", mode: "hybrid" },
      { type: "steps", heading: "The parts of a system", items: [
        { title: "Panels", text: "Most rooftop panels sold today are monocrystalline silicon, rated roughly between 450 W and 700 W each (check the datasheet). A 10 kW array is therefore around 17 panels of 580 W. Panels fix to a mounting structure, usually aluminium or galvanised steel, tilted at about the angle of your latitude." },
        { title: "Inverter", text: "A string inverter takes the DC from the panel strings and converts it. A hybrid inverter does the same and also manages a battery. Inside, a maximum power point tracker (MPPT) keeps adjusting the voltage so the panels deliver the most power the light allows. Grid-tied inverters also shut down when the grid fails, so they never feed a line a worker thinks is dead." },
        { title: "Battery (optional)", text: "Stores power for the evening and for cuts. Lithium iron phosphate batteries are the common choice now; lead-acid batteries cost less and wear out faster. Capacity is in kWh, and what counts is the usable kWh and the cycle life at the depth of discharge the datasheet assumes." },
        { title: "Protection and wiring", text: "DC and AC cable, breakers, surge protection and earthing. This is the part that keeps a system safe in a storm or a fault. Ask what is included and to what standard." },
        { title: "Meter", text: "With net metering, your distribution company fits a two-way meter that records what you import and what you export. Under the 2026 net billing rules the two are priced differently. The net metering guide explains how." },
      ] },
      { type: "prose", heading: "How much sun is there?", paragraphs: [
        "The Global Solar Atlas (World Bank Group, ESMAP, Solargis; long-term averages, accessed 23 November 2026) gives the energy a fixed, well-tilted system makes per kW of panels in a year: 1,466 kWh in Lahore, 1,559 in Islamabad and 1,513 in Sargodha. Divide by 365 and you get 4.0, 4.3 and 4.1 kWh per kW per day. These already allow for typical losses in the wiring, the inverter and the heat.",
        "The sun is not even through the year. Daily irradiation on the tilted panel in Lahore runs from 3.5 kWh per square metre in January and 3.8 in December up to 6.4 in April and 6.3 in May, then dips to 4.76 in July when the monsoon clouds arrive. Islamabad peaks at 6.7 in May and falls to 3.9 in January. Sargodha peaks at 6.5 in May and falls to 3.6 in January. In winter, smog and fog take a further bite out of Lahore.",
        "Two things follow. A system that covers your bill in May will not cover it in January. And a winter shortfall is why the grid, a battery or both stay in the picture even when the yearly total looks big.",
      ] },
      { type: "facts", heading: "Average daily output by system size", items: [
        { label: "3 kW of panels", value: "About 12 kWh a day in Lahore, 13 in Islamabad, 12 in Sargodha (yearly averages from the Global Solar Atlas figures above)." },
        { label: "5 kW of panels", value: "About 20 kWh a day in Lahore, 21 in Islamabad, 21 in Sargodha." },
        { label: "10 kW of panels", value: "About 40 kWh a day in Lahore, 43 in Islamabad, 41 in Sargodha: roughly 1,220 to 1,300 kWh a month on average." },
        { label: "A single 580 W panel", value: "About 2.3 kWh a day in Lahore, 2.5 in Islamabad, 2.4 in Sargodha." },
      ] },
      { type: "prose", heading: "On-grid, hybrid and off-grid", paragraphs: [
        "An on-grid system is tied to the grid. It runs the house from solar when the sun is up, takes from the grid when it is not, and has no battery. It costs the least. It also goes dead in a power cut, because the inverter must switch off when the grid does.",
        "A hybrid system adds a battery and a hybrid inverter. It can keep chosen loads running through a cut, store surplus for the evening, and still use the grid. It suits homes with frequent cuts. The loads you want backed up sit on a separate circuit, and the battery and inverter are sized for them.",
        "An off-grid system has no grid link at all. The battery and panels must carry everything, including a run of cloudy days, so it is sized much more carefully and costs more per unit of power. It suits places the grid does not reach, such as a remote farm.",
      ] },
      { type: "facts", heading: "The three types side by side", items: [
        { label: "Works in a power cut", value: "On-grid: no. Hybrid: yes, on the battery. Off-grid: yes, always." },
        { label: "Battery needed", value: "On-grid: no. Hybrid: yes. Off-grid: yes." },
        { label: "Can connect to the grid and export", value: "On-grid: yes. Hybrid: yes. Off-grid: no." },
        { label: "Cost, relative", value: "On-grid lowest, hybrid in the middle, off-grid highest for the same load. Ask for dated quotations." },
        { label: "Best for", value: "On-grid: few cuts and a daytime load. Hybrid: frequent cuts. Off-grid: no grid." },
      ] },
      { type: "prose", heading: "What decides the size of a system", paragraphs: [
        "System size is in kilowatts of panels, not in a number of panels, because panels come in different ratings. The number that drives the size is your monthly consumption in kWh, printed on every bill. Rupees mislead: they swing with your slab, the fuel adjustment and tax, while units show your real load.",
        "A rough way to turn units into kW: divide your monthly kWh by 30, then by the daily yield per kW (about 4.0 in Lahore). A home using 500 kWh a month needs about 4.2 kW of panels to cover its average use. 900 kWh needs about 7.5 kW. 1,500 kWh needs about 12.5 kW. These are yearly averages, so a system sized this way will cover less than the whole in winter and more than the whole in spring.",
        "Then the site and the rules take over. Panel area is roughly 4.5 square metres per kW, and a real roof needs more for gaps, walkways and the clearance from shade, so plan on something like 6 to 7 square metres per kW as a rule of thumb that the survey will confirm. Under the 2026 net billing rules, the system also cannot exceed your sanctioned load, and what you export earns much less than what you save by using the power yourself. For most homes, that points to a system sized to daytime use.",
        "If you plan to add an air conditioner, an electric vehicle charger or a second unit within a few years, size for the load you expect, or leave room for another string.",
      ] },
      { type: "sizing", heading: "Try your own bill", lead: "Move the slider to see a rough system size for your bill. It is an estimate: the site survey confirms it." },
      { type: "prose", heading: "Lifespan and maintenance", paragraphs: [
        "A solar system has almost no moving parts, which is why it needs so little looking after. A few routines still pay.",
        "Clean the panels when dust builds up. Dust and bird droppings cut output, and the loss is larger when droppings sit on one cell, because the cells in a string are linked. Clean early or late in the day, with water and a soft brush, never when the glass is hot.",
        "Look at the inverter display or app every month. Most inverters report faults and record daily yield, so a sudden drop stands out. Check for new shade from a tree or a neighbour's building. Have connections, earthing and the mounting inspected now and then, and after a storm.",
        "Parts age at different speeds. Panels lose a small fraction of their output each year, and the datasheet states the guarantee. Inverters are the part most likely to need service or replacement first. Batteries wear with each cycle and in heat. Read the warranty of each part and keep the papers.",
      ] },
      { type: "steps", heading: "Mistakes to avoid", items: [
        { title: "Sizing from the rupee amount", text: "Rupees move with tariffs and taxes. Use the kWh on your last twelve bills." },
        { title: "Ignoring the next few years", text: "Adding an air conditioner or a charger later can mean a costly extension. Size for the load you expect." },
        { title: "Buying the cheapest inverter", text: "It is the part you will most likely need to claim on. Ask where the service centre is, how long repairs take and whether parts are held locally." },
        { title: "Skipping the net metering application", text: "Without an approved agreement and meter, you have no lawful way to export and no credit for it. Apply before you commission, or ask the installer who is doing it." },
        { title: "Forgetting the winter", text: "A system that looks right in May may cover little in January. Ask what the system does in December, and whether a battery or the grid fills the gap." },
        { title: "Letting the panels go dirty", text: "A dirty or shaded panel does not fail loudly. It quietly makes less. Put cleaning on the calendar." },
      ] },
      faq("Common questions", [
        ["How do solar panels produce electricity?", "Light falling on a silicon cell frees electrons, and the cell's built-in field pushes them in one direction, giving direct current. Many cells are wired in series inside a panel, and panels are wired in strings to a voltage the inverter can use. The inverter then converts it to alternating current for the house."],
        ["What is the difference between an on-grid and a hybrid solar system?", "An on-grid system is tied to the grid with no battery, and it stops when the grid stops. A hybrid system adds a battery and a hybrid inverter, so chosen loads keep running in a cut and surplus can be stored for the evening, while it still uses the grid."],
        ["What system size do I need for my home?", "It depends on your monthly kWh, the sun and your roof. As an arithmetic guide from Global Solar Atlas yields for Lahore, 500 kWh a month is about 4.2 kW of panels, 900 kWh is about 7.5 kW and 1,500 kWh is about 12.5 kW, covering the yearly average. A survey confirms it."],
        ["How long do solar panels last in Pakistan?", "Panels keep working for decades and lose a little output each year; the manufacturer's datasheet states the guaranteed output over time. Heat, dust, poor mounting and poor cleaning shorten their useful life. Inverters and batteries are usually replaced before the panels."],
        ["Will my solar system work during load-shedding?", "A plain on-grid system will not: the inverter switches off when the grid goes down, as a safety rule called anti-islanding. A hybrid system with a battery will keep chosen loads on. An off-grid system runs independently of the grid."],
        ["Do solar panels need a lot of maintenance?", "No. They have no moving parts. Clean them when they are dusty, look at the inverter display or app every month, check for new shade and have the wiring and mounting inspected from time to time."],
        ["Can I add batteries to an existing on-grid system?", "Often yes, but it usually means a hybrid inverter in place of or alongside the existing one, plus a compatible battery. Some on-grid inverters can be paired with a separate battery inverter. Ask the installer to check the model, and to tell you how the change affects your net metering agreement."],
        ["How much do solar panels cost in Pakistan?", "We do not print prices, because they move with the exchange rate and with supply. The size in kW, the equipment brand and rating, a battery, the structure and the roof all change the figure. Ask the outlet for a dated written quotation, and compare line by line."],
      ]),
      { type: "links", heading: "Go deeper", items: [
        { label: "Net metering guide", text: "The 2026 NEPRA rules, the application and a worked bill.", href: "/net-metering-guide/" },
        { label: "On-grid solar systems", text: "How an on-grid system is put together and who it suits.", href: "/solar-systems/on-grid/" },
        { label: "Hybrid solar systems", text: "Battery backup, and how a hybrid inverter splits the work.", href: "/solar-systems/hybrid/" },
        { label: "Solar calculator", text: "A rough size from your bill.", href: "/solar-calculator/" },
      ] },
      { type: "prose", heading: "Sources", paragraphs: [
        "Solar yield and irradiation: Global Solar Atlas 2.0 (World Bank Group, ESMAP, Solargis), long-term averages for a fixed system at optimal tilt, accessed 23 November 2026. Net billing and sanctioned load limit: NEPRA (Prosumer) Regulations, 2026, S.R.O. 251(I)/2026, 9 February 2026. Standard test conditions are those defined in the IEC 60904 series for photovoltaic devices. Rules of thumb for roof area and panel ratings are general figures; the survey and the datasheet decide.",
      ] },
    ],
    related: [{ label: "On-grid, hybrid and off-grid", href: "/blog/on-grid-vs-hybrid-vs-off-grid-pakistan/" }, { label: "Solar systems", href: "/solar-systems/" }, { label: "Net metering guide", href: "/net-metering-guide/" }, { label: "FAQs", href: "/faqs/" }],
  }),
  mk({
    path: "/net-metering-guide/", kind: "guide",
    title: "Net Metering Guide Pakistan | NEPRA Rules | SolarLink",
    description: "Net metering in Pakistan under the 2026 NEPRA rules: net billing, export rate, size limits, the application steps, fees and what changes for existing users.",
    h1: "Net metering in Pakistan: the 2026 rules",
    lead: "What net metering means since February 2026, how your bill is worked out, who can apply, how the application runs and what to check, with the rules cited and dated.",
    blocks: [
      { type: "prose", heading: "The short version", paragraphs: [
        "New solar connections in Pakistan are now covered by the NEPRA (Prosumer) Regulations, 2026, notified as S.R.O. 251(I)/2026 on 9 February 2026. They replaced the NEPRA (Alternative and Renewable Energy) Distributed Generation and Net Metering Regulations, 2015 (S.R.O. 812(I)/2015). People still say net metering. The mechanism is now net billing, and the difference changes what a system is worth.",
        "Under the 2015 rules, a unit you exported cancelled a unit you imported. Under the 2026 rules, imports and exports are priced separately: you pay the tariff for what you take, and you are credited a lower, regulator-set rate for what you send. This guide sets out the rules, the steps and the costs as of 23 November 2026. Rules change, so check nepra.org.pk before you decide.",
      ] },
      { type: "facts", heading: "The rules at a glance", items: [
        { label: "Regulation in force", value: "NEPRA (Prosumer) Regulations, 2026, S.R.O. 251(I)/2026, notified 9 February 2026. Repealed the 2015 regulations (S.R.O. 812(I)/2015)." },
        { label: "Amendments", value: "S.R.O. 547(I)/2026, 2 April 2026, amended Regulation 21 on existing users. S.R.O. 1330(I)/2026, 6 August 2026, waived direct NEPRA concurrence for systems up to 25 kW." },
        { label: "Billing", value: "Net billing: imports at the retail tariff, exports credited at a separate rate, settled monthly. Surplus credit rolls forward against future bills." },
        { label: "Export rate", value: "National average energy purchase price: Rs 8.13 per kWh (NEPRA, 2026), against legacy levels of Rs 22 to 27 per kWh. It is reviewed." },
        { label: "Size limit", value: "No more than 100% of the connection's sanctioned load. Up to 1 MW (1,000 kW). The earlier allowance of up to 150% of sanctioned load was removed." },
        { label: "Transformer limit", value: "Total distributed generation on one distribution transformer is capped at 80% of its rating." },
        { label: "Load flow study", value: "Required for systems of 250 kW and above." },
        { label: "Approval", value: "Systems up to 25 kW need the distribution company's approval only. Larger ones also need NEPRA concurrence, with a fee of Rs 1,000 per kW." },
      ] },
      { type: "prose", heading: "From net metering to net billing", paragraphs: [
        "In mid-2024 the Power Division floated a plan for gross metering, under which every solar unit would be sold at a wholesale rate while every unit consumed was bought at the retail rate. After public objection that plan was dropped (reported by Business Recorder and Dawn, May 2024). What came into force on 9 February 2026 was net billing: you keep the power you use as you make it, and only the surplus is exported.",
        "That distinction matters. A unit you use directly saves you the retail rate. A unit you export earns the export rate. Under NEPRA's decision of 11 February 2026 (TRF-100/2935-57, with S.R.O. 279(I)/2026 of 12 February 2026), unprotected domestic consumers with a sanctioned load under 5 kW pay base rates from Rs 22.44 per kWh in the first 100 units up to Rs 47.20 above 700 units, before fixed charges, taxes, fuel and quarterly adjustments. Against an export credit near Rs 11, every unit used on site is worth two to four times as much as a unit exported.",
        "The practical lesson is to size for your daytime use, move flexible loads to daylight where you can, and treat export as a bonus, not the plan.",
      ] },
      { type: "diagram", heading: "What happens to the power", lead: "Your loads take what the panels make first. The surplus goes out through the two-way meter. The grid fills the gap at night.", mode: "on-grid" },
      { type: "prose", heading: "How your bill is worked out", paragraphs: [
        "Each month the meter records two numbers: units imported from the grid and units exported to it. The distribution company bills the imports at your normal tariff, with its usual taxes and adjustments. It credits the exports at the prosumer export rate. The bill is the import charge minus the export credit. In formula form: net bill = (imported kWh x retail tariff) - (exported kWh x export rate) (S.R.O. 251(I)/2026, Regulations 11 and 14). If the credit is larger than the charge, the balance rolls over to reduce future bills.",
        "A made-up month shows the effect. Suppose you import 300 kWh at an average of Rs 35 per kWh, which is Rs 10,500. You export 400 kWh at Rs 11, which is a credit of Rs 4,400. The energy part of the bill is Rs 6,100, before fixed charges, tax and adjustments. Under the old one-for-one rule the same month would have netted out to a 100 kWh credit and a bill near zero. The figures are for illustration only; your slab, adjustments and export rate will differ.",
        "Fixed charges and taxes still apply. Under the February 2026 tariff, fixed charges are billed per kW of sanctioned load per month, and GST, electricity duty, the PTV fee and withholding tax work as they do for any consumer. Some of these are in dispute or are applied unevenly, so read your first bill line by line.",
      ] },
      { type: "prose", heading: "Who can apply, and for what size", paragraphs: [
        "A consumer with a connection from a distribution company can apply for a distributed generation facility on the premises. Residential, commercial and industrial consumers all qualify. LESCO serves Lahore, IESCO serves Islamabad and FESCO serves Faisalabad and the surrounding region, and the company named on your electricity bill handles your application. If you are unsure which company serves your area, read the bill, or ask the SolarLink outlet.",
        "The size limits are firm. The system cannot exceed 100% of your sanctioned load, so a house with a 5 kW sanctioned load cannot net-bill a 10 kW array without first raising the load. The cap is 1 MW. And your distribution transformer must have room: the total of all systems on it is limited to 80% of its rating. Your sanctioned load is printed on the bill and the connection papers. Check it before you design, because it fixes the maximum.",
      ] },
      { type: "steps", heading: "The application, step by step", items: [
        { title: "Design the system", text: "A single line diagram and equipment details, sized within your sanctioned load. Confirm the connection phase. For systems of 250 kW and above, a load flow study is also needed." },
        { title: "Submit the application", text: "The form, the documents and the design go to your distribution company's sub-division office or its online portal." },
        { title: "Technical review", text: "The company checks the transformer's capacity against the 80% limit and reviews the design." },
        { title: "Demand notice and payment", text: "The company issues a demand notice that covers the bi-directional meter and testing and any processing fee. Pay it to move on." },
        { title: "Inspection and testing", text: "The company's engineers inspect the system and test the protection: anti-islanding, earthing and the isolator." },
        { title: "Agreement and meter", text: "You sign the distributed generation agreement, and the company's meter lab fits the bi-directional meter and energises the connection." },
      ] },
      { type: "prose", heading: "Documents you will usually need", paragraphs: [
        "The exact list comes from your distribution company, and each office has its own habits. Expect the application form, the single line diagram, datasheets for the panels and inverter (inverters are expected to meet IEC 62109 safety standards), a copy of your national identity card, a recent paid electricity bill and an indemnity bond. Tenants should bring the owner's written consent. Larger commercial systems need more technical papers.",
        "A missing datasheet or an unsigned form is the commonest reason for a deficiency notice, and each one costs time. Ask whoever files the application to show you the checklist before it goes in.",
      ] },
      { type: "facts", heading: "Fees and costs reported", items: [
        { label: "NEPRA concurrence", value: "Nil for systems up to 25 kW. Rs 1,000 per kW above 25 kW (S.R.O. 1330(I)/2026, 6 August 2026)." },
        { label: "Distribution company processing and inspection", value: "Set per site on the demand notice (Regulation 3(9))." },
        { label: "Bi-directional meter and testing", value: "Set per site on the demand notice (Regulation 3(9)); you pay the actual cost (Regulation 12(1))." },
        { label: "Your installer's work", value: "Design, documents and follow-up are priced by the installer and differ. Ask for it as a line in the quotation." },
      ] },
      { type: "prose", heading: "What the fees figures are, and are not", paragraphs: [
        "The ranges above come from published consumer guidelines and research compiled on 23 November 2026, and companies revise fees. The number that binds you is the one on your demand notice. Ask your installer to show it to you, and keep a copy.",
      ] },
      { type: "prose", heading: "If you already have a net metering agreement", paragraphs: [
        "Consumers who signed a valid agreement under the 2015 regulations before 9 February 2026 keep the old one-for-one terms for the rest of that agreement. S.R.O. 547(I)/2026 (2 April 2026) amended Regulation 21 to say so explicitly, and the standard term of an agreement is seven years from the date it was signed.",
        "There is a catch. If you make a material change, such as adding inverter capacity or expanding the generation, the protection can be lost and the whole installation moves to the 2026 net billing terms. If you plan to add panels or a battery to an older system, ask your distribution company in writing how the change will be treated before you do the work.",
      ] },
      { type: "prose", heading: "Timeline and common delays", paragraphs: [
        "We cannot give a fixed number of weeks, and no honest installer can. The time depends on the distribution company, its workload, your feeder and whether the file is complete. Nearly all delays come from a few causes.",
        "An incomplete file triggers a deficiency notice and restarts the clock. A transformer already near its 80% limit can stall the review or require an upgrade. A late payment of the demand notice holds up the meter. An owner who is not available for inspection or signature costs a week or more. A busy office simply takes longer.",
        "Keep your application reference, write down the dates of each step and ask for the status in writing if a step overruns. SolarLink prepares the application and follows it through, and tells you which step is holding it.",
      ] },
      { type: "prose", heading: "Does it still make sense?", paragraphs: [
        "Yes for many sites, with a different design. When imports were credited one for one, a big system that exported most of its output could zero a bill. Under net billing that is a poor trade: exports earn roughly a quarter to a half of what you save by using the power yourself, depending on your slab.",
        "So the best system is often one sized to your daytime load. Homes with air conditioning, shops and offices that run in daylight, and farms that pump in the day use most of what they make, so they feel the change least. A home that is empty at noon and busy at night exports most of its output and sees the least benefit. For that home, a battery may do better than a larger array.",
        "The net billing calculator on this site and the solar calculator can help you test a design against your own bill. Both use dated tariff data and say so.",
      ] },
      faq("Questions", [
        ["What is net metering in Pakistan?", "It is the arrangement that lets a solar owner connect to the distribution company's grid through a two-way meter and exchange power with it. Since the NEPRA (Prosumer) Regulations, 2026 (S.R.O. 251(I)/2026, 9 February 2026), new connections are billed under net billing: imports at the tariff, exports credited at a separate rate."],
        ["Who is eligible for net metering?", "A consumer with a connection from a distribution company, for a system within the sanctioned load, up to 1 MW, and with room on the distribution transformer (80% limit). Residential, commercial and industrial consumers can apply. The company named on your bill handles the application."],
        ["What is the maximum system size under net metering?", "No more than 100% of the sanctioned load of your connection, and not more than 1 MW overall (S.R.O. 251(I)/2026). The earlier allowance of 150% of sanctioned load no longer applies. If you need a larger system, raise the sanctioned load first."],
        ["What rate is paid for exported electricity?", "The export rate follows NEPRA's national average energy purchase price and is Rs 8.13 per kWh in the 2026 determination, against Rs 22 to 27 under the legacy arrangement. It is reviewed, so check nepra.org.pk for the current figure on the day you decide."],
        ["How long does the application take?", "It varies with the distribution company, the completeness of the file and the state of your feeder. We do not give a figure. Ask for the dates of each step in writing and ask the installer where the file stands."],
        ["What documents are required?", "Typically the application form, a single line diagram, equipment datasheets, your national identity card, a recent paid bill and an indemnity bond, with the owner's consent for tenants. Your distribution company sets the exact list. Ask for its checklist."],
        ["Does SolarLink handle the net metering application?", "Yes. Net metering support is one of SolarLink's services: we prepare the application for your distribution company, follow it through approval and the meter, and tell you where it stands."],
        ["What happens to unused credits?", "If the export credit exceeds your monthly consumption charge, the balance is carried forward to offset future bills (S.R.O. 251(I)/2026). Read your first few bills to confirm how your company applies it."],
        ["Can I get net metering for a three-phase commercial connection?", "Yes. Single-phase and three-phase connections can apply, and commercial and industrial consumers follow the same rules with extra technical papers. Systems of 250 kW and above need a load flow study, and those above 25 kW need NEPRA concurrence at Rs 1,000 per kW."],
        ["Can I apply if my solar system is already installed?", "Yes, you can apply for a system that is already built, provided it meets the technical requirements and fits within your sanctioned load. Without an approved agreement and a two-way meter you cannot lawfully export. Ask the installer to review the equipment datasheets and the single line diagram first."],
      ]),
      { type: "links", heading: "What to read and use next", items: [
        { label: "Net metering support", text: "How SolarLink prepares and follows the application.", href: "/services/net-metering-support/" },
        { label: "Net billing calculator", text: "Test a system against your own bill.", href: "/tools/net-billing-calculator/" },
        { label: "Common mistakes", text: "What goes wrong with net metering and how to avoid it.", href: "/blog/net-metering-common-mistakes-pakistan/" },
        { label: "Get a quote", text: "Send a bill and your sanctioned load to start.", href: "/get-quote/" },
      ] },
      { type: "prose", heading: "Sources", paragraphs: [
        "NEPRA (Prosumer) Regulations, 2026, S.R.O. 251(I)/2026, notified 9 February 2026 (billing, Regulations 11 and 14; size and transformer limits). S.R.O. 547(I)/2026, 2 April 2026 (Regulation 21, existing users). S.R.O. 1330(I)/2026, 6 August 2026 (concurrence waiver up to 25 kW, concurrence fee). Repealed: NEPRA (Alternative and Renewable Energy) Distributed Generation and Net Metering Regulations, 2015, S.R.O. 812(I)/2015, 1 September 2015. Tariffs: NEPRA decision of 11 February 2026, TRF-100/2935-57; S.R.O. 279(I)/2026, 12 February 2026. Fees: LESCO, IESCO and FESCO net metering consumer guidelines. Gross metering proposal: Business Recorder and Dawn reports, May 2024. All notifications are at nepra.org.pk. Compiled and last checked 23 November 2026; this guide is general information, not legal or financial advice.",
      ] },
    ],
    related: [{ label: "Net metering support", href: "/services/net-metering-support/" }, { label: "Common mistakes", href: "/blog/net-metering-common-mistakes-pakistan/" }, { label: "How solar works", href: "/how-solar-works/" }, { label: "FAQs", href: "/faqs/" }],
  }),
];
