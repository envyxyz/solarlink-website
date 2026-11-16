"use client";

import { ToggleGroup } from "radix-ui";
import { m } from "motion/react";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";

export type Segment = { value: string; label: string };

/**
 * Pill with one active element that slides between equal-width options (spring.snappy).
 * Radix ToggleGroup gives radio semantics and arrow-key movement.
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
  const index = Math.max(0, options.findIndex((o) => o.value === value));
  return (
    <ToggleGroup.Root
      type="single"
      value={value}
      onValueChange={(v) => v && onValueChange(v)}
      aria-label={label}
      disabled={disabled}
      className={cn("relative inline-grid grid-flow-col auto-cols-fr rounded-pill bg-tone-sunken p-1", disabled && "opacity-50", className)}
    >
      <m.span
        aria-hidden
        className="absolute inset-y-1 left-1 rounded-pill bg-surface shadow-float"
        style={{ width: `calc((100% - var(--spacing) * 2) / ${options.length})` }}
        animate={{ x: `${index * 100}%` }}
        initial={false}
        transition={spring.snappy}
      />
      {options.map((o) => (
        <ToggleGroup.Item
          key={o.value}
          value={o.value}
          className={cn(
            "focus-ring press relative z-10 inline-flex min-h-10 min-w-control items-center justify-center rounded-pill px-4 text-control",
            o.value === value ? "text-ink" : "text-tone-ink-2 hover:text-tone-ink",
          )}
        >
          {o.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
