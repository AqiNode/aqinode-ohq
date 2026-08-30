# 06 — Performance, Analytics, Core Web Vitals

## Budgets
- LCP < 2.0s, CLS 0, INP < 150ms, Total JS < 150kb (gz)
- Lighthouse 95+ on all routes

## Already done (keep)
- No `particleCanvas` (`js/index.js:4` not loaded on new `index.html`) — O(n²) lines removed
- No magnetic cursor (`js/core.js:219` removed) — mousemove + magnet `lerp` removed
- Animations are `transform/opacity` only (`css/index.css:184`, `css/about.css:54`) with `will-change` limited, paused on hover
- Sabilytics `data-site="8o2d6bnchthb"` already in `index.html:50` + all 9 HTML files — port to `src/app/layout.tsx`:
```ts
import Script from "next/script";
<Script async src="https://www.sabilytics.com/script.js" data-site="8o2d6bnchthb" data-domain="aqinode.click" strategy="afterInteractive" />
<noscript><style>{`.reveal{opacity:1!important}`}</style></noscript>
```

## Next.js perf
- `next/font` for Syne, DM Sans, JetBrains Mono — `display:swap`, `preload`
- `next/image` for `logo.png` + future product images — `priority` on hero, `loading="lazy"` elsewhere
- `next/script` for `js/ai.js` (chat) — `strategy="lazyOnload"`
- `app/globals.css` is single CSS file — no per-page `css/about.css` waterfall. Merge `reset + global + index + about + products` into one, purge unused.
- `fetch` cache: `sitemap` and `llms.txt` `revalidate=3600`

## Core Web Vitals
- CLS: reserve `height` for `SolarSystem` `css/about.css:2` (500px desktop, 380px mobile `css/about.css:176`), for `hero` `min-height: calc(100svh - var(--nav-h))` stable.
- LCP: hero `h1` is LCP — no `enterUp` blocking paint (animation `400ms` but `opacity` starts 1 in reduced-motion). Preload `og.png` if LCP image.
- INP: no JS on hero path except `Nav` toggle — keep `ThemeProvider` lightweight.

## Observability
- Vercel Analytics + Speed Insights if on Vercel
- Sabilytics dashboard for `aqinode.click` — verify `data-domain` matches `siteConfig.url` hostname
- `web-vitals` report: `src/app/web-vitals.ts` → send to Sabilytics or console

