import { closing, nav, outlets } from "@/content";
import { Button } from "@/components/ui/Button";
import { Stage } from "@/components/ui/Stage";
import { show } from "@/lib/facts";
import { telHref } from "@/lib/links";

/**
 * A full-width sunken stage, no image: heading and line on the left, quote and call buttons on the right (stacked on
 * phones). The lime quote button is the only primary action on this screen; the call button is dark, because the
 * quiet variant sits on the same ground as the stage.
 */
export function ClosingCall() {
  const phone = show(outlets[0].phones)?.[0];
  return (
    <div className="mb-section">
      <Stage className="p-6 sm:p-10 lg:p-14">
        <div data-reveal="" className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="flex max-w-xl flex-col items-start gap-6">
            <h2 className="text-h2">{closing.title}</h2>
            <p className="text-lead text-tone-ink-2">{closing.body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={nav.quote.href}>{closing.quote}</Button>
            {phone && (
              <Button variant="dark" href={telHref(phone)}>
                {closing.call}
              </Button>
            )}
          </div>
        </div>
      </Stage>
    </div>
  );
}
