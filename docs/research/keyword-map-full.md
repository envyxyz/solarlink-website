# Keyword map

This file gives each of the 75 routes in `src/routes.ts` one primary query, a draft title, supporting phrases and the questions the page must answer. The route list is the source of truth; this file adds nothing to it and changes nothing in it.
One primary query per URL: no two pages target the same query, and each secondary phrase has one owning page (see the cannibalisation watch). Other pages may link to it, not compete for it.
Titles are drafts until Search Console data confirms each page's ranking phrase. When it does, that phrase moves to the front of the title word for word. Until then the phrases in the live titles are kept (`docs/SEO-MIGRATION.md`, rule 4).
A draft title can differ in wording from `primary` where a live title phrase is kept (for example `/net-metering-guide/` keeps the live "Net Metering Guide Pakistan", while `primary` is "net metering in pakistan"). That is deliberate; the primary phrase still goes in the h1 and the first paragraph.
Secondary phrases and questions are real Google autocomplete rows (`docs/research/agy/2-keywords-en.json`, `3-keywords-ur.json`) or People Also Ask lines from the SERP notes, which an AI assistant compiled and nobody has verified. There are no search volumes and no rankings in this file.

## Title and description patterns

Title pattern: primary phrase first, then a differentiator, then `| SolarLink`. Length 50 to 60 characters. Description: 120 to 160 characters, ending in the next step (WhatsApp or the calculator). No prices, no "best", no counts, no warranty or time promises, no year-stamped promises. A page that targets a price query uses "price" as the topic only.

- **home**: title `Solar Company in Pakistan: {audience}` + brand. Example: "Solar Company in Pakistan: Home and Business | SolarLink" (56 characters). Description example: "Solar installation for homes, shops and farms across Pakistan. See our services and system sizes, then message us on WhatsApp for a quote." (138 characters).
- **hub**: title `{Section topic} in Pakistan: {what is inside}` + brand. Example: "Solar Services in Pakistan: Home to Industrial | SolarLink" (58 characters). Description example: "Residential, commercial, industrial and agricultural solar services, plus net metering support. Pick a service, then message us on WhatsApp." (140 characters).
- **service**: title `{Live service phrase, kept}` + brand. Example: "Residential Solar Systems for Homes in Pakistan | SolarLink" (59 characters). Description example: "How we plan and install solar for homes: site visit, system sizing, installation and net metering paperwork. Message us on WhatsApp to start." (141 characters).
- **system type**: title `{System type}: How It Works in Pakistan` + brand. Example: "On Grid Solar System: How It Works in Pakistan | SolarLink" (58 characters). Description example: "What an on grid solar system is, how it works with the grid and net metering, and who it suits in Pakistan. Use the calculator to size yours." (141 characters).
- **system size**: title `{N}kW Solar System Price in Pakistan: Cost Guide` + brand. Example: "5kW Solar System Price in Pakistan: Cost Guide | SolarLink" (58 characters). Description example: "What decides the price of a 5kW solar system in Pakistan: panels, inverter, battery, structure and installation. Send your bill on WhatsApp for a quote." (152 characters).
- **product**: title `{Product or brand} Price in Pakistan: {Models | Price and Types}` + brand. Example: "Longi Solar Panel Price in Pakistan: Models | SolarLink" (55 characters). Description example: "Longi solar panel models, wattage and the factors that set their price in Pakistan. Message us on WhatsApp to ask what is in stock." (131 characters).
- **outlet**: title `Solar Installation in {City}: Local Outlet` + brand. Example: "Solar Installation in Lahore: Local Outlet | SolarLink" (54 characters). Description example: "Solar installation in Lahore from the SolarLink outlet: site visits, system sizing and net metering support. Message the Lahore team on WhatsApp." (145 characters).
- **project**: title `{Area}, {City}: {N}kW {On-Grid|Hybrid} Solar` + brand. Example: "Bahria Town Phase 2, Lahore: 10kW On-Grid Solar | SolarLink" (59 characters). Description example: "A 10kW on-grid solar system in Bahria Town Phase 2, Lahore: the equipment and the roof layout. Message us on WhatsApp to plan a system for your home." (149 characters).
- **guide**: title `{Topic phrase}: {angle}` + brand. Example: "How Solar Panels Work in Pakistan: Simple Guide | SolarLink" (59 characters). Description example: "How solar panels turn sunlight into power for a home in Pakistan, in plain steps. Then use the solar calculator to size a system for your bill." (143 characters).
- **article**: title `{Topic phrase}: {angle}` + brand. Example: "On-Grid vs Hybrid vs Off-Grid Solar: Which Fits | SolarLink" (59 characters). Description example: "How on-grid, hybrid and off-grid solar systems differ and which one fits your home in Pakistan. Use the solar calculator to size your system." (141 characters).
- **tool**: title `{Tool name}: {what you enter or get}` + brand. Example: "Solar Battery Backup Calculator: Size Your Bank | SolarLink" (59 characters). Description example: "Enter the appliances you want to keep running and see the battery size you need. Then send the result to SolarLink on WhatsApp for a quote." (139 characters).
- **company and legal pages** (about, contact, quote, FAQs, financing, warranty, terms, privacy, sitemap): title is the page name, then the topic, then brand, and may be shorter than 50 characters where the page name is short. Description example: "Contact SolarLink in Lahore, Islamabad, Rawalpindi or Sargodha. Message us on WhatsApp to ask about a solar system for your home or business." (141 characters).

## The map

Columns: path, primary query (from `src/routes.ts`), draft title, secondary phrases (real autocomplete rows), Roman Urdu or Urdu phrases for FAQs and headings (from `3-keywords-ur.json`, only where one fits), search intent (the label used in the autocomplete data) and stage. Secondary phrases are separated by semicolons. "None in data" means the autocomplete data has no row that fits the page.

### Home and company

