# SolarLink website: design language

Set 16 Nov 2026. This file wins over habit, libraries and references. Every value used in the site comes from the tokens here. If a value is missing, add a token here first.

## Decision card

```
Surface:    marketing site now, online store later (same tokens, same components)
Anchor:     the link. SolarLink is the line that carries power from the sun to the roof,
            through the inverter, into the home and back to the grid. No rival has "link" in its name.
Type:       Mona Sans variable, one family. Width axis does the work: wide for display, normal for text.
Color:      restrained. Warm-white ground, green-black ink, lime as the single accent, used as a fill.
            Light base. One or two dark "night" sections per page.
Shape:      soft. Rounded "stages" for big blocks, soft cards, pill controls.
Depth:      tone step for resting surfaces. Layered shadow and frosted glass only for things that float.
Density:    4px base, generous. Controls 44 and 52px high.
Motion:     springs. Bubbly on small things under the hand, calm on big things. Nothing is scroll-gated.
Signature:  the live sizing hero. Drag the monthly bill, panels pop onto the roof, the system size updates,
            one tap sends it to WhatsApp.
```

## References and what we take from each

| Reference | Take | Leave |
|---|---|---|
| faers.tech | Wide display type over calm CGI renders; the configurator (live summary chips, big selectable tiles); product cards; line diagrams that explain the product | Coloured count badges in the header; scroll-driven video; heavy page weight |
| ubernatural.io | Motion vocabulary: spring pills, card lift with image zoom, staggered rise on entry, magnetic primary button, marquee | Custom cursor, WebGL, scroll-scrubbed text |
| getfluently.app | Smooth scroll, spring pop on small cards | Pinned horizontal scroll: nothing may force the visitor to scroll through an animation |
| inspo-1 (finance) | Rounded image stages with glass stat cards; closing call-to-action on an image; giant faded wordmark in the footer | Serif italics, green tag pills |
| nexarch (architecture) | Section rhythm: heading block on the left, row of image cards on the right; services grid; testimonials row | Circular stamp, eyebrow labels above every heading |
| business-alliance | About text with four large numbers; logo strip; numbered process list beside one tall image | |
| winter-coat card | Product card: soft square image tile, name, one spec line, price, pill button plus round icon button | Comma used as a decimal mark |
| creaenergy (solar) | One dark rounded section holding a product or service carousel | Lime pill eyebrows, giant headline over the photo |

## Colour

Light is the base and dark sections stay. Since 18 Nov 2026 the whole page also follows the device theme (`prefers-color-scheme`, no toggle, no script): every colour token is `light-dark(light, dark)` under `color-scheme: light dark`. Dark values: ground `#0b0f0a`, surface `#171d15`, sunken `#11160f`, ink `#f2f4ee`, ink-2 `#a6ad9f` (8.4:1), ink-3 `#8a9285` (6.0:1 on ground, 5.3:1 on surface), lime-wash `#22340f`, error `#ff6b57`; night panels step up (`--night` `#171d15`, `--night-surface` `#212920`, `--night-raised` `#2b3428`) so they still read as panels. Added tokens: `--on-lime` (text on lime, same in both themes) and `--on-ink` (text on an ink fill). The daytime hero keeps dark text in both themes with the `scheme-light` utility. The nav swaps to `logo-dark` in dark. Lime text stays night-only.

