# SolarLink design system

Locked 2026-11-15 from the logo files. This file is the reference; `src/styles/tokens.css` is the implementation and the only place a raw colour value may appear. See it rendered: `design/specimen.html` (add `?theme=light` or `?theme=dark`).

Page layouts, the hero, navigation and motion are **not** decided here. They wait for the reference sites and are recorded in `docs/DESIGN-DIRECTION.md` once approved.

## Direction in one line

Futuristic and minimal: the logo's volt green on near-black, one accent, wide soft-squared display type, and numbers shown like instrument readings.

## Colour

The old site used `#7ED321` plus an amber accent. Neither is in the logo. The logo is `#95FF15` on pure black or white, so that is the brand colour.

### Volt green (OKLCH hue 133.4)

| Step | Hex | Use |
|---|---|---|
| 50 | `#EBFEDF` | Accent tint on light |
| 100 | `#D7FCBE` | |
| 200 | `#BBFD8B` | |
| 300 | `#A2FD51` | Accent fill, hover |
| **400** | **`#95FF15`** | **The logo green. Accent fills; accent text on dark** |
| 500 | `#7DDB00` | |
| 600 | `#64B000` | Accent borders and solar data on light |
| 700 | `#4B8700` | |
| 800 | `#366300` | Accent text and links on light |
| 900 | `#214200` | |
| 950 | `#0D2000` | |

### Neutrals

Same hue as the green at very low chroma, so greys sit with the brand instead of looking blue beside it.

`0 #FFFFFF` · `50 #F9FBF8` · `100 #F2F4F0` · `200 #E4E7E2` · `300 #D2D6CF` · `400 #A2A69F` · `500 #777C75` · `600 #555A53` · `700 #3B3F38` · `800 #242823` · `850 #191C17` · `900 #10120E` · `925 #0B0D0A` · `950 #060705` · `1000 #000000`

### Signal colours (data and status only)

| Role | On dark | On light |
|---|---|---|
| Warning, battery | `#FFB224` | `#9A5B00` |
| Info, grid | `#6CB2FF` | `#1259C3` |
| Danger | `#FF5C5C` | `#C2261F` |

### Roles

Components use roles, never a ramp step. Dark is the default; light follows the device (`prefers-color-scheme`) and can be pinned per page or section with `data-theme`.

| Role | Token | Dark | Light |
|---|---|---|---|
| Page | `--sl-bg` | neutral 950 | neutral 50 |
| Raised surface | `--sl-bg-raised` | neutral 925 | white |
| Overlay | `--sl-bg-overlay` | neutral 900 | white |
| Inset, fields | `--sl-bg-inset` | black | neutral 100 |
| Hairline | `--sl-border` | neutral 800 | neutral 200 |
| Control border | `--sl-border-strong` | neutral 500 | neutral 500 |
| Text | `--sl-text` | neutral 50 | neutral 950 |
| Muted text | `--sl-text-muted` | neutral 400 | neutral 600 |
| Accent fill | `--sl-accent` | green 400 | green 400 |
| Text on accent | `--sl-on-accent` | black | black |
| Accent text | `--sl-accent-text` | green 400 | green 800 |
| Accent tint | `--sl-accent-soft` | green 400 at 10% | green 50 |

Tailwind names for the same roles: `bg-bg`, `bg-raised`, `bg-overlay`, `bg-inset`, `border-line`, `border-line-strong`, `text-ink`, `text-muted`, `bg-accent`, `text-on-accent`, `text-accent-text`, `bg-accent-soft`. The default Tailwind palette is switched off, so `bg-green-500` and the like do not exist.

### Colour rules

1. One accent. Green marks the one thing on a view that matters most: the main action, the key number, the active state.
2. Green is a fill on light backgrounds, never text or a thin line: `#95FF15` on white is 1.3:1. Accent-coloured text on light uses green 800 (7.1:1).
3. Text on a green fill is always black (16.6:1).
4. Amber, blue and red carry meaning (battery, grid, fault). They never decorate.
5. In charts and meters each energy source keeps one colour everywhere: solar green, grid blue, battery amber, load neutral.
6. No gradients on text. No glass on glass. Depth on dark comes from surface steps and hairlines, not shadows.