| Path | Primary query | Draft title | Secondary phrases | Roman Urdu phrases | Intent | Stage |
|---|---|---|---|---|---|---|
| `/` | solar company in pakistan | Solar Company in Pakistan: Home and Business \| SolarLink | solar energy company in pakistan; solar system companies in pakistan; solar installation in pakistan | solar lagwane ka kharcha kitna aata hai | commercial | launch |
| `/about-us/` | solarlink pakistan | About Solarlink: Solar Installer in Pakistan \| SolarLink | none in data | - | navigational | launch |
| `/contact-us/` | solarlink contact number | Contact Solarlink: Lahore, Islamabad, Rawalpindi \| SolarLink | none in data | - | navigational | launch |
| `/get-quote/` | solar quotation | Get a Solar Quote: Send Your Bill on WhatsApp \| SolarLink | solar installation cost; solar system cost calculator in pakistan; cost of solar system for home | solar system lagwane ka kharcha | transactional | launch |
| `/faqs/` | solar system faqs pakistan | Frequently Asked Questions: Solar in Pakistan \| SolarLink | can solar system work without battery; what solar system do i need for my house; how solar system works at home | net metering kya hai; 5 kw ka solar system kitne unit banata hai | informational | launch |
| `/solar-financing/` | solar system on installments | Solar System on Installments in Pakistan \| SolarLink | solar financing in pakistan; solar on installments in pakistan; solar loan in pakistan; solar financing banks in pakistan | سولر سسٹم قسطوں پر; solar panel price lahore installment plan | commercial | launch |
| `/warranty-and-support/` | solar system warranty pakistan | Solar System Warranty and Support in Pakistan \| SolarLink | none in data | - | informational | next |

### Services

| Path | Primary query | Draft title | Secondary phrases | Roman Urdu phrases | Intent | Stage |
|---|---|---|---|---|---|---|
| `/services/` | solar services in pakistan | Solar Services in Pakistan: Home to Industrial \| SolarLink | solar installation services; solar installation in pakistan; solar installation company | - | commercial | launch |
| `/services/residential-solar/` | solar system for home | Residential Solar Systems for Homes in Pakistan \| SolarLink | solar system for home in pakistan; home solar system price in pakistan; on grid solar system for home; complete solar system for home price in pakistan | ghar par solar lagwane ka kharcha | commercial | launch |
| `/services/commercial-solar/` | commercial solar system | Commercial Solar Installation for Businesses \| SolarLink | commercial solar installation; commercial solar power plant; commercial solar panel companies; commercial solar in pakistan price | - | commercial | launch |
| `/services/industrial-solar/` | industrial solar system | Industrial & Large-Scale Solar Solutions \| SolarLink | industrial solar solutions in pakistan; industrial solar system in pakistan; industrial solar plant; industrial solar system price in pakistan | - | commercial | launch |
| `/services/agricultural-solar/` | solar tube well | Agricultural Solar & Tubewell Solutions \| SolarLink | solar tube well price in pakistan; solar tube well pump price in pakistan; solar tube well on installment; solar tube well | solar tubewell kaise lagaye; solar panel se tubewell kaise chalaye | commercial | launch |
| `/services/net-metering-support/` | net metering application | Net Metering Pakistan: Application Support \| SolarLink | net metering process in pakistan; net metering services in lahore; net metering cost in lahore; net metering cost | net meter lagane ka tarika | transactional | launch |

### Solar systems

| Path | Primary query | Draft title | Secondary phrases | Roman Urdu phrases | Intent | Stage |
|---|---|---|---|---|---|---|
| `/solar-systems/` | solar system price in pakistan | Solar System Price in Pakistan: What Decides It \| SolarLink | solar system price; solar system in pakistan price; solar system price in pakistan today; solar system in pakistan | solar system kitne ka hai; سولر سسٹم کی قیمت | commercial | launch |
| `/solar-systems/on-grid/` | on grid solar system | On Grid Solar System: How It Works in Pakistan \| SolarLink | on grid solar system price in pakistan; on grid solar system in pakistan; on grid solar system without net metering; on grid solar system means | - | informational | launch |
| `/solar-systems/hybrid/` | hybrid solar system | Hybrid Solar System: Backup and Grid Together \| SolarLink | hybrid solar system price in pakistan; hybrid solar system in pakistan; hybrid solar system means; what is hybrid solar system | hybrid solar system kitne ka hai | commercial | launch |
| `/solar-systems/off-grid/` | off grid solar system | Off Grid Solar System in Pakistan: Who It Suits \| SolarLink | off grid solar system in pakistan; off grid solar system price in pakistan; off grid solar system without battery; off grid solar system means | - | commercial | launch |
| `/solar-systems/3kw/` | 3kw solar system price in pakistan | 3kW Solar System Price in Pakistan: Cost Guide \| SolarLink | 3kw solar system with battery price in pakistan; 3kw solar system without battery price in pakistan; 3kw solar system on installment in pakistan; 3kw solar system load capacity | 3kw solar lagwane ka kharcha | commercial | launch |
| `/solar-systems/5kw/` | 5kw solar system price in pakistan | 5kW Solar System Price in Pakistan: Cost Guide \| SolarLink | 5kw solar system load capacity in pakistan; 5kw solar system with battery price in pakistan; 5kw solar system price in pakistan without battery; 5kw solar system price in pakistan installment plan | 5 kw solar system kitne ka hai; 5 kw ka solar system kitne unit banata hai | commercial | launch |
| `/solar-systems/10kw/` | 10kw solar system price in pakistan | 10kW Solar System Price in Pakistan: Cost Guide \| SolarLink | 10kw solar system price in pakistan without battery; 10kw solar system with battery price; 10kw solar system load capacity; 10kw solar system unit production | - | commercial | launch |
| `/solar-systems/15kw/` | 15kw solar system price in pakistan | 15kW Solar System Price in Pakistan: Cost Guide \| SolarLink | 15kw solar system with battery price; 15kw solar system load capacity; 15kw solar system how many panels; 15kw solar system with battery backup cost | - | commercial | launch |
| `/solar-systems/20kw/` | 20kw solar system price in pakistan | 20kW Solar System Price in Pakistan: Cost Guide \| SolarLink | 20kw solar system load capacity; 20kw solar system with battery storage; 20kw solar system how many panels; 20kw solar system cost | - | commercial | launch |

### Products

