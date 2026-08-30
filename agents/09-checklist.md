# 09 — Production Readiness Checklist (Ship Gate)

> All boxes must be checked before `aqinode.click` cutover. References are to source files / specs.

## Build
- [ ] `npm run build` passes, no TS errors, no `next/image` warnings
- [ ] `npm run lint` passes
- [ ] No `console.log` in `src/app/*`

## Routing & Content
- [ ] Routes render: `/`, `/about` (with `#web` `#ai` anchors `about.html:222`), `/products`, `/contact`, `/faq`, `/careers`, `/privacy`, `/terms`
- [ ] `about.html:180` solar-system visible on mobile 360/480 (fix `css/about.css:176`) — not just core
- [ ] `index.html:211` systems-grid + `index.html:256` services-list visible without JS (noscript fallback `index.html:51`)
- [ ] `cta-banner` removed per request (`index.html:335` deleted) — footer follows vision
- [ ] Images have `alt`, `logo.png` via `next/image` priority only on hero

## SEO (02-seo.md)
- [ ] `metadataBase` = `https://aqinode.click`, per-route `canonical` matches URL (no `/index.html`)
- [ ] `title` template `%s — AqiNode`, `description` 150-160 chars per route
- [ ] `openGraph` + `twitter` + `verification.google` `9g1lIY2tXg8z6fL3Fpay5v7ENpw7-rZ18qMMSo9ETNE` (`index.html:12`)
- [ ] JSON-LD valid: `Organization`+`WebSite` on `/`, `Service` list on `/about` (`about.html:36`), `ItemList` on `/products` (`products.html:34`), `FAQPage` on `/faq`
- [ ] `sitemap.ts` returns 7 URLs, `lastModified` today
- [ ] `robots.ts` allows `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `CCBot`, `Bytespider` (`robots.txt:1`)

## GEO/AEO (03-geo-aeo.md)
- [ ] `https://aqinode.click/llms.txt` 200, `text/markdown`, matches `llms.txt:1` + updated date, lists 7 pages + 2 products
- [ ] `robots.txt` sitemap line points to `https://aqinode.click/sitemap.xml`
- [ ] AEO lead sentence in first 80 words on `/` and `/about` is specific + citable ("2 products in build — Webyte AI 2026, Aven 2025")
- [ ] Ask ChatGPT "What does AqiNode do?" — cites `aqinode.click`

## Performance (06-performance.md)
- [ ] Lighthouse: Perf 95+, SEO 100, A11y 95+ on `/` and `/about`
- [ ] No `particleCanvas` (`js/index.js:4`), no magnetic cursor (`js/core.js:219`) — JS <150kb gz
- [ ] Animations are `transform/opacity` only (`css/index.css:184`, `css/about.css:54`), respect `prefers-reduced-motion`
- [ ] LCP <2s, CLS 0 (reserved heights for solar-system, hero)
- [ ] Sabilytics `data-site="8o2d6bnchthb"` fires on all routes (`src/app/layout.tsx` Script)

## A11y & Design
- [ ] `focus-visible` outline `css/reset.css:146`, `scroll-behavior` respects reduce
- [ ] Ink & Grid tokens preserved (`css/reset.css:4` vars) — no purple gradient reintroduced
- [ ] Mobile: hero `7fr 5fr` collapses to `1fr` (`css/index.css:86`), footer `2fr 1fr 1fr 1fr` → `1fr` on 560px

## Deploy (08-deployment.md)
- [ ] `next.config.js` redirects `*.html` → clean URLs, security headers set
- [ ] `https://aqinode.click` 200, `https://www.aqinode.click` 301 to apex
- [ ] Env `NEXT_PUBLIC_SITE_URL` set in Vercel
- [ ] `curl -I` checks for `sitemap.xml`, `robots.txt`, `llms.txt` all 200

## Final
- [ ] `git tag v1.0-next` + deploy to prod
- [ ] Announce: update `llms.txt` date, submit sitemap to Search Console

