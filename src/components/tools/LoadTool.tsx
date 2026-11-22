"use client";

import { toolsContent } from "@/content/tools";
import { fill } from "@/lib/sizing";
import { fmt } from "@/lib/tools/common";
import { handoff } from "@/lib/tools/handoff";
import { loadTotals } from "@/lib/tools/load";
import type { ApplianceState } from "@/lib/tools/state";
import { NumField, ToolShell } from "./ToolShell";
import type { ToolConfig } from "./toolConfig";
import { useToolState } from "./useToolState";

const { common, load: t, appliances, maxHours, hourStep } = toolsContent;
const w = (n: number) => fill(common.w, { n: fmt(n) });
const kwh = (n: number) => fill(common.kwh, { n: fmt(n, 2) });

export function LoadTool({ config }: { config: ToolConfig }) {
  const { state, update, reset } = useToolState(config.state);
  const set = (id: string, patch: Partial<ApplianceState>) => update((s) => ({ ...s, appliances: { ...s.appliances, [id]: { ...s.appliances[id], ...patch } } }));
  const r = loadTotals(Object.values(state.appliances), maxHours);
  const vars = { greeting: common.greeting, day: w(r.dayW), night: w(r.nightW), peak: w(r.peakW), dayKwh: kwh(r.dayKwh), nightKwh: kwh(r.nightKwh) };
  const used = r.peakW > 0;

  return (
    <ToolShell
      inputs={
        <>
          <div>
            <h3 className="text-title">{t.listLabel}</h3>
            <p className="mt-1 text-small text-tone-ink-2">{t.listHint}</p>
          </div>
          <ul className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
            {appliances.map((a) => {
              const s = state.appliances[a.id];
              return (
                <li key={a.id} className={s.qty > 0 ? "flex flex-col gap-3 sm:col-span-2" : undefined}>
                  <NumField
                    label={a.name}
                    ariaLabel={`${a.name}, ${t.quantity.toLowerCase()}`}
                    hint={fill(t.typical, { w: w(a.watts) })}
                    value={s.qty}
                    onValue={(qty) => set(a.id, { qty: Math.floor(qty) })}
                    min={0}
                    max={99}
                  />
                  {s.qty > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                      <NumField label={t.watts} value={s.watts} onValue={(watts) => set(a.id, { watts })} min={1} max={10000} />
                      <NumField label={t.dayHours} value={s.day} onValue={(day) => set(a.id, { day })} min={0} max={maxHours} step={hourStep} />
                      <NumField label={t.nightHours} value={s.night} onValue={(night) => set(a.id, { night })} min={0} max={maxHours} step={hourStep} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      }
      results={[
        { label: t.results.totalKwh, value: kwh(r.totalKwh) },
        { label: t.results.day, value: w(r.dayW) },
        { label: t.results.night, value: w(r.nightW) },
        { label: t.results.peak, value: w(r.peakW) },
        { label: t.results.dayKwh, value: kwh(r.dayKwh) },
        { label: t.results.nightKwh, value: kwh(r.nightKwh) },
      ]}
      announce={used ? fill(t.announce, vars) : t.empty}
      assumptions={t.assumptions.map((a) => (
        <p key={a}>{fill(a, { max: maxHours })}</p>
      ))}
      outlets={config.outlets}
      city={state.city}
      onCity={(city) => update((s) => ({ ...s, city }))}
      link={handoff(config.outlets, state.city, fill(t.whatsapp, vars), config.sizing.quoteHref)}
      onReset={reset}
    />
  );
}