| Path | Primary query | Draft title | Secondary phrases | Roman Urdu phrases | Intent | Stage |
|---|---|---|---|---|---|---|
| `/products/` | solar products in pakistan | Solar Products in Pakistan: Panels to Batteries \| SolarLink | solar panel kit price in pakistan; solar inverters in pakistan; solar battery in pakistan | - | commercial | launch |
| `/products/solar-panels/` | solar panel price in pakistan | Solar Panels in Pakistan: Price and Types \| SolarLink | solar panel price in pakistan today; solar panel price in pakistan per watt; solar panel 585 watt price in pakistan; solar panel 550 watt price in pakistan today | solar plate price in pakistan; solar plate kitne ki hai | commercial | launch |
| `/products/inverters/` | solar inverter price in pakistan | Growatt & Fronus Inverters: Price in Pakistan \| SolarLink | solar inverter 5kw price in pakistan; solar inverter 10kw price in pakistan; solar inverter 6kw price in pakistan; solar inverter in pakistan price | - | commercial | launch |
| `/products/batteries/` | solar battery price in pakistan | Solar Batteries & Storage Solutions Pakistan \| SolarLink | solar battery price in pakistan lithium; solar battery lithium price in pakistan; solar battery price list; solar battery rate in pakistan | solar battery ka price; 12 volt solar battery price | commercial | launch |
| `/products/accessories/` | solar mounting structure | Solar Accessories & Mounting Structures \| SolarLink | solar plate stand price in pakistan | solar plate stand price in pakistan | commercial | launch |
| `/products/inverters/growatt/` | growatt inverter price in pakistan | Growatt Inverter Price in Pakistan: Models \| SolarLink | growatt 10kw inverter price in pakistan; growatt 6kw hybrid inverter price in pakistan; growatt 20kw hybrid inverter price in pakistan; growatt price in pakistan | - | commercial | next |
| `/products/inverters/fronus/` | fronus inverter price in pakistan | Fronus Inverter Price in Pakistan: Models \| SolarLink | fronus inverter 6kw price in pakistan; fronus inverter 10kw price in pakistan; fronus pv 9000 price in pakistan; fronus price in pakistan | - | commercial | next |
| `/products/solar-panels/longi/` | longi solar panel price in pakistan | Longi Solar Panel Price in Pakistan: Models \| SolarLink | longi 585 watt price in pakistan; longi price in pakistan; longi himo x10 price in pakistan; longi 645 watt price in pakistan | - | commercial | next |
| `/products/solar-panels/canadian-solar/` | canadian solar panel price in pakistan | Canadian Solar Panel Price in Pakistan: Models \| SolarLink | canadian solar 585w price in pakistan; canadian solar 620w price in pakistan; canadian solar price in pakistan today; canadian solar panels in pakistan | - | commercial | next |

### Outlets

| Path | Primary query | Draft title | Secondary phrases | Roman Urdu phrases | Intent | Stage |
|---|---|---|---|---|---|---|
| `/outlets/` | solarlink outlets | SolarLink Outlets: Solar Installers by City \| SolarLink | solar company near me; solar installation near me | - | local | launch |
| `/outlets/lahore/` | solar company in lahore | Solar Installation in Lahore: Local Outlet \| SolarLink | solar company lahore; solar installation lahore; solar system installation lahore; solar energy company lahore | solar plate price lahore today | local | launch |
| `/outlets/islamabad/` | solar company in islamabad | Solar Installation in Islamabad: Local Outlet \| SolarLink | solar company islamabad; solar installation islamabad; solar system installation islamabad; solar system companies in islamabad | solar plate price in islamabad | local | launch |
| `/outlets/rawalpindi/` | solar company in rawalpindi | Solar Installation in Rawalpindi: Local Outlet \| SolarLink | solar company rawalpindi; solar installation rawalpindi; solar system installation rawalpindi; solar system rawalpindi islamabad | - | local | launch |
| `/outlets/sargodha/` | solar company in sargodha | Solar Installation in Sargodha: Local Outlet \| SolarLink | solar company sargodha; solar installation sargodha; solar system sargodha; solar installation sargodha contact number | - | local | launch |
| `/outlets/multan/` | solar company in multan | SolarLink Multan: Solar Company in Multan \| SolarLink | solar company multan; solar installation multan; solar system multan; solar installation companies in multan | - | local | launch |
| `/outlets/gilgit/` | solar system in gilgit | SolarLink Gilgit: Off-Grid and Hybrid Solar \| SolarLink | solar system gilgit; solar installation gilgit baltistan; solar company gilgit baltistan; solar companies in gilgit | - | local | launch |

### Projects

