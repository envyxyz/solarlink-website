import { make, faq } from "./shared";
import type { PageDoc } from "../types";

/* Blog posts, part 1 of 2. Full articles written 23 Nov 2026 from docs/research/agy-2026-11-23/blog/<slug>.md.
   Every public fact is named in the text or in the closing Sources block. No SolarLink price, warranty, count or dealer status. */

const art = (slug: string, title: string, description: string, h1: string, lead: string, blocks: PageDoc["blocks"], related: [string, string][]): PageDoc =>
  make({ path: `/blog/${slug}/`, kind: "article", title, description, h1, lead, blocks, related: related.map(([label, href]) => ({ label, href })) });

const sources = (items: string[]): PageDoc["blocks"][number] => ({ type: "prose", heading: "Sources", paragraphs: items });

const growatt = art(
  "growatt-vs-fronus-inverter-comparison",
  "Growatt vs Fronus Inverter: Specs Compared | SolarLink",
  "Growatt vs Fronus inverter, compared on published datasheet facts: type, protection rating, grid certification, battery support and warranty terms in Pakistan.",
  "Growatt vs Fronus inverters",
  "Two inverter brands that come up in almost every solar conversation in Pakistan. Here is how they compare on what their own documents say, and what to check before you pay for either.",
  [
    { type: "prose", heading: "Start with the job, not the brand", paragraphs: [
      "Growatt and Fronus are not really competing for the same job. Growatt is a Chinese manufacturer whose catalogue is built around grid-tied string inverters, with hybrid and off-grid lines beside them. Fronus is a brand sold in Pakistan whose catalogue, by its own description, centres on hybrid and off-grid inverters tuned for load-shedding. A buyer who wants net metering and a buyer who wants backup through long outages are often shopping for different machines, even when both walk into the same shop and ask about \"an inverter\".",
      "So the useful question is not which name is better. It is which product, in which capacity, does the thing you need, and whether the paperwork behind it will survive your electricity company's inspection. This post compares the two on published datasheet and manual facts only. We have not tested either brand, and we say nothing here about price lists, which change weekly.",
      "One boundary first. Brand names appear because buyers search for them. Nothing in this article says SolarLink holds a dealer or authorised status with either company, and nothing in it ranks one above the other.",
    ] },
    { type: "facts", heading: "At a glance, from the manufacturers' documents", items: [
      { label: "Growatt on-grid string range", value: "MIN, MOD, MID and MAC series; the MID 17-25KTL3-X lists 98.75% maximum efficiency and IP66 protection (Growatt datasheet, 2024)" },
      { label: "Fronus hybrid range", value: "Hybrid and off-grid models such as Platinum and Infini, with dual AC output on some (Fronus catalogue, 2024)" },
      { label: "Typical use", value: "Growatt: grid-tied and net-metered systems. Fronus: backup during outages, often with batteries" },
      { label: "Enclosure rating", value: "Growatt on-grid units: IP65 to IP66. Entry Fronus models: documented as IP21, which is indoor use (manuals, 2023 to 2024)" },
      { label: "Warranty terms", value: "Growatt on-grid: 5 years standard, extendable to 10. Fronus: 1 to 2 years through local distributors. Read the card for the unit you buy." },
    ] },
    { type: "prose", heading: "Efficiency and build", paragraphs: [
      "Efficiency first, because it is the number brochures lead with. Growatt's MID 17-25KTL3-X three-phase inverters list a maximum efficiency of 98.75% and a European weighted efficiency of 98.5% (Growatt datasheet, 2024). Those are peak and weighted figures measured under lab conditions. On your roof in June the inverter will run hot and the real figure will be a little lower. That is true of every brand.",
      "Hybrid inverters of the Voltronic/Axpert family, which Fronus's catalogue is built around, carry an extra conversion stage between battery and load, and their quoted efficiencies are usually a point or two lower than a pure on-grid string unit. That is physics, not a flaw. A machine that can charge a battery, run a house and pass power to the grid does more work than one that only converts panel output.",
      "Enclosure rating matters more than efficiency in a Punjab summer. IP66 means the case is dust-tight and withstands strong water jets, so the inverter can hang on an outside wall. IP21 means protection against solid objects over 12.5 mm and against vertically dripping water; in practice it is a unit meant to sit indoors in a clean, dry room. Dust is the common failure story on Pakistani roofs. If a unit is rated IP21, plan a ventilated indoor spot and a dust filter you can clean, and do not mount it in direct sun.",
      "Heat is the other half. Inverters reduce output when their internal temperature climbs. Growatt's on-grid manuals describe derating above about 45 degrees Celsius ambient. Lahore regularly passes that on a south-facing wall in June. Shade the unit, leave the clearance the manual asks for, and expect a small drop at the hottest hour.",
    ] },
    { type: "prose", heading: "Net metering: the part that decides eligibility", paragraphs: [
      "If you intend to apply for net metering, the inverter has to meet the interconnection standards the regulator names. The NEPRA prosumer regulations, notified as S.R.O. 251(I)/2026 on 9 February 2026, point to the IEC 62109 series for safety and to IEC 61727 or IEEE 1547 for utility interface and anti-islanding. Anti-islanding means the inverter shuts down within seconds of a grid outage so that it never feeds power into a line a lineman believes is dead.",
      "Growatt's on-grid string series (MIN, MOD, MID and MAC) appear on the approved equipment lists published by the Pakistani authorities that handle accreditation, according to the PPIB list consulted for this article (2024). Lists change; confirm the exact model on the current list before ordering.",
      "Many hybrid inverters in the budget bracket are built for off-grid or UPS-style operation and do not carry the grid-interactive certificates at all. Some Fronus models are of that kind. A unit can run a house perfectly well and still fail the distribution company's testing lab, because the lab wants the test certificates for that exact model, not for the brand. Ask the seller for the IEC certificate by model number before you pay, and keep a copy for the application file.",
      "This is the single most expensive mistake in the comparison. A buyer picks a hybrid unit for its outage features, applies for net metering, and learns at the inspection stage that the unit cannot be approved. We cover the paperwork side of that in our post on common net metering mistakes.",
    ] },
    { type: "prose", heading: "Load-shedding and batteries", paragraphs: [
      "Here the roles reverse. A standard grid-tied inverter switches off when the grid goes down. That is the anti-islanding rule at work, and it surprises many new owners: panels on the roof, sun in the sky, and the house still dark. A hybrid inverter with a battery solves it by running the house from the battery and panels while the grid is out.",
      "Fronus hybrid models of the Platinum and Infini type offer dual AC output, according to the company's technical specifications (2024). One output feeds essential loads such as lights, fans and the fridge. The second feeds heavy loads such as an air conditioner or a water pump, and the inverter can drop that second output when the battery runs low or the grid is absent. It is a sensible way to keep a small battery from being flattened by an AC.",
      "Battery communication is a quieter difference. Growatt's SPH and SPF hybrid lines support CAN and RS485 communication with the battery management systems of major lithium iron phosphate batteries, so the inverter reads state of charge and charge limits directly. Entry-level hybrid inverters often rely on voltage settings alone, which suits lead-acid tubular batteries but gives a lithium battery less protection and less accurate reporting (user manuals, 2024). If you plan to buy lithium, check the battery brand against the inverter's compatibility list before buying either.",
    ] },
    { type: "steps", heading: "Questions to put to any inverter seller", items: [
      { title: "What is the exact model and capacity?", text: "Brand names cover many products. Get the full model code and match it to a datasheet you can open yourself." },
      { title: "Which IEC certificates exist for that model?", text: "For net metering, ask for IEC 62109-1 and -2 and IEC 61727 or IEEE 1547, as named in the NEPRA regulations. Ask for the PDF." },
      { title: "What is the IP rating, and where will it hang?", text: "IP65 or IP66 can go outside. IP21 needs a clean indoor room with airflow." },
      { title: "How does it talk to the battery?", text: "If you want lithium, ask whether it supports CAN or RS485 communication with that exact battery." },
      { title: "Who repairs it, and do they replace or repair?", text: "Read the warranty card. Find out where the repair centre is, whether parts are stocked locally and how long a claim usually takes." },
    ] },
    { type: "prose", heading: "Warranty and support, honestly", paragraphs: [
      "Warranty length is the easiest number to compare and the easiest to over-read. Growatt's published policy for on-grid units is five years standard, with extensions to ten sold as add-ons (Growatt warranty policy, 2024). Fronus's warranty card, as consulted, gives one to two years through local distributors (2024). Those are manufacturer documents for particular products and may differ for the model you are quoted.",
      "Length is only half the picture. Ask what happens during a claim. A warranty that replaces a faulty unit from stock in your city is worth more than a longer one that sends the unit away for weeks. A warranty held by the importer is worth only as much as the importer's continued existence. Neither is a reason to skip a brand; both are reasons to ask before buying.",
      "Whatever you choose, keep the invoice, the serial number and a photo of the label. They are what a claim runs on.",
    ] },
    { type: "prose", heading: "So which one?", paragraphs: [
      "If your priority is a net-metered system that exports to the grid and has to pass inspection, you want a grid-tied or grid-interactive inverter with documented IEC certification for the model, and the Growatt on-grid range is one of several that meets that description. If your priority is keeping lights and fans on through outages with a small battery, a hybrid unit with dual AC output suits the job, and Fronus's hybrid range is built for it. If you want both, ask for a hybrid inverter that lists grid-interactive certification, from either company or from a third.",
      "Marketplace surveys in late 2024 put Fronus hybrid units some 15 to 25 percent below comparable Growatt hybrids at wholesale (SolarMarket.pk price survey, 15 October 2024, a secondary source). Treat that as a rough direction, not a quote. A cheaper box that cannot be net metered, or has to be replaced in two summers, is not cheaper.",
      "We can size and specify an inverter for your roof and load after a site visit. That is a design question for your house, and this post is only the background.",
    ] },
    faq("Growatt vs Fronus: common questions", [
      ["Is Growatt better than Fronus for net metering?", "For net metering, what matters is whether the specific inverter model carries IEC 62109 and IEC 61727 or IEEE 1547 certificates and sits on the approved list. Growatt's on-grid string series does, per the lists consulted in 2024. Many budget hybrid inverters do not. Check the model, not the brand."],
      ["Can a Fronus inverter export electricity to the grid?", "Some hybrid inverters can; many entry models are designed for off-grid or UPS-style operation and do not hold grid-interactive certificates. Ask for the certificate for your model. If the distribution company's lab will not accept it, the unit cannot be net metered."],
      ["Which inverter copes better with heavy load-shedding?", "That depends on the model, the battery and the load, not the brand name. Hybrid inverters with a battery keep the house running in an outage. Plain on-grid inverters switch off by design. Dual AC output helps protect a small battery from heavy loads."],
      ["Is an IP21 inverter safe to use in Punjab?", "It is designed for indoor use. Mount it in a clean, ventilated room out of direct sun and clean its dust filter. Do not hang it on an exposed roof wall; IP65 or IP66 units are built for that."],
      ["Does SolarLink sell Growatt or Fronus?", "This post makes no statement about brands we stock. Ask us on WhatsApp which inverter we would specify for your site and why."],
    ]),
    sources([
      "Growatt New Energy, \"Growatt MID 17-25KTL3-X datasheet\", 2024. ginverter.com/datasheets",
      "Growatt New Energy, \"Growatt warranty policy\", 2024. ginverter.com",
      "Growatt New Energy, \"Growatt SPH and SPF user manuals\", 2024. ginverter.com",
      "Fronus Pakistan, \"Product catalog and technical specifications\", 2024. fronus.net.pk",
      "Fronus Pakistan, \"Warranty card\", 2024. fronus.net.pk",
      "NEPRA, \"Prosumer Regulations 2026, S.R.O. 251(I)/2026\", 9 February 2026. nepra.org.pk",
      "PPIB, \"Approved inverter list for net metering\", 2024. ppib.gov.pk",
      "SolarMarket.pk, \"Inverter price survey\", 15 October 2024 (secondary source). solarmarket.pk",
      "IEC, \"IEC 62109 series and IEC 61727, inverter safety and utility interface\". iec.ch",
    ]),
  ],
  [["Inverters", "/products/inverters/"], ["Hybrid systems", "/solar-systems/hybrid/"], ["On-grid systems", "/solar-systems/on-grid/"], ["Net metering mistakes", "/blog/net-metering-common-mistakes-pakistan/"]],
);

