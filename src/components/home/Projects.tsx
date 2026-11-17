import type { CSSProperties } from "react";
import { projectsSection as projects, awaiting } from "@/content";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { cn } from "@/lib/cn";
import { hasUnconfirmed, shownList } from "@/lib/facts";

/**
 * Heading and link on one row, then one horizontal scroll-snap row of equal-height cards that runs to the window edges
 * (about 1.15 cards on phones, 2.5 from 64rem); the first project is the featured, wider card. Unconfirmed projects leave the section out of a production build.
 */
export function Projects() {
  const items = shownList(projects.items);
  if (items.length === 0) return null;
  return (
    <section id="projects" className="mb-section flex flex-col gap-12">
      <div data-reveal="" className="page-width flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col items-start gap-6">
          {hasUnconfirmed(items) && <Chip>{awaiting}</Chip>}
          <h2 className="max-w-heading text-h2">{projects.title}</h2>
          <p className="max-w-lead text-lead text-tone-ink-2">{projects.lead}</p>
        </div>
        <Button href={projects.allHref} variant="text">
          {projects.all}
        </Button>
      </div>
      <ul aria-label={projects.title} className="snap-row -my-4 gap-4 py-4">
        {items.map((p, i) => (
          <li
            key={p.slug}
            data-reveal=""
            style={{ "--i": Math.min(i + 1, 4) } as CSSProperties}
            className={cn("row-slide", i === 0 && "row-slide-wide")}
          >
            <ProjectCard project={p} featured={i === 0} />
          </li>
        ))}
      </ul>
    </section>
  );
}
