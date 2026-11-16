import type { CSSProperties } from "react";
import { googleReviewsUrl, reviewsSection as reviews, type ReviewItem } from "@/content";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { show } from "@/lib/facts";

/**
 * Three cards in a row, the middle one on ink. Renders only with at least three reviews that have text, name and
 * date; the homepage passes the shown content reviews, which are none yet. The link to Google appears once its URL is confirmed.
 */
export function Reviews({ items, googleUrl = show(googleReviewsUrl) }: { items: ReviewItem[]; googleUrl?: string | null }) {
  const usable = items.filter((r) => r.text && r.name && r.date);
  if (usable.length < reviews.minimum) return null;
  return (
    <section id="reviews" className="page-width mb-section flex flex-col gap-12">
      <div data-reveal="">
        <SectionHeading
          title={reviews.title}
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
        {usable.slice(0, reviews.minimum).map((r, i) => (
          <li key={r.name + r.date} data-reveal="" style={{ "--i": i + 1 } as CSSProperties}>
            <Card ink={i === 1} className="h-full">
              <CardBody className="h-full justify-between gap-8 p-6">
                <blockquote className="text-lead">{r.text}</blockquote>
                <footer className="flex flex-col gap-1">
                  <p className="text-title">{r.name}</p>
                  <p className="flex flex-wrap gap-x-4 text-small text-tone-ink-2">
                    <span>{r.date}</span>
                    <span>{r.outlet}</span>
                  </p>
                </footer>
              </CardBody>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
