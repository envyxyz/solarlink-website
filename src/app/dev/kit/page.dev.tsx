import type { Metadata } from "next";
import { Kit } from "./Kit";

// Dev only: the "dev.tsx" page extension exists only outside production builds (next.config.ts).
export const metadata: Metadata = {
  title: "Kit",
  robots: { index: false, follow: false },
};

export default function KitPage() {
  return <Kit />;
}
