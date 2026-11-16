import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import local from "./eslint-local.mjs";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "design/**", "scripts/**"]),
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { local },
    rules: { "local/no-raw-hex": "error", "local/no-arbitrary-tailwind": "error" },
  },
  {
    // Components and routes: also no literal copy. aria state values (aria-hidden="true") and data-testid stay allowed.
    files: ["src/components/**/*.tsx", "src/app/**/*.tsx"],
    rules: { "local/no-literal-copy": "error" },
  },
]);
