"use client";

import { useEffect, useRef } from "react";
import { tokenEase, tokenMs } from "@/lib/tokens";
import { useSizing } from "./SizingProvider";

const DESKTOP = "(min-width: 64rem)";
const CORNER = 16;

/**
 * Wire-style lime line from the roof's front corner down to the result card. It draws once after the
 * image has painted. Desktop only: on smaller screens the cards are stacked under the image.
 * Uses stroke-dashoffset, the one non-transform animation DESIGN.md allows (the link line).
 */
export function LinkLine() {
  const { config } = useSizing();
  const svg = useRef<SVGSVGElement>(null);
  const path = useRef<SVGPathElement>(null);
  const dot = useRef<SVGCircleElement>(null);
  const front = config.roof.bl;

  useEffect(() => {
    const svgEl = svg.current;
    const pathEl = path.current;
    const dotEl = dot.current;
    const hero = svgEl?.parentElement;
    const art = hero?.querySelector<HTMLElement>("div[data-hero-art]");
    const result = hero?.querySelector<HTMLElement>("section[data-hero-result]");
    const img = art?.querySelector("img");
    if (!svgEl || !pathEl || !dotEl || !hero || !art || !result || !img) return;
    const wide = window.matchMedia(DESKTOP);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const drawMs = tokenMs("--dur-draw");
    const fastMs = tokenMs("--dur-fast");
    let ready = false;
    let drawn = false;
    let timer = 0;

    const draw = () => {
      if (!ready || !wide.matches) return;
      const hr = hero.getBoundingClientRect();
      const ar = art.getBoundingClientRect();
      const rr = result.getBoundingClientRect();
      const sx = ar.left - hr.left + (front[0] / 100) * ar.width;
      const sy = ar.top - hr.top + (front[1] / 100) * ar.height;
      const ey = rr.top - hr.top;
      const margin = Math.min(32, rr.width / 4);
      const ex = Math.min(rr.right - hr.left - margin, Math.max(rr.left - hr.left + margin, sx));
      if (Math.abs(ex - sx) < 1) {
        pathEl.setAttribute("d", `M ${sx} ${sy} V ${ey}`);
      } else {
        const dir = ex > sx ? 1 : -1;
        const yTurn = sy + (ey - sy) * 0.4;
        pathEl.setAttribute(
          "d",
          `M ${sx} ${sy} V ${yTurn - CORNER} Q ${sx} ${yTurn} ${sx + dir * CORNER} ${yTurn} H ${ex - dir * CORNER} Q ${ex} ${yTurn} ${ex} ${yTurn + CORNER} V ${ey}`,
        );
      }
      dotEl.setAttribute("cx", String(ex));
      dotEl.setAttribute("cy", String(ey));
      if (!drawn) {
        drawn = true;
        const len = pathEl.getTotalLength();
        pathEl.style.strokeDasharray = String(len);
        dotEl.animate([{ opacity: 0 }, { opacity: 1 }], { duration: fastMs, delay: reduced ? 0 : drawMs - fastMs, fill: "forwards" });
        if (reduced) {
          pathEl.style.strokeDashoffset = "0";
          pathEl.animate([{ opacity: 0 }, { opacity: 1 }], { duration: fastMs });
        } else {
          pathEl.style.strokeDashoffset = String(len);
          pathEl.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], {
            duration: drawMs,
            easing: tokenEase("--ease-out"),
            fill: "forwards",
          });
        }
      } else {
        // Resized after the first draw: show the finished line at the new geometry.
        pathEl.getAnimations().forEach((a) => a.cancel());
        pathEl.style.strokeDasharray = "none";
        pathEl.style.strokeDashoffset = "0";
        dotEl.getAnimations().forEach((a) => a.cancel());
        dotEl.style.opacity = "1";
      }
    };

    const start = () => {
      timer = window.setTimeout(() => {
        ready = true;
        draw();
      }, tokenMs("--delay-draw"));
    };
    if (img.complete) start();
    else img.addEventListener("load", start, { once: true });

    const ro = new ResizeObserver(draw);
    ro.observe(hero);
    ro.observe(result); // the result card grows and shrinks (roof note), so the line follows its top edge
    wide.addEventListener("change", draw);
    return () => {
      window.clearTimeout(timer);
      img.removeEventListener("load", start);
      ro.disconnect();
      wide.removeEventListener("change", draw);
    };
  }, [front]);

  return (
    <svg ref={svg} data-island aria-hidden className="pointer-events-none absolute inset-0 z-6 hidden size-full overflow-visible lg:block">
      <path ref={path} d="" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="link-shadow stroke-lime" />
      <circle ref={dot} r={3} opacity={0} className="fill-lime" />
    </svg>
  );
}
