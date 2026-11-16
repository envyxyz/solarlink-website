"use client";

import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { popIn } from "@/lib/spring";
import { icon } from "./icons";

type Common = { className?: string; glass?: boolean };

/** Stable ref callback: runs when the chip mounts, so a new popKey (a remount) plays the pop. */
const popRef = (el: HTMLElement | null) => {
  if (el) popIn(el);
};

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
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={() => onSelectedChange(!selected)}
      className={cn(
        pill,
        "focus-ring press min-h-control px-5 disabled:opacity-50",
        selected ? "bg-lime-wash text-ink shadow-float" : "bg-tone-sunken text-tone-ink hover:brightness-95",
        className,
      )}
    >
      {selected && <Check {...icon} size={16} />}
      {children}
    </button>
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
    <span key={popKey} ref={popRef} className={cn(pill, "min-h-control px-4 py-2", glass ? "glass text-ink" : "bg-tone-sunken text-tone-ink", className)}>
      <span className="text-title tabular">{value}</span>
      <span className={cn("text-small", glass ? "text-ink-2" : "text-tone-ink-2")}>{label}</span>
    </span>
  );
}
