import type { ProjectItem } from "@/content";
import { projectsSection as projects } from "@/content";
import { Button } from "./Button";
import { CardImage } from "./Card";
import { Chip } from "./Chip";

/** A 4:3 image (3:4 from 48rem) with the caption on a glass strip at the bottom: place name, city and system-size chips, a text link. */
export function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <article className="group lift relative isolate aspect-4/3 overflow-hidden md:aspect-3/4 rounded-card">
      <CardImage alt={project.alt} className="absolute inset-0 -z-10 rounded-none" />
      <div className="glass absolute inset-x-2 bottom-2 flex flex-col items-start gap-3 rounded-tile p-4">
        <h3 className="text-title">{project.place}</h3>
        <div className="flex flex-wrap gap-2">
          <Chip>{project.city}</Chip>
          <Chip>{project.size}</Chip>
        </div>
        <Button href={project.href} variant="text">
          {projects.see}
        </Button>
      </div>
    </article>
  );
}
