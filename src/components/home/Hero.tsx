import type { CSSProperties } from "react";
import { preload } from "react-dom";
import { hero, nav, outlets, seo, sizing } from "@/content";
import { images } from "@/content/images";
import { Button } from "@/components/ui/Button";
import { show } from "@/lib/facts";
import { heroFull, heroSizes, heroSrc, heroSrcSet, heroWidest } from "@/lib/picture";
import { LinkLine } from "./LinkLine";
import { ResultCard } from "./ResultCard";
import { RoofPanels } from "./RoofPanels";
import { SizingCard, sizingSlot } from "./SizingCard";
import { SizingProvider, type SizingConfig } from "./SizingProvider";

const panelWidth = Number(Object.keys(images.panelTop)[0]);
const panelFace = `image-set(url(/images/panel-top-${panelWidth}.avif) type("image/avif"), url(/images/panel-top-${panelWidth}.webp) type("image/webp"))`;

/** Without JavaScript the island hides and the card below (a link to the quote page) shows instead. */
const noJsStyle = "*[data-island]{display:none}";

export function Hero() {
  // The hero image is the LCP element: preload the AVIF with high priority.
  preload(heroSrc(heroWidest, "avif"), { as: "image", imageSrcSet: heroSrcSet("avif"), imageSizes: heroSizes, type: "image/avif", fetchPriority: "high" });

  const full = heroFull;
  const lahore = outlets.find((o) => o.slug === "lahore") ?? outlets[0];
  const config: SizingConfig = {
    constants: {
      ratePerUnit: show(sizing.ratePerUnit) as number,
      sunHours: show(sizing.sunHours) as number,
      performanceRatio: show(sizing.performanceRatio) as number,
      panelWatts: show(sizing.panelWatts) as number,
    },
    rs: sizing.rs,
    units: sizing.units,
    roof: sizing.roof,
    grid: sizing.grid,
    whatsapp: show(lahore.whatsapp),
    quoteHref: nav.quote.href,
  };
  const artStyle = { "--ratio": full.width / full.height } as CSSProperties;

  return (
    <SizingProvider config={config}>
      <section id="hero" className="relative page-width pt-26 lg:mt-3 lg:hero-height lg:pt-0 short:hero-height-short">
        <noscript>
          <style>{noJsStyle}</style>
        </noscript>

        <div className="px-1 pb-3 sm:pb-5 lg:absolute lg:left-14 lg:top-26 lg:z-5 lg:p-0 short:top-24">
          <h1 className="max-w-display text-display">{seo.home.h1}</h1>
          <p className="mt-3 max-w-lead text-lead max-sm:max-w-none max-sm:text-small sm:mt-4 short:mt-2 short:max-w-lead-wide">{hero.lead}</p>
        </div>

        <div className="hero-stage relative isolate aspect-square overflow-hidden rounded-stage bg-sunken sm:aspect-16/10 lg:absolute lg:inset-0 lg:aspect-auto">
          <div data-hero-art className="hero-art" style={artStyle}>
            <picture>
              <source type="image/avif" srcSet={heroSrcSet("avif")} sizes={heroSizes} />
              <source type="image/webp" srcSet={heroSrcSet("webp")} sizes={heroSizes} />
              {/* A plain img inside picture: static export has no image optimiser, and the sources are pre-sized. */}
              <img
                src={heroSrc(heroWidest, "webp")}
                width={full.width}
                height={full.height}
                alt={hero.imageAlt}
                fetchPriority="high"
                decoding="async"
                draggable={false}
                className="absolute inset-0 size-full select-none"
              />
            </picture>
            <RoofPanels face={panelFace} />
          </div>
          <div className="bg-haze pointer-events-none absolute inset-0" />
        </div>

        <LinkLine />

        <div className="relative z-4 -mt-28 flex flex-col gap-4 rounded-card bg-surface p-5 shadow-float sm:-mt-22 md:mx-6 md:flex-row md:items-start md:gap-6 lg:contents">
          <ResultCard />
          <SizingCard />
          <noscript>
            <section className={sizingSlot}>
              <p className="text-small">{hero.noJs.text}</p>
              <div className="mt-4">
                <Button href={nav.quote.href} size="lg">
                  {hero.noJs.cta}
                </Button>
              </div>
            </section>
          </noscript>
        </div>
      </section>
    </SizingProvider>
  );
}
