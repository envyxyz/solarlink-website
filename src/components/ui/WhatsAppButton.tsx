import type { OutletSlug } from "@/content";
import { ui } from "@/content/ui";

import { outletWhatsApp } from "@/lib/links";
import { Button, IconButton, type ButtonVariant } from "./Button";
import { WhatsAppGlyph } from "./WhatsAppGlyph";

export { WhatsAppGlyph };

/**
 * Routes to the chosen outlet's WhatsApp number from content (Lahore by default) with a prefilled
 * message. If the number is not confirmed for production, the link falls back to the quote page.
 */
export function WhatsAppButton({
  outlet = "lahore",
  message,
  variant = "primary",
  size,
  iconOnly,
  loading,
  children,
}: {
  outlet?: OutletSlug;
  message?: string;
  variant?: ButtonVariant;
  size?: "md" | "lg";
  /** Round 44px button with just the glyph. */
  iconOnly?: boolean;
  loading?: boolean;
  children?: string;
}) {
  const href = outletWhatsApp(outlet, message);
  if (iconOnly) {
    return (
      <IconButton variant={variant} label={children ?? ui.whatsapp.openLabel} href={href} loading={loading}>
        <WhatsAppGlyph />
      </IconButton>
    );
  }
  return (
    <Button variant={variant} size={size} href={href} loading={loading}>
      <WhatsAppGlyph />
      {children ?? ui.whatsapp.label}
    </Button>
  );
}
