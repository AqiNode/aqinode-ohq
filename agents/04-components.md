# 04 — Components + Design System (Ink & Grid)

> Port `js/core.js:69` component registry to React. Tokens are in `css/reset.css:4` — do not re-tokenize.

## Tokens (port verbatim to `app/globals.css`)
```css
:root {
  --bg-primary:#0A0A0B; --bg-secondary:#111113; --bg-card:#161618; --bg-card-hover:#1C1C1F;
  --accent:#14B86E; --accent-strong:#0E7A4A; --accent-muted:rgba(20,184,110,0.12);
  --text-primary:#F2F0EB; --text-secondary:#9A9590; --text-muted:#6B6763;
  --border:rgba(242,240,235,0.08); --border-strong:rgba(242,240,235,0.14);
  --font-display:'Syne',sans-serif; --font-body:'DM Sans',sans-serif; --font-mono:'JetBrains Mono',monospace;
  --nav-h:64px; --max-w:1200px; --max-w-wide:1280px; --section-py:clamp(72px,8vw,120px);
  --radius-sm:4px; --radius-md:8px; --radius-pill:999px;
  --t-fast:150ms cubic-bezier(0.4,0,0.2,1); --t-med:250ms;
}
[data-theme="light"] { --bg-primary:#FCFCF9; --text-primary:#0A0A0B; --border:rgba(10,10,11,0.08); }
```
Radii: 0 rules/nav, 4 inputs/tags, 8 cards/buttons, 12 featured only, 999 pills. Shadows: neutral only, no glows (see `css/reset.css:88`).

## Components Inventory
| Component | Source | Props | Notes |
|-----------|--------|-------|-------|
| `Nav` | `js/core.js:69`, `css/global.css:105` | `activePath` | Fixed, `border-bottom` hairline, `backdrop-filter` none. Mobile drawer `translateX`, no blur. Keep `themeToggle` localStorage pattern. |
| `Footer` | `js/core.js:159` | — | Grid `2fr 1fr 1fr 1fr`, links to `/about#web` anchors |
| `Hero` | `index.html:54`, `css/index.css:4` | `title`, `desc`, `specRows` | 12-col `7fr 5fr`, `min-height: calc(100svh - var(--nav-h))`, `enterUp` 420ms stagger, `kicker-rule scaleX` |
| `SpecTable` | `index.html:84` | `items: {num,name,meta,year}[]` | Sticky `top:calc(var(--nav-h)+24px)`, `translateX(2px)` hover only |
| `Marquee` | `index.html:118`, `css/global.css:437` | `items` | 48s linear, pause on hover, `prefers-reduced-motion: none` |
| `AboutSnippet` | `index.html:138` | — | Grid `1.1fr 0.9fr`, list with `01-04` nums, hairline rules |
| `Systems` | `index.html:192` | — | 3-col with `border:1px solid var(--border)`, `cube-lite` wireframe `css/index.css:212` (transform only) |
| `ServiceList` | `index.html:243` | `rows` | `grid 48px 1fr auto 20px`, border-bottom, arrow `translateX(4px)` hover |
| `Vision` | `index.html:303` | — | `0.9fr 1.1fr`, `border-top` |
| `SolarSystem` | `about.html:180`, `css/about.css:2` | — | Orbits 190/270/340px desktop, 140/210/280px mobile `css/about.css:176`, `spin 24/36/48s`, no glows |
| `ServiceDetail` | `about.html:216` | `id, icon, title, body, features` | Grid `1fr 1fr`, visual `border-radius:var(--radius-md)` |
| `FilterBar` | `products.html:88` | — | `filter-btn active` solid `var(--text-primary)` not gradient `css/products.css:17` |
| `ProjectCard` | `products.html:98` | `tag, year, title, desc, stack` | `border:1px solid var(--border)`, `radius-md` |

## Motion (lightweight)
All `@keyframes` are `transform`/`opacity` only (`css/index.css:184`, `css/about.css:54`). Respect `prefers-reduced-motion:reduce` → `animation: none`. No `filter:blur`, no `box-shadow` animation, no `particleCanvas` (`js/index.js:4` removed). Reveal via `useInView` hook (threshold 0.14, once).

## A11y
- `a:focus-visible` `outline:2px solid var(--accent)` `css/reset.css:146`
- `html { scroll-behavior: smooth }` but `reduce` → `auto`
- All interactive have `aria-label`, `role="list"` kept.

