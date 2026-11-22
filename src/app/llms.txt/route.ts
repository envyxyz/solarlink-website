import { business, outlets, seo } from "@/content";
import { pageDocs } from "@/content/pages";
import { shownList, show } from "@/lib/facts";
import { canonical } from "@/lib/seo";
import { routeByPath } from "@/routes";

export const dynamic = "force-static";

const link = (path: string, title: string, description: string) => `- [${title}](${canonical(path)}): ${description}`;

/**
 * llms.txt, generated from the same confirmed routes as the sitemap and never typed by hand (docs/SEO.md). Only facts
 * that pass show() appear. Production lists the home page until page docs are confirmed; each confirmed doc then
 * joins its section.
 */
export function GET() {
  const docs = shownList(pageDocs).filter((d) => routeByPath.get(d.path)?.index !== false);
  const section = (heading: string, kinds: string[]) => {
    const rows = docs.filter((d) => kinds.includes(d.kind)).map((d) => link(d.path, d.h1, d.description));
    return rows.length ? [`## ${heading}`, ...rows, ""] : [];
  };
  const cities = outlets.filter((o) => show(o.addressLines)).map((o) => o.city);
  const body = [
    `# ${show(business.name)}`,
    "",
    `> ${show(business.descriptions.short)}`,
    "",
    ...(cities.length ? [`Shops: ${cities.join(", ")}.`, ""] : []),
    "## Main",
    link(seo.home.path, seo.home.h1, seo.home.description),
    "",
    ...section("Services", ["service"]),
    ...section("Solar systems", ["system"]),
    ...section("Products", ["product"]),
    ...section("Outlets", ["outlet"]),
    ...section("Projects", ["project"]),
    ...section("Guides", ["guide", "article"]),
    ...section("Company", ["company", "hub"]),
  ];
  return new Response(body.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