const sizing = art(
  "how-to-size-solar-system-pakistan",
  "How to Size a Solar System in Pakistan | SolarLink",
  "Size solar from the units on your bill, not the rupees. The formula, sun hours for Lahore and Islamabad, NEPRA limits and three worked examples in kW.",
  "How to size a solar system in Pakistan",
  "Your bill and your roof decide the size. Work from units, not rupees, and check three legal limits before you fall in love with a number.",
  [
    { type: "prose", heading: "Why units, not rupees", paragraphs: [
      "The amount on your bill is the worst number to size solar from. It carries slab rates, taxes and fuel price adjustments that change month to month, so two households that use the same electricity can pay quite different amounts. The unit that stays put is the kilowatt-hour on your meter, printed as \"units consumed\" on the bill.",
      "A system produces kilowatt-hours. So the whole exercise is to match the kilowatt-hours your roof can make with the kilowatt-hours you use, then check that the match is allowed and fits. This post walks through the method in four steps, with worked examples for Lahore and Islamabad. For a quick estimate there is also the solar calculator; this is the long version for people who want to see the arithmetic.",
    ] },
    { type: "prose", heading: "How much one kilowatt makes", paragraphs: [
      "Peak sun hours are the number of hours per day at full-sun strength (1,000 watts per square metre) that would deliver the same energy as the real day. Global Solar Atlas, built from World Bank ESMAP data, puts Lahore at about 5.08 peak sun hours a day on a panel tilted at 28 degrees, and Islamabad at about 5.38 on a 30 degree tilt (consulted 23 November 2026).",
      "Per installed kilowatt, the European Commission's PVGIS tool gives roughly 1,465 kWh a year in Lahore and 1,559 kWh in Islamabad, or about 4.0 to 4.3 kWh per kW per day when averaged over the year. Those are modelled figures for a well-oriented, unshaded array. Your roof will land somewhere near them, and a shaded or east-west roof lower.",
      "The year is not flat. Lahore falls to about 3.5 peak sun hours in smoggy January and rises to about 6.4 in April (Global Solar Atlas, 23 November 2026). A system sized on the annual average will over-produce in spring and under-produce in December. That is normal and it is also why annual units, not a single month, are the right comparison.",
    ] },
    { type: "facts", heading: "Numbers to keep beside you", items: [
      { label: "Lahore sun", value: "About 5.08 peak sun hours a day; about 1,465 kWh per kW per year (Global Solar Atlas; PVGIS)" },
      { label: "Islamabad sun", value: "About 5.38 peak sun hours a day; about 1,559 kWh per kW per year (Global Solar Atlas; PVGIS)" },
      { label: "Performance ratio", value: "0.75 to 0.80 for a normal rooftop: dust, heat, cable and inverter losses (IEC 61724-1)" },
      { label: "Panel area", value: "A 580 W class panel is about 2.6 square metres, so 1 kW needs roughly 5 to 6 square metres of clear roof" },
      { label: "Sanctioned load cap", value: "Installed capacity cannot exceed 100% of the sanctioned load on your connection (NEPRA S.R.O. 251(I)/2026, Reg. 4)" },
      { label: "Transformer cap", value: "Solar on one distribution transformer is limited to 80% of its rating (NEPRA S.R.O. 251(I)/2026, Reg. 6)" },
    ] },
    { type: "steps", heading: "The four steps", items: [
      { title: "Collect twelve months of units", text: "Find twelve bills, or ask your distribution company for the history. Write down units consumed, not the amount. Add them for the annual total, then divide by 365 for daily units." },
      { title: "Notice the swing", text: "Urban homes in Pakistan often use two to three times more electricity in May to August than in winter because of air conditioning (AEDB energy profile advisory, 2023). Your bills will show it. Decide whether you are sizing for the annual total or for the summer peak." },
      { title: "Apply the formula", text: "Array size in kW = daily units divided by (peak sun hours times performance ratio). Use 0.75 to 0.80 for the ratio. The inverter is usually rated close to the array, sometimes a little lower." },
      { title: "Check the roof and the shade", text: "Count unshaded area facing south or close to it. Tanks, parapets, neighbouring buildings and trees all cut output. A site visit settles this better than a satellite picture." },
    ] },
    { type: "prose", heading: "The formula in practice", paragraphs: [
      "Take a Lahore home that used 8,400 units over the last twelve months. That is 23 units a day. With 5.08 peak sun hours and a performance ratio of 0.775 (the middle of the range), one kilowatt delivers about 3.9 units a day. 23 divided by 3.9 is about 5.9 kW. The PVGIS figure gives a similar answer: 8,400 divided by 1,465 is 5.7 kW. Round to the nearest practical array, and keep both calculations as a sanity check on each other.",
      "That result would cover nearly all of the year's electricity on paper. It will not zero the bill, because of the monthly timing and because net billing credits exported units at a lower rate than the grid charges for imports. Exports are credited at the national average energy purchase price, Rs 8.13 per kWh in NEPRA's 2026 determination, against import rates that start around Rs 30 and run past Rs 48 per kWh on the higher slabs before taxes (NEPRA S.R.O. 251(I)/2026, 9 February 2026; S.R.O. 1035(I)/2024, 12 July 2024). Check your own bill and the current schedule; these figures move.",
      "The practical reading is simple. Solar that you use at home is worth the full import rate. Solar that you export is worth much less. So a size that fills your own daytime use, plus some margin for the evening, tends to make more sense than a maximum-size array that exports most of its output.",
    ] },
    { type: "sizing", heading: "Try your own bill", lead: "Slide to your monthly bill for a rough system size. The calculator is a first estimate; a site visit turns it into a design." },
    { type: "prose", heading: "Three limits that can cap your size", paragraphs: [
      "Sanctioned load. Your connection has a sanctioned load, printed on the bill in kilowatts. Under NEPRA's prosumer regulations the installed distributed generation cannot exceed it (S.R.O. 251(I)/2026, Regulation 4). If you want a 10 kW system on a 5 kW sanctioned connection, you apply for a load enhancement first, ideally in parallel with the net metering file. Applications that ignore this are rejected early.",
      "Phases. Distribution companies such as LESCO and IESCO ask for a three-phase meter for solar above 5 kW, and for net-metered sites generally (LESCO net metering procedure, 2024). A single-phase home that wants 10 kW needs the conversion first.",
      "The transformer. Total solar on a local 11 kV transformer is limited to 80 percent of its rated capacity (S.R.O. 251(I)/2026, Regulation 6). In dense, well-developed neighbourhoods that headroom can be taken already. Ask your sub-division office before you commit to a size you cannot connect.",
      "None of these is the installer's invention; they are public rules. If any applies to you, the design has to start from the limit, not from the roof.",
    ] },
    { type: "prose", heading: "Worked examples", paragraphs: [
      "A 10 marla home in Lahore, 700 units a month on average. 8,400 units a year divided by 1,465 gives 5.7 kW. A 6 kW array of ten 580 W panels would cover close to all of that over the year, needs around 26 square metres of roof, and fits a 5 kW to 6 kW class inverter. A 5 kW array covers roughly 87 percent. Many owners choose 5 kW to stay within a sanctioned load, and accept a small remaining bill.",
      "A one kanal home in Islamabad, 1,400 units a month, mostly from air conditioners in summer. 16,800 units a year divided by Islamabad's 1,559 gives 10.8 kW. Eighteen to nineteen panels of 580 W make about 10.4 to 11 kW, take 47 to 50 square metres and want a three-phase inverter and meter. If the sanctioned load is 8 kW, the legal ceiling is 8 kW unless the load is raised.",
      "A small commercial plaza in Lahore, 15 kW installed. 15 times 1,465 is about 22,000 units a year, or roughly 1,830 a month. At that size the transformer headroom and the three-phase connection decide whether it goes ahead, as much as the roof. Daytime-heavy loads such as offices and workshops use most of what they make, which is the best case for solar.",
      "These are illustrations on public irradiance figures, not quotes. Rooftops, tilts, shade and local loads change the answer.",
    ] },
    { type: "prose", heading: "Mistakes people make when sizing", paragraphs: [
      "Sizing from a single summer bill is the common one. It inflates the system and then it exports for eight months of the year at the low buy-back rate. The opposite error is sizing from a winter bill and then wondering why May is expensive.",
      "Another is treating inverter size and array size as the same number. They are related but not equal. Arrays are often a little larger than the inverter's AC rating, which is normal and sensible, but the sanctioned load and the net metering application are judged on specific figures. Say clearly which number you mean.",
      "Last, forgetting growth. If you plan to add a second AC, an electric vehicle or a tubewell in a year or two, say so at the design stage. Leaving roof and sanctioned-load headroom costs little now and a lot later.",
    ] },
    faq("Sizing questions", [
      ["How many kW do I need for a 10 marla house?", "It depends on your units. A home that uses about 700 units a month in Lahore needs roughly 5.7 kW to offset a full year. A lighter user needs less. Take your annual units and divide by about 1,465 for Lahore or 1,559 for Islamabad."],
      ["How many units does a 5 kW system make in a day?", "About 20 on a year-round average in Lahore (5 kW times roughly 4.0 kWh per kW per day). It is higher in spring and lower in a smoggy January. A cloudy day can cut it by half."],
      ["How do I work out solar size from my bill?", "Use the units consumed, add up twelve months, divide by 365, then divide by peak sun hours times a performance ratio of 0.75 to 0.80. Ignore the rupee amount."],
      ["Can I install a system larger than my sanctioned load?", "For a net metered connection, NEPRA's 2026 prosumer regulations cap installed capacity at the sanctioned load. Apply for a load enhancement first if you want more."],
      ["How much roof does 10 kW need?", "About 17 to 18 panels of 580 W, around 45 to 50 square metres of clear, unshaded roof once spacing is counted. Panel sizes vary, so check your datasheet."],
      ["Will a system sized from units remove my bill?", "Not entirely. Timing, winter output and the buy-back rate mean most homes keep a small bill. Be wary of anyone who promises zero."],
    ]),
    sources([
      "World Bank ESMAP and Solargis, \"Global Solar Atlas 2.0, Lahore and Islamabad\", consulted 23 November 2026. globalsolaratlas.info",
      "European Commission Joint Research Centre, \"PVGIS-ERA5 photovoltaic estimates\", 2024. re.jrc.ec.europa.eu/pvg_tools/en/",
      "IEC, \"IEC 61724-1, Photovoltaic system performance monitoring\", 2021. iec.ch",
      "NEPRA, \"Prosumer Regulations 2026, S.R.O. 251(I)/2026\", 9 February 2026. nepra.org.pk",
      "NEPRA, \"Uniform tariff, S.R.O. 1035(I)/2024\", 12 July 2024. nepra.org.pk",
      "LESCO, \"Net metering procedure\", 2024. lesco.org.pk",
      "AEDB, \"Energy profile advisory\", 2023. ppib.gov.pk",
      "LONGi Green Energy, \"Hi-MO X6 datasheet\", 2024. longi.com",
    ]),
  ],
  [["Solar calculator", "/solar-calculator/"], ["3 kW system", "/solar-systems/3kw/"], ["5 kW system", "/solar-systems/5kw/"], ["10 kW system", "/solar-systems/10kw/"], ["Load calculator", "/tools/load-calculator/"]],
);

