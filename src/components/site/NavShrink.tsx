"use client";

import { useEffect } from "react";

const SHRINK_AFTER = 80;
const px = (v: string) => parseFloat(v) || 0;

/** width of a visible element; a data-fit wrapper is flexed wide, so it counts as its children plus their gaps */
function fit(el: HTMLElement): number {
  if (!el.hasAttribute("data-fit")) return el.offsetWidth;
  const kids = Array.from(el.children as HTMLCollectionOf<HTMLElement>).filter((c) => c.offsetWidth > 0);
  return kids.reduce((w, c) => w + c.offsetWidth, 0) + px(getComputedStyle(el).columnGap) * Math.max(0, kids.length - 1);
}

/**
 * Marks the nav data-small after 80px of scroll and keeps --nav-island (px) equal to the island width:
 * padding plus the visible children plus the gaps. CSS caps it at the full width and springs the width.
 */
export function NavShrink() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>("header nav");
    if (!nav) return;
    const row = nav.firstElementChild as HTMLElement | null;
    if (!row) return;
    const measure = () => {
      const cs = getComputedStyle(row);
      const parts = (Array.from(row.children) as HTMLElement[]).map(fit).filter((w) => w > 0);
      const w = px(cs.paddingLeft) + px(cs.paddingRight) + parts.reduce((a, b) => a + b, 0) + px(cs.columnGap) * Math.max(0, parts.length - 1);
      nav.style.setProperty("--nav-island", `${Math.ceil(w)}px`);
    };
    // An open menu keeps the nav wide whatever the scroll position; closing re-evaluates (MutationObserver below).
    const on = () => nav.toggleAttribute("data-small", window.scrollY > SHRINK_AFTER && !nav.hasAttribute("data-open"));
    measure();
    on();
    document.fonts?.ready.then(measure);
    const ro = new ResizeObserver(measure);
    row.querySelectorAll("a, ul, button, span").forEach((el) => ro.observe(el));
    const mo = new MutationObserver(on);
    mo.observe(nav, { attributes: true, attributeFilter: ["data-open"] });
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", measure);
    };
  }, []);
  return null;
}
