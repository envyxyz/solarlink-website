import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { about, aboutStats, footer, outlets } from "@/content";
import { Button } from "@/components/ui/Button";
import { icon } from "@/components/ui/icons";
import { StatBlock } from "@/components/ui/StatBlock";
import { show } from "@/lib/facts";

/**
 * Text left, numbers right. Only confirmed stats show as numbers; with fewer than two, the right side
 * names the three shops instead (city and area, each linking to its outlet page).
 */
export function About() {
  const stats = aboutStats.filter((s) => s.stat.confirmed);
  return (
    <section id="about" className="page-width mb-section mt-section grid gap-12 lg:grid-cols-2 lg:gap-24">
      <div data-reveal="" className="flex flex-col items-start gap-6">
        <h2 className="max-w-heading text-h2">{about.title}</h2>
        <p className="max-w-prose text-lead text-tone-ink-2">{about.lead}</p>
        <Button href={about.ctaHref} variant="text">
          {about.cta}
        </Button>
      </div>
      <div data-reveal="" style={{ "--i": 1 } as CSSProperties}>
        {stats.length >= 2 ? (
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
            {stats.map((s) => (
              <StatBlock key={s.label} stat={s.stat} label={s.label} />
            ))}
          </div>
        ) : (
          <ul aria-label={footer.outletsTitle}>
            {outlets.map((o) => (
              <li key={o.slug} className="border-t border-line first:border-t-0">
                <Link href={o.path} className="focus-ring group flex items-center justify-between gap-6 rounded-input py-6">
                  <span className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                    <span className="text-figure">{o.city}</span>
                    <span className="text-small text-tone-ink-2">{show(o.area)}</span>
                  </span>
                  <ArrowRight {...icon} size={24} className="dur shrink-0 transition-transform ease-out group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
