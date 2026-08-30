# 02 — SEO System (Built-in, not bolt-on)

## Goal
Every route is indexable, shareable, and stable. No SEO plugin — `next/metadata` + `sitemap.ts` + `robots.ts` + JSON-LD are source of truth.

## Config
`src/lib/site.ts`
```ts
export const siteConfig = {
  url: "https://aqinode.click",
  name: "AqiNode",
  description: "Engineering studio for web, AI, and automation — systems that ship.",
  email: "aqinodelabs@gmail.com",
  twitter: "@aqinode_hq",
  locale: "en_NG",
}
```

`src/app/layout.tsx`
```ts
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "AqiNode — Engineering studio for web, AI, and automation", template: "%s — AqiNode" },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: { siteName: siteConfig.name, type: "website", locale: "en_NG", images: ["/og.png"] },
  twitter: { card: "summary_large_image", creator: siteConfig.twitter },
  verification: { google: "9g1lIY2tXg8z6fL3Fpay5v7ENpw7-rZ18qMMSo9ETNE" }, // from index.html:12
  robots: { index: true, follow: true },
}
export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: "#FCFCF9" }, { media: "(prefers-color-scheme: dark)", color: "#0A0A0B" }] }
```

Per-route `generateMetadata`:
- `/about` — title "About — What We Do", desc from `about.html:9`
- `/products` — title "Products & Innovations", desc from `products.html:6`
- Use `alternates.canonical` per route (`/about`, `/products` etc.) — was `index.html:11` canonical.

## Sitemap & Robots (typed)
`src/app/sitemap.ts` — replaces `sitemap.xml:1`, dynamic `lastModified` from git log
```ts
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "about", "products", "careers", "contact", "faq", "privacy", "terms"].map(p => ({
    url: `${siteConfig.url}/${p}`,
    lastModified: new Date(),
    changeFrequency: p===""?"weekly":"monthly",
    priority: p===""?1:p==="products"?0.9:0.6,
  }))
}
```
`src/app/robots.ts` — replaces `robots.txt:1`
```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }, { userAgent: "GPTBot", allow: "/" }, { userAgent: "ClaudeBot", allow: "/" }, { userAgent: "PerplexityBot", allow: "/" }, { userAgent: "Google-Extended", allow: "/" }, { userAgent: "CCBot", allow: "/" }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
```

## Structured Data (JSON-LD)
Keep `index.html:24` Organization + WebSite graph. Port to `src/lib/seo.ts` `jsonLdOrganization()` and inject in `layout.tsx` via `<script type="application/ld+json">` with `dangerouslySetInnerHTML`.

Per-page additions:
- `/` — `Organization` + `WebSite`
- `/about` — `about.html:36` `makesOffer` (5 services) as `Service` list
- `/products` — `products.html:34` `ItemList` of `Product` (Webyte AI, Aven)

Validate with `https://validator.schema.org/` and Rich Results.

## OG & Social
- Keep `og.png` at `/public/og.png` (was `og.png:1`). Add `src/app/opengraph-image.tsx` for dynamic fallback using `next/og` with Ink & Grid (Syne, accent dot).
- Ensure `og:url` matches `metadataBase` + canonical — no `aqinode.click/index.html` vs `aqinode.click/`.

## Hygiene
- `next/image` for `img/logo.png` — add `alt="AqiNode logo"`.
- `llms.txt` and `sitemap` linked in `robots`.
- No `noindex` on any public route. `privacy/terms` indexable but `priority 0.3`.

