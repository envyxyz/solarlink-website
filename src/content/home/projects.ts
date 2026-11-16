/*
  Homepage section 7, Projects (docs/COPY-HOME.md). The facts come from live project pages that call parts of
  themselves placeholders, so each project is unconfirmed and a production build leaves the section out. No project
  photos exist yet: every card is imagePending and shows an empty well at 3:4. Links are the final project URLs.
*/
const WEB = "Website says (live projects_*.html pages, which call parts of themselves placeholders). Unconfirmed";

export type ProjectItem = {
  slug: string;
  place: string;
  city: string;
  size: string;
  alt: string;
  href: string;
  imagePending: boolean;
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
      slug: "dha-phase-5-lahore-15kw",
      place: "DHA Phase 5",
      city: "Lahore",
      size: "15 kW on-grid",
      alt: "15 kW solar system on a villa roof in DHA Phase 5, Lahore",
      href: "/projects/dha-phase-5-lahore-15kw/",
      imagePending: true,
      confirmed: false,
      source: WEB,
    },
    {
      slug: "gulberg-iii-lahore-20kw-commercial",
      place: "Gulberg III",
      city: "Lahore",
      size: "20 kW on-grid",
      alt: "20 kW solar system on a commercial building in Gulberg III, Lahore",
      href: "/projects/gulberg-iii-lahore-20kw-commercial/",
      imagePending: true,
      confirmed: false,
      source: WEB,
    },
    {
      slug: "company-bagh-sargodha-10kw-farm",
      place: "Near Company Bagh",
      city: "Sargodha",
      size: "10 kW on-grid",
      alt: "10 kW solar system powering a tubewell near Company Bagh, Sargodha",
      href: "/projects/company-bagh-sargodha-10kw-farm/",
      imagePending: true,
      confirmed: false,
      source: WEB,
    },
  ] as ProjectItem[],
};
