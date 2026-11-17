import { outlets } from "@/content";
import { show } from "@/lib/facts";
import { faq, make, pics } from "./shared";
import type { PageDoc } from "../types";

const outletLinks = outlets.map((o) => {
  const parts = [show(o.addressLines)?.join(", "), show(o.phones)?.join(", "), show(o.hours)].filter(Boolean);
  return {
    label: `SolarLink ${o.city}`,
    text: parts.length ? parts.join(". ") : "Address, phone and hours are being confirmed.",
    href: o.path,
  };
});

export const companyDocs: PageDoc[] = [
  make({
    path: "/about-us/", kind: "company",
    title: "About SolarLink Pakistan | Solar Supply and Installation",
    description: "SolarLink Pakistan supplies and installs solar systems for homes, businesses and farms, with shops in Lahore, Islamabad and Sargodha.",
    h1: "About SolarLink",
    lead: "SolarLink supplies and installs solar systems for homes, businesses and farms, and helps customers with net metering.",
    image: pics.hero,
    blocks: [
      { type: "prose", heading: "What we do", paragraphs: [
        "We sell and fit solar panels, inverters and batteries, design systems around a customer's bills and roof, and prepare net metering applications. Customers can visit a shop, call, or send a request through the quote form.",
        "The company story, the team and the registration details are being confirmed and will appear on this page.",
      ] },
      { type: "links", heading: "Where to find us", items: [
        { label: "Our outlets", text: "Visit a shop, call or message us about a system or a product.", href: "/outlets/" },
        { label: "Our services", text: "Home, business, industrial and farm solar, and net metering support.", href: "/services/" },
        { label: "Our projects", text: "Installations we have completed, with details being confirmed.", href: "/projects/" },
      ] },
    ],
    related: [{ label: "Contact us", href: "/contact-us/" }, { label: "Get a quote", href: "/get-quote/" }],
  }),
  make({
    path: "/contact-us/", kind: "company",
    title: "SolarLink Contact Number and Addresses",
    description: "Find the SolarLink contact number, address and opening hours for each shop, or send a request through the quote form.",
    h1: "Contact SolarLink",
    lead: "Call, message or visit the shop nearest to you. If you want a system priced, the quote form is the quickest way to start.",
    blocks: [
      { type: "links", heading: "Our shops", items: outletLinks },
      { type: "prose", heading: "Which way to reach us", paragraphs: [
        "For a system, send a photo of your latest electricity bill with your city and area. For a product, name the brand or type you are looking for. For net metering, tell us your distribution company.",
        "Phone numbers, addresses and hours are being confirmed for every shop. Where one is not shown above, please use the quote form.",
      ] },
    ],
    related: [{ label: "Get a quote", href: "/get-quote/" }, { label: "All outlets", href: "/outlets/" }, { label: "FAQs", href: "/faqs/" }],
  }),
  make({
    path: "/get-quote/", kind: "company",
    title: "Get a Solar Quotation | SolarLink",
    description: "Ask SolarLink for a solar quotation. Send your bill, city and property type and we will suggest a system and arrange a site survey.",
    h1: "Get a solar quotation",
    lead: "Tell us about your home, business or farm. We use your bill and your roof to suggest a system, then arrange a site survey.",
    image: pics.homes,
    blocks: [
      { type: "steps", heading: "How a quote starts", items: [
        { title: "Send your details", text: "Your name, phone number, city and whether the property is a home, business or farm." },
        { title: "Share a recent bill", text: "A clear photo of your last electricity bill shows how much power you use." },
        { title: "We suggest a system", text: "We recommend a system type and size and answer your questions." },
        { title: "Site survey", text: "We visit to check the roof, shade and meter before anything is confirmed." },
      ] },
      { type: "prose", heading: "What affects the answer", paragraphs: [
        "Your units used, your roof or land, shade, and whether you want backup during power cuts all change the system. That is why a survey comes before a final quotation. Pricing is given by the outlet once these are known.",
      ] },
    ],
    related: [{ label: "Contact us", href: "/contact-us/" }, { label: "Solar calculator", href: "/solar-calculator/" }, { label: "FAQs", href: "/faqs/" }],
  }),
  make({
    path: "/faqs/", kind: "guide",
    title: "Solar System FAQs Pakistan | SolarLink",
    description: "Plain answers to common questions about how solar works, sizing, net metering, installation and what to send for a quotation.",
    h1: "Solar system questions, answered",
    lead: "Short answers to what people ask us most. For your own roof and bills, ask a shop or request a quote.",
    blocks: [
      faq("Common questions", [
        ["How does a solar system work?", "Solar panels turn sunlight into direct current electricity. An inverter converts it into the alternating current your appliances use. Your home or business uses that power first, and on a grid-connected system the grid covers whatever the panels cannot supply, such as at night or on very cloudy days."],
        ["What is the difference between on-grid, hybrid and off-grid?", "An on-grid system works alongside the grid and has no battery. A hybrid system adds batteries so chosen loads keep running during a power cut. An off-grid system has no grid connection and relies on panels and batteries alone. Which one suits you depends on how often the power goes and what you need to keep running."],
        ["How is the size of my system decided?", "Size comes from how much electricity you use, which your recent bills show, plus the free space and shade on your roof or land, and what you want to run. A bill gives a first estimate. A site survey confirms it, because roofs and shade differ from one building to the next."],
        ["Do I need a battery?", "Not always. If power cuts are rare, an on-grid system without batteries is the simplest. If you need lights, fans or a few appliances during cuts, a hybrid system with a battery makes sense. Batteries add cost and upkeep, so decide based on how you actually use power, not just in case."],
        ["What is net metering?", "Net metering lets a grid-connected system send extra daytime power to the grid and draw it back when needed, tracked by a two-way meter. It needs an application to your distribution company and an approved meter. The rules and credit rates are set by the regulator and can change, so check the current rules."],
        ["How does the net metering process work?", "In outline, the system is designed to your distribution company's requirements, an application is filed with the needed documents, the company inspects the site, and a two-way meter is installed. Timing depends on the company, so we do not promise dates. SolarLink can prepare and file the application for you."],
        ["What happens on installation day?", "After the survey and agreement, the team brings the panels, mounting structure, inverter and cabling to site. The structure is fixed first, then the panels, then the wiring and inverter. The system is tested before it is switched on, and you are shown how to read the inverter display and what to look after."],
        ["What should I send to get a quote?", "Send a clear photo of your latest electricity bill, your city and area, whether it is a home, business or farm, and a photo or rough sketch of the roof or land. Tell us what you want to run and whether you have frequent power cuts. With these, we can suggest a system type and arrange a site survey."],
        ["Does a solar system need maintenance?", "Very little. Panels need occasional cleaning, since dust and bird droppings reduce output, and the system should be checked now and then for loose connections and for shade from new construction. Inverters show faults on their display or app. Ask your installer for a simple care routine suited to your site."],
      ]),
    ],
    related: [{ label: "How solar works", href: "/how-solar-works/" }, { label: "Net metering guide", href: "/net-metering-guide/" }, { label: "Get a quote", href: "/get-quote/" }],
  }),
  make({
    path: "/solar-financing/", kind: "service",
    title: "Solar System on Installments | SolarLink",
    description: "Thinking about paying for solar in installments? Financing options with SolarLink are being confirmed. Ask a shop for the latest.",
    h1: "Paying for solar",
    lead: "Many customers ask whether a solar system can be paid for in installments. Our financing options are being confirmed.",
    blocks: [
      { type: "prose", heading: "Where this stands", paragraphs: [
        "We have not yet confirmed which payment options are available, in which cities, or on what terms. Until we do, this page does not describe any plan.",
        "If financing matters to your decision, ask your nearest shop before you decide. They can tell you what is available today.",
      ] },
      { type: "steps", heading: "Planning your purchase", items: [
        { title: "Know your bill", text: "Your recent electricity bills show what a system is replacing." },
        { title: "Get a quotation", text: "A quote for the system you need gives you a figure to plan around." },
        { title: "Ask about payment options", text: "Ask the shop which ways of paying they offer before you commit." },
      ] },
    ],
    related: [{ label: "Get a quote", href: "/get-quote/" }, { label: "Contact us", href: "/contact-us/" }, { label: "FAQs", href: "/faqs/" }],
  }),
  make({
    path: "/warranty-and-support/", kind: "company",
    title: "Solar System Warranty Pakistan | SolarLink Support",
    description: "Warranty and after-sales support for SolarLink solar systems. The details are being confirmed; ask a shop about your equipment.",
    h1: "Warranty and support",
    lead: "Solar equipment usually comes with a manufacturer warranty, and good support matters after installation. Our details are being confirmed.",
    blocks: [
      { type: "prose", heading: "What we can say now", paragraphs: [
        "Panels, inverters and batteries are made by different brands, and each brand has its own warranty. Our own warranty and after-sales process are being confirmed and will appear here.",
        "Until then, this page states no warranty period or support promise. If you already have a SolarLink system and need help, contact your shop.",
      ] },
      { type: "links", heading: "Need help now", items: [
        { label: "Contact a shop", text: "Phone, message or visit the outlet nearest you.", href: "/contact-us/" },
        { label: "All outlets", text: "Find the shop that served your area.", href: "/outlets/" },
        { label: "Questions about solar", text: "Short answers about running and looking after a system.", href: "/faqs/" },
      ] },
    ],
    related: [{ label: "Contact us", href: "/contact-us/" }, { label: "Products", href: "/products/" }],
  }),
];
