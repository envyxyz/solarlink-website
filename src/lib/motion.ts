/** Springs, presets and numbers from DESIGN.md "Motion". Durations and easing live as CSS tokens. */

export const spring = {
  /** pills, tabs, toggles: no overshoot */
  snappy: { type: "spring", stiffness: 400, damping: 30 },
  /** small things that pop: panels, chips, logo hover */
  bubbly: { type: "spring", stiffness: 300, damping: 18 },
  /** large things that settle */
  soft: { type: "spring", stiffness: 160, damping: 24, mass: 1.2 },
} as const;

/** Same values as --ease-out and --dur-slow in tokens.css, for JS animations. */
export const easeOut = [0.16, 1, 0.3, 1] as const;
export const durSlow = 0.65;

/** Entry: a block rises 24px and fades in once when 20% visible, children staggered 80ms. */
export const entry = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: durSlow, ease: easeOut },
} as const;
export const entryStagger = 0.08;

/** Pop: small items enter from scale 0.8 and 0 opacity with spring.bubbly. */
export const pop = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: spring.bubbly,
} as const;

/** Press: every pressable scales to 0.97 on pointer down, spring.snappy back. */
export const press = {
  whileTap: { scale: 0.97 },
  transition: spring.snappy,
} as const;

/** Primary buttons pull up to 4px toward the pointer (fine pointers only). */
export const magnetPx = 4;

/** Reduced motion: springs become a 150ms fade (see MotionProvider). */
export const reducedFade = { duration: 0.15 } as const;
