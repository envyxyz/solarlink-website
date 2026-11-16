import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** h2 on the left (max 14ch), a lead paragraph or a text link on the right. No label above it. */
export function SectionHeading({
  title,
  lead,
  action,
  className,
}: {
  title: string;
  lead?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-12", className)}>
      <h2 className="max-w-heading text-h2">{title}</h2>
      {lead && <p className="max-w-prose text-lead text-tone-ink-2 md:max-w-lg">{lead}</p>}
      {action}
    </div>
  );
}
