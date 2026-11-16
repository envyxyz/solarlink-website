/*
  Navigation and footer copy. Plain strings only (no business facts), so the client Nav can import it
  without pulling the facts module into the browser bundle. Re-exported from src/content.ts.
  Links are the final URLs from docs/PRD.md section 4.
*/
export const nav = {
  main: [
    { label: "Services", href: "/services/" },
    { label: "Products", href: "/products/" },
    { label: "Projects", href: "/projects/" },
    { label: "Outlets", href: "/outlets/" },
    { label: "Resources", href: "/resources/" },
  ],
  /** Extra links only the phone sheet carries (they sit in the footer on desktop). */
  sheetExtra: [
    { label: "About us", href: "/about-us/" },
    { label: "Contact us", href: "/contact-us/" },
    { label: "FAQs", href: "/faqs/" },
  ],
  quote: { label: "Get a free quote", labelShort: "Free quote", href: "/get-quote/" },
  homeLabel: "SolarLink home",
  mainLabel: "Main",
  menu: { open: "Open menu", close: "Close menu", title: "Menu" },
};

export const footer = {
  label: "Site footer",
  outletsTitle: "Our shops",
  headOffice: "Head office",
  hoursTitle: "Hours",
  callLabel: "Call",
  columns: [
    {
      title: "Services",
      links: [
        { label: "Solar for homes", href: "/services/residential-solar/" },
        { label: "Solar for business", href: "/services/commercial-solar/" },
        { label: "Solar for industry", href: "/services/industrial-solar/" },
        { label: "Solar for farms and tubewells", href: "/services/agricultural-solar/" },
        { label: "Net metering support", href: "/services/net-metering-support/" },
      ],
    },
    {
      title: "Products",
      links: [
        { label: "Solar panels", href: "/products/solar-panels/" },
        { label: "Inverters", href: "/products/inverters/" },
        { label: "Batteries", href: "/products/batteries/" },
        { label: "Accessories", href: "/products/accessories/" },
      ],
    },
    {
      title: "Learn",
      links: [
        { label: "Solar calculator", href: "/solar-calculator/" },
        { label: "How solar works", href: "/how-solar-works/" },
        { label: "Net metering guide", href: "/net-metering-guide/" },
        { label: "FAQs", href: "/faqs/" },
        { label: "Resources", href: "/resources/" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About us", href: "/about-us/" },
        { label: "Projects", href: "/projects/" },
        { label: "Contact us", href: "/contact-us/" },
        { label: "Get a free quote", href: "/get-quote/" },
      ],
    },
  ],
  legal: [
    { label: "Privacy", href: "/privacy/" },
    { label: "Sitemap", href: "/sitemap/" },
  ],
  legalLine: "© 2026 SolarLink. All rights reserved.",
  socialsTitle: "Follow us",
};
