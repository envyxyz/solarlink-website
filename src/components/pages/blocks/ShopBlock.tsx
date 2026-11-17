import type { CSSProperties } from "react";
import { awaiting, shopSection } from "@/content";
import type { PageBlock } from "@/content/pages";
import { Chip } from "@/components/ui/Chip";
import { ProductCard } from "@/components/ui/ProductCard";
import { Stage } from "@/components/ui/Stage";
import { hasUnconfirmed, shownList } from "@/lib/facts";

/** A night stage with one shop category as a scroll-snap row. Samples only, so production renders nothing. */
export function ShopBlock({ block }: { block: Extract<PageBlock, { type: "shop" }> }) {
  const category = shopSection.categories.find((c) => c.slug === block.category);
  const products = category ? shownList(category.products) : [];
  if (!category || products.length === 0) return null;
  return (
    <Stage variant="night" className="flex flex-col gap-8 p-6 sm:p-10 lg:gap-10 lg:p-14">
      <div data-reveal="" className="flex flex-col items-start gap-6">
        {hasUnconfirmed(products) && <Chip>{awaiting}</Chip>}
        <h2 className="max-w-heading text-h2">{block.heading}</h2>
        {block.lead && <p className="max-w-lead-wide text-lead text-tone-ink-2">{block.lead}</p>}
      </div>
      <ul className="-mx-6 scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 sm:-mx-10 sm:px-10 lg:-mx-14 lg:px-14">
        {products.map((p, i) => (
          <li key={p.slug} data-reveal="" style={{ "--i": i } as CSSProperties} className="w-64 shrink-0 snap-start sm:w-80">
            <ProductCard product={p} category={category} />
          </li>
        ))}
      </ul>
    </Stage>
  );
}