Contrast is checked by `pnpm check:contrast` (30 pairs, all pass). Run it after any change to `tokens.css`.

## Type

| Role | Family | Why |
|---|---|---|
| Display | **Unbounded** (variable, 600 for headings) | The closest full family to the wordmark: wide, soft-squared, even stroke. It has lowercase, numerals and a weight range, which the closer single-weight look-alikes (Krona One, Syncopate, Michroma) do not |
| Body and UI | **Outfit** (variable, 400 and 500) | Matches the line under the logo: round geometric, single-storey a |
| Data | **Geist Mono** (500) | Prices, kW, units, serials. Makes figures read as instrument readings. Loaded only on pages that use it |

All three are open-licence Google fonts, self-hosted by Astro's Fonts API with metric-matched fallbacks (no layout shift). Latin subset only: 51 KB + 32 KB + 23 KB. Any Urdu-script text uses Noto Nastaliq Urdu, loaded only on pages that contain it.

The wordmark itself is a custom drawing (the A has no crossbar and holds the green triangle). Never rebuild the logo in Unbounded; always use the logo file.

### Scale

| Token | Size | Use |
|---|---|---|
| `--sl-display-xl` | 2.5 to 5.5 rem, fluid | Home hero only |
| `--sl-display-lg` | 2 to 3.75 rem | Page h1 |
| `--sl-display-md` | 1.625 to 2.5 rem | h2 |
| `--sl-display-sm` | 1.25 to 1.5 rem | h3 |
| `--sl-text-md` | 1.125 rem | Lead paragraphs |
| `--sl-text-base` | 1 rem | Body. Never smaller for running text |
| `--sl-text-sm`, `--sl-text-xs` | 0.875, 0.75 rem | Captions, labels |

Rules: Unbounded is wide, so headings stay short (aim for under 45 characters) and never run as body text. Display tracking is tight (-0.03em); uppercase labels use the logo tagline's open tracking (0.08em) and stay under four words. Figures use tabular numerals. Sizes are in rem with fluid `clamp()`, so browser zoom reflows the page. Phone numbers, model numbers and unit figures are plain ASCII (no special hyphens), so they can be searched and tapped.

## Shape, space, motion

- **Radius:** soft-squared, from the wordmark's letter corners. `xs 4`, `sm 8`, `md 12`, `lg 20`, `xl 32` px, and `full` for buttons and chips.
- **Borders:** 1 px hairlines.
- **Space:** 4 px base. Section rhythm `--sl-space-section` (4 to 8 rem, fluid), page gutter `--sl-gutter` (1 to 2.5 rem). Containers: 76 rem page, 90 rem wide, 44 rem reading width.
- **Motion:** 120, 200, 320 and 600 ms; ease-out `cubic-bezier(0.16, 1, 0.3, 1)`. Transitions name their properties (never `transition: all`). The h1 is never animated in: it paints at once. `prefers-reduced-motion` sets every duration to zero.
- **Layers:** `--sl-z-*` from base 0 to toast 400.

## Assets

- `public/brand/`: the logo for dark and light backgrounds, PNG and WebP, taken from the old site.
- **Needed from the client:** the logo as a vector file (SVG or AI). The PNGs are 952 px wide and will not hold up large or in print.
- **Favicon:** the old site's `favicon.svg` was the Astro framework's default logo and its touch icon was the wide wordmark. `public/favicon.svg` is now a plain placeholder (green triangle on black). The real icon set is drawn from the vector logo in Phase 2.

## Enforcement

| Check | Command | Fails when |
|---|---|---|
| No raw colours outside `tokens.css` | `pnpm check:tokens` | A hex, `rgb()` or `hsl()` literal appears in `src/` |
| Contrast | `pnpm check:contrast` | Any allowed pair drops under its WCAG minimum |
| Copy and claims | `pnpm check:content` | A banned claim, a duplicate target query, or a nav link to a missing route |
| Everything | `pnpm verify` | Any of the above, a type error, or a failed build |
