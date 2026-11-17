"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, PointerEvent, ReactNode } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";
import { icon } from "./icons";

export type ButtonVariant = "primary" | "dark" | "quiet" | "text";
export type ButtonSize = "md" | "lg";

/** Fill and text colour per variant. Hover and active are instant tone steps; motion is transform only. */
export const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-lime text-on-lime hover:bg-lime-press active:bg-lime-press",
  dark: "bg-tone-ink text-tone-on-ink hover:brightness-90 active:brightness-75",
  quiet: "bg-tone-sunken text-tone-ink hover:brightness-95 active:brightness-90",
  text: "bg-transparent text-tone-ink",
};

const base =
  "focus-ring group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-pill text-control disabled:opacity-50 aria-disabled:opacity-50";
const sizes: Record<ButtonSize, string> = { md: "min-h-control", lg: "min-h-control-lg" };

type Native = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "style" | "className"
>;

export type ButtonProps = Native & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  /** A path renders a link (next/link for internal, anchor for external). */
  href?: string;
  /** Round icon twin beside the pill (the product-card pair). */
  twin?: { icon: ReactNode; label: string; href?: string; onClick?: () => void; redundant?: boolean };
  className?: string;
  children: ReactNode;
};

/** Primary buttons pull up to 4px toward a mouse pointer (translate only; CSS eases it back). */
const MAGNET_PX = 4;

/** http(s) links leave the site: new tab, no opener. tel: and mailto: stay as they are. */
const external = (href: string) => (/^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {});

function magnetProps(enabled: boolean) {
  if (!enabled) return {};
  const clamp = (n: number) => Math.max(-MAGNET_PX, Math.min(MAGNET_PX, n));
  return {
    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const r = e.currentTarget.getBoundingClientRect();
      const x = clamp(((e.clientX - (r.left + r.width / 2)) / r.width) * MAGNET_PX * 2);
      const y = clamp(((e.clientY - (r.top + r.height / 2)) / r.height) * MAGNET_PX * 2);
      e.currentTarget.style.translate = `${x}px ${y}px`;
    },
    onPointerLeave: (e: PointerEvent<HTMLElement>) => {
      e.currentTarget.style.translate = "";
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
  const inactive = disabled || loading;
  const cls = cn(base, "press", sizes[size], variantClass[variant], variant !== "text" && "px-5", className);
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
  const common = { ...magnetProps(variant === "primary"), className: cls, "aria-busy": loading || undefined };

  const main = href ? (
    href.startsWith("/") ? (
      <Link href={href} {...common} aria-disabled={inactive || undefined}>
        {inner}
      </Link>
    ) : (
      <a href={href} {...external(href)} {...common} aria-disabled={inactive || undefined}>
        {inner}
      </a>
    )
  ) : (
    <button type={type} disabled={inactive} {...common} {...rest}>
      {inner}
    </button>
  );

  if (!twin) return main;
  return (
    <span className="inline-flex items-center gap-2">
      {main}
      <IconButton variant={variant === "text" ? "quiet" : variant} label={twin.label} href={twin.href} onClick={twin.onClick} redundant={twin.redundant}>
        {twin.icon}
      </IconButton>
    </span>
  );
}

export type IconButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Accessible name. Required: an icon has no text. */
  label: string;
  href?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  /** The same action is already one tab stop away (the round twin of a pill): out of the tab order and the accessibility tree. */
  redundant?: boolean;
  className?: string;
  children: ReactNode;
};

/** 44px circle, same variants as Button. */
export function IconButton({ variant = "quiet", size = "md", label, href, loading, disabled, onClick, redundant, className, children }: IconButtonProps) {
  const inactive = disabled || loading;
  const cls = cn(
    "focus-ring press relative inline-flex shrink-0 select-none items-center justify-center rounded-pill disabled:opacity-50 aria-disabled:opacity-50",
    size === "lg" ? "size-control-lg" : "size-control",
    variantClass[variant],
    className,
  );
  const inner = loading ? <Loader2 {...icon} className="animate-spin" /> : children;
  const twin = redundant ? { tabIndex: -1, "aria-hidden": true } : {};
  if (href) {
    return href.startsWith("/") ? (
      <Link href={href} aria-label={label} aria-disabled={inactive || undefined} className={cls} {...twin}>
        {inner}
      </Link>
    ) : (
      <a href={href} {...external(href)} aria-label={label} aria-disabled={inactive || undefined} className={cls} {...twin}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" aria-label={label} aria-busy={loading || undefined} disabled={inactive} onClick={onClick} className={cls} {...twin}>
      {inner}
    </button>
  );
}
