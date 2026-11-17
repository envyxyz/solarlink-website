import { notFound } from "next/navigation";
import { InnerPage } from "@/components/site/InnerPage";
import { kitPages } from "@/content/kit";
import type { PageKind } from "@/content/pages";

// Dev only (page.dev.tsx does not exist in production builds): each inner-page template with sample content.
export const dynamicParams = false;
export const metadata = { title: "Page templates", robots: { index: false, follow: false } };

export const generateStaticParams = () => Object.keys(kitPages).map((kind) => ({ kind }));

export default async function KitPageTemplate({ params }: { params: Promise<{ kind: string }> }) {
  const doc = kitPages[(await params).kind as PageKind];
  if (!doc) notFound();
  return <InnerPage doc={doc} />;
}
