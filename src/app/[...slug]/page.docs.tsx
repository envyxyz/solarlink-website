import { notFound } from "next/navigation";
import { InnerPage } from "@/components/site/InnerPage";
import { pageDocs, type PageDoc } from "@/content/pages";
import { shownList } from "@/lib/facts";
import { metadataFor } from "@/lib/seo";
import { routeByPath } from "@/routes";

// Every inner page is one PageDoc. Only docs a production build may show (confirmed) get a static page; anything else
// is a 404, never a stub. Docs are added in src/content/pages as each page's phase runs.
export const dynamicParams = false;

const pathOf = (slug: string[]) => `/${slug.join("/")}/`;
const find = (slug: string[]): PageDoc | undefined => shownList(pageDocs).find((d) => d.path === pathOf(slug));

export function generateStaticParams() {
  return shownList(pageDocs).map((d) => ({ slug: d.path.split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const doc = find((await params).slug);
  if (!doc) return {};
  const entry = { path: doc.path, title: doc.title, description: doc.description, h1: doc.h1, lastmod: doc.lastmod, indexable: routeByPath.get(doc.path)?.index !== false };
  return metadataFor(entry, { article: doc.kind === "guide" || doc.kind === "article" });
}

export default async function InnerRoute({ params }: { params: Promise<{ slug: string[] }> }) {
  const doc = find((await params).slug);
  if (!doc) notFound();
  return <InnerPage doc={doc} />;
}
