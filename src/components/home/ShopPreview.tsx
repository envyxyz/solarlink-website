import type { CSSProperties } from "react";
import { shopSection as shop, ui } from "@/content";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { ProductCard } from "@/components/ui/ProductCard";
import { Stage } from "@/components/ui/Stage";
import { hasUnconfirmed, shownList } from "@/lib/facts";
import { ShopCarousel } from "./ShopCarousel";

/**
 * A night stage: heading and lead, the category switch, and a row of product cards. The products are samples, so a
 * production build leaves the section out until the client confirms real stock; dev builds show it with a chip.
 */
export function ShopPreview() {
  const categories = shop.categories
    .map((c) => ({ ...c, products: shownList(c.products) }))
    .filter((c) => c.products.length > 0);
  if (categories.length === 0) return null;
  const pending = categories.some((c) => hasUnconfirmed(c.products));
  return (
    <div id={shop.id} className="mb-section">
      <Stage variant="night" className="flex flex-col gap-8 p-6 sm:p-10 lg:gap-10 lg:p-14">
        <ShopCarousel
          switchLabel={shop.switchLabel}
          prev={shop.prev}
          next={shop.next}
          intro={
            <div data-reveal="" className="flex flex-col items-start gap-6">
              {pending && <Chip>{ui.awaiting}</Chip>}
              <h2 className="max-w-heading text-h2">{shop.title}</h2>
              <p className="max-w-lead-wide text-lead text-tone-ink-2">{shop.lead}</p>
            </div>
          }
          tabs={categories.map((c) => ({
            slug: c.slug,
            label: c.label,
            cards: c.products.map((p, i) => (
              <li key={p.slug} data-reveal="" style={{ "--i": i } as CSSProperties} className="w-72 shrink-0 snap-start sm:w-80 lg:w-auto lg:min-w-72 lg:max-w-lg lg:flex-1 lg:shrink">
                <ProductCard product={p} category={c} />
              </li>
            )),
          }))}
          all={
            <Button href={shop.allHref} variant="text">
              {shop.all}
            </Button>
          }
        />
      </Stage>
    </div>
  );
}
