import fs from "fs";
import { routes } from "../../../../src/routes.ts";
import { m, projects, qs } from "./data.mjs";

const SUF = " | SolarLink";
const sections = [["Home and company", 7], ["Services", 6], ["Solar systems", 9], ["Products", 9], ["Outlets", 7], ["Projects", 11], ["Guides", 3], ["Blog", 11], ["Tools", 9], ["Legal", 3]];
if (sections.reduce((a, [, n]) => a + n, 0) !== routes.length) throw new Error("section counts");

const titleOf = (r) => {
  if (r.kind === "project") {
    const slug = r.path.split("/")[2];
    const [place, what] = projects[slug];
    let t = `${place}: ${what}${SUF}`;
    if (t.length > 60) t = `${place}: ${what}`;
    return t;
  }
  return m[r.path][0] + SUF;
};
const secOf = (r) => (r.kind === "project" ? projects[r.path.split("/")[2]][2] : m[r.path][1]);
const urOf = (r) => (r.kind === "project" ? [] : m[r.path][2]);
const intentOf = (r) => (r.kind === "project" ? "local" : m[r.path][3]);
const esc = (s) => s.replace(/\|/g, "\\|");

const exTitles = {
  home: "Solar Company in Pakistan: Home and Business" + SUF,
  hub: "Solar Services in Pakistan: Home to Industrial" + SUF,
  service: "Residential Solar Systems for Homes in Pakistan" + SUF,
  type: "On Grid Solar System: How It Works in Pakistan" + SUF,
  size: "5kW Solar System Price in Pakistan: Cost Guide" + SUF,
  product: "Solar Panels in Pakistan: Price and Types" + SUF,
  outlet: "Solar Installation in Lahore: Local Outlet" + SUF,
  project: "DHA Phase 5, Lahore: 15kW On-Grid Solar" + SUF,
  guide: "How Solar Panels Work in Pakistan: Simple Guide" + SUF,
  article: "On-Grid vs Hybrid vs Off-Grid Solar: Which Fits" + SUF,
  tool: "Battery Backup Calculator: Size Your Bank" + SUF,
};
exTitles.tool = "Solar Battery Backup Calculator: Size Your Bank" + SUF;
exTitles.product = "Longi Solar Panel Price in Pakistan: Models" + SUF;
exTitles.project = "Bahria Town Phase 2, Lahore: 10kW On-Grid Solar" + SUF;

const exDesc = {
  home: "Solar installation for homes, shops and farms across Pakistan. See our services and system sizes, then message us on WhatsApp for a quote.",
  hub: "Residential, commercial, industrial and agricultural solar services, plus net metering support. Pick a service, then message us on WhatsApp.",
  service: "How we plan and install solar for homes: site visit, system sizing, installation and net metering paperwork. Message us on WhatsApp to start.",
  type: "What an on grid solar system is, how it works with the grid and net metering, and who it suits in Pakistan. Use the calculator to size yours.",
  size: "What decides the price of a 5kW solar system in Pakistan: panels, inverter, battery, structure and installation. Send your bill on WhatsApp for a quote.",
  product: "Longi solar panel models, wattage and the factors that set their price in Pakistan. Message us on WhatsApp to ask what is in stock.",
  outlet: "Solar installation in Lahore from the SolarLink outlet: site visits, system sizing and net metering support. Message the Lahore team on WhatsApp.",
  project: "A 10kW on-grid solar system in Bahria Town Phase 2, Lahore: the equipment and the roof layout. Message us on WhatsApp to plan a system for your home.",
  guide: "How solar panels turn sunlight into power for a home in Pakistan, in plain steps. Then use the solar calculator to size a system for your bill.",
  article: "How on-grid, hybrid and off-grid solar systems differ and which one fits your home in Pakistan. Use the solar calculator to size your system.",
  tool: "Enter the appliances you want to keep running and see the battery size you need. Then send the result to SolarLink on WhatsApp for a quote.",
  company: "Contact SolarLink in Lahore, Islamabad, Rawalpindi or Sargodha. Message us on WhatsApp to ask about a solar system for your home or business.",
};
const patterns = [
  ["home", "`Solar Company in Pakistan: {audience}` + brand", "{primary phrase}: {audiences}"],
  ["hub", "`{Section topic} in Pakistan: {what is inside}` + brand", ""],
  ["service", "`{Live service phrase, kept}` + brand", ""],
  ["system type", "`{System type}: How It Works in Pakistan` + brand", ""],
  ["system size", "`{N}kW Solar System Price in Pakistan: Cost Guide` + brand", ""],
  ["product", "`{Product or brand} Price in Pakistan: {Models | Price and Types}` + brand", ""],
  ["outlet", "`Solar Installation in {City}: Local Outlet` + brand", ""],
  ["project", "`{Area}, {City}: {N}kW {On-Grid|Hybrid} Solar` + brand", ""],
  ["guide", "`{Topic phrase}: {angle}` + brand", ""],
  ["article", "`{Topic phrase}: {angle}` + brand", ""],
  ["tool", "`{Tool name}: {what you enter or get}` + brand", ""],
];
const kindKeys = ["home", "hub", "service", "type", "size", "product", "outlet", "project", "guide", "article", "tool"];

