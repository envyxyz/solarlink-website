"use client";

import { Button } from "@/components/ui/Button";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Slider } from "@/components/ui/Slider";
import { hero } from "@/content/home";
import { toolsContent } from "@/content/tools";
import { convertValue, fill, formatNumber, size, type Mode } from "@/lib/sizing";
import { clamp, fmt } from "@/lib/tools/common";
import { handoff } from "@/lib/tools/handoff";
import { loadTotals } from "@/lib/tools/load";
import { ToolShell } from "./ToolShell";
import type { ToolConfig } from "./toolConfig";
import { useToolState } from "./useToolState";

const { common, solar: t, maxHours } = toolsContent;

export function SolarTool({ config }: { config: ToolConfig }) {
  const { state, update, reset } = useToolState(config.state);
  const { sizing: s } = config;
  const c = s.constants;
  const ranges = { rs: s.rs, units: s.units };
  const range = ranges[state.mode];
  const result = size(state.mode, state.bill, c, s.grid.cols * s.grid.rows);
  const n = formatNumber(state.bill);
  const bill = fill(state.mode === "rs" ? hero.valueRs : hero.valueUnits, { n });
  // Shared with the load calculator: its daily total, as units a month, can set the slider.
  const load = loadTotals(Object.values(state.appliances), maxHours).unitsMonth;

  const kw = fill(common.kw, { n: fmt(result.kw, 1) });
  const panels = fill(result.panels === 1 ? t.panelOne : t.panelMany, { n: formatNumber(result.panels) });
  const units = formatNumber(result.generation);
  const city = config.outlets.find((o) => o.slug === state.city)?.city ?? "";
  const setMode = (to: Mode) => update((x) => (x.mode === to ? x : { ...x, mode: to, bill: convertValue(x.mode, to, x.bill, c, ranges) }));
  const useLoad = () =>
    update((x) => ({ ...x, mode: "units", bill: clamp(Math.round(load / s.units.step) * s.units.step, s.units.min, s.units.max) }));

  return (
    <ToolShell
      tool="solar"
      inputs={
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-small">{hero.billLabel}</p>
            <SegmentedControl label={hero.unitLabel} options={hero.modes} value={state.mode} onValueChange={(v) => setMode(v as Mode)} />
          </div>
          <p className="tabular text-figure">{bill}</p>
          <Slider
            label={hero.sliderLabel}
            valueText={fill(state.mode === "rs" ? hero.valueTextRs : hero.valueTextUnits, { n })}
            value={state.bill}
            onValueChange={(bill) => update((x) => ({ ...x, bill }))}
            min={range.min}
            max={range.max}
            step={range.step}
          />
          {load > 0 && (
            <Button variant="quiet" onClick={useLoad} className="self-start">
              {fill(t.useLoad, { n: fill(common.units, { n: formatNumber(Math.round(load)) }) })}
            </Button>
          )}
        </>
      }
      results={[
        { label: t.results.kw, value: kw },
        { label: t.results.panels, value: formatNumber(result.panels) },
        { label: t.results.generation, value: units },
      ]}
      announce={fill(t.announce, { kw, panels, units })}
      assumptions={
        <>
          <p>{fill(t.assumptions, { rate: c.ratePerUnit, sun: c.sunHours, watts: c.panelWatts })}</p>
          {result.capped && <p>{t.roofCap}</p>}
        </>
      }
      outlets={config.outlets}
      city={state.city}
      onCity={(city) => update((x) => ({ ...x, city }))}
      link={handoff(config.outlets, state.city, fill(t.whatsapp, { greeting: common.greeting, bill, kw, panels, city }), s.quoteHref)}
      onReset={reset}
    />
  );
}
