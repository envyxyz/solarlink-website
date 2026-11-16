import { belt, brands } from "@/content";
import { Marquee } from "@/components/ui/Marquee";
import { shownList } from "@/lib/facts";

/**
 * Equipment brands as text wordmarks (official logo files not supplied yet). Brands are unconfirmed, so a
 * production build shows none and the whole belt is left out until the client confirms the list.
 */
export function BrandBelt() {
  const list = shownList(brands);
  if (!list.length) return null;
  return (
    <section aria-label={belt.aria} className="page-width mb-section mt-10 flex flex-col gap-5 lg:mt-16 md:flex-row md:items-center md:gap-8">
      <p className="shrink-0 text-small text-ink-2">{belt.label}</p>
      <Marquee variant="logo" className="min-w-0 flex-1 py-4">
        {list.map((b) => (
          <span
            key={b.name}
            className="dur-fast block whitespace-nowrap text-h3 text-ink-3 transition-colors hover:text-ink"
            style={{ fontVariationSettings: `"wdth" ${b.wdth}`, fontWeight: b.weight }}
          >
            {b.name}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
