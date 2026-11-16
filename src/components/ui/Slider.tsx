"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/**
 * Native range input styled to tokens (class slider in globals.css): 52px touch height, pill track,
 * lime fill driven by --p, floating thumb. The browser gives it the slider role and the arrow, Home,
 * End and Page keys. `label` names it for screen readers; `valueText` says what the number means
 * ("Rs 45,000" rather than "45000").
 */
export function Slider({
  label,
  value,
  onValueChange,
  min,
  max,
  step = 1,
  valueText,
  disabled,
  className,
}: {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  valueText?: string;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <input
      type="range"
      aria-label={label}
      aria-valuetext={valueText}
      value={value}
      onChange={(e) => onValueChange(Number(e.target.value))}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      style={{ "--p": (value - min) / (max - min) } as CSSProperties}
      className={cn("slider", className)}
    />
  );
}
