import { seo } from "@/content";
import { JsonLd } from "@/components/JsonLd";
import { organizationLd, websiteLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("home");

// Placeholder root route. The homepage phase replaces everything below the h1.
export default function HomePage() {
  return (
    <main id="main" className="mx-auto w-full max-w-page px-gutter py-section">
      <h1 className="text-display">{seo.home.h1}</h1>
      <JsonLd data={[organizationLd(), websiteLd()]} />
    </main>
  );
}
