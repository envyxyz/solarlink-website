import { closing, hero, nav, outlets } from "@/content";
import { Button } from "@/components/ui/Button";
import { Stage } from "@/components/ui/Stage";
import { show } from "@/lib/facts";
import { telHref } from "@/lib/links";

/** An image stage with one glass card. The lime quote button is the only primary action on this screen. */
export function ClosingCall() {
  const phone = show(outlets[0].phones)?.[0];
  return (
    <div className="mb-gutter">
      <Stage variant="image" image={{ ...closing.image, alt: hero.imageAlt }} className="flex min-h-120 items-end p-4 sm:p-10 lg:min-h-160 lg:p-14">
        <div data-reveal="" className="glass flex max-w-xl flex-col items-start gap-6 rounded-card p-6 sm:p-10">
          <h2 className="text-h2">{closing.title}</h2>
          <p className="text-lead text-ink-2">{closing.body}</p>
          <div className="flex flex-wrap gap-3">
            <Button href={nav.quote.href}>{closing.quote}</Button>
            {phone && (
              <Button variant="quiet" href={telHref(phone)}>
                {closing.call}
              </Button>
            )}
          </div>
        </div>
      </Stage>
    </div>
  );
}
