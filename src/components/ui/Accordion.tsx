"use client";

import { Accordion as RadixAccordion } from "radix-ui";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { icon } from "./icons";

export type AccordionItem = { id: string; question: string; answer: string };

/**
 * FAQ accordion. The plus turns into a cross when open; the panel's height animates.
 * ponytail: height uses a CSS keyframe on --dur-slow / --ease-out (the spring.soft look), not a real spring.
 * Radix supplies aria-expanded, aria-controls and arrow-key movement between triggers.
 */
export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  return (
    <RadixAccordion.Root type="single" collapsible className={cn("flex flex-col", className)}>
      {items.map((item) => (
        <RadixAccordion.Item key={item.id} value={item.id} className="border-b border-tone-line">
          <RadixAccordion.Header>
            <RadixAccordion.Trigger className="focus-ring flex min-h-control-lg w-full items-center justify-between gap-6 py-4 text-left text-title hover:brightness-95">
              {item.question}
              <Plus {...icon} className="turns-to-cross shrink-0" />
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content className="accordion-panel">
            <p className="max-w-prose pb-6 text-body text-tone-ink-2">{item.answer}</p>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
}
