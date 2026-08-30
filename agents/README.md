# AqiNode — Agents / Next.js Production Transform

> Source: static HTML (`index.html:1`, `about.html:1`, `products.html:1` etc.) → prod-ready Next.js 15 (App Router) with SEO + GEO built-in. Design system: **Ink & Grid** (`css/reset.css:1`, `css/global.css:1`, `css/index.css:1`).

## How to use this folder
Each file is a build spec for an autonomous agent or human. Read in order:

| # | File | Purpose |
|---|------|---------|
| 0 | `README.md` | this index |
| 1 | `01-architecture.md` | stack, routing, file map |
| 2 | `02-seo.md` | SEO system (metadata, sitemap, structured data) |
| 3 | `03-geo-aeo.md` | GEO/AEO — llms.txt, AI crawlers, answer optimization |
| 4 | `04-components.md` | component inventory + Ink & Grid tokens |
| 5 | `05-content.md` | content model & CMS |
| 6 | `06-performance.md` | perf, analytics, Core Web Vitals |
| 7 | `07-migration.md` | step-by-step HTML → Next.js migration |
| 8 | `08-deployment.md` | hosting, CI, domains, env |
| 9 | `09-checklist.md` | prod-readiness checklist (ship gate) |

## Principles
- **App Router, not Pages.** `app/layout.tsx` is single source for `metadata`, `viewport`, fonts, analytics.
- **SEO + GEO are first-class**, not plugins. Every route exports `metadata` + JSON-LD + appears in `sitemap.ts` + `llms.txt`.
- **No slop tokens.** Keep `css/reset.css:4` vars (`--bg-primary`, `--accent`, `--radius-md` etc.) — port to `app/globals.css`, not Tailwind re-tokenization.
- **Transform, not rewrite.** Copy is specific, not vague (see `index.html:68`). Keep it.
- **Sabilytics already added** `index.html:50` `data-site="8o2d6bnchthb"` — port to `app/layout.tsx` `<Script>`.

## Quick start for agent
```bash
npx create-next-app@latest aqinode-next --typescript --app --eslint --src-dir --import-alias "@/*"
# copy agents/ specs
# implement in order: layout → globals → components → routes → seo → geo → perf → deploy
```
