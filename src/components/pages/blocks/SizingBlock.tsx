import type { PageBlock } from "@/content/pages";
import { SizingCard } from "@/components/home/SizingCard";
import { SizingProvider } from "@/components/home/SizingProvider";
import { sizingConfig } from "@/components/home/sizingConfig";

/** A solid card that fits a stage, in place of the home hero's glass slot. */
const slot = "max-w-xl rounded-card bg-tone-surface p-4 max-sm:-mx-4 sm:w-full sm:p-6";

/** Body only: the template draws the heading and the sunken stage. */
export function SizingBlock({ block }: { block: Extract<PageBlock, { type: "sizing" }> }) {
  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10">
      <p className="max-w-lead text-lead text-tone-ink-2">{block.lead}</p>
      <SizingProvider config={sizingConfig()}>
        <SizingCard slot={slot} />
      </SizingProvider>
    </div>
  );
}
