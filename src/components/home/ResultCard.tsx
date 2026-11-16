"use client";

import { useLayoutEffect, useRef } from "react";
import { hero } from "@/content/home";
import { popIn } from "@/lib/spring";
import { cn } from "@/lib/cn";
import { useSizing } from "./SizingProvider";

const row =
  "flex flex-col items-center rounded-tile bg-sunken px-1 py-3 text-center md:flex-row md:items-baseline md:justify-between md:px-4 md:text-left lg:rounded-none lg:bg-transparent lg:px-0 lg:py-2.5 lg:border-t lg:border-line lg:first:border-t-0";

/** A figure that pops in with spring.bubbly when its text changes (not on first paint). */
function Figure({ text, className }: { text: string; className?: string }) {
  const el = useRef<HTMLSpanElement>(null);
  const shown = useRef(text);
  useLayoutEffect(() => {
    if (shown.current === text) return;
    shown.current = text;
    if (el.current) popIn(el.current);
  }, [text]);
  return (
    <span ref={el} className={cn("block", className)}>
      {text}
    </span>
  );
}

export function ResultCard() {
  const { text, result } = useSizing();
  const figure = "text-stat";
  const label = "mt-1 whitespace-nowrap text-caption text-ink-2 md:mt-0";
  return (
    <section
      data-island
      data-hero-result
      aria-label={hero.resultLabel}
      className="order-1 md:order-2 md:basis-0 md:grow-5 lg:glass lg:absolute lg:bottom-12 lg:right-12 lg:z-5 lg:w-90 lg:rounded-card lg:p-6 short:bottom-6 short:p-5"
    >
      <p className="mb-3 hidden text-title lg:block">{hero.resultLabel}</p>
      <div aria-live="polite" aria-atomic="true" className="grid grid-cols-3 gap-2 md:grid-cols-1 md:gap-0 lg:gap-0">
        <div className={row}>
          <Figure text={text.kw} className={figure} />
          <span className={label}>{hero.stats.size}</span>
        </div>
        <div className={row}>
          <Figure text={text.panels} className={figure} />
          <span className={label}>{hero.stats.panels}</span>
        </div>
        <div className={row}>
          <Figure text={text.generation} className={figure} />
          <span className={label}>{hero.stats.units}</span>
        </div>
      </div>
      {result.capped && <p className="mt-3 rounded-input bg-lime-wash px-4 py-3 text-small">{hero.roofCap}</p>}
      <p className="mt-3 text-caption text-ink-2 max-sm:hidden">{text.assumptions}</p>
    </section>
  );
}
