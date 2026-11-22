import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandsBlock } from "@/components/pages/blocks/BrandsBlock";
import { DiagramBlock } from "@/components/pages/blocks/DiagramBlock";
import { FeatureBlock } from "@/components/pages/blocks/FeatureBlock";
import { QuoteFormBlock } from "@/components/pages/blocks/QuoteFormBlock";
import { ProjectsBlock } from "@/components/pages/blocks/ProjectsBlock";
import { ShopBlock } from "@/components/pages/blocks/ShopBlock";
import { SizingBlock } from "@/components/pages/blocks/SizingBlock";
import { Accordion } from "@/components/ui/Accordion";
import { Card, CardBody } from "@/components/ui/Card";
import { Stage } from "@/components/ui/Stage";
import { icon } from "@/components/ui/icons";
import type { PageBlock } from "@/content/pages";
import type { PageImage } from "@/content/pages/types";
import { cn } from "@/lib/cn";

export type Ground = "plain" | "sunken" | "night";

export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Stagger index for the entry rise (80ms each, see data-reveal in globals.css). */
const rise = (i: number) => ({ "--i": i }) as CSSProperties;

/** Values this short are tile headlines; longer ones (an address, a list of hours) drop to the title size. */
const SHORT_VALUE = 12;

function Pic({ image, className }: { image: PageImage; className: string }) {
  return (
    <picture className="contents">
      <source type="image/avif" srcSet={image.src.replace(/\.webp$/, ".avif")} />
      <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" className={className} />
    </picture>
  );
}

function Body({ block, featured }: { block: PageBlock; featured?: boolean }) {
  switch (block.type) {
    case "prose":
      return (
        <div className="flex max-w-prose flex-col gap-4 text-body">
          {block.paragraphs.map((p, i) => (
            <p key={p} className={cn(i === 0 && "text-lead")}>
              {p}
            </p>
          ))}
        </div>
      );
    case "facts":
      return (
        <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {block.items.map((f, i) => (
            <div key={f.label} data-reveal="" style={rise(i)} className="flex flex-col-reverse justify-end gap-2 rounded-card bg-tone-surface p-5 text-tone-ink">
              <dt className="text-small text-tone-ink-2">{f.label}</dt>
              <dd className={cn("tabular", f.value.length <= SHORT_VALUE ? "text-h3" : "text-title")}>{f.value}</dd>
            </div>
          ))}
        </dl>
      );
    case "steps":
      return (
        <ol className="grid gap-4 sm:grid-cols-2 xl:flex">
          {block.items.map((s, i) => (
            <li key={s.title} data-reveal="" style={rise(i)} className="step-link relative flex flex-col gap-2 rounded-card bg-tone-surface p-6 text-tone-ink xl:flex-1">
              <h3 className="text-title">{s.title}</h3>
              <p className="text-small text-tone-ink-2">{s.text}</p>
            </li>
          ))}
        </ol>
      );
    case "links":
      return (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {block.items.map((l, i) => {
            const lead = featured && i === 0;
            return l.image ? (
              <li
                key={l.href}
                data-reveal=""
                style={rise(i)}
                className={cn("group card-focus lift relative isolate flex min-h-72 flex-col justify-end overflow-hidden rounded-card bg-sunken", lead && "min-h-80 sm:col-span-2 lg:min-h-96")}
              >
                <Pic image={l.image} className="zoom-on-hover absolute inset-0 -z-10 size-full object-cover" />
                <div className="glass m-2 rounded-tile p-4 text-ink">
                  <h3 className={lead ? "text-h3" : "text-title"}>
                    <Link href={l.href} className="stretched focus-ring rounded-input">
                      {l.label}
                    </Link>
                  </h3>
                  <p className="mt-1 text-small">{l.text}</p>
                </div>
              </li>
            ) : (
              <li key={l.href} data-reveal="" style={rise(i)} className={cn(lead && "sm:col-span-2")}>
                <Card interactive className="card-focus relative flex h-full flex-col">
                  <CardBody className="h-full gap-3 p-5">
                    <h3 className="text-h3">
                      <Link href={l.href} className="stretched focus-ring rounded-input">
                        {l.label}
                      </Link>
                    </h3>
                    <p className="text-small text-tone-ink-2">{l.text}</p>
                    <ArrowRight {...icon} className="mt-auto transition-transform dur ease-out group-hover:translate-x-1" />
                  </CardBody>
                </Card>
              </li>
            );
          })}
        </ul>
      );
    case "gallery":
      return (
        <ul className="grid gap-4 sm:grid-cols-2">
          {block.images.map((img, i) => (
            <li key={img.src} data-reveal="" style={rise(i)} className="overflow-hidden rounded-card bg-sunken">
              <Pic image={img} className="size-full object-cover" />
            </li>
          ))}
        </ul>
      );
    case "faq":
      return <Accordion items={block.items} />;
    case "diagram":
      return <DiagramBlock block={block} />;
    case "sizing":
      return <SizingBlock block={block} />;
    case "quoteForm":
      return <QuoteFormBlock block={block} />;
    default:
      return null;
  }
}

/**
 * One block: its section, h2 and ground. `wide` is the full-page-width layout (prose, facts and faq put the heading in
 * columns 1-4 and the body in 5-12 from 64rem); otherwise the block sits in a reading column. Shop, projects, brands and
 * feature draw their own heading and stage, so they are rendered bare.
 */
export function Block({ block, ground, wide, featured }: { block: PageBlock; ground: Ground; wide: boolean; featured?: boolean }) {
  switch (block.type) {
    case "feature":
      return (
        <div id={slug(block.heading)} className="scroll-mt-26">
          <FeatureBlock block={block} />
        </div>
      );
    case "shop":
      return (
        <div id={slug(block.heading)} className="scroll-mt-26">
          <ShopBlock block={block} />
        </div>
      );
    case "projects":
      return (
        <div id={slug(block.heading)} className="scroll-mt-26">
          <ProjectsBlock block={block} />
        </div>
      );
    case "brands":
      return (
        <div id={slug(block.heading)} className="scroll-mt-26">
          <BrandsBlock block={block} />
        </div>
      );
  }

  const heading = block.heading;
  const side = wide && (block.type === "prose" || block.type === "facts" || block.type === "faq");
  const h = heading && <h2 className={cn("max-w-heading", wide && !side ? "mb-8 text-h2 lg:mb-12" : "text-h3", !wide && "mb-6")}>{heading}</h2>;
  const body = <Body block={block} featured={featured} />;
  const inner = side ? (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">{h}</div>
      <div className="lg:col-span-8 lg:col-start-5">{body}</div>
    </div>
  ) : (
    <>
      {h}
      {body}
    </>
  );
  return (
    // The sizing card and the quote form carry their own lime action: the dock steps aside while it is on screen (one lime per view).
    <section id={heading ? slug(heading) : undefined} data-dock-hide={block.type === "sizing" || block.type === "quoteForm" ? "" : undefined} className={cn("scroll-mt-26", wide && "page-width")}>
      {ground === "plain" ? inner : (
        <Stage variant={ground} as="div" nested className={wide ? "p-6 sm:p-10 lg:p-14" : "p-6 sm:p-8"}>
          {inner}
        </Stage>
      )}
    </section>
  );
}
