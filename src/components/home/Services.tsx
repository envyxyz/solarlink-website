import type { CSSProperties } from "react";
import { servicesSection, ui } from "@/content";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardImage } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { shownList } from "@/lib/facts";

/**
 * Heading block left, four cards right (two columns, one on phones). A card the client has not confirmed is left
 * out of a production build and shown with an "Awaiting client" chip elsewhere.
 */
export function Services() {
  const cards = shownList(servicesSection.cards);
  return (
    <section id={servicesSection.id} className="page-width mb-section grid scroll-mt-26 gap-12 lg:grid-cols-3 lg:gap-16">
      <div data-reveal="" className="flex flex-col items-start gap-6">
        <h2 className="max-w-heading text-h2">{servicesSection.title}</h2>
        <p className="max-w-lead text-lead text-tone-ink-2">{servicesSection.lead}</p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
        {cards.map((c, i) => (
          <li key={c.href} data-reveal="" style={{ "--i": i + 1 } as CSSProperties}>
            <Card interactive className="flex h-full flex-col">
              <CardImage alt={c.alt} className="aspect-4/3" {...c.image} />
              <CardBody className="flex-1 items-start gap-3 p-5">
                {!c.confirmed && <Chip>{ui.awaiting}</Chip>}
                <h3 className="text-title">{c.title}</h3>
                <p className="max-w-prose text-small text-tone-ink-2">{c.text}</p>
                <Button href={c.href} variant="text" className="mt-auto">
                  {c.link}
                </Button>
              </CardBody>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
