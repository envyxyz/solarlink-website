"use client";

import { useEffect } from "react";

const SHRINK_AFTER = 80;

/** Marks the nav pill data-small after 80px of scroll (CSS does the shrink). */
export function NavShrink() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>("header nav");
    if (!nav) return;
    const on = () => nav.toggleAttribute("data-small", window.scrollY > SHRINK_AFTER);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return null;
}