let out = "";
const w = (s = "") => (out += s + "\n");

w("# Keyword map");
w();
w("This file gives each of the 75 routes in `src/routes.ts` one primary query, a draft title, supporting phrases and the questions the page must answer. The route list is the source of truth; this file adds nothing to it and changes nothing in it.");
w("One primary query per URL: no two pages target the same query, and each secondary phrase has one owning page (see the cannibalisation watch). Other pages may link to it, not compete for it.");
w("Titles are drafts until Search Console data confirms each page's ranking phrase. When it does, that phrase moves to the front of the title word for word. Until then the phrases in the live titles are kept (`docs/SEO-MIGRATION.md`, rule 4).");
w("A draft title can differ in wording from `primary` where a live title phrase is kept (for example `/net-metering-guide/` keeps the live \"Net Metering Guide Pakistan\", while `primary` is \"net metering in pakistan\"). That is deliberate; the primary phrase still goes in the h1 and the first paragraph.");
w("Secondary phrases and questions are real Google autocomplete rows (`docs/research/agy/2-keywords-en.json`, `3-keywords-ur.json`) or People Also Ask lines from the SERP notes, which an AI assistant compiled and nobody has verified. There are no search volumes and no rankings in this file.");
w();

w("## Title and description patterns");
w();
w("Title pattern: primary phrase first, then a differentiator, then `| SolarLink`. Length 50 to 60 characters. Description: 120 to 160 characters, ending in the next step (WhatsApp or the calculator). No prices, no \"best\", no counts, no warranty or time promises, no year-stamped promises. A page that targets a price query uses \"price\" as the topic only.");
w();
const lens = [];
kindKeys.forEach((k, i) => {
  const [label, tp] = patterns[i];
  const t = exTitles[k], d = exDesc[k];
  lens.push([label, "title", t.length], [label, "desc", d.length]);
  w(`- **${label}**: title ${tp}. Example: "${t}" (${t.length} characters). Description example: "${d}" (${d.length} characters).`);
});
{
  const d = exDesc.company;
  lens.push(["company", "desc", d.length]);
  w(`- **company and legal pages** (about, contact, quote, FAQs, financing, warranty, terms, privacy, sitemap): title is the page name, then the topic, then brand, and may be shorter than 50 characters where the page name is short. Description example: "${d}" (${d.length} characters).`);
}
w();

