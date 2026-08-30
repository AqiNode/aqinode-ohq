# 03 — GEO / AEO (Generative Engine Optimization + Answer Engine)

> GEO = be the cited source in ChatGPT, Claude, Perplexity. AEO = win the direct answer. Both rely on the same primitives: crawlability + structured answers + llms.txt.

## 1. Crawlability for AI (already done — keep)
- `robots.txt:5` allows `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `CCBot`, `Bytespider`, `Applebot-Extended` — port verbatim to `src/app/robots.ts` (see 02-seo). Do **not** block.
- `sitemap.xml:1` lists all 7 routes — keep in `sitemap.ts` with `lastModified` current.

## 2. llms.txt (the /llms.txt standard)
Current `llms.txt:1` is good — 35 lines, 7 pages + 2 products + 5 services + contact. For Next.js:

`src/app/llms.txt/route.ts`
```ts
export async function GET() {
  const txt = await fetch(new URL("/llms.txt", siteConfig.url)).then(r=>r.text()); // or inline
  return new Response(txt, { headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
```
Or static `public/llms.txt` (preferred — no route). Keep exactly the current content, but update `lastmod` date on deploy and add:
```
## Vision
The next layer is operational, not ornamental — intelligence with undo, built to be run, calm by default.
```
Add `llms-full.txt` later if content grows >10k tokens.

## 3. Answer-shaped content (AEO)
Every page should answer a question in first 80 words with a concrete, citable sentence:
- `/` hero `index.html:68` already does: "AqiNode is an engineering studio. We design and ship web platforms, AI agents, and automation — from first commit to production." Keep — it's the AEO lead.
- `/about` first paragraph `about.html:88` — keep specific, not vague.
- `/faq` — ensure each `<h2>` is a question, each answer 1-2 sentences + link. Add `FAQPage` JSON-LD.
- Add `src/app/faq/page.tsx` FAQ structured data:
```ts
{ "@type":"FAQPage", "mainEntity": faqs.map(f=>({ "@type":"Question", "name": f.q, "acceptedAnswer": { "@type":"Answer", "text": f.a } })) }
```

## 4. Structured data for LLMs
LLMs trust JSON-LD more than prose. Keep:
- `index.html:24` Organization `contactPoint`, `sameAs` X, `logo`
- `about.html:36` `makesOffer` 5 services
- `products.html:34` `ItemList` of Products
Add `BreadcrumbList` on every route for context.

## 5. Metadata for AI
- `meta name="description"` 150-160 chars, specific (already `index.html:8`, `about.html:9`).
- No `ai.txt` needed — `llms.txt` is standard. Optionally add `/.well-known/ai.txt` redirect to `/llms.txt`.

## 6. Verification
- Check `https://aqinode.click/llms.txt` returns 200 + `text/markdown`
- Check `https://aqinode.click/robots.txt` allows listed bots
- Ask ChatGPT/Claude "What does AqiNode do?" — should cite `llms.txt:3` + hero lead. If not, add more specific numbers (e.g., "2 products in build — Webyte AI 2026, Aven 2025") to `llms.txt`.

