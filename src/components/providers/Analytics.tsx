"use client";

import { useEffect } from "react";
import { loadAnalytics } from "@/lib/analytics";

/** Mounts once from the root layout: gtag.js loads after the first interaction. */
export function Analytics({ id }: { id: string | null }) {
  useEffect(() => loadAnalytics(id), [id]);
  return null;
}