w("## The map");
w();
w("Columns: path, primary query (from `src/routes.ts`), draft title, secondary phrases (real autocomplete rows), Roman Urdu or Urdu phrases for FAQs and headings (from `3-keywords-ur.json`, only where one fits), search intent (the label used in the autocomplete data) and stage. Secondary phrases are separated by semicolons. \"None in data\" means the autocomplete data has no row that fits the page.");
w();
const titleLens = [];
let idx = 0;
const noteRows = [];
for (const [name, n] of sections) {
  w(`### ${name}`);
  w();
  w("| Path | Primary query | Draft title | Secondary phrases | Roman Urdu phrases | Intent | Stage |");
  w("|---|---|---|---|---|---|---|");
  for (const r of routes.slice(idx, idx + n)) {
    const t = titleOf(r);
    titleLens.push([r.path, t]);
    const sec = secOf(r), ur = urOf(r);
    w(`| \`${r.path}\` | ${r.primary} | ${esc(t)} | ${sec.length ? sec.join("; ") : "none in data"} | ${ur.length ? ur.join("; ") : "-"} | ${intentOf(r)} | ${r.stage} |`);
  }
  idx += n;
  w();
}

w("### Title notes");
w();
w("- **Wording differs from `primary` on purpose** where a live phrase is kept: `/about-us/`, `/contact-us/`, `/faqs/`, `/net-metering-guide/`, `/solar-calculator/` (live title \"Solar Savings & System Sizing Calculator\"; \"solar calculator pakistan\" goes in the h1 and opening line), `/products/solar-panels/`, `/products/inverters/`, `/blog/solar-installation-red-flags-pakistan/`.");
w("- **Live phrase not kept word for word because it carries a banned claim:** home (\"Premier\", \"Tier-1\"), `/get-quote/` (\"Free\"), `/products/solar-panels/` (\"Tier-1\"), `/products/inverters/` (\"Best Price\"), `/blog/solar-panel-brands-comparison-pakistan/` (\"Tier-1\" and the year), `/services/net-metering-support/` (\"Save More\"). Years and counts (\"7\", \"10\", \"2026\") are dropped from the blog titles for the same reason.");
w("- **Shortened to fit 60 characters:** `/services/agricultural-solar/` drops \"in Punjab\" and `/projects/` swaps \"Punjab & Islamabad\" for \"Pakistan\"; the Bahria Town Phase 6 and PWD Rawalpindi project titles drop `| SolarLink` because the live phrase already fills the limit; the long blog titles keep their opening phrase only.");
w("- **Punctuation:** the live en dashes and em dashes become colons.");
w("- **`/products/inverters/` keeps \"Growatt & Fronus\"** from the live title. Use it only if the client confirms the stock list. Fallback: \"Solar Inverters in Pakistan: Price and Types | SolarLink\".");
w("- **`/outlets/multan/` and `/outlets/gilgit/`** keep the live \"SolarLink Multan\" and \"SolarLink Gilgit\". Change both titles if the branches turn out not to be open.");
w("- **`/warranty-and-support/`** uses \"warranty\" as the topic only. `pnpm check:content` may flag the word; add `claim-ok` only once the client's written terms exist.");
w("- **Legal and `/sitemap/`** titles are short and exempt from the 50 character floor.");
w();

w("## Questions to answer on the page");
w();
w("Each line below becomes an h2 or h3 with a 40 to 60 word answer. Lines that start with a capital and end in a question mark are People Also Ask leads from the unverified SERP notes; the lowercase lines are autocomplete rows and should be written up as full questions with the same wording. Answers to price questions say what sets the price and point to the calculator or WhatsApp; they carry no figure and no claim from `docs/BANNED-CLAIMS.md`.");
w();
for (const r of routes) {
  if (!qs[r.path]) continue;
  w(`### \`${r.path}\``);
  w();
  qs[r.path].forEach((q) => w(`- ${q}`));
  w();
}

