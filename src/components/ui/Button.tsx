"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, PointerEvent, ReactNode } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";
import { magnetPx, press, spring } from "@/lib/motion";
import { icon } from "./icons";

export type ButtonVariant = "primary" | "dark" | "quiet" | "text";
export type ButtonSize = "md" | "lg";

/** Fill and text colour per variant. Hover and active are instant tone steps; motion is transform only. */
export const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-lime text-ink hover:bg-lime-press active:bg-lime-press",
  dark: "bg-tone-ink text-tone-on-ink hover:brightness-90 active:brightness-75",
  quiet: "bg-tone-sunken text-tone-ink hover:brightness-95 active:brightness-90",
  text: "bg-transparent text-tone-ink",
};

const base =
  "focus-ring group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-pill text-control disabled:opacity-50 aria-disabled:opacity-50";
const sizes: Record<ButtonSize, string> = { md: "min-h-control px-5", lg: "min-h-control-lg px-7" };

type Native = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "style" | "className"
>;

export type ButtonProps = Native & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  /** A path renders a link (next/link for internal, anchor for external). */
  href?: string;
  /** Round icon twin beside the pill (the product-card pair). */
  twin?: { icon: ReactNode; label: string; href?: string; onClick?: () => void };
  className?: string;
  children: ReactNode;
};

const MotionLink = m.create(Link);

function useMagnet(enabled: boolean) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring.snappy);
  const sy = useSpring(y, spring.snappy);
  const on = enabled && !reduced;
  const clamp = (n: number) => Math.max(-magnetPx, Math.min(magnetPx, n));
  return {
    style: on ? { x: sx, y: sy } : undefined,
    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      if (!on || e.pointerType !== "mouse") return;
      const r = e.currentTarget.getBoundingClientRect();
      x.set(clamp(((e.clientX - (r.left + r.width / 2)) / r.width) * magnetPx * 2));
      y.set(clamp(((e.clientY - (r.top + r.height / 2)) / r.height) * magnetPx * 2));
    },
    onPointerLeave: () => {
      x.set(0);
      y.set(0);
    },
  };
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  href,
  twin,
  className,
  children,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  const magnet = useMagnet(variant === "primary");
  const inactive = disabled || loading;
  const cls = cn(base, sizes[size], variantClass[variant], variant === "text" && "px-1", className);
  const inner = (
    <>
      <span className={cn("inline-flex items-center gap-2", loading && "invisible")}>
        {children}
        {variant === "text" && (
          <ArrowRight {...icon} className="transition-transform dur ease-out group-hover:translate-x-1" />
        )}
      </span>
      {loading && <Loader2 {...icon} aria-label={ui.loading} aria-hidden={false} className="absolute animate-spin" />}
    </>
  );
  const common = { ...press, ...magnet, className: cls, "aria-busy": loading || undefined };

  const main = href ? (
    href.startsWith("/") ? (
      <MotionLink href={href} {...common} aria-disabled={inactive || undefined}>
        {inner}
      </MotionLink>
    ) : (
      <m.a href={href} {...common} aria-disabled={inactive || undefined}>
        {inner}
      </m.a>
    )
  ) : (
    <m.button type={type} disabled={inactive} {...common} {...rest}>
      {inner}
    </m.button>
  );

  if (!twin) return main;
  return (
    <span className="inline-flex items-center gap-2">
      {main}
      <IconButton variant={variant === "text" ? "quiet" : variant} label={twin.label} href={twin.href} onClick={twin.onClick}>
        {twin.icon}
      </IconButton>
    </span>
  );
}

export type IconButtonProps = {
  variant?: ButtonVariant;
  /** Accessible name. Required: an icon has no text. */
  label: string;
  href?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
};

/** 44px circle, same variants as Button. */
export function IconButton({ variant = "quiet", label, href, loading, disabled, onClick, className, children }: IconButtonProps) {
  const inactive = disabled || loading;
  const cls = cn(
    "focus-ring relative inline-flex size-control shrink-0 select-none items-center justify-center rounded-pill disabled:opacity-50 aria-disabled:opacity-50",
    variantClass[variant],
    className,
  );
  const inner = loading ? <Loader2 {...icon} className="animate-spin" /> : children;
  if (href) {
    const Comp = href.startsWith("/") ? MotionLink : m.a;
    return (
      <Comp href={href} aria-label={label} aria-disabled={inactive || undefined} {...press} className={cls}>
        {inner}
      </Comp>
    );
  }
  return (
    <m.button type="button" aria-label={label} aria-busy={loading || undefined} disabled={inactive} onClick={onClick} {...press} className={cls}>
      {inner}
    </m.button>
  );
}
