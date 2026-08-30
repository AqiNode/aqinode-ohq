# 05 — Content Model

## Pages (source of truth: current HTML)
| Route | Source | Title | Description source | Key blocks |
|-------|--------|-------|--------------------|------------|
| `/` | `index.html:7` | Engineering studio for web, AI, and automation | `index.html:8` | Hero + SpecTable (2 products) + Marquee + AboutSnippet + Systems + ServiceList (5) + Vision |
| `/about` | `about.html:7` | About — Who We Are & What We Build | `about.html:9` | Hero + Three-nodes + SolarSystem + ServicesDetail (5) |
| `/products` | `products.html:7` | Products — Our Work | `products.html:6` | Hero + FilterBar + ProjectsGrid (Webyte AI, Aven) + Partnership CTA |
| `/contact` | `contact.html` | Contact | — | Form + email `aqinodelabs@gmail.com` + WhatsApp |
| `/faq` | `faq.html` | FAQ | — | Q&A, needs `FAQPage` JSON-LD |
| `/careers` | `careers.html` | Careers | — | — |
| `/privacy` | `privacy.html` | Privacy | — | — |
| `/terms` | `terms.html` | Terms | — | — |

## Content source v1: TypeScript
`src/lib/products.ts`
```ts
export const products = [
  { slug: "webyte-ai", name: "Webyte AI", year: 2026, category: "AI / Web", desc: "AI website developer...", status: "Coming Soon", stack: ["AI","Web"] },
  { slug: "aven", name: "Aven", year: 2025, category: "AI / EdTech", desc: "Streamline assignment management...", status: "Coming Soon", stack: ["AI","EdTech"] },
]
```
`src/lib/services.ts` — 5 services from `about.html:36` + `index.html:253` anchors.

## Content source v2 (optional): MDX / CMS
- If CMS needed, use `next-mdx-remote` or `contentlayer` with `content/*.mdx`. Frontmatter `title`, `description`, `publishedAt`.
- Keep `public/img/logo.png`, `public/og.png` — reference as `/logo.png`, `/og.png` in Next.

## Copy rules (from `.claude/skills/anti-slop-design/references/00-project-context.md`)
- No vague "Shaping What's Next" — keep specific: "Two products in build — Webyte AI 2026, Aven 2025. Reply in 24h."
- Measure `66ch` max (`css/reset.css:57`), line-height `1.7`.

## SEO content fields
Every route exports `metadata.title`, `metadata.description`, and appears in `sitemap.ts` + `llms.txt:8`. No route without these.

