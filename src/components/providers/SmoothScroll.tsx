"use client";

import { useEffect } from "react";

/** Lenis loads after the page is idle, only with a fine pointer and without reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let stop = () => {};
    let cancelled = false;
    const start = () =>
      import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        const lenis = new Lenis({ autoRaf: true, respectReducedMotion: true });
        stop = () => lenis.destroy();
      });
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const id = idle(start);
    return () => {
      cancelled = true;
      (window.cancelIdleCallback ?? window.clearTimeout)(id);
      stop();
    };
  }, []);
  return null;
}
