import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ui } from "@/content";
import { breadcrumbLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { icon } from "@/components/ui/icons";

export type Crumb = [label: string, path: string];

/** Visible trail plus its BreadcrumbList JSON-LD. The last crumb is the current page and is not a link. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label={ui.breadcrumb.label}>
      <ol className="flex flex-wrap items-center gap-x-2 text-small text-ink-2">
        {[[ui.breadcrumb.home, "/"] as Crumb, ...trail].map(([label, path], i, all) => (
          <li key={path} className="flex items-center gap-2">
            {i < all.length - 1 ? (
              <Link href={path} className="focus-ring hit-area rounded-input hover:text-ink">
                {label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {label}
              </span>
            )}
            {i < all.length - 1 && <ChevronRight {...icon} size={16} aria-hidden />}
          </li>
        ))}
      </ol>
      <JsonLd data={breadcrumbLd(trail)} />
    </nav>
  );
}