w("## Cannibalisation watch");
w();
w("Each pair lists who owns which query and how the other page links to it. The rule behind all of them: the owning page gets the exact-match anchor from the other page, in the first relevant paragraph, and the other page never repeats the owner's primary phrase in its own title or h1.");
w();
w("| Pages | Owner and its queries | Other page and its queries | Linking rule |");
w("|---|---|---|---|");
w("| `/solar-systems/hybrid/` vs `/blog/on-grid-vs-hybrid-vs-off-grid-pakistan/` | Hybrid page owns \"hybrid solar system\", what it is, how it works, price drivers. | Blog owns the comparison queries: \"on grid solar system vs off grid\", \"hybrid solar system vs off-grid\", \"which solar system is best on grid or hybrid\". | Hybrid page links to the blog with the anchor \"on-grid vs hybrid vs off-grid\". Blog links to each of the three type pages the first time it names the type. The same rule covers `/solar-systems/on-grid/` and `/solar-systems/off-grid/`. |");
w("| `/services/net-metering-support/` vs `/net-metering-guide/` | Service page owns \"net metering application\" and the \"we handle it\" queries (\"net metering services in lahore\", \"net metering cost\"). | Guide owns \"net metering in pakistan\", rules, policy, \"what is\" and \"vs net billing\" questions. | Guide ends with a block that links to the service page. Service page links to the guide for the rules and does not explain them again. |");
w("| `/net-metering-guide/` and the service page vs `/blog/net-metering-lesco-application-guide/` and `/blog/net-metering-common-mistakes-pakistan/` | Blog LESCO post owns \"lesco net metering application\" and Lahore net metering queries. Mistakes post owns \"net metering application mistakes\". | Guide and service page own the national and general queries. | Both posts link up to the guide (anchor: the rules) and to the service page (anchor: application support). The guide lists both posts under \"next steps\". Posts do not define net metering from scratch. |");
w("| `/blog/net-metering-vs-battery-storage-pakistan/` vs `/products/batteries/` and `/solar-systems/hybrid/` | Blog owns \"net metering vs battery storage\" and the \"is it worth it\" questions. | Battery page owns battery price and type. Hybrid page owns the system. | Blog links to both; they link back only from a sentence that raises the net metering or storage choice. |");
w("| `/solar-calculator/` vs `/tools/*` and `/tools/` | Calculator owns \"solar calculator pakistan\" and its variants (online, for home). `/tools/` owns \"solar tools pakistan\" and nothing else. | Each tool owns its one job: bill breakdown, load, net billing, battery backup, roof planner, AC on solar, tube well. `/tools/load-calculator/` owns \"solar calculator load\". `/tools/bill-breakdown/` owns \"net metering bill calculator\". | Calculator links to each tool in its next-step block with the tool's own name as the anchor. Each tool links back with \"full solar calculator\". The hub links to all, ranks for none of the tool names. |");
w("| `/tools/net-billing-calculator/` vs `/net-metering-guide/` | Tool owns \"net billing calculator\" and rate queries. | Guide owns \"net billing vs net metering\" and policy questions. | Tool links to the guide for the rules and the NEPRA citation. Guide links to the tool as the way to test the numbers. |");
w("| `/products/solar-panels/` vs `/products/solar-panels/longi/` and `/products/solar-panels/canadian-solar/` | Panel page owns generic and per-watt queries (\"solar panel price in pakistan\", \"585 watt\"). | Brand pages own brand plus model queries. They exist only if the client confirms stock. | Panel page links to each brand page from a short list of brands. If there is no brand page, the panel page gives one short paragraph and no heading that targets a brand price query. |");
w("| `/products/inverters/` vs `/products/inverters/growatt/`, `/fronus/` and `/blog/growatt-vs-fronus-inverter-comparison/` | Inverter page owns generic inverter price and size queries. Blog owns \"growatt vs fronus inverter\" and \"which solar inverter is best\". | Brand pages own brand price queries. | Blog links to both brand pages, brand pages link back to the blog for the comparison. Inverter page links to all three. |");
w("| `/products/solar-panels/` vs `/blog/solar-panel-brands-comparison-pakistan/` | Blog owns \"best solar panel brands in pakistan\", \"jinko or longi\" style comparisons. | Panel page owns price. | Panel page links to the blog with the anchor \"solar panel brands compared\". The blog links back for price. |");
w("| `/solar-systems/` vs `/solar-systems/{3,5,10,15,20}kw/` vs `/products/*` | Hub owns \"solar system price in pakistan\" and package-level questions. | Each size page owns its \"{N}kw solar system price in pakistan\" family. Product pages own component prices. | Hub links to every size page with the size as the anchor. Size pages link to the hub for the general cost factors and to the product pages for component detail. Queries such as \"10kw hybrid solar system price in pakistan\" belong to the size page, which links to the hybrid page. |");
w("| `/solar-systems/{n}kw/` vs `/solar-financing/` | Financing page owns \"solar system on installments\" and bank queries. | Size pages own the size. \"5kw solar system on installment\" and \"3kw solar system on installment in pakistan\" stay on the size page as one short section. | Size pages link to the financing page from that section. The financing page links to the size pages. |");
w("| Outlet pages vs `/` and `/outlets/` | Home owns \"solar company in pakistan\" and national queries. Each outlet owns \"solar company in {city}\", its city contact queries and its city PAA questions. | `/outlets/` owns \"solarlink outlets\" only. | Home and `/outlets/` link to every outlet with the city as the anchor. Outlets link up through breadcrumbs and one \"all outlets\" link. Outlets do not repeat \"solar company in pakistan\". |");
w("| `/contact-us/` vs outlet pages | Contact page owns the brand contact query (\"solarlink contact number\") and the quote handoff. | Outlets own \"{city} contact number\" style queries and their own address and phone. | One source of address and phone data feeds both. Contact page lists every outlet and links to it. |");
w("| `/services/agricultural-solar/` vs `/tools/tubewell-solar-calculator/` | Service page owns \"solar tube well\" and tube well price queries. | Calculator owns the sizing question (\"solar tube well calculator\", \"what size solar system is needed to run a 15 HP tube well\"). | Service page links to the calculator from its sizing section. Calculator links back for the equipment and install. |");
w("| `/blog/how-to-size-solar-system-pakistan/` vs `/solar-calculator/` and `/tools/load-calculator/` | Blog owns the method (\"how to size a solar system\", \"solar power calculation formula\"). | Calculator and load tool own the doing. | Blog links to both tools at the end of each worked step. The tools link back to the blog for the method. |");
w("| `/how-solar-works/` vs `/faqs/` and the system type pages | How-solar-works owns \"how solar panels work\". | FAQs hold short answers only. Type pages own \"how does a hybrid / on grid / off grid system work\". | FAQ answers stay under 60 words and link to the full page. How-solar-works links to the three type pages for the grid-connected differences. |");
w("| `/projects/*` vs outlets and size pages | Each project owns \"solar installation {area}\" and nothing broader. | Outlets own the city. Size pages own the size. | Each project links to its outlet and its size page. Outlets and size pages link to relevant projects. A project that is not confirmed real 301s to `/projects/` and drops out of this table. |");
w("| `/blog/solar-installation-red-flags-pakistan/` vs `/` and `/about-us/` | Blog owns \"how to choose a solar company in pakistan\" and the legit-company questions. | Home owns \"solar company in pakistan\". About owns \"solarlink pakistan\". | Home and about link to the blog as the buyer's checklist. The blog does not name SolarLink in its title or h1. |");
w();

