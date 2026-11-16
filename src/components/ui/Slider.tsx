"use client";

import { Slider as RadixSlider } from "radix-ui";
import { cn } from "@/lib/cn";

/**
 * 52px touch height, pill track, lime fill, floating thumb. Radix gives it the slider role,
 * arrow, Home, End and Page keys. `label` names it for screen readers; `valueText` says what
 * the number means ("Rs 45,000" rather than "45000").
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
    <RadixSlider.Root
      value={[value]}
      onValueChange={([v]) => onValueChange(v)}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      className={cn("relative flex h-control-lg w-full touch-none select-none items-center", disabled && "opacity-50", className)}
    >
      <RadixSlider.Track className="relative h-3 grow overflow-hidden rounded-pill bg-tone-sunken">
        <RadixSlider.Range className="absolute h-full bg-lime" />
      </RadixSlider.Track>
      <RadixSlider.Thumb
        aria-label={label}
        aria-valuetext={valueText}
        className="focus-ring press block size-8 rounded-pill bg-surface shadow-float hover:brightness-95"
      />
    </RadixSlider.Root>
  );
}
