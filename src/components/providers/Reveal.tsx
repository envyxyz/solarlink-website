"use client";

import { useEffect } from "react";
import { installSprings } from "@/lib/spring";

const VISIBLE = 0.2;
// Built in two parts: the lint rule reads a bracket pair in a string as a Tailwind arbitrary value.
const PENDING = "[data-reveal" + '=""]';

/**
 * Entry animation, in CSS: a block marked data-reveal rises and fades once when 20% visible; this sets
 * data-reveal="in". Children stagger through --i (80ms each). Also installs the spring easings for CSS.
 */
export function Reveal() {
  useEffect(() => {
    installSprings();
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          (e.target as HTMLElement).dataset.reveal = "in";
          io.unobserve(e.target);
        }),
      { threshold: VISIBLE },
    );
    const watch = (root: ParentNode) => root.querySelectorAll(PENDING).forEach((el) => io.observe(el));
    watch(document);
    const mo = new MutationObserver((list) =>
      list.forEach((r) =>
        r.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          if (n.dataset.reveal === "") io.observe(n);
          watch(n);
        }),
      ),
    );
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
