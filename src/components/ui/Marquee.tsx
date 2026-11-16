"use client";

import { Children, type ReactNode } from "react";
import { m } from "motion/react";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";

/**
 * A CSS transform belt with faded edges. It pauses on hover and on focus within.
 * `logo` variant: greyscale at 80% opacity; a hovered item goes full colour at 1.1 with spring.bubbly.
 * The belt is two copies of the items; the second is hidden from assistive tech.
 */
export function Marquee({ children, variant = "plain", className }: { children: ReactNode; variant?: "plain" | "logo"; className?: string }) {
  const items = Children.toArray(children);
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-12 pr-12">
      {items.map((item, i) => (
        <li key={i} className="shrink-0">
          {variant === "logo" ? <LogoItem>{item}</LogoItem> : item}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn("marquee", className)} title={ui.marquee.hint}>
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

function LogoItem({ children }: { children: ReactNode }) {
  return (
    <m.span
      whileHover={{ scale: 1.1 }}
      transition={spring.bubbly}
      className="inline-block opacity-80 grayscale hover:opacity-100 hover:grayscale-0"
    >
      {children}
    </m.span>
  );
}
