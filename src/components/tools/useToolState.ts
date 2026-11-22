"use client";

import { useSyncExternalStore } from "react";
import { defaultState, sanitize, type StateConfig, type ToolState } from "@/lib/tools/state";

const KEY = "solarlink.tools.v1";
const subs = new Set<() => void>();
let client: ToolState | null = null;
let server: ToolState | null = null;

function subscribe(fn: () => void) {
  subs.add(fn);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    client = null; // another tab changed it: read again
    fn();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    subs.delete(fn);
    window.removeEventListener("storage", onStorage);
  };
}

/**
 * The state every tool shares, kept in localStorage. The server and the first client render use the starting values
 * (no mismatch); the saved values arrive right after hydration. `update` takes a change, sanitises it and saves it.
 */
export function useToolState(config: StateConfig) {
  const read = () => {
    if (client) return client;
    let raw: unknown = null;
    try {
      raw = JSON.parse(localStorage.getItem(KEY) ?? "null");
    } catch {
      // private mode or bad JSON: start fresh
    }
    return (client = sanitize(raw, config));
  };
  const state = useSyncExternalStore(subscribe, read, () => (server ??= defaultState(config)));
  const update = (change: (s: ToolState) => ToolState) => {
    client = sanitize(change(read()), config);
    try {
      localStorage.setItem(KEY, JSON.stringify(client));
    } catch {
      // storage full or blocked: the tool still works for this visit
    }
    subs.forEach((f) => f());
  };
  return { state, update, reset: () => update(() => defaultState(config)) };
}