| Token | Hex | OKLCH | Use |
|---|---|---|---|
| `--ground` | `#F6F6F2` | `oklch(0.972 0.005 106)` | page background |
| `--surface` | `#FDFDFB` | `oklch(0.993 0.003 106)` | cards on ground |
| `--sunken` | `#EEEFE9` | `oklch(0.950 0.008 114)` | tiles inside cards, inputs, image wells |
| `--ink` | `#0B0F0A` | `oklch(0.162 0.012 139)` | text, dark buttons |
| `--ink-2` | `#565D53` | `oklch(0.469 0.018 136)` | secondary text (6.3:1 on ground) |
| `--ink-3` | `#7C8378` | `oklch(0.601 0.018 134)` | large text and icons only (3.6:1), never body |
| `--line` | `rgb(11 15 10 / 0.08)` | | hairlines |
| `--lime` | `#7ED321` | `oklch(0.783 0.212 133)` | the accent, as a fill |
| `--lime-press` | `#6AC014` | `oklch(0.725 0.204 134)` | pressed and hover state of lime fills |
| `--lime-wash` | `#E8F7D3` | `oklch(0.956 0.050 126)` | selected tile background |
| `--night` | `#0B0F0A` | same as ink | dark section ground |
| `--night-surface` | `#151A13` | `oklch(0.210 0.015 137)` | cards in dark sections |
| `--night-raised` | `#1E241B` | `oklch(0.251 0.019 135)` | tiles in dark cards |
| `--night-ink` | `#F2F4EE` | `oklch(0.964 0.008 122)` | text on night |
| `--night-ink-2` | `#A6AD9F` | `oklch(0.738 0.021 129)` | secondary text on night (8.4:1) |
| `--night-line` | `rgb(242 244 238 / 0.10)` | | hairlines on night |

Rules:
- Lime is a fill with `--ink` text on it (10.3:1). Lime text is allowed only on night (10.3:1). Lime text or lime icons on light surfaces fail contrast (1.7:1) and are banned. The one exception is the client's own logo in the nav (lime "LINK" on the light pill): it is a supplied brand asset, exempt from this rule.
- Lime appears on the primary action and at most one other thing per screen: the active state, the link line or a key number on night.
- No gradients on text or buttons. No yellow. No second accent.
- Semantic colours (error `#C8321E`, success uses ink with a tick, not green) appear only in forms.

## Type

One family: **Mona Sans** variable (OFL), self-hosted, `font-display: swap`, axes `wght` 200 to 900 and `wdth` 75 to 125. Fallback stack: `"Mona Sans", ui-sans-serif, system-ui, "Segoe UI", sans-serif` with a size-adjusted fallback to stop layout shift.

| Token | Size | Width | Weight | Line height | Tracking | Use |
|---|---|---|---|---|---|---|
| `display` | `clamp(2.75rem, 1.55rem + 4.8vw, 5.5rem)` | 125 | 600 | 1.02 | -0.03em | the h1 |
| `h2` | `clamp(2rem, 1.4rem + 2.4vw, 3.5rem)` | 120 | 600 | 1.08 | -0.025em | section headings |
| `h3` | `clamp(1.375rem, 1.2rem + 0.7vw, 1.75rem)` | 112 | 600 | 1.2 | -0.015em | block headings |
| `title` | `1.125rem` | 105 | 600 | 1.3 | -0.01em | card titles, nav brand moments |
| `lead` | `clamp(1.125rem, 1.05rem + 0.3vw, 1.3125rem)` | 100 | 400 | 1.5 | 0 | intro paragraphs |
| `body` | `1.0625rem` | 100 | 400 | 1.55 | 0 | paragraphs |
| `small` | `0.9375rem` | 100 | 450 | 1.45 | 0 | card text, form labels |
| `caption` | `0.8125rem` | 100 | 500 | 1.4 | 0.01em | meta lines, legal |
| `figure` | `clamp(2.25rem, 1.6rem + 2.6vw, 4rem)` | 118 | 600 | 1 | -0.03em | big numbers |
| `control` | `0.9375rem` | 105 | 600 | 1 | 0 | buttons, nav links, chips |

Rules:
- Width is set with `font-variation-settings: "wdth" N` through the tokens, never per component.
- Numbers that update, sit in a column or are compared use `font-variant-numeric: tabular-nums`.
- Headings `text-wrap: balance`, paragraphs `text-wrap: pretty`, measure 45 to 70ch.
- Sentence case everywhere. No uppercase labels, no eyebrow or kicker above headings, no accent colour on one headline word.
- A unit sits beside its number with a non-breaking space: `10 kW`, `580 W`, `Rs 45,000`.
- Nothing below 12px.

## Space and layout

