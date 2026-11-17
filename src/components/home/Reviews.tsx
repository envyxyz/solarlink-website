import type { CSSProperties } from "react";
import { awaiting, googleReviewsUrl, reviewsSection as reviews, type ReviewItem } from "@/content";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { hasUnconfirmed, show } from "@/lib/facts";

/**
 * Three quote cards in a row, the middle one on ink. Renders only with at least three reviews that have text and a
 * name; the homepage passes the shown content reviews, which are none in a production build. Unconfirmed quotes
 * carry the "Awaiting client" chip in preview builds. No rating, count or JSON-LD. The link to Google appears once its URL is confirmed.
 */
export function Reviews({ items, googleUrl = show(googleReviewsUrl) }: { items: ReviewItem[]; googleUrl?: string | null }) {
  const usable = items.filter((r) => r.text && r.name);
  if (usable.length < reviews.minimum) return null;
  return (
    <section id="reviews" className="page-width mb-section flex flex-col gap-12">
      <div data-reveal="">
        <SectionHeading
          title={reviews.title}
          above={hasUnconfirmed(usable) ? <Chip>{awaiting}</Chip> : undefined}
          action={
            googleUrl ? (
              <Button href={googleUrl} variant="text">
                {reviews.link}
              </Button>
            ) : undefined
          }
        />
      </div>
      <ul className="grid gap-4 lg:grid-cols-3">
        {usable.slice(0, reviews.minimum).map((r, i) => {
          const ink = i === 1;
          const meta = [r.place, r.date, r.outlet].filter(Boolean);
          return (
            <li key={`${r.name}-${i}`} data-reveal="" style={{ "--i": i + 1 } as CSSProperties}>
              <Card ink={ink} className="h-full">
                <CardBody className="h-full justify-between gap-8 p-6">
                  <div className="flex flex-col gap-4">
                    <span aria-hidden="true" className={cn("text-figure", ink ? "text-lime" : "text-ink-3")}>
                      {reviews.mark}
                    </span>
                    <blockquote className="text-lead">{r.text}</blockquote>
                  </div>
                  <footer className="flex flex-col gap-1">
                    <p className="text-title">{r.name}</p>
                    {meta.length > 0 && (
                      <p className="flex flex-wrap gap-x-4 text-small text-tone-ink-2">
                        {meta.map((m) => (
                          <span key={m}>{m}</span>
                        ))}
                      </p>
                    )}
                  </footer>
                </CardBody>
              </Card>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
