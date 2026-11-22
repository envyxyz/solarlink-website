import { outlets } from "@/content";
import { show } from "@/lib/facts";
import { faq, make, pics } from "./shared";
import type { PageDoc } from "../types";

/* Company pages, written 23 Nov 2026. SolarLink facts are limited to what src/content.ts marks confirmed (services,
   outlets, addresses). Public facts (NEPRA rules, sun data, tariffs) name their source and date in the text; the
   research behind them is docs/research/agy-2026-11-23/. */

const LASTMOD = "2026-11-23";
const mk = (d: Parameters<typeof make>[0]): PageDoc => ({ ...make(d), lastmod: LASTMOD });

const outletLinks = outlets.map((o) => {
  const parts = [show(o.addressLines)?.join(", "), show(o.phones)?.join(", "), show(o.hours)].filter(Boolean);
  return {
    label: `SolarLink ${o.city}`,
    text: parts.length ? parts.join(". ") : "Visit the outlet page for the address and how to reach the shop.",
    href: o.path,
  };
});

export const companyDocs: PageDoc[] = [
  mk({
    path: "/about-us/", kind: "company",
    title: "About SolarLink Pakistan | Solar Supply and Installation",
    description: "SolarLink installs solar for homes, businesses and industry, files net metering and sells panels, inverters and batteries in Lahore, Islamabad and Sargodha.",
    h1: "About SolarLink",
    lead: "SolarLink designs, supplies and installs solar systems for homes, shops, offices and factories, files the net metering application, and sells panels, inverters, batteries and UPS over the counter.",
    image: pics.hero,
    blocks: [
      { type: "prose", heading: "What SolarLink does", paragraphs: [
        "We are a solar company with its head office on The Mall in Lahore and outlets in Islamabad and Sargodha. The work falls into four parts: installing solar systems at homes, installing them at commercial and industrial sites, handling net metering and after-sales support, and supplying equipment to people who want to buy panels, inverters, batteries or a UPS without a full installation.",
        "A solar system is a long purchase. It sits on your roof for years, so we would rather you ask a lot of questions before you sign than a few after. This page explains how we work, what we supply and what to ask any installer, including us.",
      ] },
      { type: "feature", heading: "Solar, supplied and installed", text: "We size a system around your bills and your roof, supply the equipment, install it and prepare the net metering application.", image: pics.hero, tone: "sunken" },
      { type: "links", heading: "Four kinds of work", items: [
        { label: "Solar for homes", text: "Rooftop systems sized to a household's units, on-grid or with a battery.", href: "/services/residential-solar/" },
        { label: "Solar for business", text: "Shops, offices and other commercial sites that pay for power all day.", href: "/services/commercial-solar/" },
        { label: "Solar for industry", text: "Factories and larger plants, where the load study matters most.", href: "/services/industrial-solar/" },
        { label: "Net metering support", text: "The application, approval and commissioning, filed for you.", href: "/services/net-metering-support/" },
      ] },
      { type: "steps", heading: "How a job runs", items: [
        { title: "You send a bill", text: "A photo of your latest electricity bill shows the units you use each month. Units, not rupees, decide the size, because tariffs move and your appliances do not." },
        { title: "We look at the site", text: "We check the roof or land, the shade through the day, the meter and the distribution board. Nothing is final until someone has seen the site." },
        { title: "We propose a system", text: "You get a system type (on-grid, hybrid or off-grid), a size in kW, a list of equipment and a quotation. Ask for all of it in writing." },
        { title: "We supply and install", text: "Structure, panels, inverter, cabling, earthing and protection go in. The system is tested before it is switched on." },
        { title: "We file net metering", text: "For grid-connected systems we prepare the application for your distribution company and follow it through to the meter." },
        { title: "We stay reachable", text: "After-sales support runs through the outlet that served you. Call or visit if the inverter shows a fault or the bill looks wrong." },
      ] },
      { type: "prose", heading: "What we supply", paragraphs: [
        "Customers who already know what they want can buy equipment from us directly: solar panels, inverters, batteries and appliances such as UPS units. The products section lists the categories, and the outlet can tell you what is in stock on the day you call.",
        "We do not publish a price list online. Prices of panels, inverters and batteries move with the exchange rate and with supply, so a number printed on a page goes stale fast. Ask the outlet for a written quotation and note its date.",
      ] },
      { type: "prose", heading: "What to ask any solar installer", paragraphs: [
        "Ask for the system size in kW and the panel count and rating, so you can check one against the other. Ask for the inverter make and model, and where its service centre is. Ask what the battery is, if there is one: chemistry, usable kWh and the stated cycle life on the datasheet.",
        "Ask who does the net metering paperwork and what the distribution company charges. Ask for warranty terms in writing, separately for panels, inverter, battery and workmanship, and ask who you call when something fails. Ask to see a finished job of a similar size.",
        "A good answer is specific and comes with a paper trail. A vague answer, or pressure to decide on the day, is a reason to slow down. The same goes for us.",
      ] },
      { type: "prose", heading: "Who we work with", paragraphs: [
        "A household is mostly worried about the monthly bill and, in many areas, about power cuts. The first question is how many units you use and when: a family at home through the day uses more of what the panels make, and gets more from the same system, than one that is out until the evening. The second is whether you want to run anything through a cut, because that decides whether you need a battery.",
        "A shop or an office pays for power during the hours when the sun is up, which suits solar. The questions are the roof, the sanctioned load and how much the air conditioning pulls at noon. A factory or a larger plant needs a proper load study, three-phase wiring, and a realistic look at which machines start at the same time. That is why industry has its own page.",
        "A farm is a different problem again, mostly a pump, its motor and the hours it runs. We list farm and tubewell work among our services, and the outlet can tell you what it offers for your area.",
      ] },
      { type: "prose", heading: "What a safe installation looks like", paragraphs: [
        "A solar system is electrical work on a roof, so safety is not an extra. On site you should see a DC isolator between the panels and the inverter, breakers sized to the cable, surge protection on both the DC and AC sides, and earthing for the structure and the inverter. Cables should run in conduit or tray, clipped and shaded from the sun, not left across the roof.",
        "The mounting structure should be fixed to the roof at proper points, braced for wind, and sealed where it meets the slab. Ask what wind load it was designed for. After the install, the inverter should show its settings, and the installer should show you how to switch the system off in an emergency.",
      ] },
      { type: "prose", heading: "Sizing from units, not rupees", paragraphs: [
        "Your bill in rupees swings with the slab you land in, the fuel charge adjustment and taxes. The units printed on it, in kWh, are the honest measure of how much power you use. A system is sized from those units, the sun at your address and the space you have.",
        "For a rough idea of the sun: the Global Solar Atlas (World Bank Group, ESMAP, Solargis; accessed 23 November 2026) puts the yearly yield of a fixed, well-tilted system at about 1,466 kWh per kW in Lahore, 1,559 in Islamabad and 1,513 in Sargodha. That is 4.0 to 4.3 kWh per kW per day on a yearly average, with far less in December and January than in May. Our calculator builds on the same kind of numbers.",
      ] },
      { type: "links", heading: "Where to find us", items: [
        { label: "Our outlets", text: "Lahore head office, Islamabad and Sargodha: addresses and how to reach each shop.", href: "/outlets/" },
        { label: "Our projects", text: "Installations we have completed, with details as each one is confirmed.", href: "/projects/" },
        { label: "Solar calculator", text: "A rough system size from your bill, before you speak to anyone.", href: "/solar-calculator/" },
        { label: "How solar works", text: "The plain explanation of panels, inverters, batteries and the meter.", href: "/how-solar-works/" },
      ] },
      { type: "prose", heading: "What this page does not say", paragraphs: [
        "You will not find a headcount, a star rating, an install tally or a promise of a bill at zero here. When the company can show a number and its evidence, it will go on the page with its date. Until then, the best proof is a visit to a shop and a look at a finished system.",
      ] },
    ],
    related: [{ label: "Contact us", href: "/contact-us/" }, { label: "Get a quote", href: "/get-quote/" }, { label: "Our outlets", href: "/outlets/" }, { label: "FAQs", href: "/faqs/" }],
  }),
  mk({
    path: "/contact-us/", kind: "company",
    title: "Contact SolarLink | Lahore, Islamabad, Sargodha",
    description: "Contact SolarLink in Lahore, Islamabad or Sargodha. Find each shop's address and phone, or send your bill through the quote form to start a solar quotation.",
    h1: "Contact SolarLink",
    lead: "Call, message or visit the shop nearest to you. If you want a system priced, the quote form is the quickest way to start.",
    blocks: [
      { type: "links", heading: "Our shops", items: outletLinks },
      { type: "prose", heading: "Which way to reach us", paragraphs: [
        "For a system, send a photo of your latest electricity bill with your city and area. The units on the bill matter more than the amount. For a product, name the brand or type you are looking for and the size or rating. For net metering, tell us which distribution company is named on your bill.",
        "For something already installed, tell us roughly when it went in, what the inverter display or app shows, and a photo of the fault code if there is one. The outlet that served you can then look at the right file.",
      ] },
      { type: "steps", heading: "What to have ready", items: [
        { title: "Your latest bill", text: "A clear photo, showing the units used, the sanctioned load and the distribution company." },
        { title: "Your location", text: "City, area and whether it is a home, shop, factory or farm." },
        { title: "Your roof or land", text: "A photo from above if you can take one, or a rough sketch with measurements." },
        { title: "What you want to run", text: "Air conditioners, a tubewell, a workshop machine, or lights and fans during a power cut." },
      ] },
      { type: "prose", heading: "Visiting a shop", paragraphs: [
        "The head office is at Shop No. 05, Munawar Center, opposite the State Bank building on The Mall in Lahore. The Islamabad outlet is at House No. 514, North Service Road, Sector I-14/3. The Sargodha outlet is at Block No. 05, Aslahy Wali Gali, near Company Bagh.",
        "Opening hours and direct phone numbers appear above for each shop as they are confirmed. If a number is missing there, use the quote form and the nearest shop will contact you.",
      ] },
      { type: "prose", heading: "Which shop should I contact?", paragraphs: [
        "Lahore is the head office, on The Mall. Islamabad serves the capital and the surrounding area, and Sargodha serves Sargodha and its district. If you live between two, pick the one you can reach more easily for a visit, because the survey and any after-sales call-out start there.",
        "You do not have to visit. Most conversations start with a bill and a few photos sent by message. But the shops are real shops, with equipment you can look at, and a visit is a good way to see what a panel, an inverter and a battery actually look like before you decide.",
      ] },
      { type: "prose", heading: "Before you call about net metering", paragraphs: [
        "Find three things on your bill: the name of your distribution company, your sanctioned load in kW, and your reference number. These decide what size of system you can connect and which office handles the file. The net metering guide on this site explains the rules that came into force in 2026.",
      ] },
    ],
    related: [{ label: "Get a quote", href: "/get-quote/" }, { label: "All outlets", href: "/outlets/" }, { label: "FAQs", href: "/faqs/" }, { label: "Net metering support", href: "/services/net-metering-support/" }],
  }),
  mk({
    path: "/get-quote/", kind: "company",
    title: "Get a Free Solar Quote | SolarLink",
    description: "Ask SolarLink for a solar quotation. Send your bill, city and property type and we suggest a system size, then arrange a site visit before anything is final.",
    h1: "Get a solar quotation",
    lead: "Tell us about your home, business or farm. We use your bill and your roof to suggest a system, then arrange a site survey.",
    image: pics.homes,
    blocks: [
      { type: "quoteForm", heading: "Ask for a quote", lead: "Fill in the form and your message opens in WhatsApp, ready to send to the nearest outlet. Share a photo of your latest bill there if you have one." },
      { type: "steps", heading: "How a quote starts", items: [
        { title: "Send your details", text: "Your name, phone number, city and whether the property is a home, business or farm." },
        { title: "Share a recent bill", text: "A clear photo of your last electricity bill shows how much power you use." },
        { title: "We suggest a system", text: "We recommend a system type and size and answer your questions." },
        { title: "Site survey", text: "We visit to check the roof, shade and meter before anything is confirmed." },
      ] },
      { type: "sizing", heading: "Size it from your bill", lead: "Move the slider to see a rough system size for your bill. It is an estimate: the site survey confirms it." },
      { type: "prose", heading: "What affects the answer", paragraphs: [
        "Your units used, your roof or land, shade, and whether you want backup during power cuts all change the system. That is why a survey comes before a final quotation. The outlet gives the price once these are known.",
        "Two quotes for the same house can differ by a lot and both be honest, because the equipment differs. Compare them line by line: panel brand and rating, panel count, inverter make and model, battery chemistry and usable kWh, mounting structure material, cable and protection, and who files net metering.",
      ] },
      { type: "prose", heading: "What a good quotation lists", paragraphs: [
        "System size in kW and the number and rating of the panels. Inverter make, model and rating. For a hybrid, the battery make, voltage, usable capacity and cycle life. The mounting structure and its material. Cabling, breakers, surge protection and earthing. What is included for net metering, and what the distribution company charges on top.",
        "It should also state the date of the quotation, how long the prices hold, the payment schedule and the warranty terms in writing. Equipment prices move, so a quotation without a date is hard to compare.",
      ] },
      { type: "links", heading: "Before you ask", items: [
        { label: "Solar calculator", text: "A rough size and an estimate of what the system could supply.", href: "/solar-calculator/" },
        { label: "Net metering guide", text: "What the 2026 rules mean for what you send to the grid.", href: "/net-metering-guide/" },
        { label: "Paying for solar", text: "How to think about financing before you ask the outlet.", href: "/solar-financing/" },
      ] },
    ],
    related: [{ label: "Contact us", href: "/contact-us/" }, { label: "Solar calculator", href: "/solar-calculator/" }, { label: "FAQs", href: "/faqs/" }, { label: "Our services", href: "/services/" }],
  }),
  mk({
    path: "/faqs/", kind: "guide",
    title: "Frequently Asked Questions: Solar in Pakistan | SolarLink",
    description: "Answers to common questions on solar in Pakistan: how systems work, sizing, cost drivers, installation, equipment, net metering, warranty and payment.",
    h1: "Frequently asked questions about solar in Pakistan",
    lead: "The questions people ask before they buy solar, answered plainly. Public facts name their source and date. For your own roof and bills, ask a shop or request a quote.",
    blocks: [
      { type: "prose", heading: "How to use this page", paragraphs: [
        "The questions run in order: how solar works, cost and savings, installation, equipment, net metering, warranty and support, and a last group of the questions we hear most. Use your browser's search to jump to a word.",
        "Where an answer depends on SolarLink's own prices, brands, warranty terms or timings, we say so and tell you to ask the outlet for it in writing. We would rather say that than print a number we cannot stand behind. Where an answer depends on a public rule or measurement, we name the source and the date, so you can check it.",
      ] },
      faq("Every question, by topic", [
        ["What is a solar energy system?", "A solar energy system turns sunlight into electricity you can use. Panels make direct current (DC). An inverter converts it to alternating current (AC), the kind your sockets supply at about 230 V and 50 Hz. On a grid-connected system, power you do not use can go to the grid, and the grid supplies you when the panels cannot, such as at night."],
        ["Is solar energy worthwhile in Pakistan?", "The sun is strong. The Global Solar Atlas (World Bank Group, ESMAP, Solargis; accessed 23 November 2026) shows yearly irradiation on a tilted panel of roughly 5.1 kWh per square metre per day in Lahore, 5.4 in Islamabad and 5.3 in Sargodha. Whether it pays for you depends on your units, the tariff slab you sit in and the price of the system. A quotation and your last bill are enough to work it out."],
        ["What types of solar systems does SolarLink install?", "The three standard types: on-grid (connected to the grid, no battery), hybrid (connected to the grid, with a battery for backup) and off-grid (no grid, panels and batteries only). We install systems for homes, for commercial sites and for industry. The survey and your answers about power cuts decide which type fits."],
        ["How long do solar panels last?", "Panels have no moving parts and keep working for decades, but they lose a little output each year. Datasheets typically allow somewhere around half a percent a year; the exact figure and the manufacturer's performance guarantee are printed on the datasheet of the model you buy. Read it before you buy, and keep a copy."],
        ["How much electricity does a solar panel generate per day?", "Using the Global Solar Atlas yearly yield for a fixed, well-tilted system (1,466 kWh per kW per year in Lahore, 1,559 in Islamabad, 1,513 in Sargodha), a 580 W panel gives about 2.3 kWh a day in Lahore, 2.5 in Islamabad and 2.4 in Sargodha, averaged over the year. A day in May gives more; a day in December gives much less."],
        ["What is the difference between an on-grid and off-grid solar system?", "An on-grid system works with the grid: it uses solar power first and draws from the grid when the panels cannot cover the load. It needs no battery. An off-grid system has no grid link and stores power in batteries, so it must be sized for your worst days. It suits places with no grid. A hybrid sits between the two."],
        ["Can a solar system power my home during load-shedding?", "A plain on-grid inverter switches off when the grid goes down. This is anti-islanding protection, and it protects line workers. A hybrid system with a battery can keep chosen loads running, as long as those loads sit on a separate backup circuit. Say what you want to run through a cut and the quote is built around it."],
        ["What happens on cloudy or rainy days?", "Panels still make power in diffuse light, only less of it. The Global Solar Atlas shows the effect: in Lahore, average daily irradiation drops from 6.3 kWh per square metre in May to 4.76 in July, when the monsoon clouds arrive, and to 3.5 in January. Rain washes loose dust off the glass, though it does not remove bird droppings or dried mud."],
        ["How much does a solar system cost in Pakistan in 2026?", "We do not print a price here, because panel, inverter and battery prices move with the exchange rate and with supply. The cost of a system depends on its size in kW, the brand and rating of the panels and inverter, whether it has a battery, the mounting structure, the roof and the distance of the cable runs. Ask the outlet for a dated, written quotation."],
        ["How much can I save on my electricity bill with solar?", "It depends on how much of your use the system covers, when you use it and what the rules pay for exports. Power you use as it is made saves you the full retail rate. Power you send to the grid is credited at a lower rate under net billing. A system sized to your daytime use saves more per rupee spent. The calculator and the net metering guide show the mechanics."],
        ["What is the solar payback period in Lahore and Islamabad?", "Payback is the system price divided by what it saves each year. We do not quote a payback figure because it depends on your tariff slab, how much you use during the day and the price you pay. Work it out from a quotation: system price, divided by the yearly units the system makes multiplied by the rate you would otherwise pay for them."],
        ["What is the approximate cost of a 5kW solar system?", "We do not publish prices, so ask the outlet for a dated quotation. Size is only one input: a 5 kW system with a hybrid inverter and a battery costs more than a 5 kW on-grid system with no battery. As a size guide, 5 kW of panels makes roughly 20 kWh a day on a yearly average in Lahore, which suits a small to mid-sized home."],
        ["What is the approximate cost of a 10kW solar system?", "Again, ask for a written, dated quotation, and compare it line by line. On yearly averages from the Global Solar Atlas, 10 kW of panels makes about 40 kWh a day in Lahore, 43 in Islamabad and 41 in Sargodha. That is the range of a large home or a small shop, and it is the scale where net metering rules and sanctioned load start to matter."],
        ["What is the approximate cost of a 15kW solar system?", "The answer is the same: a quotation, not a guess. At 15 kW, the questions that matter most are your sanctioned load (the new rules cap a system at 100% of it; see the net metering guide), three-phase wiring, and whether the roof has enough unshaded space. We survey first and price after."],
        ["Does solar increase my property value?", "We have no Pakistani sales data to quote, so we will not promise it. A working system lowers the running cost of a building, and a buyer or a valuer may weigh that. Keep the paperwork: the datasheets, the net metering agreement, the warranty documents and the commissioning report. A buyer will ask for them."],
        ["Are there ongoing costs after solar installation?", "Few. Cleaning the panels, checking the inverter display or app, and occasional checks of connections and shade. A battery, if you have one, wears out and eventually needs replacing. Your bill also keeps its fixed charges and taxes: under the February 2026 tariff, fixed charges are billed per kW of sanctioned load per month (NEPRA decision of 11 February 2026), solar or not."],
        ["How do rising electricity tariffs affect my solar ROI?", "Higher tariffs raise the value of every unit your system makes and you use yourself. Lower or flat tariffs do the opposite. Treat tariff forecasts with care. NEPRA's decision of 11 February 2026 sets base rates for unprotected domestic consumers from Rs 22.44 per kWh in the first slab to Rs 47.20 above 700 units, before taxes, fuel and quarterly adjustments. These are dated figures and they change."],
        ["Is solar cheaper than grid electricity in Pakistan right now?", "Compare your own numbers. Divide the installed price by the units the system will make over its life (roughly 1,500 kWh per kW per year in our cities, less a small loss each year), and set that against the rate you pay now. If the first is clearly lower, solar wins on cost. Include a battery replacement if you have one, and remember that exports earn a lower rate than you pay."],
        ["How long does a solar installation take?", "It depends on the size, whether materials are in stock, the roof, the weather and the type of system. We do not promise a number of days. Ask for a written schedule that separates the survey, the design, the delivery of equipment, the installation and the net metering process, because the distribution company's part is outside the installer's control."],
        ["What happens during a site survey?", "An engineer looks at the roof or land: area, direction, tilt, shade from trees or buildings at different times of the day, the condition of the structure and the route for cable. They look at your meter and distribution board, the sanctioned load and the phase of the connection. Ask for what they find to be written down."],
        ["Will the installation damage my roof?", "It should not, if it is done properly. Mounting structures are fixed at set points, and any hole in a flat concrete roof must be sealed and waterproofed afterwards. Ask how the structure is fixed on your roof type, how the fixings are waterproofed and who is responsible if a leak appears later. Check the roof's condition before work starts, and photograph it."],
        ["Do I need to be home during installation?", "Someone responsible should be present for the survey and on the first day, to agree where the panels, inverter and battery go, and to show the team the distribution board. After that, ask the outlet what it needs from you. Installation is work at height with electrical connections, so keep children and visitors clear."],
        ["What permits or approvals does solar installation require?", "For a grid-connected system, the approval that matters is your distribution company's net metering approval. Under the NEPRA (Prosumer) Regulations, 2026 (S.R.O. 251(I)/2026, 9 February 2026), systems up to 25 kW need the distribution company's approval and no separate NEPRA concurrence (S.R.O. 1330(I)/2026, 6 August 2026). Larger systems have further steps. Tenants may also need the owner's consent."],
        ["How do you determine the right solar system size for my home?", "We start from the units on your bills, ideally the last twelve months, then look at the sun at your address, the space and shade on your roof, your sanctioned load and what you want to run in a power cut. Under net billing the best size is usually the one that covers your daytime use well, not the biggest the roof can hold."],
        ["Can solar panels be installed on any type of roof?", "Most roofs can carry panels: flat reinforced concrete roofs, sloped roofs and metal sheet roofs, each with its own mounting structure. The survey checks strength, space, shade and access. A weak or leaking roof should be repaired first, and a roof you plan to rebuild soon should wait until after the work."],
        ["What happens when the installation is complete?", "The system is tested and commissioned: connections checked, inverter configured, the monitoring app set up on your phone. You should get the datasheets, the system diagram, the warranty documents and an explanation of the inverter display. For a grid-connected system, the net metering application follows, and the bi-directional meter comes from the distribution company."],
        ["What solar panel brands does SolarLink use?", "Brands change with supply, and the outlet can tell you what is in stock and what it recommends for your job. We do not list brands or claim dealer status online until they are confirmed. When you compare quotes, compare the model number and datasheet, not only the brand: power rating, efficiency, temperature coefficient and the manufacturer's warranty terms."],
        ["What inverter brands does SolarLink use?", "Ask the outlet which inverters it supplies for your system type today. What matters more than the name is local service: is there a service centre in Pakistan, are spare parts available, can the firmware be updated, and does the app work. Growatt and Fronus are two inverter brands sold in Pakistan; judge any brand by its local support."],
        ["What is a tier one solar panel?", "\"Tier one\" comes from a list kept by BloombergNEF of manufacturers whose panels banks have financed in volume without problems. It measures bankability, not quality, and it does not guarantee how a given model will perform. We make no such promise on this page. Read the datasheet and the warranty of the exact model you are offered."],
        ["What is the difference between monocrystalline and polycrystalline solar panels?", "Monocrystalline cells are cut from a single silicon crystal and are more efficient, so a given roof gives more power. Polycrystalline cells are made from several crystals, are less efficient and are now hard to find for rooftop use. Most panels sold for rooftops today are monocrystalline. Efficiency in the low twenties of percent is typical; the datasheet gives the exact figure."],
        ["Do I need a battery with my solar system?", "Not if you only want lower bills and have few power cuts: an on-grid system uses the grid when the sun is down. You need a battery, and a hybrid inverter, if you want power during cuts or in the evening on your own supply. Batteries add cost and wear out, so size one to the loads you must keep, not to everything in the house."],
        ["What battery brands does SolarLink supply?", "The outlet can tell you which batteries it stocks and which inverters they work with. For any battery ask four things: the chemistry (lithium iron phosphate or lead-acid), the usable capacity in kWh, the cycle life on the datasheet and the depth of discharge it assumes, and whether the inverter manufacturer lists it as compatible."],
        ["What size inverter do I need?", "The inverter is chosen against the panel array and your loads. It is commonly sized close to the array's rating, sometimes a little under it. On a hybrid system the loads you want to back up during a cut also set the size, because the inverter must carry them all at once, including the surge when a motor or compressor starts. The survey and your appliance list settle it."],
        ["What is a hybrid inverter and when do I need one?", "A hybrid inverter manages panels, a battery and the grid together. It runs the house from solar, charges the battery from surplus, exports what is left and falls back on the battery when the grid fails. You need one if you want backup power. A standard on-grid inverter does not supply power when the grid is down."],
        ["Are imported solar panels better than locally assembled ones?", "Neither origin settles quality. Judge the specific model: independent test reports, the datasheet, the manufacturer's warranty and whether the maker will honour it in Pakistan. Ask the seller who handles a claim and how. Be careful with panels that have no model number, no datasheet or a price far below the market."],
        ["What is net metering and how does it work in Pakistan?", "Net metering is the arrangement that lets a solar owner connect to the grid through a two-way meter. Since the NEPRA (Prosumer) Regulations, 2026 came into force on 9 February 2026, new connections use net billing: what you import is billed at the normal tariff, what you export is credited at a separate, lower rate, and the two amounts are offset on the bill. The guide on this site explains it with a worked example."],
        ["Who is eligible for net metering in Pakistan?", "A consumer with an electricity connection from a distribution company can apply, for a system that meets the regulations. The size cannot exceed 100% of the connection's sanctioned load and is capped at 1 MW, and the total on one distribution transformer is limited to 80% of its rating (S.R.O. 251(I)/2026, 9 February 2026). Check your sanctioned load on your bill."],
        ["How do I apply for net metering in Pakistan?", "The application goes to your distribution company with the system design and the equipment details. In outline: design and documents, scrutiny by the company, a demand notice and payment, inspection and testing, an agreement, and the meter. SolarLink prepares the application and follows it through. The net metering guide lists the steps and documents."],
        ["How long does the net metering process take?", "It depends on the distribution company, on whether your file is complete and on how busy the office is. We do not promise a number of weeks. Ask for the application date in writing, keep your reference number, and ask the outlet to tell you where the file is stuck if it stalls. A missing document restarts the clock."],
        ["What is the net metering export tariff in Pakistan?", "Under the 2026 net billing rules, exports are credited at a rate tied to NEPRA's national average energy purchase price, reported at about Rs 10.00 to 11.30 per kWh, against legacy levels of Rs 22 to 27 (S.R.O. 251(I)/2026, 9 February 2026; the rate is reviewed, so check nepra.org.pk for the current figure). That is far below the retail rate you pay for imports, which is why self-use matters."],
        ["Which DISCOs support net metering?", "Every distribution company under NEPRA's regulations handles prosumer applications, including LESCO in Lahore, IESCO in Islamabad and FESCO in Faisalabad. The company that handles yours is the one named on your electricity bill. Look at the top of the bill, or ask the outlet, before you plan the timing."],
        ["Can I get net metering for a commercial solar system?", "Yes. Commercial and industrial connections can apply under the same regulations. The same limits apply: no more than the sanctioned load, up to 1 MW, and a load flow study for systems of 250 kW and above (S.R.O. 251(I)/2026). Commercial sites usually run more load in the daytime, which suits solar well."],
        ["What is a bi-directional meter and why do I need one?", "A bi-directional meter records the power you import from the grid and the power you export, separately. Under net billing the two are priced differently, so the meter must keep them apart. The distribution company supplies and installs it, and charges a fee for the meter and testing. SolarLink coordinates the visit."],
        ["What warranty does SolarLink provide on installations?", "Installation carries two kinds of cover: the manufacturers' warranties on the equipment, and the installer's own warranty on workmanship. We do not state terms on this page. Ask the outlet for the workmanship terms in writing before you sign: what it covers, for how long, what voids it and who you call."],
        ["What is the solar panel performance warranty?", "A panel performance warranty promises that output will not fall below a stated percentage of the rated power by a stated year. The percentage and the years differ by manufacturer and by model, and are printed on the datasheet. Ask who handles claims in Pakistan and who ships a replacement panel."],
        ["What is the inverter warranty period?", "The period depends on the brand and the model, and some brands sell extensions. Read the warranty document for the exact model, and ask whether the inverter is repaired locally or sent abroad, how long that takes and whether you get a loan unit. The inverter is the part most likely to need service."],
        ["How do I make a warranty claim for my solar system?", "Start with the shop that installed the system and have your invoice, the model and serial numbers, and a photo of the fault code or the display. For equipment under the manufacturer's warranty, the claim goes through the supplier's service channel. Keep a record of dates and names, and ask for written confirmation of what was agreed."],
        ["What after-sales support does SolarLink provide?", "After-sales support runs through the outlet that served you in Lahore, Islamabad or Sargodha. Typical needs are inverter faults, a drop in output, cleaning advice and questions about your net metering bill. Ask the outlet what support covers and what is charged, and get it in writing with the quotation."],
        ["How do I monitor my solar system's performance?", "Most inverters come with a phone app or a web portal showing what the panels make, what the house uses and what goes to the grid. Growatt's app, for example, is called ShinePhone. The outlet should set up your account at handover. Compare the yearly total against your expected yield and look for sudden drops."],
        ["What maintenance does a solar system need?", "Clean the panels when they are dusty, early in the morning or in the evening, not when the glass is hot. Look at the inverter display or app each month and check for new shade. Have the connections and mounting inspected from time to time. For larger systems, ask about an annual inspection."],
        ["How much does a 10kW solar system cost in Pakistan?", "We do not publish prices. Ask for a written quotation that lists every item, and compare it with at least one other. The size, the brand of panels and inverter, a battery and the mounting structure drive most of the difference. See the 10 kW system page for what goes into a system of that size."],
        ["What is net metering in Pakistan?", "It is the arrangement under which a grid-connected solar owner exchanges power with the distribution company through a two-way meter. Since 9 February 2026 new connections follow net billing under the NEPRA (Prosumer) Regulations, 2026: imports are billed at the tariff, exports are credited at a lower rate, and the credit is deducted from the bill."],
        ["Which solar panel is best in Pakistan?", "No single panel is best for everyone. Compare rating, efficiency, temperature coefficient (how much output falls as the panel heats), degradation allowance, the warranty and who honours it locally. Hot roofs make the temperature coefficient matter: a panel that loses less per degree above 25 degrees Celsius gives more in a Pakistani summer."],
        ["How many units does a 10kW solar system produce per day?", "From the Global Solar Atlas yearly yields, about 40 kWh a day in Lahore, 43 in Islamabad and 41 in Sargodha, as a yearly average. That is roughly 1,220 to 1,300 units a month on average, with more in April and May and less in December and January. Real output depends on shade, tilt, dust and the inverter."],
        ["Is solar energy profitable in Pakistan?", "It can be, and it depends on three things you can check: what the system costs, how many units you use during the day, and the rate you would otherwise pay. Since February 2026, exports earn far less than imports cost, so a system sized to your own daytime use is worth more per rupee than one sized to export."],
        ["What is the life of solar panels in Pakistan?", "Panels last decades and lose a little output each year. Heat, dust and bad mounting shorten that. The datasheet states the guaranteed output over time; clean the panels, keep an eye on shade and wiring, and the panels will outlast the inverter and battery, which usually need replacing first."],
        ["How to apply for net metering in Pakistan?", "Design a system within your sanctioned load, submit the application and documents to your distribution company, pass its technical scrutiny and pay the demand notice, have the system inspected, sign the agreement and get the bi-directional meter fitted. SolarLink prepares the application and handles the follow-up. Details and fees are in the net metering guide."],
        ["Which inverter is best for home use in Pakistan?", "It depends on the system type, the load and what the local service looks like. For homes with frequent cuts, a hybrid inverter with a compatible battery. For homes with few cuts, an on-grid inverter. Ask where the service centre is, how long a repair takes and whether spare parts are held in Pakistan."],
        ["Is Growatt a good inverter for Pakistan?", "Growatt is a well-known inverter brand sold in Pakistan, and many installers fit it. We do not claim dealer status for any brand on this page. Judge any Growatt model, like any other, by its datasheet, its protection features, its local service and the warranty terms you are given in writing."],
        ["What are the WAPDA net metering requirements?", "Distribution is now handled by the companies (LESCO, IESCO, FESCO and others), under NEPRA's rules. The requirements: a system no larger than your sanctioned load, within the 1 MW cap and the 80% transformer limit; a design and documents submitted to the company; a technical review, demand notice and inspection; an agreement; and a bi-directional meter."],
        ["What is a Hybrid Solar System?", "A hybrid system has panels, a hybrid inverter, a battery and a grid connection. It runs the house from solar, stores surplus in the battery, exports what is left and switches to the battery when the grid fails. It gives you backup power and lower bills in one system, at a higher price than on-grid."],
        ["What does kW or kWp mean?", "kW is a rate of power. kWp is the same, measured at the panel's peak rating under standard test conditions (1,000 watts per square metre of sunlight at a cell temperature of 25 degrees Celsius). A 10 kWp array is rated 10 kW under those conditions. kWh is energy: a 10 kWp array in Lahore makes about 40 kWh on an average day."],
      ]),
      { type: "links", heading: "Read next", items: [
        { label: "How solar works", text: "The plain explanation of panels, inverters, batteries and the meter.", href: "/how-solar-works/" },
        { label: "Net metering guide", text: "The 2026 rules, the application steps and a worked bill.", href: "/net-metering-guide/" },
        { label: "Solar calculator", text: "A rough system size from your bill.", href: "/solar-calculator/" },
        { label: "Warranty and support", text: "How to read a warranty and what to ask for.", href: "/warranty-and-support/" },
      ] },
      { type: "prose", heading: "Sources", paragraphs: [
        "Solar data: Global Solar Atlas 2.0 (World Bank Group, ESMAP, Solargis), long-term averages for a fixed system at optimal tilt, accessed 23 November 2026. Net billing: NEPRA (Prosumer) Regulations, 2026, S.R.O. 251(I)/2026, notified 9 February 2026; S.R.O. 547(I)/2026, 2 April 2026; S.R.O. 1330(I)/2026, 6 August 2026. Tariffs: NEPRA decision of 11 February 2026 (TRF-100/2935-57) and S.R.O. 279(I)/2026, 12 February 2026. Figures are dated and are reviewed by the regulator; check nepra.org.pk for the current version.",
      ] },
    ],
    related: [{ label: "How solar works", href: "/how-solar-works/" }, { label: "Net metering guide", href: "/net-metering-guide/" }, { label: "Get a quote", href: "/get-quote/" }, { label: "Contact us", href: "/contact-us/" }],
  }),
  mk({
    path: "/solar-financing/", kind: "service",
    title: "Solar System on Installments | SolarLink",
    description: "Thinking about paying for solar over time? How to judge any payment plan, what to ask and how to check the real cost. Ask a SolarLink outlet for options.",
    h1: "Paying for solar",
    lead: "Many customers ask whether a solar system can be paid for over time. This page explains how to think about it, and what to ask before you sign anything.",
    blocks: [
      { type: "prose", heading: "Where SolarLink stands", paragraphs: [
        "We have not confirmed which payment options are available, in which cities, or on what terms, so this page describes no plan and quotes no rate. If paying over time matters to your decision, ask your nearest outlet what it can offer today and ask for the terms in writing.",
        "What we can do is help you judge any offer, ours or anyone else's. Solar is a purchase you can price against what you pay for power now, which makes a payment plan easier to test than most.",
      ] },
      { type: "steps", heading: "How to judge any payment plan", items: [
        { title: "Start from the cash price", text: "Ask for the full price of the system, in writing, as if you were paying in one go. Every plan should be compared with that number, not with a monthly figure." },
        { title: "Add up what you will pay", text: "Multiply the monthly amount by the number of months and add any upfront payment, processing fee, insurance and charge for early settlement. The gap between that total and the cash price is the cost of the plan." },
        { title: "Set it against your bill", text: "Take your recent bills and compare the monthly payment with what the system should save. If the payment is larger than the saving, you are covering the difference yourself for the length of the plan." },
        { title: "Check who you owe", text: "Is the plan run by the outlet, a bank or a third party? Who holds the paperwork, and what happens if the equipment fails or the company closes?" },
        { title: "Read what happens if you pay late or early", text: "Ask about penalties, whether the rate is fixed, and whether you can settle early without a charge." },
      ] },
      { type: "prose", heading: "Questions to ask the outlet", paragraphs: [
        "Is the price the same for a cash buyer and for someone paying over time? What is the total I will pay, and over how many months? Is there a fee to set the plan up? Is the plan available in my city? What do I need to show: a bill, a salary slip, a bank statement, a guarantor? Who owns the equipment until I finish paying?",
        "If the answers come back vague, or the price changes with the payment method in a way nobody will explain, that tells you something. Compare it against a second quotation before you commit.",
      ] },
      { type: "prose", heading: "Other ways to spread the cost", paragraphs: [
        "A smaller first system can be sized to your daytime use and expanded later, but note that under the 2026 net billing rules a connected system cannot exceed your sanctioned load, and a material change to an existing connection can affect the terms you signed (see the net metering guide). Plan the final size before you build the first stage.",
        "Some customers use bank personal loans, workplace advances or savings groups. Whatever you use, apply the same test: the total you pay compared with the cash price, and the monthly payment compared with the saving on your bill. Do not borrow against a saving you have not checked.",
      ] },
      { type: "prose", heading: "A worked comparison, with made-up numbers", paragraphs: [
        "Suppose a system has a cash price of Rs 1,000,000, and an outlet offers it over 24 months at Rs 46,000 a month with no upfront payment. The plan costs Rs 1,104,000 in total, so you pay Rs 104,000 more than the cash price, about 10 percent. Whether that is worth it depends on what the system saves each month while you are paying. If it saves Rs 40,000 a month, you are Rs 6,000 a month short during the plan and ahead afterwards.",
        "These numbers are invented to show the method. They are not an offer and they are not a SolarLink price. Put your own quotation into the same sum.",
      ] },
      { type: "prose", heading: "Watch the saving, not just the payment", paragraphs: [
        "Savings from a system change with the seasons. Output is lower in winter, and the Global Solar Atlas shows Lahore's December and January irradiation at about half of April's and May's. A bill that falls sharply in May may fall much less in January. Look at the yearly figure, not the best month, when you test whether a payment plan pays for itself.",
        "Remember, too, that a connected system cannot exceed your sanctioned load, and that exports earn a lower rate than imports cost. A plan built on the idea that the meter will run backwards and wipe out the bill ignores the 2026 net billing rules.",
      ] },
      { type: "prose", heading: "What affects the saving", paragraphs: [
        "The saving is not a fixed number. It depends on your tariff slab (NEPRA's decision of 11 February 2026 sets domestic base rates from Rs 22.44 to Rs 47.20 per kWh for unprotected consumers, before taxes and adjustments), on how much of your use falls in daylight, and on the export rate for what you send to the grid. Treat any promise of a fixed bill reduction with caution, from anyone.",
      ] },
    ],
    related: [{ label: "Get a quote", href: "/get-quote/" }, { label: "Solar calculator", href: "/solar-calculator/" }, { label: "Net metering guide", href: "/net-metering-guide/" }, { label: "Contact us", href: "/contact-us/" }, { label: "FAQs", href: "/faqs/" }],
  }),
  mk({
    path: "/warranty-and-support/", kind: "company",
    title: "Solar System Warranty Pakistan | SolarLink Support",
    description: "How solar warranties work: manufacturer versus workmanship cover, what to read in each, and how to make a claim. Ask a SolarLink outlet for your written terms.",
    h1: "Warranty and support",
    lead: "A solar system carries several warranties, from different companies, and good support after the install matters as much as the paper. Here is how to read them.",
    blocks: [
      { type: "prose", heading: "What this page covers", paragraphs: [
        "SolarLink has not published warranty terms online. This page states no warranty period or support promise. Ask your outlet for the terms that apply to your system in writing, and keep them with your invoice. What follows will help you read what you are given.",
        "A solar system is not one product with one warranty. It is panels, an inverter, often a battery, a mounting structure, cable and protection, plus the work of putting them together. Each part has its own cover, and the installer's work has another.",
      ] },
      { type: "facts", heading: "Who covers what", items: [
        { label: "Panels", value: "Two warranties on the datasheet: one for defects in materials and build, and one for output (the percentage of rated power the panel should still give by a stated year). Both come from the manufacturer." },
        { label: "Inverter", value: "A product warranty from the manufacturer, sometimes extendable for a fee. It is the part most likely to need service, so read the terms closely." },
        { label: "Battery", value: "Usually stated in years and in cycles or energy throughput, with a minimum capacity at the end. Both limits apply, so whichever comes first ends it." },
        { label: "Mounting structure", value: "The maker or fabricator's cover, often covering corrosion and structural defects. Ask what it assumes about wind and about the roof." },
        { label: "Workmanship", value: "The installer's own cover for the quality of the work: fixing, wiring, earthing, commissioning. This is the one the installer writes, so ask for it on paper." },
      ] },
      { type: "steps", heading: "What to read in any warranty", items: [
        { title: "What is covered, and what is not", text: "Look for exclusions: dust damage, voltage surges, lightning, flooding, use outside the rated limits, and work by someone else." },
        { title: "How long, and counted from when", text: "The start date should be the commissioning date or the invoice date. Check which, and check it is written." },
        { title: "Who handles a claim", text: "The manufacturer, a local distributor, or the installer? Get the name and the phone number, and ask where a faulty unit is sent." },
        { title: "Repair or replace", text: "Does the company repair, replace or refund? Is a loan unit given while yours is away, and who pays the freight and the labour to remove and refit?" },
        { title: "What voids it", text: "Ask whether moving the system, adding panels or changing the inverter voids the cover, and whether servicing needs an approved technician." },
      ] },
      { type: "prose", heading: "Support after the install", paragraphs: [
        "Support is the part no datasheet shows. It is what happens when the inverter shows a fault at eight in the evening, or the output drops and nobody knows why. Ask who you call, what hours they answer, whether they visit or advise by phone first, and whether visits cost anything.",
        "Keep a folder with the invoice, the quotation, the datasheets of each part, the serial numbers, the commissioning report, the net metering agreement and the warranty documents. Take photos of the installed system and of the inverter's label. When a claim comes, the folder saves days.",
        "Look after the system too. Warranty claims are easier when you can show the system was cleaned, inspected and not altered. Note the dates in the folder.",
      ] },
      { type: "prose", heading: "Warranty traps to watch for", paragraphs: [
        "A warranty that depends on the buyer having the system serviced by the seller, at the seller's price, is worth less than it looks. So is one that starts counting when the equipment shipped, not when it was installed. So is one that names a manufacturer abroad and gives you no local contact.",
        "Check the exclusions against Pakistani conditions. Grid voltage swings, dust, heat and monsoon storms are normal here. A warranty that excludes damage from voltage fluctuation, with no surge protection fitted, leaves the most likely cause of failure uncovered. Ask what protection the system has and whether the inverter's own protection is within its warranty terms.",
      ] },
      { type: "prose", heading: "If you have a problem now", paragraphs: [
        "Write down what you see: the inverter display, the fault code, the time, and whether the grid was on. Photograph it. Then call the outlet that served you, say when the system went in and send the photos. A clear fault report saves a visit.",
        "If the system is switched off and you smell burning, see damaged cable or water in an enclosure, switch the breakers off and keep clear until a technician has looked at it.",
      ] },
      { type: "links", heading: "Need help now", items: [
        { label: "Contact a shop", text: "Phone, message or visit the outlet nearest you.", href: "/contact-us/" },
        { label: "All outlets", text: "Find the shop that served your area.", href: "/outlets/" },
        { label: "Questions about solar", text: "Short answers about running and looking after a system.", href: "/faqs/" },
        { label: "Products", text: "Panels, inverters and batteries, and the details to compare.", href: "/products/" },
      ] },
    ],
    related: [{ label: "Contact us", href: "/contact-us/" }, { label: "Products", href: "/products/" }, { label: "FAQs", href: "/faqs/" }, { label: "How solar works", href: "/how-solar-works/" }],
  }),
];
