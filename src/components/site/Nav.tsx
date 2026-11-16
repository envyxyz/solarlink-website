import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { images } from "@/content/images";
import { nav } from "@/content/nav";
import { MenuSheet } from "./MenuSheet";
import { NavShrink } from "./NavShrink";

const link = "focus-ring dur-fast inline-flex min-h-control items-center rounded-pill px-4 text-control transition-colors hover:bg-sunken";

/**
 * Floating glass pill: wordmark, five links, one primary button. Shrinks slightly after 80px of scroll.
 * Under 64rem the links move into a native dialog sheet. Server component; MenuSheet and NavShrink are the client leaves.
 */
export function Nav({ brand }: { brand: string }) {
  return (
    <header>
      <nav
        data-nav
        aria-label={nav.mainLabel}
        className="glass nav-width fixed left-1/2 top-6 z-50 flex origin-top -translate-x-1/2 items-center justify-between gap-4 rounded-pill py-2 pl-5 pr-2 transition-transform dur ease-out data-small:scale-97"
      >
        <Link href="/" aria-label={nav.homeLabel} className="focus-ring press hit-area flex items-center rounded-pill py-2">
          <picture>
            <source type="image/webp" srcSet="/images/brand/logo.webp" />
            <img src="/images/brand/logo.png" width={images.logo.width} height={images.logo.height} alt={brand} draggable={false} className="h-3.5 w-auto select-none sm:h-5" />
          </picture>
        </Link>
        <ul className="hidden gap-1 lg:flex">
          {nav.main.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={link}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Button variant="dark" href={nav.quote.href}>
            <span className="hidden sm:inline">{nav.quote.label}</span>
            <span className="sm:hidden">{nav.quote.labelShort}</span>
          </Button>
          <MenuSheet />
        </div>
      </nav>
      <NavShrink />
    </header>
  );
}
