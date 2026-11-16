import { useId } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { icon } from "./icons";

export type AccordionItem = { id: string; question: string; answer: string };

/**
 * FAQ accordion on native details elements sharing one name, so opening one closes the others. Answers
 * stay in the server HTML. The plus turns into a cross when open; the panel height animates in CSS
 * where the browser supports it (--dur-slow, --ease-out: the spring.soft look, not a true spring).
 */
export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const group = useId();
  return (
    <div className={cn("flex flex-col", className)}>
      {items.map((item) => (
        <details key={item.id} name={group} className="accordion border-b border-tone-line">
          <summary className="accordion-summary focus-ring flex min-h-control-lg w-full cursor-pointer items-center justify-between gap-6 py-4 text-left text-title hover:brightness-95">
            {item.question}
            <Plus {...icon} className="turns-to-cross shrink-0" />
          </summary>
          <p className="max-w-prose pb-6 text-body text-tone-ink-2">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
