import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * `--surface` on the ground, tone step only: no border, no shadow at rest.
 * 8px of padding so the image tile's radius is concentric (card radius minus padding).
 */
export function Card({ interactive, className, children }: { interactive?: boolean; className?: string; children: ReactNode }) {
  return <div className={cn("group rounded-card bg-tone-surface p-2 text-tone-ink", interactive && "lift", className)}>{children}</div>;
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
      {src && <Image src={src} alt={alt} width={width} height={height} className="zoom-on-hover size-full object-cover" />}
    </div>
  );
}

export function CardBody({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("flex flex-col gap-2 p-4", className)}>{children}</div>;
}
