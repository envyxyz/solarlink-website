"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { link, type LinkMode } from "@/content/home/link";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { cn } from "@/lib/cn";
import { tokenMs } from "@/lib/tokens";

type Key = keyof typeof link.nodes;
type Pt = readonly [number, number];
type Layout = {
  w: number;
  h: number;
  pos: Record<Key, Pt>;
  /** Where a node's caption sits. */
  side: Record<Key, "below" | "right">;
  /** The battery branch, drawn by hand because it turns. */
  branch: string;
};

const R = 36; // node disc radius, in diagram units
const ICON = 40; // icon box
const TRUNK: [Key, Key][] = [["sun", "panel"], ["panel", "inverter"], ["inverter", "home"], ["home", "grid"]];

/** Left to right from 64rem: the trunk runs along one row, the battery sits above and right of the inverter. */
const wide: Layout = {
  w: 1000,
  h: 250,
  pos: { sun: [100, 130], panel: [300, 130], inverter: [500, 130], home: [700, 130], grid: [900, 130], battery: [608, 36] },
  side: { sun: "below", panel: "below", inverter: "below", home: "below", grid: "below", battery: "right" },
  branch: "M500 94 V56 Q500 36 520 36 H572",
};
/** Top to bottom on phones: captions to the right of each node, the battery off to the side. */
const tall: Layout = {
  w: 340,
  h: 640,
  pos: { sun: [44, 50], panel: [44, 160], inverter: [44, 270], home: [44, 474], grid: [44, 584], battery: [136, 372] },
  side: { sun: "right", panel: "right", inverter: "right", home: "right", grid: "right", battery: "right" },
  branch: "M44 330 V340 Q44 372 76 372 H100",
};

/** Hand-drawn line icons in a 40 by 40 box, stroke 1.75, round caps. */
const icons: Record<Key, string> = {
  sun: "M13 20a7 7 0 1 0 14 0a7 7 0 1 0 -14 0 M20 3v4 M20 33v4 M3 20h4 M33 20h4 M8 8l2.8 2.8 M29.2 29.2l2.8 2.8 M8 32l2.8-2.8 M29.2 10.8l2.8-2.8",
  panel: "M10 8h26l-6 20H4z M18.7 8l-6 20 M27.3 8l-6 20 M7 18h26 M20 28v7 M13 35h14",
  inverter: "M11 8h18a5 5 0 0 1 5 5v14a5 5 0 0 1 -5 5H11a5 5 0 0 1 -5 -5V13a5 5 0 0 1 5 -5z M12 20q4 -7 8 0t8 0 M14 32v3 M26 32v3",
  home: "M5 19L20 6l15 13 M9 16v18h22V16 M16 34v-9h8v9",
  battery: "M8 11h20a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4H8a4 4 0 0 1 -4 -4V15a4 4 0 0 1 4 -4z M35 17v6 M10 17v6 M16 17v6 M22 17v6",
  grid: "M20 3l-8 33 M20 3l8 33 M8 11h24 M14 22h12 M12.5 29l15 -7 M27.5 29l-15 -7",
};

/** Which parts the route uses. On-grid has no battery, off-grid has no grid. */
const parts = (mode: LinkMode) => ({ battery: mode !== "on-grid", grid: mode !== "off-grid" });

function wirePath([a, b]: [Key, Key], pos: Layout["pos"]) {
  const [ax, ay] = pos[a];
  const [bx, by] = pos[b];
  return ay === by ? `M${ax + R} ${ay} H${bx - R}` : `M${ax} ${ay + R} V${by - R}`;
}

function labelStyle(l: Layout, key: Key): CSSProperties {
  const [x, y] = l.pos[key];
  const side = l.side[key];
  if (side === "right") {
    const left = x + R + 14;
    return { left: `${(left / l.w) * 100}%`, top: `${(y / l.h) * 100}%`, width: `${((l.w - left - 6) / l.w) * 100}%`, transform: "translateY(-50%)" };
  }
  return { top: `${((y + R + 14) / l.h) * 100}%`, left: `${(x / l.w) * 100}%`, width: "17%", transform: "translateX(-50%)" };
}

