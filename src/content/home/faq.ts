/*
  Homepage section 10, Questions (docs/COPY-HOME.md, answers word for word). The same list feeds the visible
  accordion and the FAQPage JSON-LD, so they always match.
  Source: live faqs.html, rewritten. Q5 repeats the confirmed net metering service (Ameer, 13 Nov 2026); its
  DISCO filing detail was "website says" in the copy deck: the client should confirm it before launch.
*/
const SOURCE = "Rewritten from live faqs.html (general explanation); Q5 mirrors the net metering service Ameer confirmed, 13 Nov 2026";

export type FaqItem = { id: string; question: string; answer: string; confirmed: boolean; source: string };

const item = (id: string, question: string, answer: string): FaqItem => ({ id, question, answer, confirmed: true, source: SOURCE });

export const faqSection = {
  title: "Questions people ask us",
  lead: "The five we hear most. The full list is on the FAQ page.",
  all: "See all questions",
  allHref: "/faqs/",
  items: [
    item(
      "what-is-solar",
      "What is a solar energy system?",
      "A solar system turns sunlight into electricity. Panels make DC power. An inverter changes it to AC, which runs your lights, fans and machines. If your system is grid-tied, spare power can go to the national grid through net metering. SolarLink sizes the system to your bill, supplies the kit and installs it.",
    ),
    item(
      "types",
      "What types of solar systems does SolarLink install?",
      "SolarLink installs three types. On-grid links to the grid and needs no battery. Hybrid links to the grid and adds a battery, so power stays on in load-shedding. Off-grid runs on batteries alone, for places with no reliable grid. We help you pick the one that fits your bill and your outages.",
    ),
    item(
      "load-shedding",
      "Can a solar system power my home during load-shedding?",
      "A standard on-grid system switches off when the grid goes down. This is a safety feature. A hybrid system has a battery, so it keeps lights, fans and chosen appliances running through load-shedding. How much it runs depends on the battery size, so tell us which appliances you need and we size it.",
    ),
    item(
      "weather",
      "What happens on cloudy or rainy days?",
      "Panels work on daylight, not only direct sun. On a cloudy or rainy day they make less power than on a clear day. Rain also washes dust off the panels. We size your system with ordinary weather in mind, so the survey checks your roof, shade and usage.",
    ),
    item(
      "net-metering",
      "Do you handle net metering?",
      "Yes. For a grid-tied system, SolarLink prepares and files your net metering application with your DISCO and follows it through to commissioning. Net metering lets spare power go to the grid and earn credit against your bill. Approval timing is set by the DISCO, so ask us about your case.",
    ),
  ] as FaqItem[],
};
