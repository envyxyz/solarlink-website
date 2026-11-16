# Motion & Interaction Design Study: übernatural.io & getfluently.app

## 1. übernatural.io (Studio Portfolio & Inner Article)
*Lottie/Rive usage*: Neither Lottie nor Rive is used on ubernatural.io; all effects rely on native Motion (Framer), CSS transitions, HTML5 video, and WebGL canvas.

| Name | Where | Trigger | What moves | Feel | Cheap rebuild |
| :--- | :---- | :------ | :--------- | :--- | :------------ |
| Cursor Follower | Viewport (Global) | Pointer move / hover | transform, scale, opacity | Spring (stiffness: 350, damping: 28), ~120ms lag, subtle overshoot | Motion `useSpring(x, y)` on a 32px fixed `motion.div animate={{ scale }}` |
| Nav Bar Entrance | Header (Top) | Load | transform, opacity | 0.6s ease-out (cubic-bezier(0.16, 1, 0.3, 1)), no overshoot | CSS `transition: transform 0.6s ease-out, opacity 0.6s` |
| Nav Link Hover | Header (Nav) | Hover | transform, opacity, colour | 0.2s ease-out, no overshoot | CSS `transition: opacity 0.2s, transform 0.2s` with `translateY(-1px)` |
| Hero Text Reveal | Hero | Load | transform, opacity | 0.8s cubic-bezier(0.16, 1, 0.3, 1), no overshoot, 0.08s stagger | Motion `motion.span` variants `initial={{ y: 30, opacity: 0 }}` `animate={{ y: 0, opacity: 1 }}` |
| Ambient Glow Drift | Hero Background | Idle loop | transform, opacity | 12s ease-in-out infinite alternate, seamless loop | CSS `@keyframes drift { 0% { transform: scale(1); opacity: 0.4 } 100% { transform: scale(1.1) translate(20px,-10px); opacity: 0.7 } }` |
| Sector Tab Switcher | Work Filter | Press / Hover | transform, opacity, colour | Spring (stiffness: 400, damping: 30), quick snap, no overshoot | Motion `<motion.div layoutId="activePill" transition={{ type: "spring", bounce: 0.1 }} />` |
| Work Card Entrance | Work Grid | Scroll-into-view | transform, opacity | 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), no overshoot, 0.1s grid stagger | Motion `initial={{ y: 40, opacity: 0 }}` `whileInView={{ y: 0, opacity: 1 }}` |
| Card Hover Lift & Zoom | Work Grid Cards | Hover | transform, scale | 0.45s cubic-bezier(0.25, 1, 0.5, 1), no overshoot | CSS `transition: transform 0.45s ease`; inner img `transform: scale(1.05)`, card `translateY(-4px)` |
| Brief Step Transition | Interactive Brief | Press | transform, opacity | 0.35s ease-in-out or spring (damping: 24, stiffness: 240) | Motion `<AnimatePresence mode="wait"><motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} />` |
| Manifesto Text Scrub | Philosophy Section | Scroll-linked | opacity, transform | Linear scroll scrub mapped 1:1 with viewport scroll progress | Motion `useScroll()` + `useTransform(scrollYProgress, [0, 1], [0.2, 1])` on word opacity |
| Marquee Loop | Footer & Ticker | Idle loop | transform | 25s linear infinite continuous scroll, no pause | CSS `@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }` |
| Magnetic CTA Button | Footer CTA | Hover / Press | transform, scale | Spring (stiffness: 300, damping: 20), overshoot snap on release | Motion `whileHover={{ scale: 1.04 }}` `whileTap={{ scale: 0.96 }}` + pointer-offset `x, y` spring |
| Article Header Entry | Inner Article | Load | transform, opacity | 0.65s cubic-bezier(0.16, 1, 0.3, 1), no overshoot, 0.1s stagger | Motion `initial={{ y: 25, opacity: 0 }}` `animate={{ y: 0, opacity: 1 }}` |
| Reading Progress Bar | Inner Article (Top) | Scroll-linked | transform (scaleX) | Immediate scroll-linked (0s lag), linear | Motion `<motion.div style={{ scaleX: scrollYProgress, transformOrigin: "0%" }} />` |

## 2. getfluently.app (AI Language Tutor)
- **Fonts in use**: `DM Sans` (Google Fonts / `@font-face` across 400 Regular, 500 Medium, 700 Bold); fallback stack: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`.
- **Smooth-scroll technique**: `Lenis` (by darkroom.engineering) smooth inertia scrolling embedded in Framer runtime with rAF delta interpolation (lerp ~0.1) and touch multipliers.

| Name | Where | Trigger | What moves | Feel | Cheap rebuild |
| :--- | :---- | :------ | :--------- | :--- | :------------ |
| Pulsing Voice Orb | Hero & Tutor Preview | Idle loop / speech | transform, scale, opacity | Sine breathing spring (~2.2s cycle, ease-in-out), smooth bounce; uses Lottie | Motion `animate={{ scale: [1, 1.1, 0.98, 1], opacity: [0.6, 0.9, 0.6] }} transition={{ repeat: Infinity, duration: 2.2 }}` |
| Pinned Horizontal Scroll | Features Showcase | Scroll-linked | transform (translateX) | Sticky 250vh scroll-driven scrub with Lenis momentum damping | CSS sticky viewport + Motion `style={{ x: useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]) }}` |
| Dialogue & Correction Pop | Interactive Chat Card | Scroll-into-view | transform, scale, opacity | Spring pop (stiffness: 320, damping: 20, ~4% overshoot), 0.18s bubble stagger | Motion `initial={{ y: 20, scale: 0.95, opacity: 0 }}` `whileInView={{ y: 0, scale: 1, opacity: 1 }}` |
| 2.5D Device Parallax | Product Mockups | Scroll-linked & hover | transform (translateY, rotateX) | Fluid inertia dampening (lerp 0.08), multi-layer depth offset | Motion `style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 50]) }}` on layered phone cards |
| Fluency Metric Pop | Assessment Card | Scroll-into-view | transform, scale, opacity | Snappy spring (stiffness: 280, damping: 18), 0.7s duration | Motion `initial={{ scale: 0.85, opacity: 0 }}` `whileInView={{ scale: 1, opacity: 1 }}` + scaleX progress |

### Reusable motion tokens
1. `--motion-duration-fast`: 150ms (button clicks, badge toggles)
2. `--motion-duration-medium`: 300ms (card hovers, dropdown reveals)
3. `--motion-duration-slow`: 650ms (section scroll entrances, dialog reveals)
4. `--motion-duration-hero`: 900ms (split-text stagger, page load reveal)
5. `--motion-ease-standard`: cubic-bezier(0.2, 0, 0.2, 1) (natural bidirectional transitions)
6. `--motion-ease-decelerate`: cubic-bezier(0.16, 1, 0.3, 1) (incoming elements, crisp landing)
7. `--motion-ease-ambient`: cubic-bezier(0.45, 0.05, 0.55, 0.95) (idle floating loops)
8. `--motion-spring-snappy`: stiffness 400, damping 30, mass 0.8 (tab pills, active indicator, no overshoot)
9. `--motion-spring-bouncy`: stiffness 300, damping 18, mass 1.0 (chat bubbles, card pop, 5% overshoot)
10. `--motion-spring-smooth`: stiffness 160, damping 24, mass 1.2 (custom cursor follower, 2.5D parallax)
