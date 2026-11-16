import { JsonLd } from "@/components/JsonLd";
import { BrandBelt } from "@/components/home/BrandBelt";
import { Hero } from "@/components/home/Hero";
import { allOutletsLd, breadcrumbLd, organizationLd, websiteLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("home");

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <BrandBelt />
      {/* Sections 3 to 11 (docs/HOMEPAGE.md) are added here by later phases. */}
      <div id="home-sections" />
      <JsonLd data={[organizationLd(), websiteLd(), ...allOutletsLd(), breadcrumbLd([])]} />
    </main>
  );
}
