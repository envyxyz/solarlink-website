import type { Fact } from "@/content";

const production = process.env.NODE_ENV === "production";

/** The value of a fact, or null when it is unconfirmed in a production build. */
export function show<T>(fact: Fact<T>): T | null {
  return fact.confirmed || !production ? fact.value : null;
}

/** Same rule for flagged objects (services, brands). */
export const isShown = (node: { confirmed: boolean }) => node.confirmed || !production;

export const shownList = <T extends { confirmed: boolean }>(items: T[]): T[] => items.filter(isShown);
