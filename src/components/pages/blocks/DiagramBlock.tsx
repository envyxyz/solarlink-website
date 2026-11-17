import type { PageBlock } from "@/content/pages";
import { LinkDiagram } from "@/components/home/LinkDiagram";

/** Body only: the template draws the heading and the sunken stage. */
export function DiagramBlock({ block }: { block: Extract<PageBlock, { type: "diagram" }> }) {
  return (
    <div className="flex flex-col gap-8">
      {block.lead && <p className="max-w-lead-wide text-lead text-tone-ink-2">{block.lead}</p>}
      <LinkDiagram initial={block.mode} />
    </div>
  );
}
