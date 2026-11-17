import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * h2 on the left (max 14ch), a lead paragraph or a text link on the right. No label above it; `above` is for a status
 * chip only. The row spans its container; a link sits at the right edge on the title's last baseline.
 */
export function SectionHeading({
  title,
  lead,
  action,
  above,
  className,
}: {
  title: string;
  lead?: string;
  action?: ReactNode;
  above?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-start gap-6 md:flex-row md:justify-between md:gap-12",
        action && !lead ? "md:items-baseline-last" : "md:items-start",
        className,
      )}
    >
      <div className="flex flex-col items-start gap-4">
        {above}
        <h2 className="max-w-heading text-h2">{title}</h2>
      </div>
      {lead && <p className="max-w-prose text-lead text-tone-ink-2 md:max-w-lg">{lead}</p>}
      {action}
    </div>
  );
}
