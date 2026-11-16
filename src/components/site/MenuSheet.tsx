"use client";

import { useId, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { IconButton } from "@/components/ui/Button";
import { icon } from "@/components/ui/icons";
import { nav } from "@/content/nav";

/** The phone menu: a native modal dialog gives the focus trap, Escape to close, inert page and focus return. */
export function MenuSheet() {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const close = () => dialog.current?.close();
  return (
    <span className="lg:hidden">
      <IconButton label={nav.menu.open} onClick={() => dialog.current?.showModal()}>
        <Menu {...icon} />
      </IconButton>
      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close();
        }}
        className="fixed inset-x-gutter bottom-auto top-21 m-0 w-auto max-w-none flex-col rounded-card border-0 bg-surface p-2 text-ink shadow-float open:flex lg:hidden"
      >
        <div className="flex items-center justify-between pl-4">
          <h2 id={titleId} className="text-title">
            {nav.menu.title}
          </h2>
          <IconButton label={nav.menu.close} onClick={close}>
            <X {...icon} />
          </IconButton>
        </div>
        <ul className="text-control">
          {[...nav.main, ...nav.sheetExtra].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={close} className="focus-ring block rounded-tile px-4 py-4 hover:bg-sunken">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </dialog>
    </span>
  );
}
