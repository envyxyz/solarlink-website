import { JsonLd } from "@/components/JsonLd";
import { About } from "@/components/home/About";
import { BrandBelt } from "@/components/home/BrandBelt";
import { ClosingCall } from "@/components/home/ClosingCall";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { LinkSection } from "@/components/home/LinkSection";
import { Outlets } from "@/components/home/Outlets";
import { Projects } from "@/components/home/Projects";
import { Reviews } from "@/components/home/Reviews";
import { Services } from "@/components/home/Services";
import { ShopPreview } from "@/components/home/ShopPreview";
import { faqSection, reviewsSection } from "@/content";
import { shownList } from "@/lib/facts";
import { allOutletsLd, breadcrumbLd, faqLd, organizationLd, websiteLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("home");

export default function HomePage() {
  const questions = shownList(faqSection.items);
  return (
    <main id="main">
      <Hero />
      <BrandBelt />
      <About />
      <LinkSection />
      <Services />
      <Reviews items={shownList(reviewsSection.items)} />
      <ShopPreview />
      <Projects />
      <Outlets />
      <Faq />
      <ClosingCall />
      <JsonLd data={[organizationLd(), websiteLd(), ...allOutletsLd(), ...(questions.length ? [faqLd(questions)] : []), breadcrumbLd([])]} />
    </main>
  );
}
