import type { CSSProperties } from "react";
import { awaiting, projectsSection } from "@/content";
import type { PageBlock } from "@/content/pages";
import { Chip } from "@/components/ui/Chip";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { cn } from "@/lib/cn";
import { hasUnconfirmed, shownList } from "@/lib/facts";

/** Project grid on the page ground, first tile featured. Unconfirmed, so production renders nothing. */
export function ProjectsBlock({ block }: { block: Extract<PageBlock, { type: "projects" }> }) {
  const items = shownList(projectsSection.items);
  if (items.length === 0) return null;
  return (
    <section className="page-width flex flex-col gap-8 lg:gap-10">
      <div data-reveal="" className="flex flex-col items-start gap-6">
        {hasUnconfirmed(items) && <Chip>{awaiting}</Chip>}
        <h2 className="max-w-heading text-h2">{block.heading}</h2>
        {block.lead && <p className="max-w-lead text-lead text-tone-ink-2">{block.lead}</p>}
      </div>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
        {items.map((p, i) => (
          <li
            key={p.slug}
            data-reveal=""
            style={{ "--i": i + 1 } as CSSProperties}
            className={cn(i === 0 ? "md:col-span-2 lg:col-span-7 lg:row-span-2" : "lg:col-span-5")}
          >
            <ProjectCard project={p} featured={i === 0} />
          </li>
        ))}
      </ul>
    </section>
  );
}
