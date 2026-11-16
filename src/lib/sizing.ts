// Sizing maths for the hero, the calculator page and the WhatsApp text. Pure functions, no imports:
// scripts/sizing-check.mjs runs this file with node. Formulas are in docs/HOMEPAGE.md.

export type Mode = "rs" | "units";
export type SizingConstants = { ratePerUnit: number; sunHours: number; performanceRatio: number; panelWatts: number };
export type Range = { min: number; max: number; step: number };
export type SizingResult = { kw: number; panels: number; generation: number; capped: boolean };

const DAYS = 30;

/** Float noise (x.0000000001) must not push a ceil to the next step. */
const ceilClean = (x: number) => Math.ceil(Math.round(x * 1e9) / 1e9);

export const unitsFor = (mode: Mode, value: number, c: SizingConstants) => (mode === "rs" ? value / c.ratePerUnit : value);

/** Units one kW makes in a month. */
const perKw = (c: SizingConstants) => DAYS * c.sunHours * c.performanceRatio;

export function size(mode: Mode, value: number, c: SizingConstants, maxPanels: number): SizingResult {
  const base = perKw(c);
  const kw = ceilClean((unitsFor(mode, value, c) / base) * 2) / 2; // up to the next 0.5 kW
  const panels = ceilClean((kw * 1000) / c.panelWatts);
  const generation = Math.round((kw * base) / 10) * 10; // to the nearest 10 units
  return { kw, panels, generation, capped: panels > maxPanels };
}

/** Keep the same load when the visitor flips between Rs and units: convert, snap to the step, clamp. */
export function convertValue(from: Mode, to: Mode, value: number, c: SizingConstants, ranges: Record<Mode, Range>): number {
  const units = unitsFor(from, value, c);
  const raw = to === "rs" ? units * c.ratePerUnit : units;
  const r = ranges[to];
  return Math.min(r.max, Math.max(r.min, Math.round(raw / r.step) * r.step));
}

export const formatNumber = (n: number) => n.toLocaleString("en-US");

/** Fill {name} slots in a content template. */
export const fill = (template: string, vars: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ""));
