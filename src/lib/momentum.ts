/** Input physics: a velocity estimator, a projection and a critically damped follower. Plain TypeScript, no React. */
import { springStiffness } from "./spring";

const DT_MIN = 8;
const DT_MAX = 100;
const GAP = 120;
const BLEND = 0.5;

/** Exponential moving average of delta per ms. Feed it (delta, timeStamp); `v` is signed. The first sample after a gap reads 0. */
export function velocity() {
  let v = 0;
  let last = -Infinity;
  return {
    push(delta: number, t: number) {
      const gap = t - last;
      last = t;
      if (gap > GAP) {
        v = 0;
        return v;
      }
      const dt = Math.min(DT_MAX, Math.max(DT_MIN, gap));
      v = BLEND * (delta / dt) + (1 - BLEND) * v;
      return v;
    },
    get value() {
      return v;
    },
    reset() {
      v = 0;
      last = -Infinity;
    },
  };
}

/** Where a value moving at `v` per ms would be `ms` later, as a distance clamped to plus or minus maxReach. */
export const project = (v: number, ms: number, maxReach: number) => Math.max(-maxReach, Math.min(maxReach, v * ms));

export type Follower = ReturnType<typeof follower>;

/**
 * A requestAnimationFrame loop that moves `value` toward `target`: critically damped spring (stiffness from
 * spring.snappy), speed capped at `vmax` (units per second, default none), stops within `epsilon`.
 * Under reduced motion it jumps straight to the target.
 */
export function follower(opts: { value: number; vmax?: number; epsilon: number; stiffness?: number; onFrame: (value: number) => void }) {
  const w0 = Math.sqrt(opts.stiffness ?? springStiffness("snappy"));
  let value = opts.value;
  let target = opts.value;
  let vel = 0; // units per second
  let raf = 0;
  let prev = 0;
  let vmax = opts.vmax ?? Infinity;

  const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const frame = (now: number) => {
    const dt = Math.min(0.033, Math.max(0.001, (now - prev) / 1000));
    prev = now;
    const e0 = value - target;
    const decay = Math.exp(-w0 * dt);
    const b = vel + w0 * e0;
    let nv = (vel - w0 * b * dt) * decay;
    let step = ((e0 + b * dt) * decay) - e0;
    const limit = vmax * dt;
    if (Math.abs(step) > limit) step = Math.sign(step) * limit;
    nv = Math.max(-vmax, Math.min(vmax, nv));
    value += step;
    vel = nv;
    if (Math.abs(value - target) < opts.epsilon && Math.abs(vel) < opts.epsilon * 10) {
      value = target;
      vel = 0;
      raf = 0;
      opts.onFrame(value);
      return;
    }
    opts.onFrame(value);
    raf = requestAnimationFrame(frame);
  };

  return {
    get value() {
      return value;
    },
    get target() {
      return target;
    },
    get running() {
      return raf !== 0;
    },
    setVmax(v: number) {
      vmax = v;
    },
    /** Move toward a new target (keeps any speed it already has). */
    to(t: number) {
      target = t;
      if (reducedMotion()) return this.jump(t);
      if (!raf && t !== value) {
        prev = performance.now();
        raf = requestAnimationFrame(frame);
      }
    },
    /** Set value and target at once, no travel. */
    jump(t: number) {
      cancelAnimationFrame(raf);
      raf = 0;
      value = target = t;
      vel = 0;
      opts.onFrame(value);
    },
    /** Stop where it is and make that the target. */
    stop() {
      cancelAnimationFrame(raf);
      raf = 0;
      target = value;
      vel = 0;
    },
  };
}
