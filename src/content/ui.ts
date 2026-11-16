/*
  Interface strings. A separate module with only plain strings, so client components can import it
  without pulling the business facts (which include unconfirmed values) into the browser bundle.
  Re-exported from src/content.ts. Client code imports "@/content/ui"; server code may use "@/content".
*/

export type PriceMode = "show" | "ask" | "hidden";
/** Site-wide price switch. Launch default is ask until the client confirms rates. */
export const priceMode: PriceMode = "ask";

/** Review builds only: marks a block a production build leaves out. A named export outside `ui`, so client code that imports `ui` never bundles it; check-content --post fails if it reaches out/. */
export const awaiting = "Awaiting client";

export const ui = {
  brandAlt: "SolarLink",
  loading: "Loading",
  skipToContent: "Skip to content",
  dash: "–",
  notFound: {
    body: "The link may be old. Start from the home page, or send us a message and we will point you to the right shop.",
    home: "Go to the home page",
  },
  price: { ask: "Ask for today's rate", currency: "Rs" },
  whatsapp: {
    label: "Send on WhatsApp",
    openLabel: "Chat on WhatsApp",
    message: "Assalam o Alaikum SolarLink. I would like a free site survey and quote.",
  },
  accordion: { open: "Open", close: "Close" },
  breadcrumb: { home: "Home" },
};
