import type { PageBlock } from "@/content/pages";
import { Stage } from "@/components/ui/Stage";

/** A statement on its own stage; with an image, text on one side and the render in a rounded well on the other. */
export function FeatureBlock({ block }: { block: Extract<PageBlock, { type: "feature" }> }) {
  const { image } = block;
  return (
    <Stage variant={block.tone ?? "sunken"} className="p-6 sm:p-10 lg:p-14">
      <div data-reveal="" className={image ? "grid items-center gap-8 lg:grid-cols-2 lg:gap-10" : "flex flex-col gap-6"}>
        <div className="flex flex-col items-start gap-6">
          <h2 className="max-w-heading text-h2">{block.heading}</h2>
          <p className="max-w-lead-wide text-lead text-tone-ink-2">{block.text}</p>
        </div>
        {image && (
          <div className="overflow-hidden rounded-tile bg-tone-sunken">
            <picture className="contents">
              <source type="image/avif" srcSet={image.src.replace(/\.webp$/, ".avif")} />
              <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" className="size-full object-cover" />
            </picture>
          </div>
        )}
      </div>
    </Stage>
  );
}