- 4px base. Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160.
- Container: max width 1800px, gutter `clamp(1rem, 4vw, 2.5rem)`. Nav and all content share the same two edges.
- Section rhythm: `clamp(4.5rem, 9vw, 9rem)` between sections; 48 to 64px between a section heading and its content.
- **Stages.** Large image or dark blocks are rounded panels inset by the gutter, never full-bleed rectangles. This is the page's recurring shape.
- Section heading pattern: h2 on the left (max 14ch wide), one lead paragraph or a text link on the right or below. No label above it.
- Breakpoints in rem: 40 (phone to large phone), 48, 64, 80, 90. Layouts reflow at 200% browser zoom.

## Shape

| Token | Value | Use |
|---|---|---|
| `--r-stage` | `clamp(1.5rem, 3vw, 2.5rem)` | hero and feature stages |
| `--r-card` | `1.75rem` | cards |
| `--r-tile` | `1.25rem` | tiles and images inside cards (card radius minus 8px padding) |
| `--r-input` | `1rem` | inputs, small wells |
| `--r-pill` | `999px` | buttons, chips, nav, sliders |

Corners are concentric: inner radius = outer radius minus the padding between them.

## Depth

- Resting surfaces separate by tone only: `--surface` on `--ground`, `--sunken` inside `--surface`. No border and no shadow on resting cards.
- Hairline `--line` only where tone cannot separate: table rows, dividers inside a card, input outlines.
- Floating things (nav bar, glass cards, menus, sticky WhatsApp button, drag thumb) take the one shadow:
  `--float: 0 1px 2px rgb(11 15 10 / 0.05), 0 4px 8px rgb(11 15 10 / 0.05), 0 12px 24px rgb(11 15 10 / 0.06), 0 32px 48px rgb(11 15 10 / 0.05);`
- **Glass** is for chrome that content passes under, and for cards sitting on imagery. Nothing else.
  `background: rgb(253 253 251 / 0.62); backdrop-filter: blur(20px) saturate(1.6); box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.7), var(--float);`
  On night imagery: `rgb(11 15 10 / 0.5)` with `inset 0 1px 0 rgb(255 255 255 / 0.12)`.
  Without `backdrop-filter`, or with reduced transparency, glass becomes solid `--surface`. Never glass on glass.

## Motion

Tokens:
```
--dur-fast: 150ms;   --dur: 250ms;   --dur-slow: 650ms;
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.45, 0, 0.2, 1);
spring.snappy = { stiffness: 400, damping: 30 }            // pills, tabs, toggles: no overshoot
spring.bubbly = { stiffness: 300, damping: 18 }            // small things that pop: panels, chips, logo hover
spring.soft   = { stiffness: 160, damping: 24, mass: 1.2 } // large things that settle
```

Grammar:
- **Press**: every pressable scales to 0.97 on pointer down, spring.snappy back.
- **Hover (pointer devices only)**: cards rise 4px and their image scales to 1.04 over `--dur` `--ease-out`; primary button pulls up to 4px toward the pointer (magnetic).
- **Active pill**: one shared element slides between options with spring.snappy.
- **Pop**: small items enter from `scale(0.8)` and 0 opacity with spring.bubbly. Used for roof panels, result chips, cart count.
- **Entry**: a block rises 24px and fades in over `--dur-slow` `--ease-out` once, when 20% visible, children staggered 80ms. The h1 and the hero image never animate in.
- **Number change**: digits roll or crossfade in 200ms; tabular figures so nothing shifts.
- **Marquee**: CSS transform loop, edges faded with a mask, pauses on hover and on focus within, and has a 44px pause and play button (WCAG 2.2.2).
- **Link line**: an SVG path draws once on entry (stroke-dashoffset), then one small dot travels along it on a slow loop.
- **Smooth scroll**: our own wheel scroller (`SmoothScroll`, physics in `src/lib/momentum.ts`), only with a fine pointer and without reduced motion, attached when the page is idle. Wheel speed is projected `--project` (300ms) ahead; one flick lands at most `--scroll-reach` (1.25 viewports) past where the raw wheel deltas would. It leaves the event to the browser for ctrl (zoom), horizontal deltas, an open modal and any inner scroller, and stops on any scroll it did not write (keys, anchors, focus, scrollbar). Touch scrolls natively. No pinned sections, no scroll-scrubbed stories, no horizontal scroll hijack.
- Only `transform` and `opacity` animate, with two exceptions: the link line (stroke-dashoffset) and colour, which may transition on hover and focus for links and buttons (`--dur-fast`). No `transition: all`. `prefers-reduced-motion`: springs become 150ms fades, loops stop, smooth scroll off. More exceptions, all at the owner's request, are listed under "Added in the polish round".
- Libraries: none for animation. Springs are sampled once in `src/lib/spring.ts` into CSS `linear()` easings (the `--spring-*` variables) and the Web Animations API (panel, chip and figure pops); entry (rise 24px, fade, once at 20% visible, 80ms stagger) is a data attribute toggled by one IntersectionObserver with the transition in CSS; press, hover, zoom and the marquee are CSS. There is no motion dependency. No Lenis, Motion, framer-motion, Radix or GSAP; a named effect that CSS and WAAPI cannot do needs a line here first.

