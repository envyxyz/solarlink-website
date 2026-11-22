import { ceilClean, clamp } from "./common.ts";

/** Every number a visitor may edit, with the bounds the inputs and the maths share. */
export const BATTERY_LIMITS = {
  watts: { min: 10, max: 20000 },
  hours: { min: 1, max: 48 },
  dod: { min: 20, max: 100 },
  eff: { min: 50, max: 100 },
  voltages: [12, 24, 48],
} as const;

export type BatteryInput = { watts: number; hours: number; voltage: number; dod: number; eff: number };
export type BatteryResult = { loadKwh: number; requiredKwh: number; ah: number };

/**
 * Energy the load takes = W x h. The battery must hold that divided by the inverter efficiency (losses) and by the usable
 * share of the battery (depth of discharge). Ah = kWh x 1000 / battery voltage, rounded up to a whole number.
 */
export function batteryNeed(i: BatteryInput): BatteryResult {
  const L = BATTERY_LIMITS;
  const loadKwh = (clamp(i.watts, L.watts.min, L.watts.max) * clamp(i.hours, L.hours.min, L.hours.max)) / 1000;
  const requiredKwh = loadKwh / (clamp(i.eff, L.eff.min, L.eff.max) / 100) / (clamp(i.dod, L.dod.min, L.dod.max) / 100);
  return { loadKwh, requiredKwh, ah: ceilClean((requiredKwh * 1000) / i.voltage) };
}
