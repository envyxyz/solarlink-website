import type { Fact } from "@/content";

// SOLARLINK_PREVIEW=1 shows unconfirmed facts in a static build, for screenshots only. `pnpm build` runs
// check-content --post, which fails if an unconfirmed fact reaches out/, so a preview build cannot ship.
const production = process.env.NODE_ENV === "production" && !process.env.SOLARLINK_PREVIEW;

/** The value of a fact, or null when it is unconfirmed in a production build (estimates excepted). */
export function show<T>(fact: Fact<T>): T | null {
  return fact.confirmed || fact.shownAsEstimate || !production ? fact.value : null;
}

/** Same rule for flagged objects (services, brands). */
export const isShown = (node: { confirmed: boolean }) => node.confirmed || !production;

export const shownList = <T extends { confirmed: boolean }>(items: T[]): T[] => items.filter(isShown);
