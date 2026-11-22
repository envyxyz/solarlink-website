import { make } from "./shared";
import type { PageDoc } from "../types";

/* Blog post builder shared by blog-1.ts and blog-2.ts. */
export const post = (slug: string, title: string, h1: string, lead: string, paras: string[], related: [string, string][], extra: PageDoc["blocks"] = []): PageDoc =>
  make({
    path: `/blog/${slug}/`, kind: "article",
    title: `${title} | SolarLink`, description: lead, h1, lead,
    blocks: [{ type: "prose", heading: "The short version", paragraphs: paras }, ...extra],
    related: related.map(([label, href]) => ({ label, href })),
  });