## Components (build once, reuse everywhere)

| Component | Notes |
|---|---|
| `Button` | pill; sizes 44 and 52px; variants `primary` (lime fill, ink text), `dark` (ink fill, light text), `quiet` (sunken fill), `text` (ink text with arrow that slides 4px on hover). Optional round icon twin (pill + circle pair from the product card reference) |
| `IconButton` | 44px circle, same variants |
| `Chip` | pill, small; `static`, `selectable` (lime-wash when selected), `stat` (number + label, glass variant) |
| `Stage` | rounded inset panel; variants `image`, `night`, `sunken`; holds any section |
| `Card` | `--surface`, `--r-card`, 8px image padding so the tile radius is concentric |
| `ProductCard` | image tile on `--sunken`, brand, model, one spec line, price or "Ask for today's rate", pill action + round WhatsApp button. Store-ready: accepts stock, warranty, price per watt |
| `ProjectCard` | image with bottom caption on glass, city and system size chips |
| `StatBlock` | `figure` number + one-line label; source is required in content |
| `SectionHeading` | h2 left, lead or text link right |
| `Marquee` | generic belt with faded edges and a pause and play button; logo variant at full opacity in `--ink-2` (4.5:1 or better), hovered logo in `--ink` at scale 1.1 with spring.bubbly, belt stops while hovered |
| `Slider` | 52px touch height. A transparent native range input (hit area, keys, aria) under a sunken pill track, lime fill and floating thumb. The input is the target; a follower glides the thumb at no more than the full range per `--slider-sweep`. A wheel over it (or with focus) moves it and not the page; at a limit, or within 200ms of a page scroll, the page gets the wheel. Arrows one step, Page keys ten, Home and End the limits |
| `RollingNumber` | a figure whose digits sit in `--roll-slot` slots, keyed from the right. A changed digit rolls (spring.snappy, transform and opacity): up when the value rises, down when it falls. It flashes lime while it rolls and settles to ink. Instant under reduced motion or when the text's shape changes. `aria-hidden`; the control beside it carries the value |
| `SegmentedControl` | pill on a `--tone-track` track (visible on ground, surface, sunken, glass and night) with a sliding active element; segments 44px high, inactive text in `--tone-ink` (4.5:1 or better); an option may carry a short label for phones |
| `Field`, `Select`, `Textarea` | `--sunken` wells, `--r-input`, visible label above, error text below |
| `Accordion` | FAQ; plus rotates to a cross, height animates with spring.soft |
| `LinkDiagram` | SVG line diagram of sun, panel, inverter, home, battery, grid |
| `Nav` | floating glass pill (radius `--r-nav`): wordmark, five links, quote button. After 80px of scroll it springs narrower into an island and the wordmark becomes the S emblem. Under 64rem the three-line button (`NavMenu`) turns into an X and the pill itself grows downward into a panel with the links, which arrive one by one; closing fades the links, then the panel shrinks back. A disclosure, not a modal. Under 40rem the quote button lives in the panel, top right, not in the header. No badges |
| `Footer` | full-bleed night band, square corners, flush with the page bottom; its content sits on the page width: outlets from content, link columns, giant faded SolarLink wordmark |
| `WhatsAppButton` | routes to the nearest outlet's number from content; carries a prefilled message |
| `Price` | one formatter: `Rs 45,000`, no decimals; `priceMode` switch `show`, `ask`, `hidden` in content |

