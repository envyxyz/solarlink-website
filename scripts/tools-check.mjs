// Self-check for src/lib/tools/*: load totals, battery maths, saved-state clean-up, WhatsApp handoff and the tariff gate.
import assert from "node:assert/strict";
import { loadTotals } from "../src/lib/tools/load.ts";
import { batteryNeed } from "../src/lib/tools/battery.ts";
import { defaultState, sanitize } from "../src/lib/tools/state.ts";
import { handoff } from "../src/lib/tools/handoff.ts";
import { fmt } from "../src/lib/tools/common.ts";
import { size } from "../src/lib/sizing.ts";
import { billReady, netBillingReady, tariffs, exportRate, discoReady } from "../src/data/tariffs.ts";

const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} is not ${b}`);

// Load: 2 fans of 75 W for 6 h by day and 8 h at night, 1 pump of 750 W for 1 h by day.
const r = loadTotals([
  { watts: 75, qty: 2, day: 6, night: 8 },
  { watts: 750, qty: 1, day: 1, night: 0 },
]);
assert.equal(r.dayW, 900); // both run in the day
assert.equal(r.nightW, 150); // only the fans at night
assert.equal(r.peakW, 900); // everything that runs at all
near(r.dayKwh, (150 * 6 + 750) / 1000); // 1.65
near(r.nightKwh, (150 * 8) / 1000); // 1.2
near(r.totalKwh, 2.85);
near(r.unitsMonth, 85.5);
// Hours cap at 12 a side; a zero quantity adds nothing; fractions of a unit are dropped.
near(loadTotals([{ watts: 100, qty: 1, day: 20, night: 0 }]).dayKwh, 1.2);
assert.equal(loadTotals([{ watts: 100, qty: 0, day: 5, night: 5 }]).peakW, 0);
assert.equal(loadTotals([{ watts: 100, qty: 2.9, day: 1, night: 0 }]).dayW, 200);

// Battery: 1000 W for 4 h = 4 kWh; at 90% inverter and 80% usable, 4 / 0.9 / 0.8 = 5.5556 kWh; at 48 V that is 115.7 Ah, rounded up to 116.
const b = batteryNeed({ watts: 1000, hours: 4, voltage: 48, dod: 80, eff: 90 });
near(b.loadKwh, 4);
near(b.requiredKwh, 4 / 0.9 / 0.8);
assert.equal(b.ah, 116);
// A perfect battery and inverter need exactly the load energy: 1000 W for 1 h at 12 V is 83.33 Ah, rounded up to 84.
const perfect = batteryNeed({ watts: 1000, hours: 1, voltage: 12, dod: 100, eff: 100 });
near(perfect.requiredKwh, 1);
assert.equal(perfect.ah, 84);
// Silly inputs clamp instead of dividing by zero.
assert.ok(Number.isFinite(batteryNeed({ watts: 1000, hours: 4, voltage: 48, dod: 0, eff: 0 }).requiredKwh));

// Solar reuses sizing.ts: the load calculator's units a month feed the same function.
const c = { ratePerUnit: 50, sunHours: 5, performanceRatio: 0.78, panelWatts: 580 };
assert.equal(size("units", 900, c, 40).kw, 8);
assert.equal(size("units", r.unitsMonth, c, 40).kw, 1); // 85.5 units is under one kW

// Saved state: junk in, safe state out; good values survive.
const cfg = {
  appliances: [{ id: "fan", watts: 75, day: 6, night: 8 }],
  rs: { min: 5000, max: 300000, step: 1000, start: 45000 },
  units: { min: 100, max: 5000, step: 50 },
  cities: ["lahore", "islamabad"],
  battery: { watts: 1000, hours: 4, voltage: 48, dod: 80, eff: 90 },
  maxHours: 12,
};
assert.deepEqual(sanitize(null, cfg), defaultState(cfg));
assert.deepEqual(sanitize("junk", cfg), defaultState(cfg));
const s = sanitize({ mode: "units", bill: 99999, city: "mars", appliances: { fan: { qty: 2.7, watts: -4, day: 50, night: "x" }, ghost: { qty: 1 } }, battery: { voltage: 36, dod: 5 } }, cfg);
assert.equal(s.mode, "units");
assert.equal(s.bill, 5000); // clamped to the units range
assert.equal(s.city, "lahore");
assert.deepEqual(s.appliances, { fan: { qty: 2, watts: 1, day: 12, night: 8 } });
assert.equal(s.battery.voltage, 48);
assert.equal(s.battery.dod, 20);
assert.deepEqual(sanitize(s, cfg), s); // idempotent
assert.equal(sanitize({ bill: 60000 }, cfg).bill, 60000);

// Handoff: the chosen outlet's number goes into the wa.me link; no number falls back to the quote page.
const outlets = [{ slug: "lahore", city: "Lahore", whatsapp: "0321-0000000" }, { slug: "islamabad", city: "Islamabad", whatsapp: null }];
const h = handoff(outlets, "lahore", "a b", "/get-quote/");
assert.equal(h.whatsapp, true);
assert.equal(h.href, "https://wa.me/923210000000?text=a%20b");
assert.deepEqual(handoff(outlets, "islamabad", "x", "/get-quote/"), { href: "/get-quote/", whatsapp: false });

// Tariff gate: nothing is ready while every value is unconfirmed; a fully confirmed set is ready.
assert.equal(billReady(), false);
assert.equal(netBillingReady(), false);
assert.ok(tariffs.every((d) => d.slabs.length === 0 && !discoReady(d)));
assert.ok(tariffs.every((d) => d.fixedCharge.source === "[confirm with client]" && d.fixedCharge.value === null));
const ok = (n) => ({ value: n, confirmed: true, source: "test" });
const full = { id: "t", name: "T", slabs: [{ upToUnits: ok(100), ratePerUnit: ok(1) }, { upToUnits: { value: null, confirmed: false, source: "test" }, ratePerUnit: ok(2) }], fixedCharge: ok(1), gstPercent: ok(1), effectiveFrom: ok("2026-01-01") };
assert.equal(billReady([full]), true);
assert.equal(netBillingReady([full], exportRate), false); // export rate still pending
assert.equal(netBillingReady([full], ok(1)), true);
assert.equal(billReady([{ ...full, gstPercent: { ...ok(1), confirmed: false } }]), false);

assert.equal(fmt(1234.5, 1), "1,234.5");
console.log("tools-check ok");
