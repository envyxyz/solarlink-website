import type { CSSProperties } from "react";
import { servicesSection, awaiting } from "@/content";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardImage } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/cn";
import { preview, shownList } from "@/lib/facts";

/**
 * Four cards: heading block left, cards right in two columns (one on phones). Three cards (the production build, where
 * the unconfirmed farm card is left out): heading block on top, the cards in one row of three (one column on phones).
 * A card the client has not confirmed shows with an "Awaiting client" chip in review builds only. The whole card is one
 * link: the text link stretches over it.
 */
export function Services() {
  const cards = shownList(servicesSection.cards);
  const row = cards.length === 3;
  return (
    <section id={servicesSection.id} className={cn("page-width mb-section grid scroll-mt-26 gap-12", !row && "lg:grid-cols-3 lg:gap-16")}>
      <div data-reveal="" className="flex flex-col items-start gap-6">
        <h2 className="max-w-heading text-h2">{servicesSection.title}</h2>
        <p className="max-w-lead text-lead text-tone-ink-2">{servicesSection.lead}</p>
      </div>
      <ul className={cn("grid gap-4", row ? "md:grid-cols-3" : "sm:grid-cols-2 lg:col-span-2")}>
        {cards.map((c, i) => (
          <li key={c.href} data-reveal="" style={{ "--i": i + 1 } as CSSProperties}>
            <Card interactive className="card-focus flex h-full flex-col">
              <CardImage alt={c.alt} className="aspect-4/3" {...c.image} />
              <CardBody className="flex-1 items-start gap-3 p-5">
                {preview && !c.confirmed && <Chip>{awaiting}</Chip>}
                <h3 className="text-title">{c.title}</h3>
                <p className="max-w-prose text-small text-tone-ink-2">{c.text}</p>
                <Button href={c.href} variant="text" className="stretched mt-auto">
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