w("## Queries we deliberately do not target");
w();
w("The autocomplete data is noisy. Each group below lists real rows from it and why the site skips them.");
w();
w("- **Brand-navigational queries for other companies' own services.** People who type these want the brand's own site, app or support line, and a reseller page will not satisfy them. Examples: `knox helpline`, `growatt helpline`, `longi share price`, `jinko solar verification`, `canadian solar app`, `longi pakistan app`. Brand queries that ask for a price in Pakistan (`growatt inverter price in pakistan`) are different: those stay, but only on brand pages the client's stock list supports.");
w("- **Other cities.** The site has outlet pages for six cities. Rows for cities without one, such as `solar company karachi`, `solar installation karachi`, `solar system price in karachi`, `solar company gujranwala`, `solar panel price faisalabad`, would need a page that says we do not work there or one that overstates reach. Skip them unless the client opens a branch. Rows about other countries (`solar companies in saudi arabia`, `cost of one solar panel in india`, `is net metering going away in florida`) are out of scope.");
w("- **Handheld solar calculator devices.** `casio solar calculator price`, `how to charge solar calculator`, `solar powered calculator price` and `do solar calculators work in the dark` are about pocket calculators. The `/solar-calculator/` page uses \"pakistan\", \"for home\" and \"cost\" wording to separate itself, and no page answers the device questions.");
w("- **Government scheme and registration queries**, unless the client takes part in the scheme and says so in writing: `solar tube well scheme 2026`, `solar tubewell scheme 2026 last date`, `punjab solar tubewell scheme 2026 registration`, `solar panel scheme gilgit baltistan`, `free solar panel gilgit baltistan`, `pm solar panel gilgit baltistan`. Also the official portals, `net metering portal login` and `net billing portal login`: the person wants the utility's site.");
w("- **Things the business does not sell, or has not said it sells.** `solar lights for home in pakistan`, `solar heater for home in pakistan`, `solar light for home price` (lights and heaters); `solar inverter repair lahore` and `solar inverter repair in islamabad` (repair work); `inverex ups in pakistan` (UPS units); `solar installation courses`, `solar company lahore jobs` (training and careers); `solar company share price` (investing). Add a row back only if the client confirms the service.");
w("- **Marketplace and used-equipment queries** such as `solar panel olx sargodha` and `solar system olx lahore`. The intent is a classified listing, not an installer.");
w("- **Astronomy and other noise** that shares the words \"solar system\": `which solar system has the most moons`, `solar system games for kids`. These rows are in the data and have nothing to do with the business.");
w("- **Daily-rate queries** such as `solar panel aaj ka rate in pakistan`. The site cannot promise a daily rate list and the price policy is not decided (see \"Not yet known\"). The panel page covers the topic by explaining what sets the price.");
w("- **\"Best\" wording.** Queries like `which solar company is best in pakistan` stay as questions answered on the page. The word \"best\" never goes in a title or description.");
w();

