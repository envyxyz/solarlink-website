"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { hero } from "@/content/home";
import { waHref } from "@/lib/phone";
import { convertValue, fill, formatNumber, size, type Mode, type Range, type SizingConstants, type SizingResult } from "@/lib/sizing";

export type RoofPoint = readonly [number, number];
export type SizingConfig = {
  constants: SizingConstants;
  rs: Range & { start: number };
  units: Range;
  roof: { tl: RoofPoint; tr: RoofPoint; br: RoofPoint; bl: RoofPoint };
  grid: { w: number; h: number; panelW: number; panelH: number; gap: number; cols: number; rows: number };
  /** The Lahore WhatsApp number as shown in content, or null when it is not shown (then the CTA opens the quote page). */
  whatsapp: string | null;
  quoteHref: string;
};

type Sizing = {
  config: SizingConfig;
  mode: Mode;
  value: number;
  setValue: (v: number) => void;
  setMode: (m: Mode) => void;
  range: Range;
  result: SizingResult;
  maxPanels: number;
  /** True once the visitor has changed something: result figures pop only after that. */
  touched: boolean;
  text: { value: string; valueText: string; kw: string; panels: string; generation: string; assumptions: string };
  href: string;
};

const Ctx = createContext<Sizing | null>(null);

export function useSizing() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSizing outside SizingProvider");
  return v;
}

/** Holds the bill, the unit mode and everything derived from them for the hero island. */
export function SizingProvider({ config, children }: { config: SizingConfig; children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>("rs");
  const [value, setValueState] = useState(config.rs.start);
  const [touched, setTouched] = useState(false);

  const value$ = useMemo<Sizing>(() => {
    const { constants: c } = config;
    const ranges = { rs: config.rs, units: config.units };
    const maxPanels = config.grid.cols * config.grid.rows;
    const result = size(mode, value, c, maxPanels);
    const n = formatNumber(value);
    const display = fill(mode === "rs" ? hero.valueRs : hero.valueUnits, { n });
    const kw = fill(hero.kw, { n: formatNumber(result.kw) });
    const panels = fill(result.panels === 1 ? hero.panelOne : hero.panelMany, { n: formatNumber(result.panels) });
    const message = fill(hero.whatsappMessage, { bill: display, kw, panels });
    return {
      config,
      mode,
      value,
      setValue: (v) => {
        setTouched(true);
        setValueState(v);
      },
      setMode: (next) => {
        if (next === mode) return;
        setTouched(true);
        setValueState(convertValue(mode, next, value, c, ranges));
        setModeState(next);
      },
      range: ranges[mode],
      result,
      maxPanels,
      touched,
      text: {
        value: display,
        valueText: fill(mode === "rs" ? hero.valueTextRs : hero.valueTextUnits, { n }),
        kw,
        panels: formatNumber(result.panels),
        generation: formatNumber(result.generation),
        assumptions: fill(hero.assumptions, { rate: c.ratePerUnit, sun: c.sunHours, watts: c.panelWatts }),
      },
      href: config.whatsapp ? waHref(config.whatsapp, message) : config.quoteHref,
    };
  }, [config, mode, value, touched]);

  return <Ctx.Provider value={value$}>{children}</Ctx.Provider>;
}
