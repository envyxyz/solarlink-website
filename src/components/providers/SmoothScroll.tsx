"use client";

import { useEffect } from "react";
import { follower, project, velocity } from "@/lib/momentum";
import { tokenMs, tokenNum } from "@/lib/tokens";

const CHECK = "(hover: hover) and (pointer: fine)";
const REDUCED = "(prefers-reduced-motion: reduce)";
/** A scroll event this far from the last frame we wrote is somebody else's scroll (keys, anchors, scrollbar). */
const OWN_SCROLL = 2;

const lineHeight = 16;
const px = (e: WheelEvent) => (e.deltaMode === 1 ? lineHeight : e.deltaMode === 2 ? window.innerHeight : 1);

/** True when something under the pointer can still scroll this way, so the browser keeps the event. */
function innerScroller(e: WheelEvent, dy: number) {
  for (const n of e.composedPath()) {
    if (!(n instanceof HTMLElement) || n === document.body || n === document.documentElement) continue;
    const oy = getComputedStyle(n).overflowY;
    if ((oy === "auto" || oy === "scroll") && n.scrollHeight > n.clientHeight) {
      if (dy > 0 ? n.scrollTop + n.clientHeight < n.scrollHeight - 1 : n.scrollTop > 0) return true;
    }
  }
  return false;
}

/**
 * Wheel smoothing with prediction: where the wheel speed says the page would be 300ms from now (never more
 * than --scroll-reach viewports) becomes the target of a critically damped follower. Only with a fine pointer
 * and without reduced motion; attaches when the page is idle. Touch and keys stay native.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (!window.matchMedia(CHECK).matches || window.matchMedia(REDUCED).matches) return;
    let off = () => {};
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      let lastWritten = window.scrollY;
      const vel = velocity();
      /** Where the page would land with no projection: the gesture's own deltas added up. */
      let raw = window.scrollY;
      const f = follower({
        value: window.scrollY,
        epsilon: 0.5,
        onFrame(y) {
          lastWritten = y;
          window.scrollTo({ top: y, behavior: "instant" });
        },
      });
      const limit = () => document.documentElement.scrollHeight - window.innerHeight;

      const onWheel = (e: WheelEvent) => {
        if (e.ctrlKey || e.defaultPrevented) return;
        const k = px(e);
        const dx = e.deltaX * k;
        const dy = e.deltaY * k;
        if (dy === 0 || Math.abs(dx) > Math.abs(dy)) return;
        if (document.querySelector("dialog[open]")) return;
        if (innerScroller(e, dy)) return;
        e.preventDefault();
        const v = vel.push(dy, e.timeStamp);
        const y = window.scrollY;
        if (!f.running) raw = y;
        raw = Math.min(limit(), Math.max(0, raw + dy));
        const reach = tokenNum("--scroll-reach") * window.innerHeight;
        const ahead = y + project(v, tokenMs("--project"), reach);
        // Projection extends the landing point, but never more than one reach past the raw one.
        const far = dy > 0 ? Math.min(ahead, raw + reach) : Math.max(ahead, raw - reach);
        const target = dy > 0 ? Math.max(raw, far) : Math.min(raw, far);
        if (!f.running) f.jump(y);
        f.to(Math.min(limit(), Math.max(0, target)));
      };
      const onScroll = () => {
        if (!f.running) return;
        if (Math.abs(window.scrollY - lastWritten) > OWN_SCROLL) f.stop();
      };
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("scroll", onScroll, { passive: true });
      off = () => {
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("scroll", onScroll);
        f.stop();
      };
    };
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const id = idle(start);
    return () => {
      cancelled = true;
      (window.cancelIdleCallback ?? window.clearTimeout)(id);
      off();
    };
  }, []);
  return null;
}
