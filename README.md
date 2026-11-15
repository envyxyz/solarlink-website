# SolarLink website

The new [solarlink.com.pk](https://solarlink.com.pk), built from scratch: Astro, Tailwind, TypeScript, static output.

**Status:** foundation only. Tokens, fonts, content model, route plan, SEO rules and research are in place. No pages are designed yet.

Start with `CLAUDE.md`. It lists what to read and the rules that hold for every change.

```
pnpm install
pnpm dev        # http://localhost:4321
pnpm verify     # types, tokens, contrast, content rules, build
```

To see the colour and type system, open `design/specimen.html` in a browser (add `?theme=light` or `?theme=dark`).

| Folder | Holds |
|---|---|
| `src/styles/tokens.css` | Every colour, type, radius and motion value |
| `src/content.ts` | Repeated information: business details, outlets, navigation, actions |
| `src/routes.ts` | Every planned page with its target search query |
| `docs/` | Requirements, SEO plan, keyword map, idea bank, phase log |
| `docs/research/` | Competitor, keyword and old-site research. See its README for what is verified |
| `docs/qa/` | Snapshot of the live site before the rebuild |
