import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * `ink`: the dark card among light ones (night tones, so its content switches ground).
 * `--surface` on the ground, tone step only: no border, no shadow at rest.
 * 8px of padding so the image tile's radius is concentric (card radius minus padding).
 */
export function Card({ interactive, ink, className, children }: { interactive?: boolean; ink?: boolean; className?: string; children: ReactNode }) {
  return <div className={cn("group rounded-card p-2 text-tone-ink", ink ? "night bg-night" : "bg-tone-surface", interactive && "lift", className)}>{children}</div>;
}

/** Image tile on the sunken tone; the image zooms to 1.04 when the card is hovered. Without a src it is an empty well (image pending). */
export function CardImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  src?: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-tile bg-tone-sunken", className)}>
      {typeof src === "string" ? (
        // Pre-sized files from scripts/images.mjs: the AVIF twin sits beside the WebP.
        <picture className="contents">
          <source type="image/avif" srcSet={src.replace(/\.webp$/, ".avif")} />
          <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" className="zoom-on-hover size-full object-cover" />
        </picture>
      ) : (
        src && <Image src={src} alt={alt} width={width} height={height} className="zoom-on-hover size-full object-cover" />
      )}
    </div>
  );
}

export function CardBody({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("flex flex-col gap-2 p-4", className)}>{children}</div>;
}
