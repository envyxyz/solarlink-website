import { Children, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { MarqueePause } from "./MarqueePause";

/**
 * A CSS transform belt with faded edges. It pauses on hover and on focus within, and `pause` adds a 44px pause and
 * play button beside it (WCAG 2.2.2: moving content that lasts over five seconds needs a way to stop it).
 * `logo` variant: wordmarks at full opacity; a hovered item goes to full ink at 1.1 with spring.bubbly.
 * The belt is two copies of the items; the second is hidden from assistive tech.
 */
export function Marquee({
  children,
  variant = "plain",
  pause,
  className,
}: {
  children: ReactNode;
  variant?: "plain" | "logo";
  /** Labels for the pause and play button. Leave out only for a belt that never moves for long. */
  pause?: { pause: string; play: string };
  className?: string;
}) {
  const items = Children.toArray(children);
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className={cn("flex shrink-0 items-center gap-12 pr-12", hidden && "marquee-clone")}>
      {items.map((item, i) => (
        <li key={i} className="shrink-0">
          {variant === "logo" ? <LogoItem>{item}</LogoItem> : item}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="marquee min-w-0 flex-1">
        <div className="marquee-track flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
      {pause && <MarqueePause labels={pause} />}
    </div>
  );
}

function LogoItem({ children }: { children: ReactNode }) {
  return <span className="logo-hover inline-block">{children}</span>;
}
