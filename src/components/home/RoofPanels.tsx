"use client";

import { useEffect, useRef } from "react";
import { projector } from "@/lib/homography";
import { POP_FROM, reduced, springAt, springMs } from "@/lib/spring";
import { tokenEase, tokenMs } from "@/lib/tokens";
import { useSizing } from "./SizingProvider";

const PANEL_TICK_MS = 30;
const DPR_CAP = 3;
/** Cell area inset from the frame, in grid units. */
const FRAME = 3;
/** Cell columns per panel (5 lines between them) and the minimum spacing for a set of lines to draw, in device pixels. */
const COLS = 6;
const MIN_LINE_GAP = 3;

type Pt = readonly [number, number];
type Panel = { cx: number; cy: number; on: boolean; start: number; s0: number; o0: number; s: number; o: number; fast: boolean };

type Look = {
  frame: string;
  cell: string;
  edge: string;
  line: string;
  sheen: string;
  sheenFade: string;
  contact: string;
  blur: number;
  dx: number;
  dy: number;
  fast: number;
  ease: (t: number) => number;
};

/** A CSS `cubic-bezier(x1, y1, x2, y2)` token as a function of progress. */
function bezier(token: string): (t: number) => number {
  const m = token.match(/cubic-bezier\(([^)]+)\)/);
  if (!m) return (t) => t;
  const [x1, y1, x2, y2] = m[1].split(",").map(parseFloat);
  const at = (a: number, b: number, u: number) => 3 * a * u * (1 - u) * (1 - u) + 3 * b * u * u * (1 - u) + u * u * u;
  return (t) => {
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2;
      if (at(x1, x2, mid) < t) lo = mid;
      else hi = mid;
    }
    return at(y1, y2, (lo + hi) / 2);
  };
}

function readLook(): Look {
  const css = getComputedStyle(document.documentElement);
  const v = (n: string) => css.getPropertyValue(n).trim();
  return {
    frame: v("--panel-frame"),
    cell: v("--panel-cell"),
    edge: v("--panel-edge"),
    line: v("--panel-line"),
    sheen: v("--panel-sheen"),
    sheenFade: v("--panel-sheen-fade"),
    contact: v("--panel-contact"),
    blur: parseFloat(v("--panel-contact-blur")),
    dx: parseFloat(v("--panel-contact-x")),
    dy: parseFloat(v("--panel-contact-y")),
    fast: tokenMs("--dur-fast"),
    ease: bezier(tokenEase("--ease-in-out")),
  };
}

/**
 * The roof panels, drawn on one canvas that fills the hero art box, so the roof quad (percent of the
 * image) stays true at every size. A homography maps the flat grid onto the quad and every panel is
 * projected and drawn as vectors at the device pixel ratio: clean edges, no texture to shimmer. Panels
 * pop on one at a time, 30ms apart, front corner first; removing them reverses the order. The loop
 * runs only while a panel is moving.
 */