w("## Not yet known");
w();
w("- **Search volumes.** None of the keyword data has volumes, so every ranking of one phrase over another here is a judgement from the wording and the page's role, not from demand. Pull volumes from Search Console (queries the old site already shows for) and a keyword tool before the final titles.");
w("- **Actual rankings and clicks.** Needs Search Console access (see `docs/SEO-MIGRATION.md`, \"Needed before launch\"). It will decide the title phrase for every page, and in particular whether `/locations/*` rather than `/outlets/*` is the URL that ranks.");
w("- **Which brand pages are justified.** The four brand pages (`growatt`, `fronus`, `longi`, `canadian-solar`) stay at stage `next` until the client sends the stock list and dealer status. The inverter title phrase \"Growatt & Fronus\" depends on the same answer.");
w("- **Price policy.** Whether size, product and hub pages show a price range with an as-of date or no price at all. This sets how much of the price-query intent those pages can serve.");
w("- **Which outlets are open.** Multan and Gilgit especially. It changes the outlet titles and the questions on those pages.");
w("- **The SERP notes are unverified.** `4a-serp.md` and `4b-serp.md` came from an AI assistant. Open the Google results for the primary queries yourself before relying on page-type claims or People Also Ask lines.");
w("- **Roman Urdu demand.** The Urdu file holds phrases people typed, but nothing says how many people type them. Use them as FAQ wording first; build `/ur/` pages only if Search Console shows the traffic.");

fs.writeFileSync("../../../KEYWORD-MAP.md", out);

// reports
const bad = [];
const seen = new Set();
let max = 0;
for (const [p, t] of titleLens) {
  if (t.length > 60) bad.push(["len", p, t.length]);
  if (seen.has(t.toLowerCase())) bad.push(["dup", p, t]);
  seen.add(t.toLowerCase());
  max = Math.max(max, t.length);
}
for (const [k, kind, l] of lens) {
  if (kind === "title" && (l < 50 || l > 60)) bad.push(["pattern title", k, l]);
  if (kind === "desc" && k !== "company" && (l < 120 || l > 160)) bad.push(["desc", k, l]);
  if (kind === "desc" && k === "company" && (l < 120 || l > 160)) bad.push(["desc", k, l]);
}
console.log("titles", titleLens.length, "max", max, "problems", JSON.stringify(bad));
console.log("lens", JSON.stringify(lens));
