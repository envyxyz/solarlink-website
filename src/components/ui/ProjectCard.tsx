import Link from "next/link";
import type { ProjectItem } from "@/content";
import { projectsSection as projects } from "@/content";
import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { CardImage } from "./Card";

/**
 * Image-led tile. The photo fills the card; one glass caption sits on its lower edge with the place and city on the left
 * and the system size as the figure on the right. The whole card is the link (stretched). `featured` is the large tile:
 * 4:3 on phones, 16:10 on tablets and the full height of its two-row slot from 64rem, with a larger figure.
 */
export function ProjectCard({ project, featured }: { project: ProjectItem; featured?: boolean }) {
  return (
    <article
      className={cn(
        "group lift card-focus relative isolate h-full overflow-hidden rounded-card",
        featured ? "aspect-4/3 md:aspect-16/10 lg:aspect-auto" : "aspect-4/3 lg:aspect-16/10",
      )}
    >
      <CardImage {...project.image} alt={project.alt} className="absolute inset-0 -z-10 rounded-none" />
      <div className="glass absolute inset-x-2 bottom-2 flex items-end justify-between gap-4 rounded-tile p-4 lg:inset-x-3 lg:bottom-3 lg:p-5">
        <div className="flex min-w-0 flex-col items-start gap-1">
          <h3 className={featured ? "text-title lg:text-h3" : "text-title"}>
            {featured ? (
              project.place
            ) : (
              <Link href={project.href} className="stretched focus-ring rounded-input">
                {project.place}
              </Link>
            )}
          </h3>
          <p className="text-small text-ink-2">{project.line}</p>
          {featured && (
            <Button href={project.href} variant="text" className="stretched">
              {projects.see}
            </Button>
          )}
        </div>
        <p className="shrink-0 text-right">
          <span className={cn("block", featured ? "text-h3 lg:text-figure-compact" : "text-h3")}>{project.kw}</span>
          <span className="text-small text-ink-2">{project.mode}</span>
        </p>
      </div>
    </article>
  );
}