Icons: lucide, 1.75 stroke, 20 and 24px, `currentColor`. Never inside tinted squares.

## Imagery

- Clean CGI renders with soft morning light: Pakistani flat-roof houses, shops and farms, product renders on a seamless `--sunken` backdrop. No stock photos of foreign pitched roofs, no scroll video.
- Real install photos (when the client sends them) go in Projects only, colour-matched, never mixed into the same row as CGI.
- Every image: AVIF and WebP, explicit width and height, alt text from content. Hero image is preloaded and is the LCP element together with the h1.
- Generated images keep a sidecar note (prompt, tool, date) in `design/img/`.

## Words

- Brand is written **SolarLink**.
- Headlines are plain claims. Buttons are verb plus object: "Get a free quote", "Send on WhatsApp", "See the project".
- Every number on the site has a source in the content file. The banned-claims list in `CLAUDE.md` is checked by script.
- Estimates are labelled as estimates.

## Hard rules

1. All copy and every business fact lives in `src/content.ts` (and `src/content/*.ts` for long lists). Components hold no literal text, phone, address, price or brand name.
2. Components use tokens only. No raw hex, px radius, shadow or duration outside the token file. A lint rule blocks them.
3. Reuse before building: a new component needs a line in this file first.
4. One primary action per screen. One accent per view.
5. No kickers, gradient text, glass on glass, cards inside cards, emoji as icons, decorative section numbers.
6. Every control has hover, focus-visible (2px ink ring, 2px offset; lime ring on night), active, disabled and loading states. Touch targets 44px or more.

## Added in the foundation phase

No value above changed. These tokens were missing and are now in `src/styles/tokens.css`:

| Token | Value | Why |
|---|---|---|
| `--dur-marquee` | `48s` | one loop of the marquee belt ("slowly") |
| `--press-scale`, `--hover-zoom` | `0.97`, `1.04` | the Motion grammar numbers, as tokens |
| `--ring-width`, `--ring-offset` | `2px`, `2px` | the focus ring |
| `--measure-heading` | `14ch` | section heading max width (`max-w-heading`) |
| `--tone-surface`, `--tone-sunken`, `--tone-ink`, `--tone-ink-2`, `--tone-on-ink`, `--tone-line`, `--focus` | aliases | point at the light tokens, and at the night tokens inside a night Stage, so one component serves both grounds (`bg-tone-surface`, `text-tone-ink`) |

Other choices: the accordion panel height animates with a CSS keyframe on `--dur-slow` and `--ease-out` (the spring.soft look, not a true spring). Select is the native `<select>` styled as a well.

## Added in phase 3 (chrome, hero, brand belt)

No existing value changed. New tokens in `src/styles/tokens.css`: `--haze` (warm light wash over the hero image), `--panel-base`, `--panel-shadow` (roof panel object, drawn on the image), `--link-shadow` (legibility of the link line on the image), `--hero-height` (`min(92svh, 53.75rem)`), `--t-figure-compact-size` (2.75rem, big figure on short desktop windows), `--t-stat-size` and `--t-stat-size-lg` (result card figures), `--t-giant-*` (footer wordmark), `--measure-display` 11ch, `--measure-lead` 29ch, `--measure-lead-wide` 36ch. Utilities: `page-width` (nav, stages and content share the page edges: gutter inside the viewport, 1800px at most), `nav-width`, `hero-art`, `short:` variant (desktop windows 50rem high or less). Phase 3 components: `Nav` (native dialog sheet under 64rem), `Footer`, `Hero` with `SizingProvider`, `SizingCard`, `ResultCard`, `RoofPanels`, `LinkLine`, `BrandBelt`.

## Added in the QA fix round (16 Nov 2026)

No existing value changed. New tokens in `src/styles/tokens.css`:

| Token | Value | Why |
|---|---|---|
| `--track`, `--night-track`, `--tone-track` | `rgb(11 15 10 / 0.1)`, `rgb(242 244 238 / 0.16)`, alias | the segmented-control track: a translucent tint reads on ground, surface, sunken and glass; the night one on night |
| `--dur-draw` | `1100ms` | the hero link line draws once |
| `--delay-draw` | `350ms` | wait for the hero image to paint before it draws |
| `--dur-route` | `9s` | one loop of the dot along the link diagram's route |
| `--hero-height-short` | `calc(100svh - 1.5rem)` | desktop windows 50rem high or less: the hero stage fills the window (12px above and below), so the h1 and the lead clear the nav and the sizing card by 24px or more |

