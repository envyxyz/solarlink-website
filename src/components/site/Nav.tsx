"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import dynamic from "next/dynamic";
import { Button, IconButton } from "@/components/ui/Button";
import { icon } from "@/components/ui/icons";
import { nav } from "@/content/nav";
import { cn } from "@/lib/cn";

// The sheet (Radix Dialog and scroll lock) loads on the first tap of the menu button, not with the page.
const NavSheet = dynamic(() => import("./NavSheet").then((m) => m.NavSheet));

const SHRINK_AFTER = 80;

function subscribe(cb: () => void) {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
}
const scrolled = () => window.scrollY > SHRINK_AFTER;

const link = "focus-ring dur-fast inline-flex min-h-control items-center rounded-pill px-4 text-control transition-colors hover:bg-sunken";

/**
 * Floating glass pill: wordmark, five links, one primary button. Shrinks slightly after 80px of scroll.
 * Under 64rem the links move into a sheet (Radix Dialog: focus trap, Escape closes, scroll lock).
 */
export function Nav({ brand }: { brand: string }) {
  const small = useSyncExternalStore(subscribe, scrolled, () => false);
  const [open, setOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const menuButton = useRef<HTMLSpanElement>(null);
  return (
    <header>
      <nav
        aria-label={nav.mainLabel}
        className={cn(
          "glass nav-width fixed left-1/2 top-6 z-50 flex origin-top -translate-x-1/2 items-center justify-between gap-4 rounded-pill py-2 pl-5 pr-2 transition-transform dur ease-out",
          small && "scale-97",
        )}
      >
        <Link href="/" aria-label={nav.homeLabel} className="focus-ring press rounded-pill py-2 text-title">
          {brand}
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
          <Button href={nav.quote.href}>
            <span className="hidden sm:inline">{nav.quote.label}</span>
            <span className="sm:hidden">{nav.quote.labelShort}</span>
          </Button>
          <span ref={menuButton} className="lg:hidden">
            <IconButton label={nav.menu.open} onClick={() => {
                setOpened(true);
                setOpen(true);
              }}>
              <Menu {...icon} />
            </IconButton>
          </span>
        </div>
      </nav>

      {opened && <NavSheet open={open} onOpenChange={setOpen} returnFocus={menuButton} />}
    </header>
  );
}
