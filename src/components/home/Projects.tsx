import type { CSSProperties } from "react";
import { projectsSection as projects, awaiting } from "@/content";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { cn } from "@/lib/cn";
import { hasUnconfirmed, shownList } from "@/lib/facts";

/**
 * Heading and link on one row, then an asymmetric grid: the first project is the large tile (two rows tall from 64rem),
 * the rest stack beside it. Unconfirmed projects leave the section out of a production build.
 */
export function Projects() {
  const items = shownList(projects.items);
  if (items.length === 0) return null;
  return (
    <section id="projects" className="page-width mb-section flex flex-col gap-12">
      <div data-reveal="" className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col items-start gap-6">
          {hasUnconfirmed(items) && <Chip>{awaiting}</Chip>}
          <h2 className="max-w-heading text-h2">{projects.title}</h2>
          <p className="max-w-lead text-lead text-tone-ink-2">{projects.lead}</p>
        </div>
        <Button href={projects.allHref} variant="text">
          {projects.all}
        </Button>
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
