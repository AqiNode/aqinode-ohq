# 01 — Architecture (Next.js 15 App Router)

## Stack
- **Runtime:** Next.js 15 (App Router), React 19, TypeScript strict, `src/` dir
- **Styling:** `app/globals.css` ported from `css/reset.css:1`, `css/global.css:1`, `css/index.css:1`, `css/about.css:1` — CSS variables, no Tailwind (optional later). `next/font` for Syne/DM Sans/JetBrains Mono
- **Content:** MDX for `/about` services if needed, otherwise TSX
- **Analytics:** Sabilytics `data-site="8o2d6bnchthb"` via `next/script` in `layout.tsx`
- **Icons:** keep `font-awesome 6.5.2` CDN or switch to `lucide-react`

## File map
```
src/
  app/
    layout.tsx          # root layout, metadataBase, viewport, fonts, Sabilytics, JSON-LD org
    globals.css         # port of css/reset.css + global.css + index.css (tokens)
    page.tsx            # /  ← index.html:54 hero + marquee + about + systems + services + vision
    about/page.tsx      # /about ← about.html:80 hero + three-nodes + solar-system + services-detail
    products/page.tsx   # /products ← products.html:71 hero + filter + partnerships
    contact/page.tsx    # etc: careers, contact, faq, privacy, terms
    sitemap.ts          # replaces sitemap.xml:1 — dynamic, reads routes
    robots.ts           # replaces robots.txt:1 — typed, allows GPTBot etc.
    manifest.ts         # PWA manifest
    llms.txt/route.ts   # serves /llms.txt (see 03-geo)
    opengraph-image.tsx # dynamic OG using Ink & Grid
  components/
    Nav.tsx             # from js/core.js:69 register('navbar')
    Footer.tsx          # from js/core.js:159 register('footer')
    Hero.tsx, Marquee.tsx, SpecTable.tsx, Systems.tsx, ServiceList.tsx, Vision.tsx
    SolarSystem.tsx     # from about.html:180, css/about.css:2 — lightweight, transform-only
  lib/
    site.ts             # siteConfig: url https://aqinode.click, name, email aqinodelabs@gmail.com
    seo.ts              # helpers for metadata, jsonLd
```

## Routing
- Keep current URLs: `/`, `/about`, `/products`, `/contact`, `/faq`, `/careers`, `/privacy`, `/terms`
- `about.html:222` anchors (`#web`, `#ai` etc.) → `about/page.tsx` with `id="web"` + `scroll-mt-[var(--nav-h)]`
- No i18n v1. Add `next-intl` later if needed.

## Data flow
- No DB v1. Static props only. `products` array in `lib/products.ts` (Webyte AI 2026, Aven 2025) — drives `products/page.tsx` + `SpecTable` on home.
- Theme: `next-themes` or keep `js/core.js:308` localStorage pattern but in React context (`ThemeProvider`)

## Constraints
- Preserve `css/reset.css:70` `--nav-h:64px`, `--max-w:1200px`, `--section-py` — used for scroll offsets and rhythm.
- Keep `js/core.js:275` reveal as `useInView` hook (once, 14% threshold) — no layout shift.

