"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import { homography } from "@/lib/homography";
import { popIn, popOut } from "@/lib/spring";
import { useSizing } from "./SizingProvider";

const PANEL_TICK_MS = 30;

type Slot = { x: number; y: number };

const Panel = memo(function Panel({ slot, w, h, on, face }: { slot: Slot; w: number; h: number; on: boolean; face: string }) {
  const el = useRef<HTMLDivElement>(null);
  const was = useRef(false);
  useEffect(() => {
    if (was.current === on || !el.current) return;
    was.current = on;
    if (on) popIn(el.current);
    else popOut(el.current);
  }, [on]);
  return (
    <div
      ref={el}
      className="panel-face absolute opacity-0"
      style={{ left: slot.x, top: slot.y, width: w, height: h, backgroundImage: face, backgroundSize: "100% 100%" }}
    />
  );
});

/**
 * Real DOM panels on the roof plane. They live inside the hero art box, so the roof quad (percent of
 * the image) stays true at every size. A homography maps the flat grid onto the quad. Panels pop on
 * one at a time, 30ms apart, front corner first; removing them reverses the order.
 */
export function RoofPanels({ face }: { face: string }) {
  const { config, result, maxPanels } = useSizing();
  const { grid, roof } = config;
  const box = useRef<HTMLDivElement>(null);
  const [art, setArt] = useState<{ w: number; h: number } | null>(null);
  const [shown, setShown] = useState(0);
  const target = Math.min(result.panels, maxPanels);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const read = () => setArt({ w: el.clientWidth, h: el.clientHeight });
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setShown((s) => (s === target ? s : s < target ? s + 1 : s - 1));
    }, PANEL_TICK_MS);
    return () => window.clearInterval(id);
  }, [target]);

  const slots = useMemo<Slot[]>(() => {
    const totalW = grid.cols * grid.panelW + (grid.cols - 1) * grid.gap;
    const totalH = grid.rows * grid.panelH + (grid.rows - 1) * grid.gap;
    const ox = (grid.w - totalW) / 2;
    const oy = (grid.h - totalH) / 2;
    const out: Slot[] = [];
    // r = 0 is the row at the front corner, so panels fill from there.
    for (let r = 0; r < grid.rows; r++)
      for (let c = 0; c < grid.cols; c++)
        out.push({ x: ox + c * (grid.panelW + grid.gap), y: oy + (grid.rows - 1 - r) * (grid.panelH + grid.gap) });
    return out;
  }, [grid]);

  const matrix = useMemo(() => {
    if (!art) return undefined;
    const pts = [roof.tl, roof.tr, roof.br, roof.bl].map(([x, y]) => [(x / 100) * art.w, (y / 100) * art.h] as const);
    return homography(
      [
        [0, 0],
        [grid.w, 0],
        [grid.w, grid.h],
        [0, grid.h],
      ],
      pts,
    );
  }, [art, roof, grid]);

  return (
    <div ref={box} data-island aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: grid.w, height: grid.h, transform: matrix }}>
        {slots.map((s, i) => (
          <Panel key={i} slot={s} w={grid.panelW} h={grid.panelH} on={i < shown} face={face} />
        ))}
      </div>
    </div>
  );
}
