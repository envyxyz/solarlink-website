"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { reduced } from "@/lib/spring";
import { tokenEase, tokenMs } from "@/lib/tokens";

const DIGIT = /\d/;
const parts = (text: string) => {
  const m = /^(\D*)([\d,.  ]*\d)([\s\S]*)$/.exec(text);
  return m ? { head: m[1], body: m[2], tail: m[3] } : { head: text, body: "", tail: "" };
};

type Roll = { dir: 1 | -1; anim: Animation };

/**
 * One digit slot. The ink digit sits in flow and sets the size; a lime copy lies over it, and the previous digit
 * is drawn in an absolute layer. A change is rolled with the Web Animations API (transform and opacity only).
 */
function Slot({ digit, animate, enter }: { digit: string; animate: boolean; enter: boolean }) {
  const out = useRef<HTMLSpanElement>(null);
  const into = useRef<HTMLSpanElement>(null);
  const lime = useRef<HTMLSpanElement>(null);
  const shown = useRef(enter && animate ? "" : digit);
  const roll = useRef<Roll | null>(null);

  useLayoutEffect(() => {
    const prev = shown.current;
    if (prev === digit) return;
    shown.current = digit;
    const o = out.current;
    const i = into.current;
    const l = lime.current;
    if (!o || !i || !l) return;
    const live = roll.current;
    // Where the entering digit is right now (percent of one slot), so a change mid-roll continues from there.
    let y0 = 0;
    if (live && live.anim.playState === "running") {
      const p = live.anim.effect?.getComputedTiming().progress ?? 1;
      y0 = live.dir * 100 * (1 - Math.min(1.2, Math.max(0, p)));
    }
    o.getAnimations().forEach((a) => a.cancel());
    i.getAnimations().forEach((a) => a.cancel());
    l.getAnimations().forEach((a) => a.cancel());
    roll.current = null;
    if (!animate || reduced()) return;
    const dir: 1 | -1 = prev === "" || Number(digit) > Number(prev) ? 1 : -1;
    const ms = tokenMs("--dur-snappy");
    const fade = tokenMs("--dur");
    const easing = tokenEase("--spring-snappy") || "linear";
    // The digit shown just before this change is whatever the in layer held: the previous digit.
    o.textContent = prev;
    o.animate(
      [
        { transform: `translateY(${y0}%)`, opacity: 1 },
        { transform: `translateY(${-dir * 100}%)`, opacity: 0 },
      ],
      { duration: ms, easing },
    );
    const anim = i.animate(
      [
        { transform: `translateY(${y0 + dir * 100}%)`, opacity: 0 },
        { transform: "translateY(0%)", opacity: 1 },
      ],
      { duration: ms, easing },
    );
    const hold = ms / (ms + fade);
    l.animate([{ opacity: 1 }, { opacity: 1, offset: hold }, { opacity: 0 }], { duration: ms + fade, easing: "linear" });
    roll.current = { dir, anim };
  }, [digit, animate]);

  return (
    <span className="roll-slot">
      <span ref={out} aria-hidden className="roll-out" />
      <span ref={into} className="roll-in">
        {digit}
        <span ref={lime} aria-hidden className="roll-lime">
          {digit}
        </span>
      </span>
    </span>
  );
}

/**
 * A number whose digits roll like the clock in iOS. Digits sit in 1ch slots (the font's tabular feature has a dotted
 * zero, so the slots give the tabular effect), keyed from the right so a new leading digit enters without moving the
 * others. Only changed digits roll, and each flashes lime and settles to ink. It swaps instantly when the shape of
 * the text changes (a different prefix, suffix or separator count) and under reduced motion. Hidden from assistive
 * technology: the slider's value text carries the figure.
 */
export function RollingNumber({ text }: { text: string }) {
  const { head, body, tail } = parts(text);
  const shape = head + tail + body.replace(/\d/g, "");
  const chars = body.split("");
  // Derived on each text change (the documented render-time update): was the shape the same, and how many characters were there before.
  const [seen, setSeen] = useState({ text, shape, count: chars.length, before: chars.length, same: true });
  if (seen.text !== text) setSeen({ text, shape, count: chars.length, before: seen.count, same: seen.shape === shape });
  const animate = seen.same;
  const known = seen.before;
  return (
    <span aria-hidden className="block whitespace-nowrap">
      {head}
      {chars.map((c, n) => {
        const key = chars.length - n;
        return DIGIT.test(c) ? <Slot key={key} digit={c} animate={animate} enter={key > known} /> : <span key={key}>{c}</span>;
      })}
      {tail}
    </span>
  );
}
