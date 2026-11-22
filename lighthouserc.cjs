// Lighthouse CI against out/ (CLAUDE.md rule 11): mobile 95+ in all four categories on home and one page per kind, LCP 2.0 s, CLS 0.
// Run from tests/ (`pnpm lhci`); build with SOLARLINK_PREVIEW=1 first so the draft inner pages exist.
// Uses the installed Chrome; set CHROME_PATH on Linux/CI.
const PORT = 4174;
const paths = ["/", "/about-us/", "/services/residential-solar/", "/solar-systems/5kw/", "/products/inverters/growatt/", "/products/", "/outlets/lahore/", "/projects/dha-phase-5-lahore-15kw/", "/blog/how-to-size-solar-system-pakistan/", "/faqs/", "/privacy-policy/"];

module.exports = {
  ci: {
    collect: {
      startServerCommand: `node serve.mjs ../out ${PORT}`,
      startServerReadyPattern: "serving",
      url: paths.map((p) => `http://localhost:${PORT}${p}`),
      numberOfRuns: 1,
      settings: { chromeFlags: "--no-sandbox --headless=new" }, // default = mobile emulation, all four categories
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.95 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2000 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0 }],
      },
    },
    upload: { target: "filesystem", outputDir: ".lighthouseci" },
  },
};
