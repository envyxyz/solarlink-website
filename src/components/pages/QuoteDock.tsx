"use client";

import { useEffect, useState } from "react";
import { Button, IconButton } from "@/components/ui/Button";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";

// Built in two parts: the lint rule reads a bracket pair in a string as a Tailwind arbitrary value.
const attr = (name: string) => "[" + name + "]";

/**
 * A glass pill fixed bottom-centre: the page title, the quote button and, when the Lahore number is shown, a WhatsApp
 * button. It rises in once the hero (data-page-hero) has left the view and steps aside while anything marked
 * data-dock-hide (the closing call) or the footer is on screen. Hidden, it is inert and out of the tab order.
 */
export function QuoteDock({
  label,
  title,
  quote,
  whatsapp,
}: {
  label: string;
  title: string;
  quote: { label: string; href: string };
  whatsapp: { label: string; href: string } | null;
}) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(attr("data-page-hero"));
    const hide = document.querySelectorAll(`${attr("data-dock-hide")}, footer`);
    const covering = new Set<Element>();
    let heroSeen = hero !== null;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) heroSeen = e.isIntersecting;
        else if (e.isIntersecting) covering.add(e.target);
        else covering.delete(e.target);
      }
      setShown(!heroSeen && covering.size === 0);
    });
    if (hero) io.observe(hero);
    hide.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div role="group" aria-label={label} inert={!shown} className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-gutter dock-safe">
      <div data-shown={shown ? "" : undefined} className="quote-dock glass flex max-w-full items-center gap-3 rounded-pill p-2 pl-4 text-ink md:pl-6">
        <p className="hidden max-w-xs truncate text-small md:block">{title}</p>
        <Button href={quote.href}>{quote.label}</Button>
        {whatsapp && (
          <IconButton variant="dark" label={whatsapp.label} href={whatsapp.href}>
            <WhatsAppGlyph />
          </IconButton>
        )}
      </div>
    </div>
  );
}
