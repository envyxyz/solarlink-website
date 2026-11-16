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

/** Footer: columns and legal line follow docs/COPY-HOME.md section 12. Every href is a path in src/routes.ts. */
export const footer = {
  outletsTitle: "Outlets",
  headOffice: "Head office",
  hoursTitle: "Hours",
  callLabel: "Call",
  columns: [
    {
      title: "Shop",
      links: [
        { label: "Solar panels", href: "/products/solar-panels/" },
        { label: "Inverters", href: "/products/inverters/" },
        { label: "Batteries", href: "/products/batteries/" },
        { label: "Accessories", href: "/products/accessories/" },
        { label: "All products", href: "/products/" },
      ],
    },
    {
      title: "Solar",
      links: [
        { label: "Home solar", href: "/services/residential-solar/" },
        { label: "Business solar", href: "/services/commercial-solar/" },
        { label: "Farm solar", href: "/services/agricultural-solar/" },
        { label: "Net metering", href: "/services/net-metering-support/" },
        { label: "Projects", href: "/projects/" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About SolarLink", href: "/about-us/" },
        { label: "Questions", href: "/faqs/" },
        { label: "Guides", href: "/resources/" },
        { label: "Blog", href: "/blog/" },
        { label: "Contact", href: "/contact-us/" },
        { label: "Get a free quote", href: "/get-quote/" },
      ],
    },
  ],
  legal: [
    { label: "Privacy", href: "/privacy-policy/" },
    { label: "Sitemap", href: "/sitemap/" },
  ],
  /** Shown while the legal name and NTN are unconfirmed. */
  copyright: "\u00a9 2026 SolarLink. All rights reserved.",
  /** {brand}, {legal} and {ntn}. Shown once both facts are confirmed. */
  legalLine: "{brand} is a trading name of {legal}. NTN {ntn}.",
  socialsTitle: "Follow us",
};
