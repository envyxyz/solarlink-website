import { link } from "@/content";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stage } from "@/components/ui/Stage";
import { LinkDiagram } from "./LinkDiagram";

/** A sunken stage: heading, the system-type switch with the line diagram, and a text link to the sizing card. */
export function LinkSection() {
  return (
    <div className="mb-section">
      <Stage className="flex flex-col gap-8 p-6 sm:p-10 lg:gap-10 lg:p-14">
        <div data-reveal="">
          <SectionHeading title={link.title} lead={link.lead} />
        </div>
        <LinkDiagram />
        <Button href={link.ctaHref} variant="text" className="self-start">
          {link.cta}
        </Button>
      </Stage>
    </div>
  );
}
