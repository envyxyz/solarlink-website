"use client";

import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Field";
import { toolsContent } from "@/content/tools";
import { fill } from "@/lib/sizing";
import { BATTERY_LIMITS as L, batteryNeed } from "@/lib/tools/battery";
import { fmt } from "@/lib/tools/common";
import { handoff } from "@/lib/tools/handoff";
import { loadTotals } from "@/lib/tools/load";
import { NumField, ToolShell } from "./ToolShell";
import type { ToolConfig } from "./toolConfig";
import { useToolState } from "./useToolState";

const { common, battery: t, maxHours } = toolsContent;
const w = (n: number) => fill(common.w, { n: fmt(n) });

export function BatteryTool({ config }: { config: ToolConfig }) {
  const { state, update, reset } = useToolState(config.state);
  const b = state.battery;
  const set = (patch: Partial<typeof b>) => update((s) => ({ ...s, battery: { ...s.battery, ...patch } }));
  const r = batteryNeed(b);
  // Shared with the load calculator: its night load can fill the box.
  const night = loadTotals(Object.values(state.appliances), maxHours).nightW;
  const vars = {
    greeting: common.greeting,
    w: w(b.watts),
    h: fill(common.hours, { n: fmt(b.hours, 1) }),
    kwh: fill(common.kwh, { n: fmt(r.requiredKwh, 2) }),
    ah: fill(common.ah, { n: fmt(r.ah) }),
    v: fill(common.volts, { n: b.voltage }),
    dod: fill(common.percent, { n: fmt(b.dod) }),
    eff: fill(common.percent, { n: fmt(b.eff) }),
  };

  return (
    <ToolShell
      tool="battery"
      inputs={
        <>
          <NumField label={t.watts} hint={t.wattsHint} value={b.watts} onValue={(watts) => set({ watts })} min={L.watts.min} max={L.watts.max} step={10} />
          {night > 0 && night !== b.watts && (
            <Button variant="quiet" onClick={() => set({ watts: night })} className="self-start">
              {fill(t.useLoad, { w: w(night) })}
            </Button>
          )}
          <NumField label={t.hours} value={b.hours} onValue={(hours) => set({ hours })} min={L.hours.min} max={L.hours.max} step={0.5} />
          <Select label={t.voltage} value={String(b.voltage)} onChange={(e) => set({ voltage: Number(e.target.value) })} options={L.voltages.map((v) => ({ value: String(v), label: fill(common.volts, { n: v }) }))} />
          <NumField label={t.dod} hint={t.dodHint} value={b.dod} onValue={(dod) => set({ dod })} min={L.dod.min} max={L.dod.max} />
          <NumField label={t.eff} hint={t.effHint} value={b.eff} onValue={(eff) => set({ eff })} min={L.eff.min} max={L.eff.max} />
        </>
      }
      results={[
        { label: t.results.kwh, value: vars.kwh },
        { label: fill(t.results.ah, { v: vars.v }), value: vars.ah },
        { label: t.results.load, value: fill(common.kwh, { n: fmt(r.loadKwh, 2) }) },
      ]}
      announce={fill(t.announce, vars)}
      assumptions={t.assumptions.map((a) => (
        <p key={a}>{a}</p>
      ))}
      outlets={config.outlets}
      city={state.city}
      onCity={(city) => update((s) => ({ ...s, city }))}
      link={handoff(config.outlets, state.city, fill(t.whatsapp, vars), config.sizing.quoteHref)}
      onReset={reset}
    />
  );
}