| Path | Primary query | Draft title | Secondary phrases | Roman Urdu phrases | Intent | Stage |
|---|---|---|---|---|---|---|
| `/projects/` | solar installation projects pakistan | Solar Installation Projects in Pakistan \| SolarLink | solar installation in pakistan; solar installation company | - | informational | launch |
| `/projects/bahria-town-phase-2-lahore-10kw/` | solar installation bahria town phase 2 lahore 10kw | Bahria Town Phase 2, Lahore: 10kW On-Grid Solar \| SolarLink | net metering bahria town lahore; 10kw solar system price in lahore; solar system price in lahore | - | local | launch |
| `/projects/bahria-town-phase-6-islamabad-10kw/` | solar installation bahria town phase 6 islamabad 10kw | Bahria Town Phase 6, Islamabad: 10kW On-Grid Solar | 10kw solar system price in islamabad; solar system installation islamabad; 10kw solar system | - | local | launch |
| `/projects/company-bagh-sargodha-10kw-farm/` | solar installation company bagh sargodha 10kw farm | Near Company Bagh, Sargodha: 10kW On-Grid Solar \| SolarLink | 10kw solar system sargodha pakistan; 10kw solar system sargodha price; solar installation sargodha | - | local | launch |
| `/projects/company-bagh-sargodha-4-5kw/` | solar installation company bagh sargodha 4 5kw | Near Company Bagh, Sargodha: 4.5kW On-Grid Solar \| SolarLink | solar installation sargodha pakistan; solar system sargodha; solar system price sargodha pakistan | - | local | launch |
| `/projects/dha-phase-5-lahore-15kw/` | solar installation dha phase 5 lahore 15kw | DHA Phase 5, Lahore: 15kW On-Grid Solar \| SolarLink | solar installation lahore dha; 15kw solar system lahore pakistan; 15kw solar system lahore price | - | local | launch |
| `/projects/gulberg-iii-lahore-20kw-commercial/` | solar installation gulberg iii lahore 20kw commercial | Gulberg III, Lahore: 20kW On-Grid Solar \| SolarLink | 20kw solar system lahore pakistan; 20kw solar system lahore today; commercial solar lahore pakistan | - | local | launch |
| `/projects/johar-town-lahore-4-5kw/` | solar installation johar town lahore 4 5kw | Johar Town, Lahore: 4.5kW On-Grid Solar \| SolarLink | solar system price in lahore; solar system installation lahore; which solar system price johar town | - | local | launch |
| `/projects/model-town-lahore-6kw/` | solar installation model town lahore 6kw | Model Town, Lahore: 6kW On-Grid Solar \| SolarLink | 6kw on grid solar system price in pakistan; solar system installation lahore; solar system lahore price | - | local | launch |
| `/projects/pwd-rawalpindi-12kw-hybrid/` | solar installation pwd rawalpindi 12kw hybrid | PWD Housing Scheme, Rawalpindi: 12kW Hybrid Solar | solar panel pwd islamabad; hybrid solar system in pakistan; solar system installation rawalpindi | - | local | launch |
| `/projects/sector-i14-islamabad-8kw-hybrid/` | solar installation sector i14 islamabad 8kw hybrid | Sector I-14/3, Islamabad: 8kW Hybrid Solar \| SolarLink | 8kw hybrid solar system price in pakistan; solar system installation islamabad; hybrid solar system in pakistan | - | local | launch |

### Guides

| Path | Primary query | Draft title | Secondary phrases | Roman Urdu phrases | Intent | Stage |
|---|---|---|---|---|---|---|
| `/resources/` | solar guides pakistan | Solar Resources: Guides, FAQs and Net Metering \| SolarLink | solar power in pakistan; solar energy in pakistan; solar power installation step by step | - | informational | launch |
| `/net-metering-guide/` | net metering in pakistan | Net Metering Guide Pakistan: Step by Step \| SolarLink | net metering rules in pakistan; net metering policy in pakistan; net metering and net billing in pakistan; net metering vs net billing | net metering kya hai; net metering rules | informational | launch |
| `/how-solar-works/` | how solar panels work | How Solar Panels Work in Pakistan: Simple Guide \| SolarLink | how solar panels work for home; how solar system works at home; how solar panels generate electricity; how solar panels work step by step | - | informational | launch |

### Blog

| Path | Primary query | Draft title | Secondary phrases | Roman Urdu phrases | Intent | Stage |
|---|---|---|---|---|---|---|
| `/blog/` | solar energy blog pakistan | Solar Energy Blog: Tips, News and Guides \| SolarLink | solar energy in pakistan; solar power in pakistan | - | informational | launch |
| `/blog/growatt-vs-fronus-inverter-comparison/` | growatt vs fronus inverter | Growatt vs Fronus Inverter: Which to Choose \| SolarLink | which solar inverter is best in pakistan; which solar inverter company is best in pakistan; solar inverter brands in pakistan | solar inverter konsa best hai | commercial | launch |
| `/blog/how-to-size-solar-system-pakistan/` | how to size a solar system | How to Size a Solar System in Pakistan: Rules \| SolarLink | what size solar system calculator; solar power calculation formula; how to calculate hybrid solar system; what solar system do i need | - | informational | launch |
| `/blog/net-metering-common-mistakes-pakistan/` | net metering application mistakes | Net Metering Mistakes That Delay Applications \| SolarLink | net metering license; does hybrid solar system need net metering; is net metering required | net metering agreement kya hai | informational | launch |
| `/blog/net-metering-lesco-application-guide/` | lesco net metering application | LESCO Net Metering Application: Documents, Steps \| SolarLink | net metering lahore; net metering cost in lahore; net metering bahria town lahore | - | local | launch |
| `/blog/net-metering-vs-battery-storage-pakistan/` | net metering vs battery storage | Net Metering vs Battery Storage: Which to Choose \| SolarLink | is net metering worth it; is solar battery worth it; is solar battery backup worth it | - | informational | launch |
| `/blog/on-grid-vs-hybrid-vs-off-grid-pakistan/` | on grid vs hybrid vs off grid solar | On-Grid vs Hybrid vs Off-Grid Solar: Which Fits \| SolarLink | on grid solar system vs off grid; hybrid solar system vs off-grid; which solar system is best for home on grid or hybrid; which solar system is best on grid or off grid | - | informational | launch |
| `/blog/solar-installation-red-flags-pakistan/` | how to choose a solar company in pakistan | Red Flags When Choosing a Solar Company \| SolarLink | are solar companies legit; which solar company is best in pakistan; which solar company is best for home | - | informational | launch |
| `/blog/solar-panel-brands-comparison-pakistan/` | best solar panel brands in pakistan | Solar Panel Brands in Pakistan: How to Compare \| SolarLink | which solar panel brand is best in pakistan; which solar panel is best jinko or longi; which solar panel is best jinko or canadian; which is better jinko or canadian solar | solar panel konsa acha hai; sabse acha solar panel konsa hai | commercial | launch |
| `/blog/solar-panel-cleaning-maintenance-pakistan/` | solar panel cleaning | Solar Panel Cleaning & Maintenance in Pakistan \| SolarLink | solar panel cleaning islamabad; how solar panel cleaning; can solar panels be washed in day time | - | informational | launch |
| `/blog/solar-roi-payback-period-pakistan/` | solar payback period pakistan | Solar ROI in Pakistan: Payback Period Explained \| SolarLink | is solar panels worth it; is solar installation worth it; is a 5kw solar system worth it; is solar for home worth it | - | informational | launch |

### Tools

