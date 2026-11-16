"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { nav } from "@/content/nav";
import { tokenMs } from "@/lib/tokens";

/**
 * The phone menu button: three lines that turn into an X. It drives the nav pill through attributes (CSS does the motion):
 * data-open grows the panel, data-closing fades the links first, then data-open goes and the panel shrinks.
 * A disclosure, not a modal: the panel is visibility:hidden while closed, so Tab skips it; Escape and an outside tap close it.
 */
export function MenuButton({ controls }: { controls: string }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const timer = useRef<number | undefined>(undefined);

  const navEl = () => button.current?.closest<HTMLElement>("nav") ?? null;

  const close = useCallback((opts: { focus?: boolean; instant?: boolean } = {}) => {
    const el = navEl();
    if (!el?.hasAttribute("data-open") || el.hasAttribute("data-closing")) return;
    setOpen(false);
    const finish = () => {
      el.removeAttribute("data-open");
      el.removeAttribute("data-closing");
    };
    if (opts.instant || window.matchMedia("(prefers-reduced-motion: reduce)").matches) finish();
    else {
      el.setAttribute("data-closing", "");
      timer.current = window.setTimeout(finish, tokenMs("--dur-fast"));
    }
    if (opts.focus) button.current?.focus();
  }, []);

  const toggle = () => {
    const el = navEl();
    if (!el) return;
    if (el.hasAttribute("data-open") && !el.hasAttribute("data-closing")) return close();
    window.clearTimeout(timer.current);
    el.removeAttribute("data-closing");
    el.setAttribute("data-open", "");
    setOpen(true);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close({ focus: true });
    const onDown = (e: PointerEvent) => {
      const el = navEl();
      if (el && e.target instanceof Node && !el.contains(e.target)) close();
    };
    const onLink = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest("header nav a")) close();
    };
    const wide = window.matchMedia("(min-width: 64rem)");
    const onWide = () => wide.matches && close({ instant: true });
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("click", onLink);
    wide.addEventListener("change", onWide);
    return () => {
      window.clearTimeout(timer.current);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("click", onLink);
      wide.removeEventListener("change", onWide);
    };
  }, [close]);

  return (
    <button
      ref={button}
      type="button"
      aria-label={open ? nav.menu.close : nav.menu.open}
      aria-expanded={open}
      aria-controls={controls}
      onClick={toggle}
      className="focus-ring press relative inline-flex size-control shrink-0 select-none items-center justify-center rounded-pill bg-tone-sunken text-tone-ink hover:brightness-95 active:brightness-90 lg:hidden"
    >
      <span aria-hidden className="menu-icon">
        <span />
        <span />
        <span />
      </span>
    </button>
  );
}
