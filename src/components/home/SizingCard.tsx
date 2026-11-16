"use client";

import { hero } from "@/content/home";
import { ui } from "@/content/ui";
import { Button, IconButton } from "@/components/ui/Button";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Slider } from "@/components/ui/Slider";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";
import type { Mode } from "@/lib/sizing";
import { useSizing } from "./SizingProvider";

/**
 * Where the sizing card sits: a solid card inside the dock on phones and tablets, a glass card
 * bottom left of the stage from 64rem. The no-JavaScript card in Hero uses the same slot.
 */
export const sizingSlot =
  "order-2 md:order-1 md:basis-0 md:grow-6 lg:glass lg:absolute lg:bottom-12 lg:left-12 lg:z-5 lg:w-100 lg:rounded-card lg:p-6 short:bottom-6 short:p-5";

export function SizingCard() {
  const { mode, value, setValue, setMode, range, text, href } = useSizing();
  return (
    <section id="sizing" data-island aria-label={hero.sizingLabel} className={`${sizingSlot} scroll-mt-26`}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-small">{hero.billLabel}</p>
        <SegmentedControl label={hero.unitLabel} options={hero.modes} value={mode} onValueChange={(v) => setMode(v as Mode)} />
      </div>
      {/* Plain zeros: Mona Sans tabular figures have a dotted zero, so the figure stays proportional. The card is fixed width and nothing sits beside the number, so nothing shifts. */}
      <p aria-hidden className="mb-1 mt-3 text-figure short:mb-0 short:mt-2 short:text-figure-compact">
        {text.value}
      </p>
      <Slider label={hero.sliderLabel} valueText={text.valueText} value={value} onValueChange={setValue} min={range.min} max={range.max} step={range.step} />
      <div className="mt-2 flex items-center gap-2 short:mt-0">
        <Button href={href} size="lg" className="min-w-0 flex-1">
          {hero.cta}
        </Button>
        <IconButton variant="dark" size="lg" label={ui.whatsapp.openLabel} href={href}>
          <WhatsAppGlyph size={24} />
        </IconButton>
      </div>
      <p className="mt-3 text-caption text-ink-2 short:mt-2">{hero.note}</p>
    </section>
  );
}