| Path | Primary query | Draft title | Secondary phrases | Roman Urdu phrases | Intent | Stage |
|---|---|---|---|---|---|---|
| `/tools/` | solar tools pakistan | Solar Tools Pakistan: Calculators and Planners \| SolarLink | none in data | - | informational | launch |
| `/solar-calculator/` | solar calculator pakistan | Solar Savings & System Sizing Calculator \| SolarLink | solar calculator; solar calculator online; solar calculator for home; solar system cost calculator in pakistan | - | transactional | launch |
| `/tools/bill-breakdown/` | electricity bill calculator pakistan | Electricity Bill Calculator Pakistan: Slabs \| SolarLink | net metering bill calculator; how net metering bill is calculated in pakistan | bijli ka bill kam karne ka tarika pakistan | informational | launch |
| `/tools/load-calculator/` | solar load calculator | Solar Load Calculator: List Your Appliances \| SolarLink | solar calculator load; how do i calculate how much solar power i need | - | informational | launch |
| `/tools/net-billing-calculator/` | net billing calculator | Net Billing Calculator Pakistan: Export Credit \| SolarLink | net billing rate; net billing unit price; net billing vs net metering; net billing policy | - | informational | launch |
| `/tools/battery-backup-calculator/` | solar battery backup calculator | Solar Battery Backup Calculator: Size Your Bank \| SolarLink | cost of solar battery backup; what solar battery size do i need; solar panels battery size; what size solar battery for home | - | informational | launch |
| `/tools/roof-planner/` | how many solar panels fit on my roof | How Many Solar Panels Fit on My Roof: Planner \| SolarLink | how much space required for 3kw solar system; what size solar panel for home; solar panel size in pakistan | - | informational | next |
| `/tools/ac-on-solar/` | how many solar panels to run 1.5 ton ac | How Many Solar Panels to Run 1.5 Ton AC: Tool \| SolarLink | can 3kw solar system run 1.5 ton ac; can 3kw solar system run ac; can 3kw solar panel run ac; is 3kw solar panel enough for ac | - | informational | next |
| `/tools/tubewell-solar-calculator/` | solar tube well calculator | Solar Tube Well Calculator: Pump and Panels \| SolarLink | 7.5 hp solar tube well price in pakistan; 4 inch solar tube well price in pakistan | solar tubewell vfd price in pakistan | informational | next |

### Legal

| Path | Primary query | Draft title | Secondary phrases | Roman Urdu phrases | Intent | Stage |
|---|---|---|---|---|---|---|
| `/terms/` | solarlink terms | Terms of Use \| SolarLink | none in data | - | navigational | launch |
| `/privacy-policy/` | solarlink privacy policy | Privacy Policy \| SolarLink | none in data | - | navigational | launch |
| `/sitemap/` | solarlink sitemap | Sitemap \| SolarLink | none in data | - | navigational | launch |

### Title notes

- **Wording differs from `primary` on purpose** where a live phrase is kept: `/about-us/`, `/contact-us/`, `/faqs/`, `/net-metering-guide/`, `/solar-calculator/` (live title "Solar Savings & System Sizing Calculator"; "solar calculator pakistan" goes in the h1 and opening line), `/products/solar-panels/`, `/products/inverters/`, `/blog/solar-installation-red-flags-pakistan/`.
- **Live phrase not kept word for word because it carries a banned claim:** home ("Premier", "Tier-1"), `/get-quote/` ("Free"), `/products/solar-panels/` ("Tier-1"), `/products/inverters/` ("Best Price"), `/blog/solar-panel-brands-comparison-pakistan/` ("Tier-1" and the year), `/services/net-metering-support/` ("Save More"). Years and counts ("7", "10", "2026") are dropped from the blog titles for the same reason.
- **Shortened to fit 60 characters:** `/services/agricultural-solar/` drops "in Punjab" and `/projects/` swaps "Punjab & Islamabad" for "Pakistan"; the Bahria Town Phase 6 and PWD Rawalpindi project titles drop `| SolarLink` because the live phrase already fills the limit; the long blog titles keep their opening phrase only.
- **Punctuation:** the live en dashes and em dashes become colons.
- **`/products/inverters/` keeps "Growatt & Fronus"** from the live title. Use it only if the client confirms the stock list. Fallback: "Solar Inverters in Pakistan: Price and Types | SolarLink".
- **`/outlets/multan/` and `/outlets/gilgit/`** keep the live "SolarLink Multan" and "SolarLink Gilgit". Change both titles if the branches turn out not to be open.
- **`/warranty-and-support/`** uses "warranty" as the topic only. `pnpm check:content` may flag the word; add `claim-ok` only once the client's written terms exist.
- **Legal and `/sitemap/`** titles are short and exempt from the 50 character floor.

## Questions to answer on the page

Each line below becomes an h2 or h3 with a 40 to 60 word answer. Lines that start with a capital and end in a question mark are People Also Ask leads from the unverified SERP notes; the lowercase lines are autocomplete rows and should be written up as full questions with the same wording. Answers to price questions say what sets the price and point to the calculator or WhatsApp; they carry no figure and no claim from `docs/BANNED-CLAIMS.md`.

### `/`

- which solar company is best in pakistan
- are solar companies legit
- what solar system do i need for my house
- is solar installation worth it
- is net metering available in pakistan
- how solar installation works
- how does solar financing work

### `/solar-financing/`

- how does solar financing work
- how solar financing works in pakistan
- is solar financing available in pakistan
- can you finance solar panels
- is financing solar panels worth it
- which solar financing is best in pakistan
- what solar financing in pakistan

### `/services/residential-solar/`

- Which solar system is best for a home in Pakistan?
- what solar system do i need for my house
- can a 5kw solar system run a house
- is solar for home worth it
- how much solar is needed for a house
- can solar panels power a house
- how solar system works at home

### `/services/commercial-solar/`

- what is commercial solar
- how much does commercial solar cost
- how does commercial solar work
- is commercial solar worth it
- how to apply for commercial solar installation
- what is commercial and industrial solar
- what is a commercial solar farm

### `/services/industrial-solar/`

- what is industrial solar
- what is an industrial solar farm
- how much are industrial solar panels
- how long do industrial solar panels last
- how industrial solar inverter works
- which industrial solar inverter is best
- what is commercial and industrial solar

