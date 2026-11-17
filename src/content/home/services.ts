/*
  Homepage section 4, What we do (docs/COPY-HOME.md). Each card is flagged like a fact: an unconfirmed card is
  left out of a production build. Links are the final service URLs (src/routes.ts). The four images are CGI stand-ins
  taken from the old site's renders (design/img/src) until the Gemini image quota resets; none shows a real project.
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
    imagePending: false,
    image: { src: "/images/service-homes-800.webp", width: 800, height: 600 },
    confirmed: true,
    source: AMEER,
  },
  {
    title: "Business and industry",
    text: "Solar for shops, offices and factories, from a small rooftop to a large plant. Cut the daytime bill that eats your margin.",
    link: "See business solar",
    href: "/services/commercial-solar/",
    alt: "Rows of solar panels in evening light below high-voltage power lines",
    imagePending: false,
    image: { src: "/images/service-business-800.webp", width: 800, height: 600 },
    confirmed: true,
    source: AMEER,
  },
  {
    title: "Farms and tubewells",
    text: "Run your tubewell and farm loads on sunlight. Less diesel, less dependence on the grid.",
    link: "See farm solar",
    href: "/services/agricultural-solar/",
    alt: "Solar panels beside a tubewell on farmland",
    imagePending: false,
    image: { src: "/images/service-farms-800.webp", width: 800, height: 600 },
    confirmed: false,
    source: WEB,
  },
  {
    title: "Net metering",
    text: "Send spare power to the grid and earn credit on your bill. We prepare and file the application with your DISCO.",
    link: "See net metering",
    href: "/services/net-metering-support/",
    alt: "Solar panels on a flat roof beside an inverter and a meter box",
    imagePending: false,
    image: { src: "/images/service-netmetering-800.webp", width: 800, height: 600 },
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
