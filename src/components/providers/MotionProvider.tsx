"use client";

import { useEffect, useState, type ReactNode } from "react";
import { LazyMotion, MotionConfig } from "motion/react";

// Motion's feature bundle loads after first paint, so it stays out of the initial JS.
const loadFeatures = () => import("./features").then((m) => m.default);

/**
 * `reducedMotion="user"` makes Motion drop transform animations when the visitor asks for less
 * motion. Lenis starts only after first paint, with a fine pointer and no reduced motion.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const [lenisReady, setLenisReady] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    // ponytail: a short timeout after mount is enough to stay out of first paint.
    const id = window.setTimeout(() => setLenisReady(true), 200);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!lenisReady) return;
    let stop = () => {};
    let cancelled = false;
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({ autoRaf: true, respectReducedMotion: true });
      stop = () => lenis.destroy();
    });
    return () => {
      cancelled = true;
      stop();
    };
  }, [lenisReady]);

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures}>{children}</LazyMotion>
    </MotionConfig>
  );
}
