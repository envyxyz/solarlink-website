/*
  Inner page model. One PageDoc per route in src/routes.ts, written in that page's own phase. A doc is flagged like a
  fact: while `confirmed` is false a production build does not generate the page, so no stub ships (CLAUDE.md rule 13).
  Plain strings only, safe for the server; the template is src/components/site/InnerPage.tsx.
*/
import type { RouteKind } from "@/routes";
import type { LinkMode } from "@/content/home/link";

export type PageKind = Extract<RouteKind, "hub" | "company" | "legal" | "service" | "system" | "product" | "outlet" | "project" | "guide" | "article" | "tool">;

export type PageImage = { src: string; width: number; height: number; alt: string };

export type PageBlock =
  | { type: "prose"; heading?: string; paragraphs: string[] }
  | { type: "facts"; heading: string; items: { label: string; value: string }[] }
  | { type: "steps"; heading: string; items: { title: string; text: string }[] }
  | { type: "links"; heading?: string; items: { label: string; text: string; href: string; image?: PageImage }[] }
  | { type: "gallery"; heading?: string; images: PageImage[] }
  | { type: "faq"; heading: string; items: { id: string; question: string; answer: string }[] }
  /* Richer blocks (18 Nov 2026 night run): each one reuses a home component. */
  /** The energy-flow line diagram (LinkDiagram), opened on this system type. */
  | { type: "diagram"; heading: string; lead?: string; mode: LinkMode }
  /** The home sizing card: bill slider, live system size, WhatsApp/quote action. */
  | { type: "sizing"; heading: string; lead: string }
  /** ProductCards of one shop category (shopSection slug). Samples, so production shows none until confirmed. */
  | { type: "shop"; heading: string; lead?: string; category: string }
  /** ProjectCards from the home projects list. Unconfirmed, so production shows none. */
  | { type: "projects"; heading: string; lead?: string }
  /** The brand belt (Marquee). Brands are unconfirmed, so production shows none. */
  | { type: "brands"; heading: string }
  /** A statement on its own stage: big text, optional render under a glass caption. */
  | { type: "feature"; heading: string; text: string; image?: PageImage; tone?: "night" | "sunken" }
  /** A calculator island (src/components/tools), lazy-loaded. bill and net-billing show an awaiting state until the tariff data is verified. */
  | { type: "tool"; tool: ToolId; heading: string; lead?: string };

export type ToolId = "load" | "battery" | "solar" | "bill" | "net-billing";

export type PageDoc = {
  /** Must exist in src/routes.ts, with its trailing slash. */
  path: string;
  kind: PageKind;
  /** Title tag, with the ranking phrase from docs/KEYWORD-MAP.md. */
  title: string;
  description: string;
  h1: string;
  lead: string;
  /** Date the content last changed (YYYY-MM-DD). Feeds the sitemap. */
  lastmod: string;
  image?: PageImage;
  blocks: PageBlock[];
  /** Links to other built pages, by their final URL. */
  related?: { label: string; href: string }[];
  confirmed: boolean;
  source: string;
};
