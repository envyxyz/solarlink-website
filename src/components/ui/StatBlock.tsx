import type { Fact } from "@/content";
import { ui } from "@/content/ui";
import { show } from "@/lib/facts";
import { cn } from "@/lib/cn";

/**
 * A big number with a one-line label. The stat is a Fact, so its source travels with it;
 * an unconfirmed stat renders as a neutral dash in production builds.
 */
export function StatBlock({ stat, label, className }: { stat: Fact<string | number>; label: string; className?: string }) {
  const value = show(stat);
  return (
    <div className={cn("flex flex-col gap-2", className)} title={stat.source}>
      <span className="text-figure tabular">{value ?? ui.dash}</span>
      <span className="text-small text-tone-ink-2">{label}</span>
    </div>
  );
}
