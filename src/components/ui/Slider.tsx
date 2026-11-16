"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { follower, project, velocity, type Follower } from "@/lib/momentum";
import { tokenMs } from "@/lib/tokens";

/** Wheel: 100px of delta moves this share of the range. */
const WHEEL_PER_100 = 0.02;
/** Wheel: projection may carry the value this share of the range. */
const WHEEL_REACH = 0.25;
/** No wheel takeover this soon after the window scrolled. */
const SCROLL_QUIET = 200;

const snap = (c: { min: number; max: number; step: number }, v: number) => Math.min(c.max, Math.max(c.min, Math.round((v - c.min) / c.step) * c.step + c.min));

const wheelPx = (e: WheelEvent, size: number) => (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? size : 1);

/**
 * Native range input (step any, transparent track and thumb: it keeps the hit area, keyboard and aria) under
 * a sunken pill track, lime fill and thumb. The input's value is the target and follows the pointer; a
 * follower glides the visible thumb to it at a capped speed (--slider-sweep for the full range). A wheel over
 * the slider, or with focus on it, moves it instead of the page. `label` names it for screen readers;
 * `valueText` says what the number means ("Rs 45,000" rather than "45000").
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
  const wrap = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const thumb = useRef<HTMLSpanElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const fol = useRef<Follower | null>(null);
  const emitted = useRef(value);
  /** Values sent up that the parent has not echoed back yet (renders can skip some). */
  const sent = useRef<number[]>([]);
  const first = useRef(true);
  const cfg = useRef({ min, max, step, onValueChange });
  const [p0] = useState(() => (value - min) / (max - min));
  useEffect(() => {
    cfg.current = { min, max, step, onValueChange };
  });


  /** Moves the target (the input) and sends the follower after it. */
  const aim = useCallback((v: number) => {
    const { min, max } = cfg.current;
    const t = Math.min(max, Math.max(min, v));
    if (input.current) input.current.value = String(snap(cfg.current, t));
    fol.current?.to(t);
  }, []);

  useEffect(() => {
    const f = follower({
      value,
      epsilon: (max - min) * 1e-4,
      onFrame(v) {
        const { min, max, onValueChange } = cfg.current;
        const p = Math.min(1, Math.max(0, (v - min) / (max - min)));
        if (thumb.current) thumb.current.style.transform = `translateX(${p * 100}%)`;
        if (fill.current) fill.current.style.transform = `scaleX(${p})`;
        const s = snap(cfg.current, v);
        if (s !== emitted.current) {
          emitted.current = s;
          sent.current.push(s);
          onValueChange(s);
        }
      },
    });
    fol.current = f;
    return () => f.stop();
    // The follower is made once; range changes arrive through cfg.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A new range changes the sweep speed; a new value from outside (Rs and Units) lands at once.
  useEffect(() => {
    const f = fol.current;
    if (!f) return;
    f.setVmax((max - min) / (tokenMs("--slider-sweep") / 1000));
    if (first.current) {
      first.current = false;
      if (input.current) input.current.value = String(value);
      return;
    }
    const at = sent.current.indexOf(value);
    if (at >= 0) {
      sent.current.splice(0, at + 1);
      return;
    }
    if (value !== emitted.current) {
      sent.current = [];
      emitted.current = value;
      if (input.current) input.current.value = String(value);
      f.jump(value);
    }
  }, [value, min, max]);

  // Wheel over the slider.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    let armed = false;
    let lastScroll = -Infinity;
    const vel = velocity();
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && (e.movementX !== 0 || e.movementY !== 0)) armed = true;
    };
    const onLeave = () => (armed = false);
    const onScroll = () => {
      armed = false;
      lastScroll = performance.now();
    };
    const onWheel = (e: WheelEvent) => {
      const f = fol.current;
      const inp = input.current;
      if (!f || !inp || inp.disabled || e.ctrlKey || e.defaultPrevented) return;
      if (!armed && document.activeElement !== inp) return;
      if (performance.now() - lastScroll < SCROLL_QUIET) return;
      const k = wheelPx(e, window.innerHeight);
      const dx = e.deltaX * k;
      const dy = e.deltaY * k;
      const d = Math.abs(dy) >= Math.abs(dx) ? -dy : dx; // up or right increases
      if (d === 0) return;
      const { min, max } = cfg.current;
      const range = max - min;
      const dir = Math.sign(d);
      if ((dir > 0 && f.target >= max) || (dir < 0 && f.target <= min)) return;
      e.preventDefault();
      e.stopPropagation();
      const perPx = (WHEEL_PER_100 * range) / 100;
      const v = vel.push(d, e.timeStamp);
      const accumulated = f.target + d * perPx;
      const projected = f.value + project(v, tokenMs("--project"), WHEEL_REACH * range / perPx) * perPx;
      aim(dir > 0 ? Math.max(accumulated, projected) : Math.min(accumulated, projected));
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", onWheel);
    };
  }, [aim]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { min, max, step } = cfg.current;
    const at = Number(e.currentTarget.value);
    const to: Record<string, number> = {
      ArrowRight: at + step,
      ArrowUp: at + step,
      ArrowLeft: at - step,
      ArrowDown: at - step,
      PageUp: at + step * 10,
      PageDown: at - step * 10,
      Home: min,
      End: max,
    };
    if (!(e.key in to)) return;
    e.preventDefault();
    aim(to[e.key]);
  };

  return (
    <div ref={wrap} className={cn("relative h-control-lg", disabled && "opacity-50", className)}>
      <input
        ref={input}
        type="range"
        aria-label={label}
        aria-valuetext={valueText}
        defaultValue={value}
        onChange={(e) => aim(e.target.valueAsNumber)}
        onKeyDown={onKeyDown}
        min={min}
        max={max}
        step="any"
        disabled={disabled}
        className="slider peer"
      />
      <span aria-hidden className="slider-track">
        <span className="absolute inset-y-0 left-0 w-4 bg-lime" />
        <span ref={fill} style={{ transform: `scaleX(${p0})` }} className="absolute inset-y-0 left-4 right-4 origin-left bg-lime" />
      </span>
      <span aria-hidden ref={thumb} style={{ transform: `translateX(${p0 * 100}%)` }} className="slider-thumb">
        <span className="slider-dot" />
      </span>
    </div>
  );
}
