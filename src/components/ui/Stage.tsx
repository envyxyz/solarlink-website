import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type StageImage = { src: string | StaticImageData; alt: string; width: number; height: number; priority?: boolean };

/**
 * The page's recurring shape: a rounded panel inset by the gutter, never a full-bleed rectangle.
 * `night` re-points the tone tokens, so children (Card, Chip, Field...) switch ground automatically.
 */
export function Stage({
  variant = "sunken",
  image,
  as: Tag = "section",
  nested,
  className,
  children,
}: {
  variant?: "image" | "night" | "sunken";
  image?: StageImage;
  as?: "section" | "div" | "footer" | "aside";
  /** Already inside a page container: skip the gutter wrapper. */
  nested?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  const panel = (
      <Tag
        className={cn(
          "relative isolate overflow-hidden rounded-stage",
          variant === "night" && "night bg-night",
          variant === "sunken" && "bg-sunken",
          variant === "image" && "bg-sunken",
          className,
        )}
      >
        {variant === "image" && image && (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority={image.priority}
            className="absolute inset-0 -z-10 size-full object-cover"
          />
        )}
        {children}
      </Tag>
  );
  return nested ? panel : <div className="mx-auto w-full max-w-page px-gutter">{panel}</div>;
}
