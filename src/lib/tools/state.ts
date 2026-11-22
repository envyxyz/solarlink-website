// The values every tool shares and keeps in localStorage. Pure: sanitize() turns anything read back into a safe state.
import { BATTERY_LIMITS } from "./battery.ts";
import { clamp } from "./common.ts";

export type ApplianceState = { qty: number; watts: number; day: number; night: number };
export type ToolState = {
  mode: "rs" | "units";
  bill: number;
  city: string;
  appliances: Record<string, ApplianceState>;
  battery: { watts: number; hours: number; voltage: number; dod: number; eff: number };
};
export type Bounds = { min: number; max: number; step: number };
export type StateConfig = {
  appliances: { id: string; watts: number; day: number; night: number }[];
  rs: Bounds & { start: number };
  units: Bounds;
  cities: string[];
  battery: ToolState["battery"];
  maxHours: number;
};

export function defaultState(c: StateConfig): ToolState {
  return {
    mode: "rs",
    bill: c.rs.start,
    city: c.cities[0],
    appliances: Object.fromEntries(c.appliances.map((a) => [a.id, { qty: 0, watts: a.watts, day: a.day, night: a.night }])),
    battery: { ...c.battery },
  };
}

const num = (v: unknown, fallback: number, min: number, max: number) => (typeof v === "number" && Number.isFinite(v) ? clamp(v, min, max) : fallback);
const obj = (v: unknown): Record<string, unknown> => (v && typeof v === "object" ? (v as Record<string, unknown>) : {});

/** Fills, clamps and drops anything unknown, so stale or hand-edited storage cannot break a tool. */
export function sanitize(raw: unknown, c: StateConfig): ToolState {
  const d = defaultState(c);
  const r = obj(raw);
  const mode = r.mode === "units" ? "units" : "rs";
  const b = mode === "rs" ? c.rs : c.units;
  const apps = obj(r.appliances);
  const bat = obj(r.battery);
  const L = BATTERY_LIMITS;
  return {
    mode,
    bill: num(r.bill, mode === "rs" ? c.rs.start : c.units.min, b.min, b.max),
    city: typeof r.city === "string" && c.cities.includes(r.city) ? r.city : d.city,
    appliances: Object.fromEntries(
      Object.entries(d.appliances).map(([id, a]) => {
        const s = obj(apps[id]);
        return [id, { qty: Math.floor(num(s.qty, a.qty, 0, 99)), watts: num(s.watts, a.watts, 1, 10000), day: num(s.day, a.day, 0, c.maxHours), night: num(s.night, a.night, 0, c.maxHours) }];
      }),
    ),
    battery: {
      watts: num(bat.watts, d.battery.watts, L.watts.min, L.watts.max),
      hours: num(bat.hours, d.battery.hours, L.hours.min, L.hours.max),
      voltage: (L.voltages as readonly number[]).includes(bat.voltage as number) ? (bat.voltage as number) : d.battery.voltage,
      dod: num(bat.dod, d.battery.dod, L.dod.min, L.dod.max),
      eff: num(bat.eff, d.battery.eff, L.eff.min, L.eff.max),
    },
  };
}
