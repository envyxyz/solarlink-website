// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// Canonical host: apex, https, trailing slash. docs/SEO-MIGRATION.md explains why; do not change it.
export default defineConfig({
  site: "https://solarlink.com.pk",
  trailingSlash: "always",
  build: { format: "directory" },
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
  fonts: [
    {
      // Display: wide, soft-squared geometric, the closest full family to the wordmark
      name: "Unbounded",
      cssVariable: "--font-unbounded",
      provider: fontProviders.fontsource(),
      weights: ["200 900"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["Arial Black", "sans-serif"],
    },
    {
      // Body and UI: matches the logo's tagline lettering (round geometric, single-storey a)
      name: "Outfit",
      cssVariable: "--font-outfit",
      provider: fontProviders.fontsource(),
      weights: ["100 900"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      // Data: prices, kW, units, serials. Loaded only on pages that use it
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      provider: fontProviders.fontsource(),
      weights: ["100 900"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["monospace"],
    },
  ],
});