function Diagram({ layout: l, mode, className }: { layout: Layout; mode: LinkMode; className?: string }) {
  const on = parts(mode);
  const keys = Object.keys(l.pos) as Key[];
  const route = `M${l.pos.sun.join(" ")} L${l.pos[on.grid ? "grid" : "home"].join(" ")}`;
  const off = (k: Key) => (k === "battery" && !on.battery) || (k === "grid" && !on.grid);
  return (
    <div className={cn("relative", className)} style={{ aspectRatio: `${l.w} / ${l.h}` }}>
      <svg viewBox={`0 0 ${l.w} ${l.h}`} role="img" aria-label={link.alt} className="absolute inset-0 size-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {TRUNK.map((pair, i) => (
          <path key={pair[1]} d={wirePath(pair, l.pos)} pathLength={1} strokeWidth={2} data-off={off(pair[1]) || undefined} style={{ "--i": i } as CSSProperties} className="wire stroke-lime" />
        ))}
        <path d={l.branch} pathLength={1} strokeWidth={2} data-off={!on.battery || undefined} style={{ "--i": TRUNK.length } as CSSProperties} className="wire stroke-lime" />
        <circle r={5} className="route-dot fill-lime">
          {/* An SVG attribute cannot read CSS: the loop length is the --dur-route token, set when the element mounts (no dur, no motion, until then). */}
          <animateMotion key={route} ref={(a) => a?.setAttribute("dur", `${tokenMs("--dur-route")}ms`)} path={route} repeatCount="indefinite" />
        </circle>
        {keys.map((k) => (
          <g key={k} transform={`translate(${l.pos[k][0]} ${l.pos[k][1]})`} className={cn("dur transition-opacity", off(k) && "opacity-40")}>
            <circle r={R} className="fill-surface" />
            <path d={icons[k]} transform={`translate(${-ICON / 2} ${-ICON / 2})`} strokeWidth={1.75} className="stroke-ink" />
          </g>
        ))}
      </svg>
      {keys.map((k) => (
        <div key={k} style={labelStyle(l, k)} className={cn("dur absolute transition-opacity", off(k) && "opacity-40", l.side[k] !== "right" && "text-center")}>
          <p className="text-title">{link.nodes[k].name}</p>
          <p className="text-small text-tone-ink-2">{link.nodes[k].caption}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * The system-type switch and the line diagram. The wire draws once on entry (CSS), then one lime dot loops along the
 * active route (SVG animateMotion), paused under reduced motion and while the diagram is off screen.
 */
export function LinkDiagram({ initial = "hybrid" }: { initial?: LinkMode }) {
  const [mode, setMode] = useState<LinkMode>(initial);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const io = new IntersectionObserver(([e]) =>
      el.querySelectorAll("svg").forEach((s) => (e.isIntersecting && !still.matches ? s.unpauseAnimations() : s.pauseAnimations())),
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const text = link.modes.find((m) => m.value === mode)?.text;
  return (
    <div className="flex flex-col gap-8">
      <div data-reveal="" className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-8">
        <SegmentedControl label={link.switchLabel} options={link.modes} value={mode} onValueChange={(v) => setMode(v as LinkMode)} className="w-full sm:w-max" />
        <p aria-live="polite" className="max-w-lead-wide text-small text-tone-ink-2">
          {text}
        </p>
      </div>
      <div ref={root} data-reveal="" style={{ "--i": 1 } as CSSProperties} className="@container w-full">
        <Diagram layout={wide} mode={mode} className="@max-3xl:hidden" />
        <Diagram layout={tall} mode={mode} className="mx-auto max-w-sm @3xl:hidden" />
      </div>
    </div>
  );
}
