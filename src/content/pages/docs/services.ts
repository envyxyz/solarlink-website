import { faq, make, pics } from "./shared";

const sizing = { type: "sizing" as const, heading: "Size it from your bill", lead: "Move the slider to see a rough system size for your bill. It is an estimate: the site survey confirms it." };
const flow = (mode: "on-grid" | "hybrid" | "off-grid") => ({ type: "diagram" as const, heading: "How the power flows", mode });

const survey = "The next step is a free site survey, so the system is sized to your roof and your bill, not to a guess.";

export const services = [
  make({
    path: "/services/residential-solar/", kind: "service",
    title: "Solar System for Home in Pakistan | SolarLink",
    description: "Home solar systems in Lahore, Islamabad and Sargodha: sized to your electricity bill, supplied and installed by SolarLink.",
    h1: "Solar for your home", lead: "A system sized to your electricity bill and your roof, supplied and installed, with the net metering paperwork filed for you.",
    image: pics.homes,
    blocks: [
      { type: "prose", heading: "What a home system is", paragraphs: ["Solar panels on the roof make electricity in the daytime. An inverter turns it into the power your home uses. On an on-grid system the grid covers the nights; a hybrid system adds a battery for backup.", "The right size comes from your bills. We look at your recent units, your roof and what you want to run through a cut, then suggest a system. " + survey] },
      { type: "feature", heading: "A system sized to you", text: "The right size comes from your bills, your roof and what you want to run through a cut.", image: pics.homes, tone: "sunken" },
      { type: "steps", heading: "How it works", items: [
        { title: "Send a recent bill", text: "A photo of your last electricity bill is enough to start." },
        { title: "Site survey", text: "We check the roof, the shade and the meter, then size the system." },
        { title: "Supply and installation", text: "Panels, inverter, structure and cabling, installed on site." },
        { title: "Net metering", text: "We prepare and file the application with your distribution company." },
      ] },
      flow("hybrid"),
      sizing,
      faq("Questions about home solar", [
        ["Which system type suits a home?", "On-grid is the simplest if your area has few power cuts. Hybrid adds a battery so key loads keep running when the grid is off. The survey decides."],
        ["Can you work out my size from my bill?", "Yes, as an estimate. The site survey confirms it, because the roof and shade change the answer."],
      ]),
    ],
    related: [{ label: "On-grid systems", href: "/solar-systems/on-grid/" }, { label: "Hybrid systems", href: "/solar-systems/hybrid/" }, { label: "Net metering support", href: "/services/net-metering-support/" }],
  }),
  make({
    path: "/services/commercial-solar/", kind: "service",
    title: "Commercial Solar System in Pakistan | SolarLink",
    description: "Solar for shops, offices and commercial sites, designed around daytime load and installed by SolarLink.",
    h1: "Solar for business", lead: "Shops, offices, clinics and commercial buildings use most of their power in the daytime, which is when solar makes it.",
    image: pics.business,
    blocks: [
      { type: "prose", heading: "Built around your daytime load", paragraphs: ["A commercial system is sized to what the site uses while it is open, so most of the solar power is used on the spot. We read your bills, check the roof or ground space and the electrical panel, then propose a layout.", survey] },
      { type: "feature", heading: "Built around the daytime", text: "Shops and offices use most of their power while they are open, which is when solar makes it.", image: pics.business, tone: "sunken" },
      { type: "steps", heading: "How it works", items: [
        { title: "Share your bills", text: "Several months of bills show the load and the tariff." },
        { title: "Site survey", text: "Roof or ground space, the electrical panel, shade and access." },
        { title: "Design and installation", text: "Panels, inverters, structure, protection and cabling." },
        { title: "Net metering", text: "Application, approval and commissioning, filed for you." },
      ] },
      flow("on-grid"),
      sizing,
      faq("Questions about commercial solar", [
        ["Is net metering available for a business?", "Rules depend on the connection type and the distribution company. Ask us and we will check your case."],
        ["Do you handle the paperwork?", "Yes. We prepare and file the net metering application."],
      ]),
    ],
    related: [{ label: "Industrial solar", href: "/services/industrial-solar/" }, { label: "On-grid systems", href: "/solar-systems/on-grid/" }, { label: "Net metering support", href: "/services/net-metering-support/" }],
  }),
  make({
    path: "/services/industrial-solar/", kind: "service",
    title: "Industrial Solar System in Pakistan | SolarLink",
    description: "Large-scale solar for factories and industrial sites, designed, supplied and installed by SolarLink.",
    h1: "Solar for industry", lead: "Factories and large sites need a plant designed to their load, their roof or land and their connection.",
    image: pics.business,
    blocks: [
      { type: "prose", heading: "Large systems, planned properly", paragraphs: ["An industrial plant starts with the load profile: what runs, when, and on which connection. From that we plan the array, inverters, protection and metering, then supply and install it.", "Because every site differs, we start with a conversation and a survey rather than a package. Send your recent bills and a description of the site."] },
      { type: "feature", heading: "Planned to the load", text: "Every site differs, so we start with a conversation and a survey rather than a package.", image: pics.business, tone: "night" },
      { type: "facts", heading: "What we need from you", items: [{ label: "Bills", value: "Recent months of electricity bills" }, { label: "Site", value: "Roof or land available, with photos" }, { label: "Connection", value: "Tariff and sanctioned load" }, { label: "Goal", value: "What you want solar to cover" }] },
    ],
    related: [{ label: "Commercial solar", href: "/services/commercial-solar/" }, { label: "Net metering support", href: "/services/net-metering-support/" }],
  }),
  make({
    path: "/services/agricultural-solar/", kind: "service",
    title: "Solar Tube Well in Pakistan | SolarLink",
    description: "Solar power for farms and tubewells: pumps run directly from the sun, sized to the pump and the field.",
    h1: "Solar for farms and tubewells", lead: "A solar tubewell runs its pump from the sun, so water costs no electricity or diesel while the sun is up.",
    image: pics.farms,
    blocks: [
      { type: "prose", heading: "How a solar tubewell works", paragraphs: ["Panels feed a pump inverter that drives the pump directly. The pump runs when the sun is out, and many farms store the water in a tank or channel for use later.", "The size depends on the pump power, the depth of the water and how much water you need. We ask for those details, then size the array and the drive."] },
      { type: "feature", heading: "Water from the sun", text: "A solar tubewell runs its pump from the sun, so water costs no electricity or diesel while the sun is up.", image: pics.farms, tone: "night" },
      flow("off-grid"),
      { type: "facts", heading: "What we need from you", items: [{ label: "Pump", value: "Horsepower and make, if known" }, { label: "Water depth", value: "Depth to the water in the bore" }, { label: "Water need", value: "Area or volume you irrigate" }, { label: "Location", value: "Village or area, with a photo of the site" }] },
    ],
    related: [{ label: "Off-grid systems", href: "/solar-systems/off-grid/" }, { label: "Projects", href: "/projects/" }],
  }),
  make({
    path: "/services/net-metering-support/", kind: "service",
    title: "Net Metering Application Support | SolarLink",
    description: "SolarLink prepares and files your net metering application and supports you through approval and commissioning.",
    h1: "Net metering support", lead: "With net metering the grid takes the extra power your panels make and your bill is reduced by that credit. We handle the application.",
    image: pics.netmetering,
    blocks: [
      { type: "feature", heading: "We handle the application", text: "The grid takes the extra power your panels make and your bill is reduced by that credit.", image: pics.netmetering, tone: "sunken" },
      { type: "steps", heading: "What we do for you", items: [
        { title: "Prepare the application", text: "We collect the documents and complete the forms for your distribution company." },
        { title: "File it", text: "We submit it and follow it for you." },
        { title: "Inspection and approval", text: "We support the site inspection and approval steps." },
        { title: "Commissioning", text: "The new meter is installed and the system goes live." },
      ] },
      { type: "prose", heading: "Rules change", paragraphs: ["Net metering rules, including how exported power is credited, are set by the regulator and have changed more than once. We check the current rules for your case before we file."] },
    ],
    related: [{ label: "Net metering guide", href: "/net-metering-guide/" }, { label: "Home solar", href: "/services/residential-solar/" }],
  }),
];
