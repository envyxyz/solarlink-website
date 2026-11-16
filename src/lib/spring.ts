/** Springs from DESIGN.md "Motion", sampled once into CSS linear() easings for the Web Animations API. */
import { tokenEase, tokenMs } from "./tokens";

const SPRINGS = {
  /** pills, tabs, toggles: no overshoot */
  snappy: { k: 400, c: 30, m: 1, secs: 0.5, steps: 40, ms: 350 },
  /** small things that pop: panels, chips, logo hover */
  bubbly: { k: 300, c: 18, m: 1, secs: 0.8, steps: 56, ms: 700 },
  /** large things that settle */
  soft: { k: 160, c: 24, m: 1.2, secs: 1, steps: 56, ms: 900 },
} as const;
export type SpringName = keyof typeof SPRINGS;

export const POP_FROM = 0.8;

function sample(name: SpringName) {
  const { k, c, m, secs, steps } = SPRINGS[name];
  const w0 = Math.sqrt(k / m);
  const z = c / (2 * Math.sqrt(k * m));
  const wd = w0 * Math.sqrt(1 - z * z);
  const at = (t: number) =>
    z < 1 ? 1 - Math.exp(-z * w0 * t) * (Math.cos(wd * t) + ((z * w0) / wd) * Math.sin(wd * t)) : 1 - Math.exp(-w0 * t) * (1 + w0 * t);
  const out: number[] = [];
  for (let i = 0; i <= steps; i++) out.push(at((i / steps) * secs));
  out[steps] = 1;
  return out;
}

const cache: Partial<Record<SpringName, number[]>> = {};
const points = (name: SpringName) => (cache[name] ??= sample(name));
/** The spring's value (0 to 1, may overshoot) `ms` after it starts; 1 once it has settled. For drawing on a canvas. */
export function springAt(name: SpringName, ms: number) {
  const p = points(name);
  const x = Math.max(0, ms / SPRINGS[name].ms) * (p.length - 1);
  if (x >= p.length - 1) return 1;
  const i = Math.floor(x);
  return p[i] + (p[i + 1] - p[i]) * (x - i);
}
/** The spring's duration in ms. */
export const springMs = (name: SpringName) => SPRINGS[name].ms;
export const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Sets --spring-snappy, --spring-bubbly and --spring-soft so CSS transitions use the same springs (linear under reduced motion). */
export function installSprings() {
  const root = document.documentElement.style;
  (Object.keys(SPRINGS) as SpringName[]).forEach((n) =>
    root.setProperty(`--spring-${n}`, reduced() ? "linear" : `linear(${points(n).map((v) => +v.toFixed(4)).join(", ")})`),
  );
}

/** Plays frames, then writes the end state into the element's style so animations do not pile up. */
function play(el: HTMLElement, frames: Keyframe[], options: KeyframeAnimationOptions) {
  const a = el.animate(frames, { ...options, fill: "both" });
  a.finished.then(() => { a.commitStyles(); a.cancel(); }, () => {});
  return a;
}

/** Scale and opacity in with the spring (reduced motion: a 150ms fade). */
export function popIn(el: HTMLElement, name: SpringName = "bubbly", from = POP_FROM) {
  if (reduced()) return play(el, [{ opacity: 0 }, { opacity: 1 }], { duration: tokenMs("--dur-fast") });
  const p = points(name);
  const frames = p.map((v, i) => ({ transform: `scale(${from + (1 - from) * v})`, opacity: Math.min(1, v * 3 + 0.02), offset: i / (p.length - 1) }));
  return play(el, frames, { duration: SPRINGS[name].ms, easing: "linear" });
}

/** Back to the hidden pop state (opacity 0, scale 0.8) in 150ms. */
export function popOut(el: HTMLElement, from = POP_FROM) {
  return play(el, [{ opacity: 0, transform: reduced() ? "none" : `scale(${from})` }], { duration: tokenMs("--dur-fast"), easing: tokenEase("--ease-in-out") });
}
