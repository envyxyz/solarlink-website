import { images } from "@/content/images";

/** The hero render at every width in src/content/images.ts, as srcset strings for the AVIF and WebP twins. */
const widths = Object.keys(images.hero).map(Number);
export const heroWidest = Math.max(...widths);
/** The widest render's own width and height (the file the img falls back to). */
export const heroFull = (images.hero as Record<number, { width: number; height: number }>)[heroWidest];
export const heroSrc = (w: number, ext: "avif" | "webp") => `/images/hero-${w}.${ext}`;
export const heroSrcSet = (ext: "avif" | "webp") => widths.map((w) => `${heroSrc(w, ext)} ${w}w`).join(", ");

/**
 * From 40rem the picture is wide on screen and takes the widest file; a phone shows a window onto it and takes the
 * 768 file even on a dense screen. So the declared phone size is half the 768, not what the image box measures.
 */
export const heroSizes = `(min-width: 40rem) ${heroWidest}px, ${Math.min(...widths) / 2}px`;