const mistakes = art(
  "net-metering-common-mistakes-pakistan",
  "Net Metering Mistakes That Delay Applications | SolarLink",
  "Seven mistakes that stall net metering files in Pakistan, from sanctioned load and transformer limits to earthing, certificates and unpaid demand notes.",
  "Net metering mistakes that delay applications",
  "Most delays are small errors found late. These seven are the ones that stop files at the distribution company, with the rule behind each one.",
  [
    { type: "prose", heading: "Why files stall", paragraphs: [
      "A net metering file passes through several desks: the sub-division office, the revenue officer, the engineers who check the design, then the metering and testing lab. Each of them can send it back, and a send-back usually costs weeks rather than days. Almost none of the reasons are exotic. They come from a short list of avoidable errors, which is what this post covers.",
      "The rules referred to are the NEPRA Prosumer Regulations 2026 (S.R.O. 251(I)/2026, notified 9 February 2026) and the procedures published by the distribution companies. Procedures differ by company and change; where we cite LESCO, check the current version. This is general guidance, not legal advice, and the final word is always the company's written requirement. For the full process see our net metering guide, and for the LESCO-specific walkthrough see the LESCO application post.",
    ] },
    { type: "prose", heading: "Mistake 1: a system bigger than the sanctioned load", paragraphs: [
      "Every connection has a sanctioned load, printed on the bill in kilowatts. The regulations prohibit installed generation larger than that figure (S.R.O. 251(I)/2026, Regulation 4). A 10 kW array on a 5 kW connection is rejected, usually at the first scrutiny.",
      "The fix is to apply for a load enhancement before or alongside the net metering file, and to design to the figure you actually hold. Ask whether your bill shows a sanctioned load of 5, 8 or 10 kW before you pick a system size. It takes a minute to read and saves months.",
    ] },
    { type: "prose", heading: "Mistake 2: not asking about the transformer", paragraphs: [
      "Total solar capacity connected to a local distribution transformer is limited to 80 percent of its rated capacity (S.R.O. 251(I)/2026, Regulation 6). In older, dense areas and housing societies where many neighbours have already installed solar, that headroom can be gone. The file then waits or is declined even though your paperwork is perfect.",
      "Ask the sub-division office early how much headroom your transformer has. Applications are generally handled in the order they arrive, so an early filing matters in areas where capacity is tight. If the transformer is full, ask about upgrade options, since you may be able to share the cost with neighbours.",
    ] },
    { type: "prose", heading: "Mistake 3: names and numbers that do not match", paragraphs: [
      "The applicant, the CNIC and the name on the electricity connection have to be the same person. When the connection is still in a previous owner's name, a landlord's, or a deceased parent's, the company asks for a formal transfer of the connection before it will sign the agreement (LESCO commercial procedures, 2023). Tenants face the same wall.",
      "Sort the transfer first. It is a paperwork task with its own queue, and doing it in parallel with the solar design saves time. Check the address, the reference number and the CNIC digits on every form too. A single transposed digit is enough to send a file back.",
    ] },
    { type: "prose", heading: "Mistake 4: unstamped drawings or the wrong installer", paragraphs: [
      "Technical dossiers are expected to come from an accredited installer, registered with AEDB or PPIB in the right category (AEDB/PPIB certification rules, 2024). The single line diagram and design are expected to be endorsed by a registered professional engineer with the Pakistan Engineering Council (LESCO net metering procedure, 2024). Files without either are rejected at the portal or at scrutiny.",
      "Before signing with anyone, ask for the accreditation category and ask who the signing engineer is. Then check both. If your installer is not accredited, no stamp on a diagram can fix that.",
    ] },
    { type: "facts", heading: "What the testing lab looks for", items: [
      { label: "Earth resistance", value: "Under 5 ohms, with a separate earth for equipment and for lightning protection where the design needs it (NEPRA interconnection standards; LESCO M&T guidelines, 2024)" },
      { label: "Anti-islanding", value: "The inverter must disconnect from a dead grid within 2 seconds (IEC 62116; LESCO M&T manual, 2024)" },
      { label: "Inverter certificates", value: "IEC 62109-1 and -2 for safety, IEC 61727 or IEEE 1547 for utility interface (AEDB technical standards, 2024)" },
      { label: "Meter and isolators", value: "Safety isolators in place, labelling correct, bi-directional meter fitted by the company" },
    ] },
    { type: "prose", heading: "Mistake 5: failing the earth and anti-islanding test", paragraphs: [
      "The company's metering and testing team measures earth pit resistance on site. The usual threshold quoted is 5 ohms or lower (LESCO M&T guidelines, 2024). A pit dug in dry sandy soil without treatment, a single shared pit for everything, or a pit that was never tested before the visit are the usual causes of a fail. Ask your installer for the earth test report on the day of installation and keep it.",
      "The team also tests that the inverter disconnects quickly when the grid is switched off. A certified inverter does this by design; a settings error or the wrong grid profile can break it. Check the inverter's grid code setting is the one required locally.",
    ] },
    { type: "prose", heading: "Mistake 6: an inverter without the right certificates", paragraphs: [
      "Inverters that lack IEC 62109 safety certificates and IEC 61727 or IEEE 1547 utility-interface certificates are rejected during verification (AEDB technical standards for net metering, 2024). This catches buyers who bought on price, often a hybrid unit built for backup rather than for the grid, and then try to net meter it. Certificates are per model, not per brand.",
      "Ask for the PDF certificate for your exact model before payment, and compare the model code on the box to the one on the document. Our inverter comparison post has more on this.",
    ] },
    { type: "prose", heading: "Mistake 7: arrears, disputes and a lapsed demand note", paragraphs: [
      "An open dispute, an unpaid detection bill, or late payment on the reference number blocks revenue officer clearance (distribution company citizen charter, 2024). Clear them first. It feels unrelated to solar and it still stops the file.",
      "Then the demand note. After approval the company issues a demand note for the bi-directional meter and associated fees. The note has a validity window, quoted in distribution company procedures as roughly 15 to 30 days (DISCO operational procedure, 2024). Miss it and the requisition can be cancelled, which means starting again. Put the payment date in your calendar the day the note arrives.",
    ] },
    { type: "steps", heading: "A ten-point check before you submit", items: [
      { title: "Sanctioned load", text: "Write it down. Is the planned array at or below it?" },
      { title: "Phase", text: "Is the connection three-phase if the system is above 5 kW?" },
      { title: "Transformer", text: "Has the sub-division confirmed there is headroom?" },
      { title: "Names", text: "Does the connection, the CNIC and the application show the same name and address?" },
      { title: "Arrears", text: "Are all bills paid and no dispute open on the reference number?" },
      { title: "Installer", text: "Do you hold the AEDB or PPIB accreditation category in writing?" },
      { title: "Drawing", text: "Is the single line diagram stamped by a registered engineer?" },
      { title: "Inverter papers", text: "Do you hold the IEC certificates for the exact model?" },
      { title: "Earthing", text: "Is there a recent earth resistance reading under 5 ohms?" },
      { title: "Demand note", text: "Is the payment deadline in your calendar?" },
    ] },
    faq("Net metering problem questions", [
      ["Why is my net metering file stuck?", "The commonest reasons are a system larger than the sanctioned load, no transformer headroom, a name mismatch on the connection, unpaid arrears, or a missing engineer's stamp. Ask the sub-division office which desk holds the file and what it is waiting for."],
      ["What happens if the transformer is full?", "The regulations cap solar at 80 percent of the transformer rating, so the company can decline or hold the file. Ask about a transformer upgrade, or for the file to wait in the queue."],
      ["Can I apply if the bill is not in my name?", "Generally the company wants the connection transferred to the applicant's name before it executes the agreement. Start the transfer first, with proof of ownership or tenancy."],
      ["What earth resistance is needed?", "Under 5 ohms is the figure quoted in the company's testing guidelines. Ask your installer to measure and record it."],
      ["Do I need a PEC engineer's stamp?", "The procedures require the single line diagram and design to be endorsed by a Pakistan Engineering Council registered engineer."],
      ["Does SolarLink file applications?", "We can help with net metering applications. See the net metering support page for how, and check our current process with us on WhatsApp."],
    ]),
    sources([
      "NEPRA, \"Prosumer Regulations 2026, S.R.O. 251(I)/2026, Regulations 4 and 6\", 9 February 2026. nepra.org.pk",
      "LESCO, \"Net metering procedure\", 2024. lesco.org.pk",
      "LESCO, \"Commercial procedures\", 2023. lesco.org.pk",
      "LESCO, \"Metering and testing guidelines\", 2024. lesco.org.pk",
      "AEDB and PPIB, \"Certification rules and technical standards for net metering\", 2024. ppib.gov.pk",
      "Pakistan Engineering Council, \"Guidelines for professional endorsement of designs\", 2024. pec.org.pk",
      "IEC, \"IEC 62116, anti-islanding test procedure\", 2014. iec.ch",
      "Distribution companies, \"Citizen charter and operational procedure\", 2024. lesco.org.pk",
    ]),
  ],
  [["Net metering guide", "/net-metering-guide/"], ["Net metering support", "/services/net-metering-support/"], ["LESCO application guide", "/blog/net-metering-lesco-application-guide/"], ["Inverter comparison", "/blog/growatt-vs-fronus-inverter-comparison/"]],
);

