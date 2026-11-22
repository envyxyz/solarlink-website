import { ToolIsland } from "@/components/tools/ToolIsland";
import { toolConfig } from "@/components/tools/toolConfig";
import { Button } from "@/components/ui/Button";
import { toolsContent } from "@/content/tools";
import type { PageBlock } from "@/content/pages";

const { awaiting } = toolsContent;

/**
 * Body only: the template draws the heading and the sunken stage. The bill and net billing tools have no island yet:
 * their tariff data (src/data/tariffs.ts) is unverified, so they show the awaiting state and no number.
 * TODO(tariff-research): when billReady() / netBillingReady() turn true, build the calculator and render it here.
 */
export function ToolBlock({ block }: { block: Extract<PageBlock, { type: "tool" }> }) {
  const lead = block.lead && <p className="max-w-lead text-lead text-tone-ink-2">{block.lead}</p>;
  if (block.tool === "bill" || block.tool === "net-billing") {
    return (
      <div className="flex flex-col gap-8">
        {lead}
        <div className="flex max-w-prose flex-col items-start gap-4 rounded-card bg-tone-surface p-6 text-tone-ink">
          <h3 className="text-title">{awaiting.title}</h3>
          <p className="text-body text-tone-ink-2">{awaiting.text}</p>
          <p className="text-body">{awaiting.next}</p>
          <Button href={awaiting.href}>{awaiting.cta}</Button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-8">
      {lead}
      <ToolIsland tool={block.tool} config={toolConfig()} />
    </div>
  );
}
