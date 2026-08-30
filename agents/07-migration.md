# 07 — Migration Plan (HTML → Next.js)

## Phase 0 — Prep (done)
- [x] Design system pinned: `Ink & Grid` `css/reset.css:1` + `agents/00-project-context.md`
- [x] Sabilytics added `index.html:50` site `8o2d6bnchthb`
- [x] SEO/GEO baseline: `robots.txt:1`, `sitemap.xml:1`, `llms.txt:1`, JSON-LD `index.html:24`

## Phase 1 — Scaffold
```bash
npx create-next-app@latest aqinode-next --typescript --app --eslint --src-dir --import-alias "@/*"
cd aqinode-next
npm i next-themes
# copy public assets
cp -r ../aqinode-ohq/public/* public/ 2>/dev/null; cp ../aqinode-ohq/img public/img -r; cp ../aqinode-ohq/og.png public/ 2>/dev/null
```

## Phase 2 — Globals & Layout
1. Merge `css/reset.css + global.css + index.css + about.css + products.css` → `src/app/globals.css`. Keep vars, remove `display:none !important` cube relics.
2. Create `src/app/layout.tsx` with `metadata`, `viewport`, fonts, `Nav`+`Footer`, Sabilytics `<Script>`, `ThemeProvider`, JSON-LD.
3. Verify `/` renders empty layout `npm run dev`.

## Phase 3 — Components
Port `js/core.js:69` registry:
- `src/components/Nav.tsx` (activePath via `usePathname`)
- `src/components/Footer.tsx`
- `src/components/SolarSystem.tsx` (orbits 190/270/340, mobile 140/210/280)
- `src/components/ui/*` (Marquee, SpecTable etc.) per `04-components.md`

## Phase 4 — Routes (in order)
1. `src/app/page.tsx` ← `index.html:54` (hero → vision, no cta-banner per user removal)
2. `src/app/about/page.tsx` ← `about.html:80` (keep `id="web"` anchors)
3. `src/app/products/page.tsx` ← `products.html:71`
4. `src/app/contact/page.tsx`, `faq`, `careers`, `privacy`, `terms` — copy verbatim, add `metadata` per route
5. Add `generateMetadata` per route with `canonical` = `siteConfig.url + pathname`

## Phase 5 — SEO/GEO wiring
- `src/app/sitemap.ts`, `robots.ts`, `manifest.ts`, `opengraph-image.tsx` per `02-seo.md`
- `public/llms.txt` copy from `llms.txt:1` (or `src/app/llms.txt/route.ts`)
- JSON-LD helpers `src/lib/seo.ts` per `02-seo.md`

## Phase 6 — Parity check
- `npm run build` — no `next/image` warnings, no `metadataBase` error
- Visual diff: `http://localhost:3000` vs `http://localhost:8000` (old `python3 -m http.server`) — check `hero`, `solar-system` mobile 360/480, `systems-grid`, `service-list` visible (previous bug `index.html:211` reveal-soft hidden)
- Lighthouse CI: `npx lhci autorun`

## Phase 7 — Cutover
- Update `sitemap.ts` `lastModified` to deploy date
- DNS: point `aqinode.click` to Vercel/Cloudflare, keep `www` redirect
- 301: `about.html` → `/about`, `products.html` → `/products` (add `next.config.js` `redirects()`)

