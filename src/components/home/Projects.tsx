import type { CSSProperties } from "react";
import { projectsSection as projects, ui } from "@/content";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { hasUnconfirmed, shownList } from "@/lib/facts";

/** Heading block left (from 1440), three tall cards right. Unconfirmed projects leave the section out of a production build. */
export function Projects() {
  const items = shownList(projects.items);
  if (items.length === 0) return null;
  return (
    <section id="projects" className="page-width mb-section grid gap-12 2xl:grid-cols-4 2xl:gap-16">
      <div data-reveal="" className="flex flex-col items-start gap-6">
        {hasUnconfirmed(items) && <Chip>{ui.awaiting}</Chip>}
        <h2 className="max-w-heading text-h2">{projects.title}</h2>
        <p className="max-w-lead text-lead text-tone-ink-2">{projects.lead}</p>
        <Button href={projects.allHref} variant="text">
          {projects.all}
        </Button>
      </div>
      <ul className="grid gap-4 lg:grid-cols-3 2xl:col-span-3">
        {items.map((p, i) => (
          <li key={p.slug} data-reveal="" style={{ "--i": i + 1 } as CSSProperties}>
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
