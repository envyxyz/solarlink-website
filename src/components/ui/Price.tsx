import { priceMode, ui, type PriceMode } from "@/content/ui";
import { cn } from "@/lib/cn";

const NBSP = " ";

/** The one price formatter: `Rs 45,000`, no decimals, non-breaking space. */
export function formatPrice(amount: number): string {
  return `${ui.price.currency}${NBSP}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(amount))}`;
}

/** `show` prints the amount, `ask` prints the ask-for-rate line, `hidden` prints nothing. Defaults to the site mode. */
export function Price({ amount, mode = priceMode, className }: { amount?: number; mode?: PriceMode; className?: string }) {
  if (mode === "hidden") return null;
  if (mode === "ask" || amount === undefined) return <span className={cn("text-small text-tone-ink-2", className)}>{ui.price.ask}</span>;
  return <span className={cn("text-title tabular", className)}>{formatPrice(amount)}</span>;
}
