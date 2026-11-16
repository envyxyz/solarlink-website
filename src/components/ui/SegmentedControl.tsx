"use client";

import { useId, type CSSProperties } from "react";
import { cn } from "@/lib/cn";

export type Segment = { value: string; label: string };

/**
 * Pill with one active element that slides between equal-width options (spring.snappy, CSS transform
 * driven by --i). A native radio group: arrow keys move and select, the fieldset legend names it.
 */
export function SegmentedControl({
  label,
  options,
  value,
  onValueChange,
  disabled,
  className,
}: {
  label: string;
  options: Segment[];
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}) {
  const name = useId();
  const index = Math.max(0, options.findIndex((o) => o.value === value));
  return (
    <fieldset
      disabled={disabled}
      style={{ "--i": index, "--n": options.length } as CSSProperties}
      className={cn("segmented relative inline-grid grid-flow-col auto-cols-fr rounded-pill bg-tone-sunken p-1", disabled && "opacity-50", className)}
    >
      <legend className="sr-only">{label}</legend>
      <span aria-hidden className="segmented-pill rounded-pill bg-surface shadow-float" />
      {options.map((o) => (
        <label
          key={o.value}
          className={cn(
            "segmented-option press relative z-10 inline-flex min-h-10 min-w-control cursor-pointer items-center justify-center rounded-pill px-4 text-control",
            o.value === value ? "text-ink" : "text-tone-ink-2 hover:text-tone-ink",
          )}
        >
          <input type="radio" name={name} value={o.value} checked={o.value === value} onChange={() => onValueChange(o.value)} className="sr-only" />
          {o.label}
        </label>
      ))}
    </fieldset>
  );
}