export function RoofPanels() {
  const { config, result, maxPanels } = useSizing();
  const { grid, roof } = config;
  const target = Math.min(result.panels, maxPanels);
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const panels = useRef<Panel[]>([]);
  const shown = useRef(0);
  const draw = useRef<() => void>(() => {});
  const kick = useRef<() => void>(() => {});
  const frame = useRef(0);
  const look = useRef<Look | null>(null);

  // Panel centres in grid units. Row 0 is at the front corner, so panels fill from there.
  useEffect(() => {
    const totalW = grid.cols * grid.panelW + (grid.cols - 1) * grid.gap;
    const totalH = grid.rows * grid.panelH + (grid.rows - 1) * grid.gap;
    const ox = (grid.w - totalW) / 2;
    const oy = (grid.h - totalH) / 2;
    const list: Panel[] = [];
    for (let r = 0; r < grid.rows; r++)
      for (let c = 0; c < grid.cols; c++)
        list.push({
          cx: ox + c * (grid.panelW + grid.gap) + grid.panelW / 2,
          cy: oy + (grid.rows - 1 - r) * (grid.panelH + grid.gap) + grid.panelH / 2,
          on: false,
          start: 0,
          s0: POP_FROM,
          o0: 0,
          s: POP_FROM,
          o: 0,
          fast: false,
        });
    panels.current = list;
    shown.current = 0;
  }, [grid]);

  // Size, projection and drawing.
  useEffect(() => {
    const host = box.current;
    const cv = canvas.current;
    const ctx = cv?.getContext("2d");
    if (!host || !cv || !ctx) return;
    look.current ??= readLook();
    let dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
    let proj: (x: number, y: number) => Pt = (x, y) => [x, y];
    let sheenBox: [number, number, number, number] = [0, 0, 1, 1];

    const layout = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      cv.width = Math.max(1, Math.round(w * dpr));
      cv.height = Math.max(1, Math.round(h * dpr));
      const quad = [roof.tl, roof.tr, roof.br, roof.bl].map(([x, y]) => [((x / 100) * w) * dpr, ((y / 100) * h) * dpr] as Pt);
      proj = projector(
        [
          [0, 0],
          [grid.w, 0],
          [grid.w, grid.h],
          [0, grid.h],
        ],
        quad,
      );
      const xs = quad.map((p) => p[0]);
      const ys = quad.map((p) => p[1]);
      sheenBox = [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
    };

    const quadPath = (pts: Pt[]) => {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
    };
    const corners = (p: Panel, hw: number, hh: number): Pt[] => [proj(p.cx - hw, p.cy - hh), proj(p.cx + hw, p.cy - hh), proj(p.cx + hw, p.cy + hh), proj(p.cx - hw, p.cy + hh)];
    const mix = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

    draw.current = () => {
      const L = look.current;
      if (!L) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, cv.width, cv.height);
      const hw = grid.panelW / 2;
      const hh = grid.panelH / 2;
      const visible = panels.current.filter((p) => p.o > 0.003);
      for (const p of visible) {
        ctx.globalAlpha = Math.min(1, p.o);
        const q = corners(p, hw * p.s, hh * p.s);
        // Thin front edge: the side nearest the camera, pushed down the screen a little.
        const thick = Math.max(1, Math.hypot(q[2][0] - q[3][0], q[2][1] - q[3][1]) * 0.035);
        quadPath([q[3], q[2], [q[2][0], q[2][1] + thick], [q[3][0], q[3][1] + thick]]);
        ctx.fillStyle = L.edge;
        ctx.fill();
        quadPath(q);
        ctx.fillStyle = L.frame;
        ctx.fill();
        const inset = FRAME * p.s;
        const c = corners(p, hw * p.s - inset, hh * p.s - inset);
        quadPath(c);
        ctx.fillStyle = L.cell;
        ctx.fill();
        // Cell lines, only where their spacing on screen is wide enough to read (this removes moire).
        ctx.strokeStyle = L.line;
        ctx.lineWidth = 1;
        ctx.beginPath();
        const colGap = Math.hypot(c[1][0] - c[0][0], c[1][1] - c[0][1]) / COLS;
        if (colGap >= MIN_LINE_GAP)
          for (let i = 1; i < COLS; i++) {
            const a = mix(c[0], c[1], i / COLS);
            const b = mix(c[3], c[2], i / COLS);
            ctx.moveTo(a[0], a[1]);
            ctx.lineTo(b[0], b[1]);
          }
        const rowGap = Math.hypot(c[3][0] - c[0][0], c[3][1] - c[0][1]) / 2;
        if (rowGap >= MIN_LINE_GAP) {
          const a = mix(c[0], c[3], 0.5);
          const b = mix(c[1], c[2], 0.5);
          ctx.moveTo(a[0], a[1]);
          ctx.lineTo(b[0], b[1]);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      if (visible.length) {
        // One sheen across the whole array, from the sun side (top left of the image).
        const [x0, y0, x1, y1] = sheenBox;
        const g = ctx.createLinearGradient(x0, y0, x1, y1);
        g.addColorStop(0, L.sheen);
        g.addColorStop(0.7, L.sheenFade);
        ctx.globalCompositeOperation = "source-atop";
        ctx.fillStyle = g;
        ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
        // Contact shadow: every panel's footprint with a shadow, painted behind them.
        ctx.globalCompositeOperation = "destination-over";
        ctx.shadowColor = L.contact;
        ctx.shadowBlur = L.blur * dpr;
        ctx.shadowOffsetX = L.dx * dpr;
        ctx.shadowOffsetY = L.dy * dpr;
        ctx.fillStyle = L.cell;
        // Settled panels share one path (one blur); the few still moving get their own alpha.
        const settled = visible.filter((p) => p.o >= 1);
        if (settled.length) {
          ctx.beginPath();
          for (const p of settled) {
            const q = corners(p, hw * p.s, hh * p.s);
            ctx.moveTo(q[0][0], q[0][1]);
            for (let i = 1; i < 4; i++) ctx.lineTo(q[i][0], q[i][1]);
            ctx.closePath();
          }
          ctx.fill();
        }
        for (const p of visible) {
          if (p.o >= 1) continue;
          ctx.globalAlpha = Math.min(1, p.o);
          quadPath(corners(p, hw * p.s, hh * p.s));
          ctx.fill();
        }
        ctx.shadowColor = "transparent";
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
      }
    };

    // The loop runs only while a panel is moving.
    const step = (now: number) => {
      frame.current = 0;
      const L = look.current;
      if (!L) return;
      let moving = false;
      for (const p of panels.current) {
        const t = Math.max(0, now - p.start);
        if (p.start === 0) continue;
        if (p.on) {
          if (p.fast) {
            p.s = 1;
            p.o = Math.min(1, p.o0 + (1 - p.o0) * Math.min(1, t / L.fast));
            if (t < L.fast) moving = true;
            else p.start = 0;
          } else {
            const k = springAt("bubbly", t);
            p.s = p.s0 + (1 - p.s0) * k;
            p.o = Math.min(1, Math.max(p.o0, k * 3 + 0.02));
            if (t < springMs("bubbly")) moving = true;
            else {
              p.s = 1;
              p.o = 1;
              p.start = 0;
            }
          }
        } else {
          const k = L.ease(Math.min(1, t / L.fast));
          p.s = p.fast ? 1 : p.s0 + (POP_FROM - p.s0) * k;
          p.o = p.o0 * (1 - k);
          if (t < L.fast) moving = true;
          else {
            p.s = p.fast ? 1 : POP_FROM;
            p.o = 0;
            p.start = 0;
          }
        }
      }
      draw.current();
      if (moving) frame.current = requestAnimationFrame(step);
    };
    const run = () => {
      if (!frame.current) frame.current = requestAnimationFrame(step);
    };
    kick.current = run;

    const redraw = () => {
      layout();
      draw.current();
    };
    redraw();
    const ro = new ResizeObserver(redraw);
    ro.observe(host);
    let mq: MediaQueryList | undefined;
    const watch = () => {
      mq?.removeEventListener("change", onDpr);
      mq = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`);
      mq.addEventListener("change", onDpr);
    };
    const onDpr = () => {
      redraw();
      watch();
    };
    watch();
    return () => {
      ro.disconnect();
      mq?.removeEventListener("change", onDpr);
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    };
  }, [grid, roof]);

  // Count of shown panels, one step every 30ms toward the target.
  useEffect(() => {
    const id = window.setInterval(() => {
      const n = shown.current;
      if (n === target) return;
      const next = n < target ? n + 1 : n - 1;
      shown.current = next;
      const list = panels.current;
      const now = performance.now();
      list.forEach((p, i) => {
        const on = i < next;
        if (on === p.on) return;
        p.on = on;
        p.start = now;
        p.s0 = p.s;
        p.o0 = p.o;
        p.fast = reduced();
        if (on && p.fast) p.s = 1;
      });
      kick.current();
    }, PANEL_TICK_MS);
    return () => window.clearInterval(id);
  }, [target]);

  return (
    <div ref={box} data-island aria-hidden className="pointer-events-none absolute inset-0">
      <canvas ref={canvas} className="absolute inset-0 size-full" />
    </div>
  );
}
