import { outlets } from "@/content";
import { show } from "@/lib/facts";
import { faq, make, pics } from "./shared";
import type { PageBlock, PageDoc } from "../types";

/*
  Seven hub pages (23 Nov 2026 rewrite). Each opens with an intro that answers the hub's own query, then the cards for
  its child pages, then the rest. `from` is the list of docs the hub lists. The card text is each child's lead.
  Sun figures: Global Solar Atlas (World Bank Group, ESMAP, Solargis), read 23 Nov 2026. See docs/research/agy-2026-11-23/sun.md.
*/

type Hub = {
  path: string; title: string; description: string; h1: string; lead: string; heading: string;
  from: PageDoc[]; image?: PageDoc["image"]; before?: PageBlock[]; after?: PageBlock[]; related: { label: string; href: string }[];
};

const hub = (h: Hub): PageDoc =>
  make({
    path: h.path, kind: "hub", title: h.title, description: h.description, h1: h.h1, lead: h.lead, image: h.image,
    blocks: [...(h.before ?? []), { type: "links", heading: h.heading, items: h.from.map((d) => ({ label: d.h1, text: d.lead, href: d.path, image: d.image })) }, ...(h.after ?? [])],
    related: h.related,
  });

const quote = { label: "Get a quote", href: "/get-quote/" };

/** One street address line per outlet, from the confirmed facts. */
const outletLines = outlets.map((o) => {
  const a = show(o.addressLines);
  return a ? `${o.city}: ${a.join(", ")}.` : `${o.city}.`;
});

