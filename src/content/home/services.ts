/*
  Homepage section 4, What we do (docs/COPY-HOME.md). Each card is flagged like a fact: an unconfirmed card is
  left out of a production build. Links are the final service URLs (src/routes.ts). The four source images are not
  generated yet, so every card is imagePending and shows an empty well at 4:3.
*/
const AMEER = "Ameer, 13 Nov 2026 (Business Profile)";
const WEB = "Website says (solarlink.com.pk crawl, 13 Nov 2026), Business Profile. Unconfirmed";

export type ServiceCard = {
  title: string;
  text: string;
  link: string;
  href: string;
  alt: string;
  imagePending: boolean;
  image?: { src: string; width: number; height: number };
  confirmed: boolean;
  source: string;
};

const cards: ServiceCard[] = [
  {
    title: "Homes",
    text: "Rooftop solar sized to your monthly bill. On-grid or hybrid, with the net metering filed for you.",
    link: "See home solar",
    href: "/services/residential-solar/",
    alt: "Solar panels on the roof of a Pakistani family home",
    imagePending: true,
    confirmed: true,
    source: AMEER,
  },
  {
    title: "Business and industry",
    text: "Solar for shops, offices and factories, from a small rooftop to a large plant. Cut the daytime bill that eats your margin.",
    link: "See business solar",
    href: "/services/commercial-solar/",
    alt: "Rows of solar panels on a factory roof",
    imagePending: true,
    confirmed: true,
    source: AMEER,
  },
  {
    title: "Farms and tubewells",
    text: "Run your tubewell and farm loads on sunlight. Less diesel, less dependence on the grid.",
    link: "See farm solar",
    href: "/services/agricultural-solar/",
    alt: "Solar panels beside a tubewell on farmland",
    imagePending: true,
    confirmed: false,
    source: WEB,
  },
  {
    title: "Net metering",
    text: "Send spare power to the grid and earn credit on your bill. We prepare and file the application with your DISCO.",
    link: "See net metering",
    href: "/services/net-metering-support/",
    alt: "A solar meter and inverter on a wall",
    imagePending: true,
    confirmed: true,
    source: AMEER,
  },
];

export const servicesSection = {
  id: "what-we-do",
  title: "Solar for every kind of meter.",
  lead: "Pick your type. We size it, supply it and install it.",
  cards,
};
