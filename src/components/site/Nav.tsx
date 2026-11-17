import type { CSSProperties } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { images } from "@/content/images";
import { nav } from "@/content/nav";
import { MenuButton } from "./NavMenu";
import { NavShrink } from "./NavShrink";

const PANEL_ID = "nav-panel";
const panelLink = "focus-ring flex min-h-control items-center rounded-tile px-4 text-control hover:bg-sunken";
const link = "focus-ring dur-fast inline-flex min-h-control items-center rounded-pill px-4 text-control transition-colors hover:bg-sunken";

/**
 * Floating glass pill: wordmark, five links, one primary button. After 80px of scroll it springs narrower into an island and the wordmark becomes the S emblem.
 * Under 64rem the links live in a panel the pill grows into (disclosure, not a modal). Server component; MenuButton and NavShrink are the client leaves.
 */
export function Nav() {
  return (
    <header>
      <nav
        data-nav
        aria-label={nav.mainLabel}
        className="glass nav-width nav-morph data-small:nav-island fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-nav"
      >
        <div data-row className="flex items-center justify-between gap-4 py-2 pl-5 pr-2">
        <div data-fit className="flex flex-1">
          <Link href="/" aria-label={nav.homeLabel} className="group press hit-area relative flex items-center rounded-pill py-2 focus-visible:outline-none">
            <picture className="focus-ring-group block rounded-pill transition-opacity dur-island ease-soft in-data-small:opacity-0">
              <source media="(prefers-color-scheme: dark)" type="image/webp" srcSet="/images/brand/logo-dark.webp" />
              <source media="(prefers-color-scheme: dark)" srcSet="/images/brand/logo-dark.png" />
              <source type="image/webp" srcSet="/images/brand/logo.webp" />
              <img src="/images/brand/logo.png" width={images.logo.width} height={images.logo.height} alt="" draggable={false} className="absolute left-0 top-1/2 h-3.5 w-auto max-w-none -translate-y-1/2 select-none sm:h-5" />
            </picture>
            <picture className="focus-ring-group block rounded-pill opacity-0 transition-opacity dur-island ease-soft in-data-small:opacity-100">
              <source media="(prefers-color-scheme: dark)" type="image/webp" srcSet="/images/brand/emblem-dark.webp" />
              <source media="(prefers-color-scheme: dark)" srcSet="/images/brand/emblem-dark.png" />
              <source type="image/webp" srcSet="/images/brand/emblem.webp" />
              <img src="/images/brand/emblem.png" width={images.emblem.width} height={images.emblem.height} alt="" draggable={false} className="h-7 w-auto select-none" />
            </picture>
          </Link>
        </div>
        <ul className="hidden gap-1 lg:flex">
          {nav.main.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={link}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div data-fit className="flex flex-1 items-center justify-end gap-2">
          <Button variant="dark" href={nav.quote.href} className="max-sm:hidden">
            {nav.quote.label}
          </Button>
          <MenuButton controls={PANEL_ID} />
        </div>
        </div>
        <div id={PANEL_ID} className="nav-panel lg:hidden">
          <div className="min-h-0 overflow-hidden">
            <ul className="nav-panel-max overflow-y-auto px-2 pb-2">
              {[...nav.main, ...nav.sheetExtra].map((l, i) => (
                <li key={l.href} className="nav-item flex items-center gap-2" style={{ "--i": i } as CSSProperties}>
                  {i === 0 && (
                    <Button href={nav.quote.href} className="order-2 sm:hidden">
                      {nav.quote.label}
                    </Button>
                  )}
                  <Link href={l.href} className={`${panelLink} min-w-0 flex-1`}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <NavShrink />
    </header>
  );
}
