"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Select } from "@/components/ui/Field";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";
import { track } from "@/lib/analytics";
import { toolsContent } from "@/content/tools";
import { fill } from "@/lib/sizing";
import type { HandoffOutlet } from "@/lib/tools/handoff";

const { common } = toolsContent;
const completed = new Set<string>();

/** Said once, after the visitor stops changing things (a slider would otherwise chatter). The first render says nothing. */
function useSettled(text: string, ms = 700) {
  const [said, setSaid] = useState("");
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const t = setTimeout(() => setSaid(text), ms);
    return () => clearTimeout(t);
  }, [text, ms]);
  return said;
}

/** A number input that keeps what the visitor is typing ("0." or an empty box) until they leave it, then shows the saved value. */
export function NumField({ label, hint, value, onValue, min, max, step = 1, ariaLabel }: { label: string; hint?: string; value: number; onValue: (n: number) => void; min: number; max: number; step?: number; ariaLabel?: string }) {
  const [draft, setDraft] = useState<string | null>(null);
  return (
    <Field
      label={label}
      hint={hint}
      aria-label={ariaLabel}
      type="number"
      inputMode="decimal"
      min={min}
      max={max}
      step={step}
      value={draft ?? String(value)}
      onChange={(e) => {
        setDraft(e.target.value);
        if (Number.isFinite(e.target.valueAsNumber)) onValue(e.target.valueAsNumber);
      }}
      onBlur={() => setDraft(null)}
    />
  );
}

/**
 * Every tool's frame: inputs on the left, the result card on the right (stacked under 64rem). The result card holds the
 * figures, the sentence a screen reader hears, the assumptions, the data date, the shop picker and the WhatsApp action.
 */
export function ToolShell({
  tool,
  inputs,
  results,
  announce,
  assumptions,
  outlets,
  city,
  onCity,
  link,
  onReset,
}: {
  tool: string;
  inputs: ReactNode;
  results: { label: string; value: string }[];
  announce: string;
  assumptions: ReactNode;
  outlets: HandoffOutlet[];
  city: string;
  onCity: (slug: string) => void;
  link: { href: string; whatsapp: boolean };
  onReset: () => void;
}) {
  const said = useSettled(announce);
  // A result counts once the visitor has changed something and it settled; once per tool per page load.
  useEffect(() => {
    if (said && !completed.has(tool)) {
      completed.add(tool);
      track("tool_complete", { tool });
    }
  }, [said, tool]);
  const [main, ...rest] = results;
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
      <div className="flex flex-col gap-6 rounded-card bg-tone-surface p-6 text-tone-ink lg:col-span-7">{inputs}</div>
      <div className="flex flex-col gap-5 rounded-card bg-tone-surface p-6 text-tone-ink lg:sticky lg:top-28 lg:col-span-5">
        <h3 className="text-title">{common.results}</h3>
        <dl className="flex flex-col gap-4">
          <div className="flex flex-col-reverse gap-1">
            <dt className="text-small text-tone-ink-2">{main.label}</dt>
            <dd className="tabular text-figure">{main.value}</dd>
          </div>
          {rest.length > 0 && (
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-tone-line pt-4">
              {rest.map((r) => (
                <div key={r.label} className="flex flex-col-reverse gap-1">
                  <dt className="text-small text-tone-ink-2">{r.label}</dt>
                  <dd className="tabular text-title">{r.value}</dd>
                </div>
              ))}
            </div>
          )}
        </dl>
        <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {said}
        </p>
        <div className="flex flex-col gap-2 border-t border-tone-line pt-4">
          <h4 className="text-small text-tone-ink-2">{common.assumptions}</h4>
          <div className="flex flex-col gap-2 text-caption text-tone-ink-2">{assumptions}</div>
          <p className="text-caption text-tone-ink-2">{fill(common.asOf, { date: toolsContent.asOf })}</p>
        </div>
        <Select label={common.city} value={city} onChange={(e) => onCity(e.target.value)} options={outlets.map((o) => ({ value: o.slug, label: o.city }))} />
        <Button href={link.href} size="lg" className="w-full" ev={link.whatsapp ? ["whatsapp_click", { outlet: city, place: "tool" }] : undefined}>
          {link.whatsapp && <WhatsAppGlyph size={24} />}
          {link.whatsapp ? common.cta : common.ctaQuote}
        </Button>
        <div className="flex flex-col items-start gap-1">
          <p className="text-caption text-tone-ink-2">{common.note}</p>
          <p className="text-caption text-tone-ink-2">{common.savedNote}</p>
          <Button variant="quiet" onClick={onReset}>
            {common.reset}
          </Button>
        </div>
      </div>
    </div>
  );
}
