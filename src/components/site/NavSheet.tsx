"use client";

import type { RefObject } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Dialog } from "radix-ui";
import { IconButton } from "@/components/ui/Button";
import { icon } from "@/components/ui/icons";
import { nav } from "@/content/nav";

/** The phone menu sheet. Radix Dialog gives the focus trap, Escape to close and scroll lock. */
export function NavSheet({ open, onOpenChange, returnFocus }: { open: boolean; onOpenChange: (o: boolean) => void; returnFocus: RefObject<HTMLElement | null> }) {
  return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-40 lg:hidden" />
            <Dialog.Content
              aria-describedby={undefined}
              onCloseAutoFocus={(e) => {
                e.preventDefault();
                returnFocus.current?.querySelector("button")?.focus();
              }}
              className="fixed inset-x-gutter top-21 z-50 flex flex-col rounded-card bg-surface p-2 shadow-float lg:hidden"
            >
              <div className="flex items-center justify-between pl-4">
                <Dialog.Title className="text-title">{nav.menu.title}</Dialog.Title>
                <Dialog.Close asChild>
                  <IconButton label={nav.menu.close}>
                    <X {...icon} />
                  </IconButton>
                </Dialog.Close>
              </div>
              <ul className="text-control">
                {[...nav.main, ...nav.sheetExtra].map((l) => (
                  <li key={l.href}>
                    <Dialog.Close asChild>
                      <Link href={l.href} className="focus-ring block rounded-tile px-4 py-4 hover:bg-sunken">
                        {l.label}
                      </Link>
                    </Dialog.Close>
                  </li>
                ))}
              </ul>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
    );
}
