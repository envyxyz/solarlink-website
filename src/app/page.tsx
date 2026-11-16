import { JsonLd } from "@/components/JsonLd";
import { About } from "@/components/home/About";
import { BrandBelt } from "@/components/home/BrandBelt";
import { Hero } from "@/components/home/Hero";
import { LinkSection } from "@/components/home/LinkSection";
import { Services } from "@/components/home/Services";
import { allOutletsLd, breadcrumbLd, organizationLd, websiteLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("home");

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <BrandBelt />
      <About />
      <Services />
      <LinkSection />
      {/* Sections 6 to 11 (docs/HOMEPAGE.md) are added here by later phases. */}
      <div id="home-sections" />
      <JsonLd data={[organizationLd(), websiteLd(), ...allOutletsLd(), breadcrumbLd([])]} />
    </main>
  );
}