const lesco = art(
  "net-metering-lesco-application-guide",
  "LESCO Net Metering Application: Documents | SolarLink",
  "LESCO net metering application: eligibility, the document file, each step from portal to meter, official fees and realistic timelines for Lahore.",
  "LESCO net metering application: documents, steps and timeline",
  "How a net metering application moves through LESCO in Lahore, from the document file to the day the bi-directional meter goes in.",
  [
    { type: "prose", heading: "The setting", paragraphs: [
      "LESCO supplies electricity to more than six million consumers in Lahore, Kasur, Sheikhupura and Okara (LESCO annual operational report, 2024). If your roof is in one of those districts, your net metering application goes through LESCO.",
      "The rules changed this year. The NEPRA (Prosumer) Regulations 2026, notified on 9 February 2026 as S.R.O. 251(I)/2026, replaced the 2015 net metering framework with net billing: exported units are credited at a buy-back rate that is lower than the retail rate. A later notification, S.R.O. 1330(I)/2026 of 6 August 2026, removed NEPRA's own concurrence step for systems up to 25 kW, so the distribution company can approve them directly. Users who signed under the old framework before 9 February 2026 keep their existing terms for the remaining agreement period (S.R.O. 547(I)/2026).",
      "Everything below is a summary of published procedure. LESCO changes forms and fees, so confirm with the sub-division office before you pay anything. For the wider picture see our net metering guide.",
    ] },
    { type: "prose", heading: "Check eligibility before you apply", paragraphs: [
      "Three things decide whether you can proceed at all. First, sanctioned load: the system cannot exceed the load printed on your bill (S.R.O. 251(I)/2026, Regulation 4). Second, phase: LESCO asks for a three-phase meter for solar above 5 kW and for net-metered sites generally (LESCO net metering procedure, 2024). Third, the transformer: total solar on the local 11 kV transformer is capped at 80 percent of its rating, and the sub-division engineer verifies it.",
      "If any of the three fails, deal with it first. A load enhancement or a phase conversion is a separate request with its own queue, and running it in parallel is better than discovering the gap at scrutiny.",
    ] },
    { type: "facts", heading: "The document file", items: [
      { label: "Application form", value: "Form-I as published by LESCO" },
      { label: "Identity and bill", value: "CNIC copy of the applicant and the latest paid electricity bill, in the same name" },
      { label: "Drawing", value: "Single line diagram signed by a Pakistan Engineering Council registered engineer" },
      { label: "Equipment", value: "Datasheets and certificates: IEC 62109 and IEC 61727 or IEEE 1547 for the inverter" },
      { label: "Installer", value: "AEDB or PPIB accreditation certificate of the installer" },
      { label: "Undertaking", value: "An undertaking on judicial stamp paper, as per LESCO's format" },
    ] },
    { type: "steps", heading: "From portal to power", items: [
      { title: "Lodge the application", text: "Applications are lodged on the PITC distributed generation portal and the file is physically submitted to the SDO Operation sub-division that serves your connection (PITC DG portal, 2025 to 2026). The sub-division checks the dossier for completeness." },
      { title: "Site and technical verification", text: "The SDO Operation team checks the supply type, the sanctioned load and the transformer loading against the 80 percent limit. LESCO's citizen charter quotes 15 working days for this stage (2024)." },
      { title: "Approval and demand note", text: "On approval LESCO issues a demand note for the bi-directional meter and testing. Pay within its validity window and keep the paid scroll; a lapsed note can cancel the request." },
      { title: "Metering and testing inspection", text: "LESCO's metering and testing team checks the installation. They test that the inverter disconnects within 2 seconds of a grid failure and that earth resistance is below 5 ohms (LESCO M&T operational manual, 2024)." },
      { title: "Agreement and meter", text: "You sign the distributed generation agreement. Under the 2026 regulations it runs for five years (S.R.O. 251(I)/2026, Schedule-I). Then LESCO fits the bi-directional meter and the system can be switched on." },
    ] },
    { type: "prose", heading: "What it costs", paragraphs: [
      "Official charges. LESCO's demand note covers the bi-directional meter and its testing. The regulations set no fixed fee: the distribution company sets the connection charge per site on the demand notice (Regulation 3(9)), and you pay the actual cost (Regulation 12(1)). NEPRA's 2026 fee schedule shows no concurrence fee for systems up to 25 kW; above 25 kW it is Rs 1,000 per kW (S.R.O. 1330(I)/2026).",
      "Those are rates published by the authorities. They change, and they depend on your meter type, so treat them as the right order of magnitude and read your own demand note.",
      "If you hire an installer to handle the filing, the liaison and drawing work is a private service with its own price. Ask for it itemised and in writing, separately from equipment. Some installers include it in the system price and some do not; either way it should be clear what you are paying for. SolarLink's own charges for filing are [confirm with client].",
    ] },
    { type: "prose", heading: "How long it takes", paragraphs: [
      "On paper the process is meant to take 30 to 45 days. The technical feasibility stage alone is quoted at 15 working days. In practice the waits cluster in two places: scrutiny queues at busy sub-divisions, and the supply of bi-directional meters. When the central store is out of stock, an approved file waits for a meter even though nothing is wrong with it.",
      "Plan for the weeks after installation to be a waiting period, not a switching-on date. Do not let anyone tell you a fixed day. Ask the sub-division for the meter stock position when you pay the demand note, and ask your installer to keep you updated at each stage.",
    ] },
    { type: "prose", heading: "What changes on your bill", paragraphs: [
      "After net metering, your bill shows two readings: units imported from the grid and units exported to it. Under net billing, the exports are credited at the national average energy purchase price, Rs 8.13 per kWh in NEPRA's 2026 determination (S.R.O. 251(I)/2026, 9 February 2026), and the imports are charged at your usual slab rates. Use what you can during the day; that avoids the gap between the credit and the import price.",
      "The first bill after the meter change can look odd, because the meter changes mid-cycle. Keep the meter-change reading from the installation record. If something looks wrong, take it to the sub-division with that reading.",
    ] },
    { type: "prose", heading: "Mistakes to avoid", paragraphs: [
      "The common ones are a design larger than the sanctioned load, a missing engineer's stamp, a name that does not match the connection, a lapsed demand note and a poor earth reading at inspection. Our post on common net metering mistakes covers each in turn. If you are comparing options, our post on net metering versus batteries explains what happens to your supply during a power cut, which net metering alone does not solve.",
    ] },
    faq("LESCO net metering questions", [
      ["How long does LESCO net metering take?", "The official target is 30 to 45 days, with the technical check quoted at 15 working days. Real waits depend on scrutiny queues and meter stock and often run longer. Ask the sub-division for the current position."],
      ["How much does a LESCO green meter cost?", "There is no fixed fee. The distribution company sets the meter and testing charge per site on your demand notice (Regulation 3(9)), and you pay the actual cost (Regulation 12(1))."],
      ["What are the steps?", "Check eligibility, assemble the documents, lodge on the PITC portal and submit to the sub-division, pass the site check, pay the demand note, pass the metering and testing inspection, sign the agreement and have the meter fitted."],
      ["Can I apply online?", "Yes, applications are lodged on the PITC distributed generation portal, and the file is also submitted physically to your sub-division. Check LESCO's current instructions, since the process has been moving online."],
      ["Does my system need NEPRA's approval?", "Not directly if it is up to 25 kW. S.R.O. 1330(I)/2026 lets the distribution company approve those systems without NEPRA concurrence."],
      ["Can SolarLink do this for me?", "We can help with net metering applications in Lahore. See the net metering support page, and message us on WhatsApp for how the process works for your case."],
    ]),
    sources([
      "LESCO, \"Annual operational report\", 2024. lesco.org.pk",
      "LESCO, \"Net metering procedure\", 2024. lesco.org.pk",
      "LESCO, \"Citizen charter\", 2024. lesco.org.pk",
      "LESCO, \"Schedule of service charges\", 2024. lesco.org.pk",
      "LESCO, \"Metering and testing operational manual\", 2024. lesco.org.pk",
      "NEPRA, \"Prosumer Regulations 2026, S.R.O. 251(I)/2026, including Schedule-I\", 9 February 2026. nepra.org.pk",
      "NEPRA, \"S.R.O. 547(I)/2026, amendment on existing agreements\", 2 April 2026. nepra.org.pk",
      "NEPRA, \"S.R.O. 1330(I)/2026, approval of systems up to 25 kW\", 6 August 2026. nepra.org.pk",
      "PITC, \"Distributed generation portal\", 2025 to 2026. pitc.com.pk",
    ]),
  ],
  [["Net metering guide", "/net-metering-guide/"], ["Net metering support", "/services/net-metering-support/"], ["Common mistakes", "/blog/net-metering-common-mistakes-pakistan/"], ["Lahore outlet", "/outlets/lahore/"]],
);

