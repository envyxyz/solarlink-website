import { faqSection as faq } from "@/content";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { shownList } from "@/lib/facts";

/** Heading block left, the accordion right (native details; answers are in the server HTML). */
export function Faq() {
  const items = shownList(faq.items);
  if (items.length === 0) return null;
  return (
    <section id="questions" className="page-width mb-section grid gap-12 lg:grid-cols-3 lg:gap-16">
      <div data-reveal="" className="flex flex-col items-start gap-6">
        <h2 className="max-w-heading text-h2">{faq.title}</h2>
        <p className="max-w-lead text-lead text-tone-ink-2">{faq.lead}</p>
        <Button href={faq.allHref} variant="text">
          {faq.all}
        </Button>
      </div>
      <div data-reveal="" className="lg:col-span-2">
        <Accordion items={items} />
      </div>
    </section>
  );
}
