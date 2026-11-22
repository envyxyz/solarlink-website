import type { OutletSlug } from "@/content";
import { nav, ui } from "@/content";

import type { Ev } from "@/lib/analytics";
import { outletWhatsApp } from "@/lib/links";
import { Button, IconButton, type ButtonVariant } from "./Button";
import { WhatsAppGlyph } from "./WhatsAppGlyph";

export { WhatsAppGlyph };

/**
 * Routes to the chosen outlet's WhatsApp number from content (Lahore by default) with a prefilled message.
 * While that number is not shown (unconfirmed, production), nothing says WhatsApp: the pill becomes the quote
 * button with its own label and the icon-only form is left out.
 */
export function WhatsAppButton({
  outlet = "lahore",
  message,
  variant = "primary",
  size,
  iconOnly,
  loading,
  place = "header",
  children,
}: {
  outlet?: OutletSlug;
  message?: string;
  variant?: ButtonVariant;
  size?: "md" | "lg";
  /** Round 44px button with just the glyph. */
  iconOnly?: boolean;
  loading?: boolean;
  place?: "header" | "dock" | "card" | "tool" | "quote";
  children?: string;
}) {
  const ev: Ev = ["whatsapp_click", { outlet, place }];
  const href = outletWhatsApp(outlet, message);
  if (!href) {
    return iconOnly ? null : (
      <Button variant={variant} size={size} href={nav.quote.href} loading={loading}>
        {nav.quote.label}
      </Button>
    );
  }
  if (iconOnly) {
    return (
      <IconButton variant={variant} label={children ?? ui.whatsapp.openLabel} href={href} loading={loading} ev={ev}>
        <WhatsAppGlyph />
      </IconButton>
    );
  }
  return (
    <Button variant={variant} size={size} href={href} loading={loading} ev={ev}>
      <WhatsAppGlyph />
      {children ?? ui.whatsapp.label}
    </Button>
  );
}
