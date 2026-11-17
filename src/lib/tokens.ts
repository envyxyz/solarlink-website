/** Reads a duration token (`--dur-fast`, `--dur-draw`...) from the page as milliseconds, so script and CSS share one value. Client only. */
export function tokenMs(name: string): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return raw.endsWith("ms") ? parseFloat(raw) : parseFloat(raw) * 1000;
}

/** Reads an easing token (`--ease-out`) from the page. Client only. */
export const tokenEase = (name: string): string => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