Rules added: inside a glass card text is `--ink`, not `--ink-2` (the glass lets the image through, so `--ink-2` fails 4.5:1). One lime primary per screen: the nav's quote button is the `dark` variant. A link smaller than 44px keeps its look and gets a 44px hit area (`hit-area` utility). A card with one text link uses a stretched link (`stretched` and `card-focus` utilities): one tab stop, the focus ring on the card. Script reads durations and easings from these tokens (`src/lib/tokens.ts`); no raw numbers in components.

## Added in the polish round (16 Nov 2026)

Owner requests. Where they break an earlier rule, the exception is named here and applies only to the thing named.

Layout:
- The hero stage starts 12px under the floating nav (96px from the top) on desktop; the nav no longer overlaps it. `--hero-height` is `min(calc(100svh - 7.5rem), 53.75rem)`, `--hero-height-short` is `calc(100svh - 6.75rem)`.
- Homepage order: hero, brand belt, about, the link, services, reviews, shop, projects, outlets, questions, closing call.
- Reviews are quote cards: a row of three, the middle one on ink with a lime mark. Old-site testimonials are unconfirmed content (preview builds only). No rating, count or schema.
- The closing call is a sunken stage with no image: heading and line left, buttons right.
- The footer is the one full-bleed element on the page.
- A segmented control may span its column on phones (`w-full sm:w-max`).

Motion exceptions to "only transform and opacity":
- The nav's width transitions when it becomes an island and when the menu opens (`--dur-snappy`, `--spring-snappy`).
- The nav menu panel and the hero's roof message animate their height (grid rows `0fr` to `1fr`). Text fades in after the height has grown and fades out before it shrinks.
- Under 64rem the hero dock's top margin follows the roof message's height through `--dock-lift` (set from a ResizeObserver, never transitioned), so the card grows upward over the image and the slider stays under the finger.
- The roof panels are redrawn on one canvas (`RoofPanels`); they keep the same scale and fade grammar. Cell lines are drawn only when they are 3 device pixels or more apart.
- None of these run under reduced motion.

Other exceptions:
- Lime text on a light ground: a rolling digit only, and only while it rolls.
- Icons: the menu button is three line elements that morph into an X, not the lucide icons.
- The S emblem (`public/images/brand/emblem.*`) and the favicon (ink S on a lime tile, `src/app/icon.png`, `apple-icon.png`) are cut from the wordmark until the owner supplies the real emblem.

New tokens in `src/styles/tokens.css`:

| Token | Value | Why |
|---|---|---|
| `--project` | `300ms` | how far ahead wheel speed is projected (page scroll and the slider) |
| `--slider-sweep` | `600ms` | fastest full-range travel of the slider thumb |
| `--scroll-reach` | `1.25` | furthest one flick may carry the page past its raw landing, in viewport heights |
| `--roll-slot` | `0.88ch` | width of one digit slot in a rolling number |
| `--dock-overlap` | `7rem`, `5.5rem` from 40rem | how far the hero dock overlaps the image under 64rem |
| `--r-nav` | `1.875rem` | half the nav row: a pill at rest, the same corners on the open panel |
| `--panel-frame`, `--panel-cell`, `--panel-edge`, `--panel-line` | see file | roof panel frame, cells, front edge, cell lines (canvas) |
| `--panel-sheen`, `--panel-sheen-fade` | see file | one sweep of light across the whole array |
| `--panel-contact`, `--panel-contact-blur`, `--panel-contact-x`, `--panel-contact-y` | see file | contact shadow under the array |

Removed: `--panel-base`, `--panel-shadow`, the `panel-face` utility, the Lenis dependency, `MenuSheet`.

Added 18 Nov 2026: `--on-lime`, `--on-ink`, the dark values above, utility `scheme-light`. Inner pages: h1 uses the h2 size; page blocks use `text-h3` headings.
