import type { Product, ShopCategory } from "@/content";
import { nav, priceMode, shopSection as shop } from "@/content";
import { outletWhatsApp } from "@/lib/links";
import { Button } from "./Button";
import { Card, CardBody, CardImage } from "./Card";
import { Price, formatPrice } from "./Price";
import { WhatsAppGlyph } from "./WhatsAppGlyph";

/**
 * Image tile (keeps the render's own light backdrop), brand, spec-led name, one spec line, price or "Ask for today's
 * rate", then a pill and the round WhatsApp twin, both with a message that names the product. The store fields
 * (brand, price, price per watt, stock, warranty) are optional and print only when the product has them.
 */
export function ProductCard({ product, category }: { product: Product; category: ShopCategory }) {
  const href = outletWhatsApp("lahore", shop.message.replace("{name}", product.name));
  const notes = [product.stock, product.warranty].filter(Boolean).join(" · ");
  return (
    <Card interactive className="flex h-full flex-col">
      <CardImage alt={category.alt} {...category.image} className="aspect-square" />
      <CardBody className="flex-1 gap-2 p-4">
        {product.brand && <p className="text-caption text-tone-ink-2">{product.brand}</p>}
        <h3 className="text-title">{product.name}</h3>
        <p className="text-small text-tone-ink-2">{product.spec}</p>
        {notes && <p className="text-small text-tone-ink-2">{notes}</p>}
        <div className="mt-2">
          <Price amount={product.price} />
          {priceMode === "show" && product.pricePerWatt !== undefined && (
            <p className="text-small tabular text-tone-ink-2">
              {formatPrice(product.pricePerWatt)} {shop.perWatt}
            </p>
          )}
        </div>
        <div className="mt-auto pt-4">
          {href ? (
            <Button
              variant="dark"
              href={href}
              twin={{ icon: <WhatsAppGlyph />, label: shop.askLabel.replace("{name}", product.name), href, redundant: true }}
            >
              {shop.ask}
            </Button>
          ) : (
            <Button variant="dark" href={nav.quote.href}>
              {nav.quote.label}
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