const battery = art(
  "net-metering-vs-battery-storage-pakistan",
  "Net Metering vs Battery Storage in Pakistan | SolarLink",
  "Net metering or a battery? How each works under the 2026 net billing rules, what the numbers say about cost, and when a small hybrid setup makes sense.",
  "Net metering or a battery?",
  "Two ways to use solar power you do not use right away. They solve different problems, and the 2026 rules change the arithmetic.",
  [
    { type: "prose", heading: "Two problems, not one", paragraphs: [
      "People ask whether to choose net metering or a battery as if the two did the same job. They do not. Net metering is a billing arrangement: you send surplus daytime power to the grid and get a credit. A battery is storage: you keep surplus power for later and can run the house when the grid is down.",
      "One saves money on the bill. The other buys continuity. Pakistani households feel both pains, high tariffs and long cuts, so the real question is how much of each you need and what the 2026 rules do to the sums. This post sets out how each works, what we can say with public numbers and where only your own situation can decide.",
    ] },
    { type: "prose", heading: "How net metering works now", paragraphs: [
      "Under the NEPRA Prosumer Regulations 2026 (S.R.O. 251(I)/2026, notified 9 February 2026), net metering became net billing. A bi-directional meter counts the units you import and the units you export. Exports are credited at the national average energy purchase price, Rs 8.13 per kWh in NEPRA's 2026 determination. Imports are charged at your slab rate, which starts near Rs 30 and passes Rs 48 per kWh on higher slabs before taxes and fuel adjustments (NEPRA S.R.O. 1035(I)/2024, 12 July 2024). Dates matter here; check the current schedule.",
      "The spread is the story. A unit you use yourself saves you the import rate. A unit you export earns about a quarter of it. The grid acts like a battery that pays you poorly for what you put in and charges you fully for what you take out.",
      "Net metering has one more catch: it needs the grid. A grid-tied inverter must stop within about 2 seconds of a grid failure, as IEC 62116 and IEEE 1547 require, so that it does not energise a line crews believe is dead. When load-shedding hits, a net-metered house with no battery goes dark with sunshine on its roof.",
    ] },
    { type: "prose", heading: "How a battery works", paragraphs: [
      "A battery sits behind the meter. A hybrid inverter charges it from the panels, then runs the house from it at night or during a cut. It can also be told to export or not. It does not depend on the grid being up, which is its point.",
      "Chemistry decides much of the cost. Lithium iron phosphate (LiFePO4) batteries from manufacturers such as Pylontech and Dyness are rated for 4,000 to 6,000 cycles at 80 to 90 percent depth of discharge, with a service life of ten to twelve years (manufacturer datasheets, 2024). Deep-cycle tubular lead-acid batteries manage roughly 800 to 1,200 cycles at 50 percent depth of discharge, with round-trip efficiency of 70 to 75 percent, and often need replacing in around three years (PCRET evaluation, 2023).",
      "Round trips lose energy. Lithium typically loses 5 to 10 percent between charge and discharge; tubular batteries lose 25 to 30 percent (NREL analysis, 2023). Net metering has no such loss, since the grid does not degrade.",
    ] },
    { type: "facts", heading: "Side by side", items: [
      { label: "What it gives you", value: "Net metering: a credit on the bill. Battery: backup power and control of when you use your solar." },
      { label: "Works in a power cut", value: "Net metering alone: no. Battery with hybrid inverter: yes, within its capacity." },
      { label: "Value of a unit", value: "Exported: national average energy purchase price, Rs 8.13 per kWh (NEPRA, 2026). Used or stored at peak: avoids an import rate that can be several times higher." },
      { label: "Ongoing replacement", value: "Net metering: none. Lithium: about 10 to 12 years. Tubular: about 3 years." },
      { label: "Loss per cycle", value: "Net metering: none. Lithium: 5 to 10%. Tubular: 25 to 30%." },
      { label: "Needs a permit", value: "Net metering: yes, from the distribution company. A battery alone: no." },
    ] },
    { type: "prose", heading: "What the money says", paragraphs: [
      "Cost first, in plain terms. A net metering application carries a meter and testing charge set per site on the demand notice, and, if you hire help, the filing work. A lithium battery costs a good deal more than that for any useful size. Battery prices fall and move with the dollar, so we do not print a figure here; get a written quote for a specific kWh capacity from any seller you consider.",
      "Next, value per unit. Secondary studies of storage cost in Pakistan put the levelised cost of stored power from lithium around Rs 18 to 25 per kWh over its life (IRENA storage cost benchmark, 2023; LUMS Energy Institute, 2024). That is well below the grid's evening import rate, so a unit stored and used at night beats a unit bought. It is also well above the Rs 8.13 per kWh you earn by exporting, so storing a unit only to sell it back later loses money. The battery pays by avoiding imports, not by selling.",
      "Time-of-use billing sharpens this. Peak hours, commonly 5 pm to 11 pm, are billed at the highest rate, quoted above Rs 46 per kWh in the base tariff (NEPRA time-of-use schedule, 2024). Daytime solar cannot cover the evening, and a battery can. That is the strongest financial case for storage.",
      "We have not stated a payback period. Published payback figures depend on the tariff slab, the system and the year, and the 2026 rule change makes older ones unreliable. Ask for a payback calculation on your own bills, with the assumptions written down.",
    ] },
    { type: "prose", heading: "Why lead-acid is usually the wrong saving", paragraphs: [
      "Tubular batteries cost less to buy and more to own. At 800 to 1,200 cycles, one cycle a day, you replace the bank around every three years. Add the 25 to 30 percent round trip loss and the weight, venting and floor space. Over ten years a lithium bank usually works out cheaper per stored unit, and that is where the Rs 18 to 25 figure above comes from.",
      "There are exceptions. If you only need a few hours of backup a few times a year, a small lead-acid bank can be enough and the upfront saving is real. But if you will cycle the battery daily for peak shaving, lithium is the sensible chemistry.",
    ] },
    { type: "steps", heading: "How to decide for your home", items: [
      { title: "Look at your outages", text: "How many hours a day, and which loads must keep running? A fridge, fans and lights need far less than an air conditioner." },
      { title: "Look at your daytime use", text: "A household that is empty in the day exports most of its solar at the low rate. One that runs air conditioners at noon uses it." },
      { title: "Look at your evening peak", text: "If your biggest bills come from 5 pm to 11 pm, a battery sized for that window earns its keep." },
      { title: "Size the battery for essentials, not everything", text: "Run the load calculator for the loads you must keep on. A 5 to 10 kWh bank covers a lot of evenings and a fridge-and-fans cut." },
      { title: "Check the paperwork", text: "A hybrid inverter that can also export needs the grid-interactive certificates for net metering. Not every hybrid unit has them." },
    ] },
    { type: "prose", heading: "The hybrid middle", paragraphs: [
      "Most households that think carefully end up between the two. A system with a modest battery sized for the evening peak and for essential loads during outages, and net metering to catch the daytime surplus. The panels feed the house first, the battery next, and the grid takes whatever is left at the buy-back rate.",
      "That setup protects against the worst of load-shedding and trims the most expensive hours, while keeping the battery small enough to be affordable. It also keeps the battery cycling daily, which is what makes the investment work. Our hybrid system page describes the hardware, and the battery backup calculator can size the bank for your loads.",
      "If you only need to cut the bill, and outages are short or rare, net metering with no battery is the simpler, cheaper route. If your cuts are long and your daytime use is low, a battery-led hybrid makes more sense. We can model both on your bills after a site visit.",
    ] },
    faq("Net metering and battery questions", [
      ["Does solar net metering work during load-shedding?", "No. A grid-tied inverter shuts off within seconds when the grid fails, as safety standards require. You need a hybrid inverter and a battery to keep power on during a cut."],
      ["Which saves more money, selling to the grid or storing in a battery?", "Storing for your own evening use saves more per unit than selling, because it avoids an import rate that is several times the Rs 8.13 per kWh buy-back. But a battery also costs more upfront. Run the numbers on your own bills."],
      ["How long does a lithium battery last in Pakistan?", "Manufacturer datasheets for LiFePO4 batteries rate 4,000 to 6,000 cycles, which is about ten to twelve years of daily use. Real life depends on heat, depth of discharge and the inverter's settings."],
      ["Do I need a battery with solar?", "No. If cuts are short and your priority is the bill, net metering alone can be enough. Add a battery when outages or evening peak hours are a real cost."],
      ["How big a battery do I need?", "Size it for the loads you must keep on and the hours you must cover. The battery backup calculator on this site gives a first estimate."],
    ]),
    sources([
      "NEPRA, \"Prosumer Regulations 2026, S.R.O. 251(I)/2026\", 9 February 2026. nepra.org.pk",
      "NEPRA, \"Uniform tariff, S.R.O. 1035(I)/2024\", 12 July 2024. nepra.org.pk",
      "NEPRA, \"Time-of-use billing schedule\", 2024. nepra.org.pk",
      "Pylontech and Dyness, \"LiFePO4 battery engineering datasheets\", 2024.",
      "PCRET, \"Energy storage evaluation\", 2023. pcret.gov.pk",
      "IRENA, \"Energy storage cost benchmark\", 2023. irena.org",
      "LUMS Energy Institute, \"Storage economics in Pakistan\", 2024.",
      "NREL, \"PV and battery storage analysis\", 2023. nrel.gov",
      "IEC, \"IEC 62116, anti-islanding test procedure\", 2014. iec.ch",
      "LESCO, \"Schedule of service charges\", 2024. lesco.org.pk",
    ]),
  ],
  [["Hybrid systems", "/solar-systems/hybrid/"], ["Batteries", "/products/batteries/"], ["Battery backup calculator", "/tools/battery-backup-calculator/"], ["Net metering guide", "/net-metering-guide/"]],
);

export const articles1: PageDoc[] = [growatt, sizing, mistakes, lesco, battery];
