// Self-check for src/lib/sizing.ts: rounding, the roof cap and both modes.
import assert from "node:assert/strict";
import { size, convertValue, fill, formatNumber } from "../src/lib/sizing.ts";

const c = { ratePerUnit: 50, sunHours: 5, performanceRatio: 0.78, panelWatts: 580 };
const ranges = { rs: { min: 5000, max: 300000, step: 1000 }, units: { min: 100, max: 5000, step: 50 } };

// Rs mode: 45,000 / 50 = 900 units; 900 / 117 = 7.69 kW -> 8 kW; 8000 / 580 -> 14 panels; 8 * 117 = 936 -> 940 units.
assert.deepEqual(size("rs", 45000, c, 40), { kw: 8, panels: 14, generation: 940, capped: false });
// Units mode gives the same result for the same load.
assert.deepEqual(size("units", 900, c, 40), size("rs", 45000, c, 40));
// Round up to 0.5 kW: 117 units is exactly 1 kW (no bump), 118 units goes to 1.5 kW.
assert.equal(size("units", 117, c, 40).kw, 1);
assert.equal(size("units", 118, c, 40).kw, 1.5);
// Panels round up: 1 kW needs 2 panels of 580 W.
assert.equal(size("units", 117, c, 40).panels, 2);
// Generation rounds to the nearest 10 units.
assert.equal(size("units", 100, c, 40).generation, 120);
// Cap: 300,000 Rs is a 52 kW system, more than 40 panels.
const big = size("rs", 300000, c, 40);
assert.equal(big.capped, true);
assert.ok(big.panels > 40);
assert.equal(size("rs", 45000, c, 14).capped, false);
assert.equal(size("rs", 45000, c, 13).capped, true);
// Mode switch keeps the load, snaps to the step and clamps.
assert.equal(convertValue("rs", "units", 45000, c, ranges), 900);
assert.equal(convertValue("units", "rs", 900, c, ranges), 45000);
assert.equal(convertValue("units", "rs", 100, c, ranges), 5000);
assert.equal(convertValue("rs", "units", 300000, c, ranges), 5000);
// Helpers.
assert.equal(formatNumber(45000), "45,000");
assert.equal(fill("a {x} b {y}", { x: 1, y: "z" }), "a 1 b z");
console.log("sizing-check ok");
