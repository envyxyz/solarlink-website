import { Breadcrumbs, type Crumb } from "@/components/site/Breadcrumbs";
import { Chip } from "@/components/ui/Chip";
import { Stage } from "@/components/ui/Stage";
import { awaiting, ui } from "@/content";
import type { PageDoc } from "@/content/pages";
import type { PageImage } from "@/content/pages/types";
import { preview } from "@/lib/facts";

/** Parent crumb from the path: the first segment's hub, or Resources for a top-level guide. */
function trailFor(doc: PageDoc): Crumb[] {
  const parts = doc.path.split("/").filter(Boolean);
  const topLevel = parts.length === 1;
  const parentKey = topLevel ? (doc.kind === "guide" ? "resources" : null) : parts[0];
  const parent = parentKey ? ui.page.parents[parentKey] : null;
  return [...(parent && parentKey ? ([[parent, `/${parentKey}/`]] as Crumb[]) : []), [doc.h1, doc.path]];
}

/** The hero image is the LCP element: eager, high priority, never animated. */
function Pic({ image, className }: { image: PageImage; className: string }) {
  return (
    <picture className="contents">
      <source type="image/avif" srcSet={image.src.replace(/\.webp$/, ".avif")} />
      <source type="image/webp" srcSet={image.src} />
      <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="eager" decoding="async" fetchPriority="high" className={className} />
    </picture>
  );
}

/**
 * Per kind: product = text left, render on a sunken stage right; an image = the render on a stage with a frosted glass
 * panel for the h1 and lead from 64rem (text above the stage below it); no image = a sunken type-led stage. The root
 * carries data-page-hero: the quote dock appears once it has left the view.
 */
export function PageHero({ doc }: { doc: PageDoc }) {
  const img = doc.image;
  const top = (
    <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-3">
      <Breadcrumbs trail={trailFor(doc)} />
      {preview && !doc.confirmed && <Chip>{awaiting}</Chip>}
    </div>
  );
  const lead = <p className="max-w-prose text-lead text-ink-2 lg:text-ink">{doc.lead}</p>;

  if (img && (doc.kind === "product" || img.width === img.height)) {
    return (
      <header data-page-hero="" className="page-width pt-28">
        {top}
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col items-start gap-6">
            <h1 className="text-display">{doc.h1}</h1>
            <p className="max-w-prose text-lead text-ink-2">{doc.lead}</p>
          </div>
          <div className="rounded-stage bg-sunken p-6 sm:p-10">
            <Pic image={img} className="h-auto w-full object-contain" />
          </div>
        </div>
      </header>
    );
  }

  if (img) {
    return (
      <header data-page-hero="" className="page-width pt-28">
        {top}
        <div className="relative flex flex-col gap-8 lg:block">
          <div className="flex flex-col items-start gap-5 lg:glass lg:scheme-light lg:absolute lg:bottom-6 lg:left-6 lg:z-5 lg:max-w-2xl lg:rounded-card lg:p-8">
            <h1 className="text-display">{doc.h1}</h1>
            {lead}
          </div>
          <div className="relative isolate aspect-16/10 overflow-hidden rounded-stage bg-sunken lg:aspect-16/9">
            <Pic image={img} className="absolute inset-0 size-full object-cover" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header data-page-hero="" className="pt-28">
      <div className="page-width">{top}</div>
      <Stage nested={false} className="p-6 sm:p-10 lg:p-16">
        <div className="flex max-w-3xl flex-col items-start gap-6">
          <h1 className="text-display">{doc.h1}</h1>
          <p className="max-w-prose text-lead text-tone-ink-2">{doc.lead}</p>
        </div>
      </Stage>
    </header>
  );
}
