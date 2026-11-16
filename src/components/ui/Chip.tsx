"use client";

import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { m } from "motion/react";
import { cn } from "@/lib/cn";
import { pop, press } from "@/lib/motion";
import { icon } from "./icons";

type Common = { className?: string; glass?: boolean };

const pill = "inline-flex items-center gap-2 rounded-pill text-control";

/** `static`: a label. */
export function Chip({ children, glass, className }: Common & { children: ReactNode }) {
  return <span className={cn(pill, "min-h-9 px-4", glass ? "glass text-ink" : "bg-tone-sunken text-tone-ink", className)}>{children}</span>;
}

/** `selectable`: a toggle. Lime wash when selected, plus a tick shape so colour is not the only signal. */
export function SelectableChip({
  selected,
  onSelectedChange,
  disabled,
  children,
  className,
}: Common & { selected: boolean; onSelectedChange: (next: boolean) => void; disabled?: boolean; children: ReactNode }) {
  return (
    <m.button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={() => onSelectedChange(!selected)}
      {...press}
      className={cn(
        pill,
        "focus-ring min-h-control px-5 disabled:opacity-50",
        selected ? "bg-lime-wash text-ink shadow-float" : "bg-tone-sunken text-tone-ink hover:brightness-95",
        className,
      )}
    >
      {selected && <Check {...icon} size={16} />}
      {children}
    </m.button>
  );
}

/**
 * `stat`: number plus label. Changing `popKey` remounts the chip so it pops in with spring.bubbly.
 * Numbers are tabular so nothing shifts when they change.
 */
export function StatChip({
  value,
  label,
  glass,
  popKey,
  className,
}: Common & { value: ReactNode; label: ReactNode; popKey?: string | number }) {
  return (
    <m.span key={popKey} {...pop} className={cn(pill, "min-h-control px-4 py-2", glass ? "glass text-ink" : "bg-tone-sunken text-tone-ink", className)}>
      <span className="text-title tabular">{value}</span>
      <span className={cn("text-small", glass ? "text-ink-2" : "text-tone-ink-2")}>{label}</span>
    </m.span>
  );
}
