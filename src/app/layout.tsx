import type { Metadata, Viewport } from "next";
import { Mona_Sans } from "next/font/google";
import { business, ui } from "@/content";
import { Analytics } from "@/components/providers/Analytics";
import { Reveal } from "@/components/providers/Reveal";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { show } from "@/lib/facts";
import { siteUrl } from "@/lib/seo";
import "./globals.css";

// One family. The width axis (wdth 75 to 125) carries the type scale. Next builds the
// size-adjusted fallback so the swap does not shift layout.
const mona = Mona_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  weight: "variable",
  display: "swap",
  variable: "--font-mona",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: business.name.value,
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, colorScheme: "light dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={business.locale} className={mona.variable}>
      <body>
        <a
          href="#main"
          className="focus-ring absolute left-4 top-4 z-60 inline-flex min-h-control -translate-y-24 items-center rounded-pill bg-ink px-5 text-control text-on-ink focus:translate-y-0"
        >
          {ui.skipToContent}
        </a>
        <Reveal />
        <Analytics id={process.env.NEXT_PUBLIC_GA4_ID || show(business.ga4Id)} />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
