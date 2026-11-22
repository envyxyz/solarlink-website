import { clamp, DAYS } from "./common.ts";

/** One appliance line: rated watts each, how many, hours a day in daylight and at night. */
export type LoadRow = { watts: number; qty: number; day: number; night: number };
export type LoadResult = { dayW: number; nightW: number; peakW: number; dayKwh: number; nightKwh: number; totalKwh: number; unitsMonth: number };

/**
 * Daytime = sunrise to sunset, night = the rest. Each side is capped at `maxHours` (12) so a row never runs more than 24 h.
 * dayW and nightW are what is switched on in that half; peakW assumes everything that runs at all runs together (the safe size for an inverter).
 * ponytail: no motor start-up surge; the page tells the visitor to ask for it.
 */
export function loadTotals(rows: LoadRow[], maxHours = 12): LoadResult {
  let dayW = 0, nightW = 0, peakW = 0, dayWh = 0, nightWh = 0;
  for (const r of rows) {
    const w = Math.max(0, r.watts) * Math.max(0, Math.floor(r.qty));
    const day = clamp(r.day, 0, maxHours);
    const night = clamp(r.night, 0, maxHours);
    if (day > 0) dayW += w;
    if (night > 0) nightW += w;
    if (day > 0 || night > 0) peakW += w;
    dayWh += w * day;
    nightWh += w * night;
  }
  const dayKwh = dayWh / 1000;
  const nightKwh = nightWh / 1000;
  const totalKwh = dayKwh + nightKwh;
  return { dayW, nightW, peakW, dayKwh, nightKwh, totalKwh, unitsMonth: totalKwh * DAYS };
}
