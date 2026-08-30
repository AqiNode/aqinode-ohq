# 08 — Deployment (Prod-ready)

## Hosting
- **Primary: Vercel** (Next.js native). Alternative: Cloudflare Pages (OpenNext) or self-hosted `next start`.
- **Domain:** `aqinode.click` + `www.aqinode.click` → 301 to apex. `siteConfig.url` is `https://aqinode.click` (see `02-seo.md`).
- **Env:** `NEXT_PUBLIC_SITE_URL=https://aqinode.click`, `NEXT_PUBLIC_SABILYTICS_SITE=8o2d6bnchthb` (from `index.html:50`)

## Build
```bash
npm run build # next build
npm run start # next start -p 3000
```
`next.config.js`
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/products.html", destination: "/products", permanent: true },
      { source: "/:path*.html", destination: "/:path*", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/(.*)", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    ]}];
  },
  images: { remotePatterns: [{ hostname: "aqinode.click" }] },
};
module.exports = nextConfig;
```

## CI/CD (GitHub Actions — Vercel auto, or manual)
```yaml
name: ci
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npx lhci autorun # lighthouse budget from 06-performance.md
```

## Caching
- `sitemap.xml`, `robots.txt`, `llms.txt`, `og.png` → `Cache-Control: public, max-age=3600, stale-while-revalidate=86400` (set in `next.config.js` headers or route)
- `/_next/static/*` is immutable — Vercel does automatically.

## Secrets
- No secrets v1. If adding contact form: `RESEND_API_KEY` or `SMTP_*` in Vercel env, not committed.

## Verification after deploy
- `curl -I https://aqinode.click/sitemap.xml` 200
- `curl -I https://aqinode.click/robots.txt` allows GPTBot
- `curl -I https://aqinode.click/llms.txt` 200 `text/markdown`
- `curl -I https://aqinode.click/about` vs `/about.html` → 301
- Sabilytics dashboard shows `aqinode.click` hits (data-site 8o2d6bnchthb)