### `/services/agricultural-solar/`

- What is the price of a 10 HP solar tube well in Pakistan?
- How much does a 5 HP solar tubewell cost in Pakistan?
- What size solar system is needed to run a 15 HP tube well?
- What is the cost of an agricultural solar tube well in Sargodha?
- how solar tube well works
- is solar tube well good
- which solar tube well is best in pakistan

### `/services/net-metering-support/`

- How long does LESCO net-metering approval take in Lahore?
- How to apply for IESCO net metering in Rawalpindi?
- How to apply for FESCO net metering in Sargodha?
- How to apply for MEPCO net metering in Multan?
- How long does the net metering process take in Pakistan?
- what is the cost of net metering in pakistan
- is net metering required

### `/solar-systems/on-grid/`

- what is on grid solar system
- how does on grid solar system work
- how on grid solar system works in pakistan
- does on grid solar system work at night
- can on grid solar system work without electricity
- how to apply on grid solar system
- how to convert on grid solar system to hybrid

### `/solar-systems/hybrid/`

- what is hybrid solar system in pakistan
- how does a hybrid solar system work
- can hybrid solar system work without battery
- does hybrid solar system need net metering
- can i run ac on hybrid solar system
- are hybrid solar systems worth it
- which hybrid solar system is best in pakistan

### `/solar-systems/off-grid/`

- what is off grid solar system
- how does off grid solar system work
- can off grid solar system work without batteries
- does off grid solar system work without electricity
- what size off grid solar system do i need
- how to install off grid solar system
- which solar system is best on grid or off grid

### `/solar-systems/3kw/`

- what is a 3kw solar system
- what can a 3kw solar system run
- can 3kw solar system run 1.5 ton ac
- how much power does a 3kw solar system produce per day
- how many panels in a 3kw solar system
- is a 3kw solar system big enough
- how much space required for 3kw solar system
- How much does a 3kW solar system cost in Pakistan?

### `/solar-systems/5kw/`

- What appliances can a 5kW solar system run in Pakistan?
- How many units per day does a 5kW solar system produce in Pakistan?
- How many solar panels are needed for a 5kW solar system?
- What is the price of a 5kW solar system in Pakistan?
- is a 5kw solar system enough
- can 5kw solar system run ac
- how big is a 5kw solar system

### `/solar-systems/10kw/`

- What is the cost of a 10kW solar system in Pakistan?
- what can 10kw solar system run
- how much does a 10kw solar system produce per day
- is a 10kw solar system enough
- what size battery for 10kw solar system
- can i install 10kw solar system
- what does a 10kw solar system look like

### `/solar-systems/15kw/`

- what can a 15kw solar system run
- how many panels for 15kw solar system
- how much power does a 15kw solar system produce per day
- is a 15kw solar system enough
- is a 15kw solar system worth it
- how big is a 15kw solar system
- how to install 15kw solar system

### `/solar-systems/20kw/`

- what can a 20kw solar system run
- how many panels for 20kw solar system
- how much power does a 20kw solar system produce per day
- how big is a 20kw solar system
- will a 20kw solar system run a house
- is a 20kw solar system worth it
- what is a 20kw solar system

### `/products/solar-panels/`

- What is the current rate of solar panels per watt in Pakistan?
- Which solar panel brand is best in Pakistan?
- What is the price of a Longi 585W solar panel in Pakistan?
- How much does a 550W solar panel cost in Pakistan?
- can solar panels work in rain
- can solar panels work at night
- can solar panels be repaired

### `/products/inverters/`

- What is the price of a 5kW solar inverter in Pakistan?
- Which is the best solar inverter brand in Pakistan?
- What is the difference between a hybrid and an on-grid solar inverter?
- is solar inverter different from normal inverter
- can solar inverter work without battery
- can solar inverter be used as ups
- what solar inverter do i need

### `/products/batteries/`

- how solar battery works
- what solar battery size do i need
- is solar battery worth it
- which solar battery is best in pakistan
- which lithium battery is best in pakistan for solar
- is solar battery same as inverter battery
- can solar battery be installed inside
- is lithium battery safe in the house

### `/outlets/lahore/`

- How much does a solar system cost in Lahore?
- How long does LESCO net-metering approval take in Lahore?
- What is the payback period for solar panels in Lahore?
- Which are the best solar companies in Lahore?
- Do solar systems work during load shedding in Lahore?
- How much maintenance do solar panels require in Lahore?
- is solar panel available on installments lahore
- is solar tube well available in lahore

### `/outlets/islamabad/`

- Which are the best solar companies in Islamabad?
- How does IESCO net metering work in Islamabad?
- How much does a solar system cost in Islamabad?
- What size solar system do I need for a 1 kanal or 10 marla house in Islamabad?
- how solar installation works
- is solar installation worth it
- what solar system do i need for my house

### `/outlets/rawalpindi/`

- Which is the best solar company in Rawalpindi?
- What is the cost of a 5kW solar system in Rawalpindi?
- How to apply for IESCO net metering in Rawalpindi?
- Are structural assessments required for older residential roofs in Rawalpindi?
- how solar installation works
- can solar panels be installed in apartments
- can solar panels power a house

### `/outlets/sargodha/`

- What is the price of a 5kW solar system in Sargodha?
- How to apply for FESCO net metering in Sargodha?
- What is the cost of an agricultural solar tube well in Sargodha?
- Which solar panels work best in Sargodha's high summer heat?
- how solar tube well works
- is solar tube well good
- how solar installation works

### `/outlets/multan/`

- Which is the best solar company in Multan?
- How to apply for MEPCO net metering in Multan?
- What solar system capacity is recommended for extreme summer temperatures in Multan?
- What is the cost of solar tube well installations in South Punjab / Multan?
- how solar installation works
- is solar installation worth it
- how solar tube well works

### `/outlets/gilgit/`

- can off grid solar system work without batteries
- what size off grid solar system do i need
- how off grid solar system works
- can hybrid solar system work without battery
- does off grid solar system work without electricity
- which solar system is best on grid or off grid

### `/net-metering-guide/`

