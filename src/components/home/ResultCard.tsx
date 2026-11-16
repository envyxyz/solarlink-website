"use client";

import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { hero } from "@/content/home";
import { popIn } from "@/lib/spring";
import { cn } from "@/lib/cn";
import { fill } from "@/lib/sizing";
import { useSizing } from "./SizingProvider";

const row =
  "flex flex-col items-center rounded-tile bg-sunken px-1 py-3 text-center md:flex-row md:items-baseline md:justify-between md:px-4 md:text-left lg:rounded-none lg:bg-transparent lg:px-0 lg:py-2.5 lg:border-t lg:border-line lg:first:border-t-0";

/** How long the figures must rest before the screen-reader announcement. */
const ANNOUNCE_MS = 500;

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

/**
 * Under 64rem the stats, message, note and slider share one dock card that overlaps the image. When the roof cap
 * message opens, the card would push the slider down. Instead the dock's negative top margin grows by exactly the
 * dock's growth (--dock-lift), so the card rises over the image and everything from the slider down stays put.
 * ResizeObserver callbacks run after layout and before paint, so both land in the same frame.
 */
function useDockLift(cap: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const wrap = cap.current;
    const dock = wrap?.closest<HTMLElement>("div[data-dock]");
    const result = wrap?.closest<HTMLElement>("section");
    const sizing = dock?.querySelector<HTMLElement>("#sizing");
    if (!wrap || !dock || !result || !sizing) return;
    const stacked = window.matchMedia("(max-width: 47.999rem)");
    const wide = window.matchMedia("(min-width: 64rem)");
    const apply = () => {
      const w = wrap.getBoundingClientRect().height;
      let lift = 0;
      if (wide.matches) lift = 0;
      else if (stacked.matches) lift = w;
      else {
        const s = sizing.getBoundingClientRect().height;
        const r = result.getBoundingClientRect().height;
        lift = Math.max(s, r) - Math.max(s, r - w);
      }
      dock.style.setProperty("--dock-lift", `${lift}px`);
    };
    apply();
    const ro = new ResizeObserver(apply);
    [wrap, result, sizing].forEach((el) => ro.observe(el));
    stacked.addEventListener("change", apply);
    wide.addEventListener("change", apply);
    return () => {
      ro.disconnect();
      stacked.removeEventListener("change", apply);
      wide.removeEventListener("change", apply);
      dock.style.removeProperty("--dock-lift");
    };
  }, [cap]);
}

export function ResultCard() {
  const { text, result } = useSizing();
  const figure = "text-stat";
  const label = "mt-1 whitespace-nowrap text-caption text-ink md:mt-0";
  // The figures are not a live region: they change on every slider step. One polite announcement follows, once the value has rested.
  const phrase = fill(hero.announce, { kw: text.kw, panels: fill(result.panels === 1 ? hero.panelOne : hero.panelMany, { n: text.panels }), units: text.generation });
  const [said, setSaid] = useState("");
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const t = window.setTimeout(() => setSaid(phrase), ANNOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [phrase]);
  const cap = useRef<HTMLDivElement>(null);
  useDockLift(cap);
  return (
    <section
      data-island
      data-hero-result
      aria-label={hero.resultLabel}
      className="order-1 md:order-2 md:basis-0 md:grow-5 lg:glass lg:absolute lg:bottom-12 lg:right-12 lg:z-5 lg:w-90 lg:rounded-card lg:p-6 short:bottom-6 short:p-5"
    >
      <p className="mb-3 hidden text-title lg:block">{hero.resultLabel}</p>
      <div className="grid grid-cols-3 gap-2 md:grid-cols-1 md:gap-0 lg:gap-0">
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
      <div ref={cap} data-open={result.capped || undefined} className="cap-wrap">
        <div className="min-h-0 overflow-hidden" inert={!result.capped} aria-hidden={!result.capped}>
          <div className="pt-3">
            <p className="cap-text rounded-input bg-lime-wash px-4 py-3 text-small">{hero.roofCap}</p>
          </div>
        </div>
      </div>
      <p className="mt-3 text-caption text-ink">{text.assumptions}</p>
      <p aria-live="polite" aria-atomic="true" className="sr-only">
        {said}
      </p>
    </section>
  );
}
