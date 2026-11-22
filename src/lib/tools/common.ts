// Shared helpers for the tool maths. Pure, no imports: scripts/tools-check.mjs runs these files with node.

export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/** Float noise must not push a ceil to the next step (same guard as sizing.ts). */
export const ceilClean = (x: number) => Math.ceil(Math.round(x * 1e9) / 1e9);

/** 1,234.5 style with at most `d` decimals. */
export const fmt = (n: number, d = 0) => n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: d });

/** Days in the month used by the sizing maths. */
export const DAYS = 30;