- What is the new net metering policy in Pakistan?
- What is the buyback rate for net metering in Pakistan?
- What is the difference between net metering and net billing in Pakistan?
- what is net metering in pakistan
- how net metering works in pakistan
- is net metering still available in pakistan
- how net metering bill is calculated in pakistan
- is net metering ending in pakistan

### `/solar-calculator/`

- How to calculate required solar system size in Pakistan?
- How many solar panels are needed for 500 units in Pakistan?
- What size solar system is needed for a 1.5 ton AC in Pakistan?
- How much electricity bill can be saved with solar panels in Pakistan?
- how do i calculate how much solar power i need
- what size solar system calculator
- is solar worth it calculator

### `/tools/load-calculator/`

- can solar panel run ac
- can a 5kw solar system run a geyser
- can 5kw solar panel run 2 ac
- what can a 3kw solar system run
- how much solar is needed for a house
- can i run ac on hybrid solar system

### `/tools/net-billing-calculator/`

- what is net billing in pakistan
- how net billing works
- is net billing implemented in pakistan
- what is net billing tariff
- what is net billing policy
- what is net billing in solar

## Cannibalisation watch

Each pair lists who owns which query and how the other page links to it. The rule behind all of them: the owning page gets the exact-match anchor from the other page, in the first relevant paragraph, and the other page never repeats the owner's primary phrase in its own title or h1.

| Pages | Owner and its queries | Other page and its queries | Linking rule |
|---|---|---|---|
| `/solar-systems/hybrid/` vs `/blog/on-grid-vs-hybrid-vs-off-grid-pakistan/` | Hybrid page owns "hybrid solar system", what it is, how it works, price drivers. | Blog owns the comparison queries: "on grid solar system vs off grid", "hybrid solar system vs off-grid", "which solar system is best on grid or hybrid". | Hybrid page links to the blog with the anchor "on-grid vs hybrid vs off-grid". Blog links to each of the three type pages the first time it names the type. The same rule covers `/solar-systems/on-grid/` and `/solar-systems/off-grid/`. |
| `/services/net-metering-support/` vs `/net-metering-guide/` | Service page owns "net metering application" and the "we handle it" queries ("net metering services in lahore", "net metering cost"). | Guide owns "net metering in pakistan", rules, policy, "what is" and "vs net billing" questions. | Guide ends with a block that links to the service page. Service page links to the guide for the rules and does not explain them again. |
| `/net-metering-guide/` and the service page vs `/blog/net-metering-lesco-application-guide/` and `/blog/net-metering-common-mistakes-pakistan/` | Blog LESCO post owns "lesco net metering application" and Lahore net metering queries. Mistakes post owns "net metering application mistakes". | Guide and service page own the national and general queries. | Both posts link up to the guide (anchor: the rules) and to the service page (anchor: application support). The guide lists both posts under "next steps". Posts do not define net metering from scratch. |
| `/blog/net-metering-vs-battery-storage-pakistan/` vs `/products/batteries/` and `/solar-systems/hybrid/` | Blog owns "net metering vs battery storage" and the "is it worth it" questions. | Battery page owns battery price and type. Hybrid page owns the system. | Blog links to both; they link back only from a sentence that raises the net metering or storage choice. |
| `/solar-calculator/` vs `/tools/*` and `/tools/` | Calculator owns "solar calculator pakistan" and its variants (online, for home). `/tools/` owns "solar tools pakistan" and nothing else. | Each tool owns its one job: bill breakdown, load, net billing, battery backup, roof planner, AC on solar, tube well. `/tools/load-calculator/` owns "solar calculator load". `/tools/bill-breakdown/` owns "net metering bill calculator". | Calculator links to each tool in its next-step block with the tool's own name as the anchor. Each tool links back with "full solar calculator". The hub links to all, ranks for none of the tool names. |
| `/tools/net-billing-calculator/` vs `/net-metering-guide/` | Tool owns "net billing calculator" and rate queries. | Guide owns "net billing vs net metering" and policy questions. | Tool links to the guide for the rules and the NEPRA citation. Guide links to the tool as the way to test the numbers. |
| `/products/solar-panels/` vs `/products/solar-panels/longi/` and `/products/solar-panels/canadian-solar/` | Panel page owns generic and per-watt queries ("solar panel price in pakistan", "585 watt"). | Brand pages own brand plus model queries. They exist only if the client confirms stock. | Panel page links to each brand page from a short list of brands. If there is no brand page, the panel page gives one short paragraph and no heading that targets a brand price query. |
| `/products/inverters/` vs `/products/inverters/growatt/`, `/fronus/` and `/blog/growatt-vs-fronus-inverter-comparison/` | Inverter page owns generic inverter price and size queries. Blog owns "growatt vs fronus inverter" and "which solar inverter is best". | Brand pages own brand price queries. | Blog links to both brand pages, brand pages link back to the blog for the comparison. Inverter page links to all three. |
| `/products/solar-panels/` vs `/blog/solar-panel-brands-comparison-pakistan/` | Blog owns "best solar panel brands in pakistan", "jinko or longi" style comparisons. | Panel page owns price. | Panel page links to the blog with the anchor "solar panel brands compared". The blog links back for price. |
| `/solar-systems/` vs `/solar-systems/{3,5,10,15,20}kw/` vs `/products/*` | Hub owns "solar system price in pakistan" and package-level questions. | Each size page owns its "{N}kw solar system price in pakistan" family. Product pages own component prices. | Hub links to every size page with the size as the anchor. Size pages link to the hub for the general cost factors and to the product pages for component detail. Queries such as "10kw hybrid solar system price in pakistan" belong to the size page, which links to the hybrid page. |
| `/solar-systems/{n}kw/` vs `/solar-financing/` | Financing page owns "solar system on installments" and bank queries. | Size pages own the size. "5kw solar system on installment" and "3kw solar system on installment in pakistan" stay on the size page as one short section. | Size pages link to the financing page from that section. The financing page links to the size pages. |
| Outlet pages vs `/` and `/outlets/` | Home owns "solar company in pakistan" and national queries. Each outlet owns "solar company in {city}", its city contact queries and its city PAA questions. | `/outlets/` owns "solarlink outlets" only. | Home and `/outlets/` link to every outlet with the city as the anchor. Outlets link up through breadcrumbs and one "all outlets" link. Outlets do not repeat "solar company in pakistan". |
| `/contact-us/` vs outlet pages | Contact page owns the brand contact query ("solarlink contact number") and the quote handoff. | Outlets own "{city} contact number" style queries and their own address and phone. | One source of address and phone data feeds both. Contact page lists every outlet and links to it. |
| `/services/agricultural-solar/` vs `/tools/tubewell-solar-calculator/` | Service page owns "solar tube well" and tube well price queries. | Calculator owns the sizing question ("solar tube well calculator", "what size solar system is needed to run a 15 HP tube well"). | Service page links to the calculator from its sizing section. Calculator links back for the equipment and install. |
| `/blog/how-to-size-solar-system-pakistan/` vs `/solar-calculator/` and `/tools/load-calculator/` | Blog owns the method ("how to size a solar system", "solar power calculation formula"). | Calculator and load tool own the doing. | Blog links to both tools at the end of each worked step. The tools link back to the blog for the method. |
| `/how-solar-works/` vs `/faqs/` and the system type pages | How-solar-works owns "how solar panels work". | FAQs hold short answers only. Type pages own "how does a hybrid / on grid / off grid system work". | FAQ answers stay under 60 words and link to the full page. How-solar-works links to the three type pages for the grid-connected differences. |
| `/projects/*` vs outlets and size pages | Each project owns "solar installation {area}" and nothing broader. | Outlets own the city. Size pages own the size. | Each project links to its outlet and its size page. Outlets and size pages link to relevant projects. A project that is not confirmed real 301s to `/projects/` and drops out of this table. |
| `/blog/solar-installation-red-flags-pakistan/` vs `/` and `/about-us/` | Blog owns "how to choose a solar company in pakistan" and the legit-company questions. | Home owns "solar company in pakistan". About owns "solarlink pakistan". | Home and about link to the blog as the buyer's checklist. The blog does not name SolarLink in its title or h1. |

