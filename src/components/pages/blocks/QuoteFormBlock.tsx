import type { PageBlock } from "@/content/pages";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { outlets } from "@/content";
import { show } from "@/lib/facts";

/** Body only: the template draws the heading and the sunken stage. Outlet numbers go through show(), so production gets none until confirmed. */
export function QuoteFormBlock({ block }: { block: Extract<PageBlock, { type: "quoteForm" }> }) {
  const list = outlets.map((o) => ({ slug: o.slug, city: o.city, whatsapp: show(o.whatsapp) }));
  return (
    <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
      <p className="max-w-lead text-lead text-tone-ink-2">{block.lead}</p>
      <div className="w-full max-w-xl rounded-card bg-tone-surface p-6 sm:p-8">
        <QuoteForm outlets={list} />
      </div>
    </div>
  );
}
