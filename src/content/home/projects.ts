/*
  Homepage section 7, Projects (docs/COPY-HOME.md). The facts come from live project pages that call parts of
  themselves placeholders, so each project is unconfirmed and a production build leaves the section out.
  The photos are the client's own, taken from the old site (640 px wide, watermarked): which photo belongs to which
  named project is a guess from the subject (a tubewell, a factory, a house) and the client must confirm it.
  Links are the final project URLs.
*/
const WEB = "Website says (live projects_*.html pages, which call parts of themselves placeholders). Unconfirmed";

export type ProjectItem = {
  slug: string;
  place: string;
  city: string;
  /** The caption line, city and type. */
  line: string;
  /** System size as the figure, and the connection type beside it. */
  kw: string;
  mode: string;
  alt: string;
  href: string;
  image: { src: string; width: number; height: number };
  confirmed: boolean;
  source: string;
};

export const projectsSection = {
  title: "Built, connected, running.",
  lead: "Real systems from our Lahore and Sargodha work.",
  see: "See the project",
  all: "See all projects",
  allHref: "/projects/",
  items: [
    {
      slug: "company-bagh-sargodha-10kw-farm",
      place: "Near Company Bagh",
      city: "Sargodha",
      line: "Sargodha, Farm",
      kw: "10 kW",
      mode: "On-grid",
      alt: "Solar panels on a pole above a tubewell pipe pouring water into a channel",
      href: "/projects/company-bagh-sargodha-10kw-farm/",
      image: { src: "/images/project-tubewell-640.webp", width: 640, height: 400 },
      confirmed: false,
      source: WEB,
    },
    {
      slug: "gulberg-iii-lahore-20kw-commercial",
      place: "Gulberg III",
      city: "Lahore",
      line: "Lahore, Commercial",
      kw: "20 kW",
      mode: "On-grid",
      alt: "Solar inverter and control panel on a wall, with rows of panels on a roof below",
      href: "/projects/gulberg-iii-lahore-20kw-commercial/",
      image: { src: "/images/project-industrial-640.webp", width: 640, height: 400 },
      confirmed: false,
      source: WEB,
    },
    {
      slug: "dha-phase-5-lahore-15kw",
      place: "DHA Phase 5",
      city: "Lahore",
      line: "Lahore, Home",
      kw: "15 kW",
      mode: "On-grid",
      alt: "Solar inverter and meter box on a wall beside a roof with a panel frame",
      href: "/projects/dha-phase-5-lahore-15kw/",
      image: { src: "/images/project-residential-640.webp", width: 640, height: 400 },
      confirmed: false,
      source: WEB,
    },
  ] as ProjectItem[],
};
