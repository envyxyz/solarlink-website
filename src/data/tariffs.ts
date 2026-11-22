/*
  Electricity tariff data for the bill breakdown and net billing tools. NOTHING HERE IS VERIFIED.
  Every value is a fact { value, confirmed: false, source: "[confirm with client]" }, so the tools show the
  "Awaiting verified tariff data" state and no number. Do not type rates from memory or from the old site.

  TODO(tariff-research): another job is collecting sources. When a figure is verified, replace its `pending()` with
  { value: <number>, confirmed: true, source: "<NEPRA notification or DISCO tariff page, with date>" } and set `effectiveFrom`.
  The tools switch on by themselves once billReady() / netBillingReady() return true; nothing else needs to change.

  Server only: tool islands receive a boolean, never this file (an unconfirmed source string must not reach the browser).
  Plain relative imports, so node can run it from scripts/tools-check.mjs.
*/
import type { Fact } from "../content.ts";

export type Num = Fact<number | null>;
const pending = (): Num => ({ value: null, confirmed: false, source: "[confirm with client]" });

/** One slab: units up to (null on the last, open-ended slab) and the rate for units inside it. */
export type Slab = { upToUnits: Num; ratePerUnit: Num };

export type DiscoTariff = {
  id: string;
  name: string;
  /** Per-category slab tables. TODO(tariff-research): one Slab per verified slab, in order. Empty until verified, never a guessed count. */
  slabs: Slab[];
  /** Fixed monthly charge per bill, Rs. */
  fixedCharge: Num;
  /** Sales tax as a percent of the bill. TODO(tariff-research): add any other tax or surcharge line as its own Num. */
  gstPercent: Num;
  /** Date the tariff took effect (YYYY-MM-DD) from the notification. */
  effectiveFrom: Fact<string | null>;
};

const disco = (id: string, name: string): DiscoTariff => ({
  id,
  name,
  slabs: [],
  fixedCharge: pending(),
  gstPercent: pending(),
  effectiveFrom: { value: null, confirmed: false, source: "[confirm with client]" },
});

/** TODO(tariff-research): confirm which DISCOs the tool should offer, and which one serves each SolarLink city. */
export const tariffs: DiscoTariff[] = [disco("lesco", "LESCO"), disco("iesco", "IESCO"), disco("mepco", "MEPCO")];

/**
 * Net billing: what the DISCO pays per exported unit. TODO(tariff-research): from the NEPRA regulation itself, with its date.
 * Unverified lead (agy research, docs/research/agy-2026-11-23/net-billing.md): NEPRA (Prosumer) Regulations 2026,
 * S.R.O. 251(I)/2026, https://nepra.org.pk. Read the notification itself before confirming anything.
 */
export const exportRate: Num = pending();

const ok = (n: Num) => n.confirmed && n.value !== null;

/** True when a DISCO has at least one slab and every figure in it is confirmed. */
export const discoReady = (d: DiscoTariff) =>
  d.slabs.length > 0 && d.slabs.every((s) => ok(s.ratePerUnit) && (ok(s.upToUnits) || s === d.slabs[d.slabs.length - 1])) && ok(d.fixedCharge) && ok(d.gstPercent) && d.effectiveFrom.confirmed;

export const billReady = (list: DiscoTariff[] = tariffs) => list.some(discoReady);
export const netBillingReady = (list: DiscoTariff[] = tariffs, rate: Num = exportRate) => billReady(list) && ok(rate);
