import { belt, brands } from "@/content";
import type { PageBlock } from "@/content/pages";
import { Marquee } from "@/components/ui/Marquee";
import { shownList } from "@/lib/facts";

/** The brand belt with its own heading. Brands are unconfirmed, so production renders nothing. */
export function BrandsBlock({ block }: { block: Extract<PageBlock, { type: "brands" }> }) {
  const list = shownList(brands);
  if (!list.length) return null;
  return (
    <section className="page-width flex flex-col gap-6">
      <h2 data-reveal="" className="text-h3">
        {block.heading}
      </h2>
      <Marquee variant="logo" pause={belt.pause} className="py-4">
        {list.map((b) => (
          <span
            key={b.name}
            className="dur-fast block whitespace-nowrap text-h3 text-ink-2 transition-colors hover:text-ink"
            style={{ fontVariationSettings: `"wdth" ${b.wdth}`, fontWeight: b.weight }}
          >
            {b.name}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