export const hubs = (all: { services: PageDoc[]; systems: PageDoc[]; products: PageDoc[]; outlets: PageDoc[]; projects: PageDoc[]; guides: PageDoc[]; articles: PageDoc[] }) => [
  hub({
    path: "/services/", title: "Solar Services in Pakistan | SolarLink",
    description: "Solar services in Pakistan from SolarLink: homes, businesses, industry and farms, plus net metering filed for you. Shops in Lahore, Islamabad and Sargodha.",
    h1: "Solar services", heading: "What we do", image: pics.homes, from: all.services,
    lead: "Solar for homes, businesses, industry and farms, and the net metering paperwork that goes with it.",
    before: [
      { type: "feature", heading: "Solar for every building", text: "Every system starts from your bill and your roof: we survey the site, size the system, supply and install it, and file the net metering application.", tone: "night" },
      { type: "prose", heading: "Which service fits you", paragraphs: [
        "A solar service is a bundle: the survey, the design, the equipment, the work on site and the paperwork with your electricity company. We split the pages below by who the customer is, because a home, a shop, a factory and a farm each use power at different hours and need different answers.",
        "A home mostly needs to cut a monthly bill and, in some areas, keep the fans and the fridge running through a power cut. A shop or an office uses most of its power while it's open, so the sun and the load line up. A factory has a much bigger load and often a three-phase supply. A farm cares about the pump. If you're not sure which fits, start with the page closest to you and message the shop; they'll point you the right way.",
        "Net metering is its own service because it's its own job. It means applications, a design file, an inspection and a two-way meter, and it moves at your electricity company's pace. We prepare and file it for you, whichever system you choose.",
      ] },
    ],
    after: [
      { type: "steps", heading: "How every job runs", items: [
        { title: "Send a recent bill", text: "A photo of your last electricity bill, or several months of units if you have them, is enough to start." },
        { title: "Site survey", text: "We check the roof or the ground, the shade, the meter and the electrical panel." },
        { title: "Design and quote", text: "You get the system size, the equipment by model and a written, itemised quote." },
        { title: "Supply and installation", text: "Panels, inverter, structure and cabling, installed on site." },
        { title: "Net metering and after-sales", text: "We file the application and look after the system once it is running." },
      ] },
      faq("Questions about our services", [
        ["Which cities do you work in?", "We have a shop in Lahore, one in Islamabad and one in Sargodha. For a site outside those cities, message the nearest shop and ask."],
        ["Can I only buy panels or an inverter?", "Yes. The shops also supply panels, inverters and batteries over the counter. Ask what is in stock before you visit, since stock changes."],
        ["Who files the net metering application?", "We do. We prepare the file, submit it and follow it through inspection and the two-way meter."],
        ["How do I get a price?", "Send a recent bill. We don't list prices on the site, because the cost depends on the size, the inverter type, a battery and the structure, and we'd rather quote for your roof than guess."],
      ]),
    ],
    related: [quote, { label: "Solar systems", href: "/solar-systems/" }, { label: "Net metering guide", href: "/net-metering-guide/" }, { label: "Our outlets", href: "/outlets/" }],
  }),
  hub({
    path: "/solar-systems/", title: "Solar System Price in Pakistan | SolarLink",
    description: "What decides the price of a solar system in Pakistan, how on-grid, hybrid and off-grid differ, and what 3 to 20 kW makes. Quotes follow a site survey.",
    h1: "Solar systems", heading: "Types and sizes", image: pics.homes, from: all.systems,
    lead: "By type and by size. Prices are quoted after a survey, so none are listed here.",
    before: [
      { type: "prose", heading: "What a solar system costs, and why we don't print a number", paragraphs: [
        "The search is usually 'solar system price in Pakistan', and the honest answer is that no single figure is right. Panel prices, inverter prices and the rupee move, and two houses with the same size system can need different structures, cable runs and protection. A price printed here today would be wrong in a month, and it would anchor you to a system that may not fit your roof.",
        "What we can do is list what decides it. The size in kW comes first. The inverter type is next: on-grid is the cheapest, hybrid costs more because of the inverter and the battery, and off-grid needs the biggest battery. The brand and model of the panels and inverter matter, as does the mounting structure (a flat concrete roof, a tin roof and open ground all differ), the length of the cable runs, the protection gear and earthing, and the net metering paperwork. Send us a recent electricity bill and we'll turn those into one itemised quote after a survey.",
        "Then pick the type, then the size. The three type pages explain how each system works and who it suits. The five size pages say what each kW band is typically used for.",
      ] },
      { type: "facts", heading: "What a system makes in a year", items: [
        { label: "3 kW", value: "About 4,400 kWh a year in Lahore" },
        { label: "5 kW", value: "About 7,300 kWh a year in Lahore" },
        { label: "10 kW", value: "About 14,700 kWh a year in Lahore" },
        { label: "15 kW", value: "About 22,000 kWh a year in Lahore" },
        { label: "20 kW", value: "About 29,300 kWh a year in Lahore" },
      ] },
      { type: "prose", paragraphs: [
        "These come from the Global Solar Atlas (World Bank Group, ESMAP and Solargis, read 23 November 2026), which gives Lahore about 1,466 kWh per kW of panels a year for a fixed, south-facing array at its best tilt. Islamabad is about 6% higher (1,559) and Sargodha about 3% higher (1,513). Your own roof will make less if it is shaded, flat or dusty. Use the numbers to compare sizes, not as a promise.",
      ] },
    ],
    after: [
      { type: "diagram", heading: "How the power flows", mode: "hybrid" },
      { type: "sizing", heading: "Size it from your bill", lead: "Move the slider to see a rough system size for your bill. It is an estimate: the site survey confirms it." },
      faq("Questions about solar systems", [
        ["Which type should I choose?", "On-grid if cuts are rare and you want the lowest cost. Hybrid if you want a battery to hold key loads through outages. Off-grid only where there's no grid, such as a remote farm or a pump."],
        ["Why is there no price on this page?", "Because prices change and depend on your roof. We quote after a site survey and write the quote out item by item."],
        ["How big a system do I need?", "It comes from your units on the bill and your roof. Use the slider for an estimate, or send us the bill and we'll work it out properly."],
      ]),
    ],
    related: [quote, { label: "Solar calculator", href: "/solar-calculator/" }, { label: "How solar works", href: "/how-solar-works/" }, { label: "Services", href: "/services/" }],
  }),
  hub({
    path: "/products/", title: "Solar Products in Pakistan | SolarLink",
    description: "Solar panels, inverters, batteries and mounting parts from SolarLink shops in Lahore, Islamabad and Sargodha. Ask your nearest shop what is in stock today.",
    h1: "Solar products", heading: "What we supply", image: pics.panel, from: all.products,
    lead: "Panels, inverters, batteries and the parts that hold a system together.",
    before: [
      { type: "prose", heading: "What goes into a solar system", paragraphs: [
        "Four kinds of product make a working system. Panels turn sunlight into direct current. An inverter turns that into the power your building uses and manages the connection to the grid. A battery, on hybrid and off-grid systems, stores the surplus for the evening and for power cuts. And the structure, cables, breakers and earthing hold it all together and keep it safe. The pages below cover each in turn.",
        "SolarLink shops supply these over the counter as well as installing them, so you can buy a part for an existing system or ask us to supply and fit a whole one. Stock and prices change often, so we don't list them online. Call or message the shop nearest you and ask for what you need.",
        "When you compare quotes, compare the same things. Ask for the make and model of every panel and inverter, the rated power in watts and kW, the maker's data sheet, and the warranty in writing from the manufacturer. A low price that leaves out the structure or the protection gear isn't the same offer as a higher one that includes them.",
      ] },
    ],
    after: [
      { type: "shop", heading: "Panels in the shops", category: "panels" },
      { type: "brands", heading: "Brands" },
      faq("Questions about products", [
        ["Do you sell products without installing them?", "Yes. The shops supply panels, inverters, batteries and other items such as UPS units over the counter."],
        ["Which brands do you stock?", "Stock changes, and the brand list is still being confirmed with the client. Ask the shop what is available today."],
        ["Can you check a quote I already have?", "Send it to us. We'll look at whether the components, the structure and the protection are all listed, and say what's missing."],
      ]),
    ],
    related: [quote, { label: "Solar systems", href: "/solar-systems/" }, { label: "Our outlets", href: "/outlets/" }, { label: "Solar calculator", href: "/solar-calculator/" }],
  }),
  hub({
    path: "/outlets/", title: "Outlets in Lahore, Islamabad and Sargodha | SolarLink",
    description: "Find a SolarLink shop: head office on The Mall in Lahore, plus shops in Islamabad (I-14/3) and Sargodha (Company Bagh). Call, message or walk in.",
    h1: "Outlets", heading: "Find a shop", image: pics.hero, from: all.outlets,
    lead: "Our head office in Lahore and shops in Islamabad and Sargodha.",
    before: [
      { type: "prose", heading: "Where to find SolarLink", paragraphs: [
        "SolarLink has three shops. The head office is in Lahore, on The Mall, and the other two are in Islamabad and Sargodha. Each one supplies panels, inverters and batteries, designs and installs systems, and files net metering applications with the local electricity company. Walk in, call or send a message on WhatsApp.",
        `Addresses: ${outletLines.join(" ")} Phone numbers, WhatsApp numbers and opening hours sit on each shop's page.`,
        "Pick the shop nearest your property. The shop knows the local company, LESCO in Lahore, IESCO in Islamabad and FESCO in Sargodha, and how its sub-divisions handle net metering files. If you're between two, call the one you can reach more easily and ask whether they cover your area.",
      ] },
    ],
    after: [
      faq("Questions about our shops", [
        ["Can I just walk in?", "Yes. Opening hours are on each shop's page. A call or a message first saves a wasted trip if you want to see a particular product."],
        ["Do all shops do the same work?", "They supply products, design and install systems and file net metering applications. The Sargodha shop also works on farm and tubewell systems."],
        ["Where is the Lahore head office?", "At Munawar Center, on The Mall, opposite the State Bank building. It is the only SolarLink shop in Lahore."],
        ["Do you have a shop where I live?", "If it isn't Lahore, Islamabad or Sargodha, message the nearest shop and ask whether we can cover your site."],
      ]),
    ],
    related: [quote, { label: "Contact us", href: "/contact-us/" }, { label: "Services", href: "/services/" }, { label: "Solar systems", href: "/solar-systems/" }],
  }),
  hub({
    path: "/projects/", title: "Solar Installation Projects in Punjab & Islamabad",
    description: "Ten solar projects from the old SolarLink site in Lahore, Islamabad and Sargodha, kept as drafts until each owner confirms photos and details.",
    h1: "Projects", heading: "Recent work", from: all.projects,
    lead: "Ten systems listed on the old SolarLink site, kept here as drafts until each owner confirms the details and photos.",
    before: [
      { type: "prose", heading: "Solar installation projects across Punjab and Islamabad", paragraphs: [
        "This page collects solar installation projects in Lahore, Islamabad and Sargodha. Five are in Lahore (Bahria Town Phase 2, DHA Phase 5, Gulberg III, Johar Town and Model Town), three are in the Islamabad area (Bahria Town Phase 6, Sector I-14/3 and the PWD housing scheme) and two are near Company Bagh in Sargodha. The sizes run from 4.5 kW to 20 kW, and they cover on-grid and hybrid homes, a commercial roof and a farm tubewell.",
        "They're drafts. The old SolarLink site called each one a real project but used a placeholder image on every page and labelled its own before and after bills as placeholders. We've kept the place, the size, the system type and the kind of property, and left out every savings figure, quote and photo until the client confirms the job and sends real material.",
        "What a finished project page will show: the location, the system size and type, the equipment by model, the date, photos of the installed system, and the owner's real bill figures where they agree to share them. If you want to see work close to you before you visit, ask the nearest shop.",
      ] },
      { type: "projects", heading: "Recent work" },
    ],
    after: [
      faq("Questions about our projects", [
        ["Are these real installations?", "The old site listed them as real jobs. We haven't confirmed the details or the owners' agreement yet, so these are drafts and no figures are repeated."],
        ["Can I visit a system like mine?", "Ask your nearest shop. Whether a site visit is possible depends on the owner."],
        ["Will you add more projects?", "Yes, as the client confirms them with photos and details. Each will keep its own page."],
      ]),
    ],
    related: [quote, { label: "Our outlets", href: "/outlets/" }, { label: "Solar systems", href: "/solar-systems/" }, { label: "Services", href: "/services/" }],
  }),
  hub({
    path: "/resources/", title: "Solar Resources: Guides for Pakistan | SolarLink",
    description: "Solar resources for Pakistan: plain guides on how solar works and how net metering runs, plus calculators and short answers to the questions people ask first.",
    h1: "Solar resources", heading: "Read the guides", from: all.guides,
    lead: "Plain explanations of how solar works and how net metering runs.",
    before: [
      { type: "prose", heading: "Where to start", paragraphs: [
        "Solar is easier to buy once you know what you're buying. This page gathers the guides we write for people who are still deciding: how panels, inverters and the grid fit together, how net metering works under the current rules, and the questions people ask before they sign.",
        "If you've never looked at a system before, begin with how solar works. It explains the parts and why on-grid, hybrid and off-grid are different. If you already know you want solar and need to know what happens with the electricity company, go to the net metering guide, which follows an application from the first form to the two-way meter. Our FAQs sit alongside both, with short answers to specific questions.",
        "The calculators help with numbers. The solar calculator turns a monthly bill into a rough system size, the load calculator adds up what you want to run, and the battery calculator shows how long a battery will carry it. They're estimates, and the survey decides the final answer.",
      ] },
    ],
    after: [
      faq("Questions about the guides", [
        ["Are the guides specific to Pakistan?", "Yes. They follow Pakistani rules and the electricity companies in our three cities. Where a rule is set by NEPRA, the guide names the notification."],
        ["How current is the net metering guide?", "NEPRA replaced its 2015 net metering rules with the Prosumer Regulations 2026, so we write against the new text and mark its date. Check nepra.org.pk for the latest."],
        ["Can I ask a question that isn't answered?", "Message the nearest shop. If many people ask the same thing, we'll add it to the guides."],
      ]),
    ],
    related: [quote, { label: "Solar calculator", href: "/solar-calculator/" }, { label: "Solar blog", href: "/blog/" }, { label: "FAQs", href: "/faqs/" }],
  }),
  hub({
    path: "/blog/", title: "Solar Energy Blog - Tips, News & Guides | SolarLink",
    description: "Solar energy blog for Pakistan: tips and guides on sizing, brands, net metering and upkeep, with sourced numbers. Read it before you sign a quote.",
    h1: "Solar blog", heading: "Latest posts", from: all.articles,
    lead: "Short reads on choosing, sizing and looking after a solar system.",
    before: [
      { type: "prose", heading: "What the blog covers", paragraphs: [
        "The blog answers one question per post. Some posts help you choose: what size to buy, how on-grid, hybrid and off-grid compare, which inverter and panel brands people ask about, and which warning signs to watch for when you talk to an installer. Others deal with net metering, such as the mistakes that delay an application and what LESCO asks for. A few cover running a system once it is on the roof, from cleaning panels to working out when it pays for itself.",
        "We try to source the numbers. A tariff figure carries its date, a rule names the NEPRA notification, and a claim about sunshine names where the data came from. If a post has a figure with no source, treat it as a rough guide and ask us.",
        "Posts are short on purpose. For the long version of how solar works or how net metering runs, use the guides, and for a number for your own house, use the calculators or ask the shop.",
      ] },
    ],
    after: [
      faq("Questions about the blog", [
        ["How often do you post?", "When we have something worth saying. There's no schedule."],
        ["Can I suggest a topic?", "Yes. Message a shop with the question you wish someone had answered before you bought."],
      ]),
    ],
    related: [quote, { label: "Solar guides", href: "/resources/" }, { label: "Solar calculator", href: "/solar-calculator/" }, { label: "FAQs", href: "/faqs/" }],
  }),
];
