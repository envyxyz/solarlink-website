# Inner pages: richer design plan (18 Nov 2026 night run)

The Fable plan named in the handover was not in the repo, so this plan was written by the night run (Opus) from
`docs/research/inspiration-notes.txt`, `DESIGN.md` and the handover brief. Ameer's note 12: the inner pages are "way too
simple and plain". Every page today is one column of plain blocks with a quote card beside it.

## Direction

Apple-like, bubbly, frosted glass, CGI renders, light on JS. Nothing scroll-gated. Same tokens, same components as home.

- **Hero (`PageHero`).** Type-led and large: the h1 at the `display` size (inner pages used `h2` until now).
  - Kinds with a render (service, system, hub, company, outlet): the render fills a rounded image stage; a frosted glass
    panel on its lower-left edge carries the h1 and the lead (glass text is `--ink`; the panel is `scheme-light`, like
    the home hero, because the render is daytime). Under 64rem the text sits above the stage, not on it.
  - Product: split. Text left, the product render on a sunken stage right (the renders are shot on the sunken backdrop).
  - No image (project, guide, article, legal, sometimes company): a sunken stage with the h1 in display type and the lead.
  - Breadcrumbs and the "Awaiting client" chip above the h1. The h1 and the hero image never animate in.
- **Section rhythm.** Blocks no longer stack in one column. Each block gets a ground from its type:
  `steps` and `shop` on a **night** stage, `diagram`, `sizing` and `facts` on a **sunken** stage, the rest on the page
  ground. At most two night stages per page (later ones fall back to sunken). Section heading pattern: h2 left
  (`max-w-heading`), content right on 64rem+ for prose, facts and faq; full width for the visual blocks.
- **Sticky frosted quote dock (`QuoteDock`).** A glass pill fixed bottom-centre: the page's h1 (from 48rem) and the lime
  "Get a free quote" button, plus the dark round WhatsApp button when the Lahore number is shown. It rises in
  (transform + opacity, spring) once the hero has left the view and leaves while the closing call or footer is visible
  (IntersectionObserver, not scroll-driven). Instant under reduced motion. Not on legal pages. It replaces the sidebar
  quote card. One lime per view holds: the hero has no lime, and the dock hides when the closing call shows.
- **Motion.** Existing grammar only: `press` (0.97, snappy), `lift` + `zoom-on-hover` on cards, `data-reveal` rise with
  80ms stagger (`--i`), springs from `src/lib/spring.ts`. Transform and opacity only.
- **No new photography.** Richness comes from type scale, glass, the line diagram, the sizing card, product and project
  cards, the brand belt and the existing renders (`pics` in `docs/shared.ts`).

## Six new block types (the cap), all reuse

| Block | Reuses | Used on |
|---|---|---|
| `diagram` | `LinkDiagram` (new `initial` prop) | how-solar-works, on-grid, hybrid, off-grid, home/commercial services |
| `sizing` | `SizingProvider` + `SizingCard` (new `slot` prop), config moved out of `Hero` | system sizes, residential/commercial services, get-quote, solar-systems hub |
| `shop` | `ProductCard` in a scroll-snap row | product pages, products hub |
| `projects` | `ProjectCard` | projects hub, project pages |
| `brands` | `Marquee` (logo variant, pause button) | products hub, product pages, brand pages |
| `feature` | `Stage` + glass caption | services, about, outlets, systems |

Existing blocks restyled: `facts` (big value tiles), `steps` (night stage, connected row), `links` (image-led cards with
glass captions on hubs, the first one featured; text cards with an arrow otherwise), `gallery`, `faq` (`Accordion`),
`prose` (measure 65ch, larger first paragraph).

## Per kind

- **hub**: image hero; links as image-led cards; projects hub adds `projects`, products hub adds `shop` + `brands`,
  solar-systems hub adds `diagram` + `sizing`.
- **service**: image hero; prose; `feature`; steps on night; `diagram` (home/commercial/farm); `sizing`; faq.
- **system**: image hero; `diagram` on its own mode (types) or `sizing` (sizes); facts as tiles; faq.
- **product**: split hero; facts; `shop` row of that category; `brands`; faq.
- **outlet**: image hero; facts (address, phones, hours) on sunken; `feature`; faq.
- **project**: type hero; facts; `projects` (others); related.
- **guide / article**: type hero, reading column with the sticky "On this page" list; `diagram` in how-solar-works.
- **company**: image or type hero, `feature`, links, `sizing` on get-quote.
- **legal**: type hero, reading column, no dock.

## Jobs (disjoint files, run in parallel)

| Job | Model | Files |
|---|---|---|
| J1 template | Sonnet, medium | `src/components/site/InnerPage.tsx`, `src/components/pages/{PageHero,QuoteDock,Block}.tsx`, append-only: `src/content/ui.ts` (`ui.page`), end of `src/app/globals.css`, end of `src/styles/tokens.css` |
| J2 blocks | Sonnet, medium | `src/components/pages/blocks/{DiagramBlock,SizingBlock,ShopBlock,ProjectsBlock,BrandsBlock,FeatureBlock}.tsx`, `src/components/home/{LinkDiagram,SizingCard,Hero}.tsx`, new `src/components/home/sizingConfig.ts` |
| J3 content | Sonnet, low | `src/content/pages/docs/*.ts`, `src/content/kit.ts` |

Contract: the block union in `src/content/pages/types.ts` (written before the jobs). Each J2 component is
`export function XBlock({ block }: { block: Extract<PageBlock, { type: "x" }> })`, renders only the block body (no h2,
no outer stage: `Block.tsx` in J1 draws the heading and the stage), and uses `tone` tokens so it works on ground,
sunken and night. `FeatureBlock` is the exception: it draws its own stage and heading.

Then Opus integrates, runs typecheck, lint, the build and checks, screenshots two pages of each kind at 1440 and 390
in light and dark, fixes what looks plain or broken, updates DESIGN.md and PHASES.md, and commits.