## Queries we deliberately do not target

The autocomplete data is noisy. Each group below lists real rows from it and why the site skips them.

- **Brand-navigational queries for other companies' own services.** People who type these want the brand's own site, app or support line, and a reseller page will not satisfy them. Examples: `knox helpline`, `growatt helpline`, `longi share price`, `jinko solar verification`, `canadian solar app`, `longi pakistan app`. Brand queries that ask for a price in Pakistan (`growatt inverter price in pakistan`) are different: those stay, but only on brand pages the client's stock list supports.
- **Other cities.** The site has outlet pages for six cities. Rows for cities without one, such as `solar company karachi`, `solar installation karachi`, `solar system price in karachi`, `solar company gujranwala`, `solar panel price faisalabad`, would need a page that says we do not work there or one that overstates reach. Skip them unless the client opens a branch. Rows about other countries (`solar companies in saudi arabia`, `cost of one solar panel in india`, `is net metering going away in florida`) are out of scope.
- **Handheld solar calculator devices.** `casio solar calculator price`, `how to charge solar calculator`, `solar powered calculator price` and `do solar calculators work in the dark` are about pocket calculators. The `/solar-calculator/` page uses "pakistan", "for home" and "cost" wording to separate itself, and no page answers the device questions.
- **Government scheme and registration queries**, unless the client takes part in the scheme and says so in writing: `solar tube well scheme 2026`, `solar tubewell scheme 2026 last date`, `punjab solar tubewell scheme 2026 registration`, `solar panel scheme gilgit baltistan`, `free solar panel gilgit baltistan`, `pm solar panel gilgit baltistan`. Also the official portals, `net metering portal login` and `net billing portal login`: the person wants the utility's site.
- **Things the business does not sell, or has not said it sells.** `solar lights for home in pakistan`, `solar heater for home in pakistan`, `solar light for home price` (lights and heaters); `solar inverter repair lahore` and `solar inverter repair in islamabad` (repair work); `inverex ups in pakistan` (UPS units); `solar installation courses`, `solar company lahore jobs` (training and careers); `solar company share price` (investing). Add a row back only if the client confirms the service.
- **Marketplace and used-equipment queries** such as `solar panel olx sargodha` and `solar system olx lahore`. The intent is a classified listing, not an installer.
- **Astronomy and other noise** that shares the words "solar system": `which solar system has the most moons`, `solar system games for kids`. These rows are in the data and have nothing to do with the business.
- **Daily-rate queries** such as `solar panel aaj ka rate in pakistan`. The site cannot promise a daily rate list and the price policy is not decided (see "Not yet known"). The panel page covers the topic by explaining what sets the price.
- **"Best" wording.** Queries like `which solar company is best in pakistan` stay as questions answered on the page. The word "best" never goes in a title or description.

## Not yet known

- **Search volumes.** None of the keyword data has volumes, so every ranking of one phrase over another here is a judgement from the wording and the page's role, not from demand. Pull volumes from Search Console (queries the old site already shows for) and a keyword tool before the final titles.
- **Actual rankings and clicks.** Needs Search Console access (see `docs/SEO-MIGRATION.md`, "Needed before launch"). It will decide the title phrase for every page, and in particular whether `/locations/*` rather than `/outlets/*` is the URL that ranks.
- **Which brand pages are justified.** The four brand pages (`growatt`, `fronus`, `longi`, `canadian-solar`) stay at stage `next` until the client sends the stock list and dealer status. The inverter title phrase "Growatt & Fronus" depends on the same answer.
- **Price policy.** Whether size, product and hub pages show a price range with an as-of date or no price at all. This sets how much of the price-query intent those pages can serve.
- **Which outlets are open.** Multan and Gilgit especially. It changes the outlet titles and the questions on those pages.
- **The SERP notes are unverified.** `4a-serp.md` and `4b-serp.md` came from an AI assistant. Open the Google results for the primary queries yourself before relying on page-type claims or People Also Ask lines.
- **Roman Urdu demand.** The Urdu file holds phrases people typed, but nothing says how many people type them. Use them as FAQ wording first; build `/ur/` pages only if Search Console shows the traffic.
