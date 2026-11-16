"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton } from "@/components/ui/Button";
import { icon } from "@/components/ui/icons";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { cn } from "@/lib/cn";

type Tab = { slug: string; label: string; cards: ReactNode };

/**
 * The shop's interactive part: the category switch, and a scroll-snap row with arrows that move one card. Every
 * category's cards are in the server HTML; the others are hidden. The arrows appear only when the row overflows.
 */
export function ShopCarousel({
  tabs,
  switchLabel,
  prev,
  next,
  intro,
  all,
}: {
  tabs: Tab[];
  switchLabel: string;
  prev: string;
  next: string;
  intro: ReactNode;
  all: ReactNode;
}) {
  const [active, setActive] = useState(tabs[0].slug);
  const [overflow, setOverflow] = useState(false);
  const row = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    el.scrollLeft = 0;
    const measure = () => setOverflow(el.scrollWidth > el.clientWidth + 1);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [active]);

  const scroll = (dir: 1 | -1) => {
    const el = row.current;
    const card = el && [...el.querySelectorAll("li")].find((li) => li.offsetWidth > 0);
    if (!el || !card) return;
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: still ? "auto" : "smooth" });
  };

  return (
    <>
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
        {intro}
        <div className="-m-1 max-w-full overflow-x-auto p-1 md:shrink-0">
          <SegmentedControl label={switchLabel} options={tabs.map((t) => ({ value: t.slug, label: t.label }))} value={active} onValueChange={setActive} className="w-max" />
        </div>
      </div>
      <div ref={row} className="-mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-2">
        {tabs.map((t) => (
          <ul key={t.slug} aria-label={t.label} className={cn(t.slug === active ? "contents" : "hidden")}>
            {t.cards}
          </ul>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4">
        {all}
        {overflow && (
          <div className="flex gap-2">
            <IconButton label={prev} onClick={() => scroll(-1)}>
              <ChevronLeft {...icon} />
            </IconButton>
            <IconButton label={next} onClick={() => scroll(1)}>
              <ChevronRight {...icon} />
            </IconButton>
          </div>
        )}
      </div>
    </>
  );
}
