/** Phone helpers with no content import, so client components can use them. */
const digits = (display: string) => display.replace(/\D/g, "").replace(/^0/, "");

/** `0321-8425777` -> `tel:+92321...`. Generated from content, never typed by hand. */
export const telHref = (display: string) => `tel:+92${digits(display)}`;

/** `https://wa.me/92...?text=...`. */
export const waHref = (display: string, text: string) =>
  `https://wa.me/92${digits(display)}?text=${encodeURIComponent(text)}`;
