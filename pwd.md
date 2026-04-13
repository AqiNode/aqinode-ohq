# AqiNode Website — Project Working Document (PWD)
> **For any AI model continuing this project — read this entire file before touching anything.**

---

## 🏷️ Brand Context

| Field | Value |
|---|---|
| **Company Name** | AqiNode |
| **Previous Name** | OllyVerse |
| **Type** | Tech startup — web/app dev, AI, SaaS |
| **Founder** | [not specified — refer to as "the founder"] |
| **Old site** | https://ollyverse.vercel.app |
| **Logo** | Needs to be dropped in as `/img/logo.png` (founder to supply) |
| **Email** | officialollyverse@outlook.com (update if founder provides new one) |
| **WhatsApp** | https://wa.me/2347057182425 |
| **Twitter/X** | https://x.com/OllyVerse |

---

## 🎯 Project Goal

Full website rebuild for **AqiNode** in pure **HTML + CSS + JavaScript** (no frameworks, no bundlers).  
A mini React-like component system is simulated via JS for reusability.  
The site must be **massively upgraded** from OllyVerse aesthetically and technically — not a port, an elevation.

---

## 📁 File Structure

```
/
├── index.html          ← Home page
├── about.html          ← About / What We Do
├── products.html       ← Projects / Work
├── careers.html        ← Careers / Join Team
├── contact.html        ← Contact page
├── css/
│   ├── reset.css       ← CSS reset + base variables
│   ├── global.css      ← Shared styles (nav, footer, typography, animations)
│   └── [page].css      ← Per-page overrides (index.css, about.css, etc.)
├── js/
│   ├── core.js         ← Simulated component system (AqiNode Framework)
│   ├── nav.js          ← Navigation component + mobile menu
│   ├── animations.js   ← Scroll-triggered animations, parallax, cursor
│   └── [page].js       ← Per-page logic
└── img/
    ├── logo.png         ← FOUNDER MUST SUPPLY THIS
    ├── logo-dark.png    ← Optional dark variant
    └── [project images]
```

---

## 🎨 Design System

### Aesthetic Direction
**"Dark Intelligence"** — deep space-black backgrounds, electric cyan/teal accents, sharp geometric grid lines, glitch micro-effects on hover, editorial typography. Think: premium dev tool meets AI infrastructure company. NOT generic SaaS purple.

### Color Palette (CSS Variables)
```css
--bg-primary: #050608
--bg-secondary: #0a0c10
--bg-card: #0f1218
--accent-primary: #00e5ff      /* electric cyan */
--accent-secondary: #7b61ff    /* violet — used sparingly */
--accent-warm: #ff6b35         /* coral — CTA emphasis */
--text-primary: #f0f4ff
--text-secondary: #8892a4
--text-muted: #454f5e
--border: #1a2030
--border-glow: rgba(0, 229, 255, 0.25)
```

### Typography
- **Display/Headings**: `Syne` (Google Fonts) — geometric, futuristic
- **Body**: `DM Sans` (Google Fonts) — clean, readable
- **Monospace/Labels**: `JetBrains Mono` — for tags, badges, code-adjacent text

### Animation Philosophy
- Page load: staggered reveal (opacity + translateY, 60ms delays)
- Scroll: IntersectionObserver-triggered fade/slide-ins
- Hover states: border glow pulse, subtle scale, color transitions (200ms)
- Cursor: custom dot cursor on desktop
- Background: animated mesh gradient / particle grid on hero
- No jank — all transforms use `will-change`, GPU-composited only

---

## 📄 Pages — Content Inventory

### 1. `index.html` — Home
**Sections:**
1. **Hero** — "Building Now. Shaping What Comes Next." tagline, animated background mesh, two CTAs (Explore Services, View Products)
2. **Marquee** — scrolling tech tag strip (AI · Web · App · Cloud · SaaS · Automation · Software)
3. **About Snippet** — 2-paragraph intro, link to full about page
4. **Services Grid** — 5 service cards (Web & Mobile, Software, AI, AI Integration, Automation)
5. **Products Teaser** — 3 featured products (Aven, Vibe Checker, Auracle)
6. **CTA Banner** — "Let's build something together"
7. **Footer**

### 2. `about.html` — About
**Sections:**
1. **Page Hero** — "What We Do" headline
2. **Mission Statement**
3. **3-Node Model** (replaces 3-planet) — Web · AI · SaaS visualized as interconnected nodes
4. **Services Deep Dive** — each of the 5 services with expanded description
5. **Footer**

### 3. `products.html` — Products / Work
**Sections:**
1. **Page Hero** — "What We've Built"
2. **Filter Bar** — All / Web & Mobile / AI & Automation / Software
3. **Project Cards Grid** — Aven, Vibe Checker, Auracle (with tags, stack, live links)
4. **Partnership CTA** — "Want to be on this page?"
5. **Footer**

### 4. `careers.html` — Careers
**Sections:**
1. **Page Hero** — "Join Our Team"
2. **Why AqiNode** — 3 value cards (Innovation, Growth, Collaboration)
3. **Open Roles** — Currently no openings notice (styled elegantly, not as an afterthought)
4. **Footer**

### 5. `contact.html` — Contact
**Sections:**
1. **Page Hero** — "Reach Out"
2. **Contact Methods** — Email card, WhatsApp card
3. **Contact Form** — Name, Email, Message, Send
4. **Footer**

---

## 🔧 AqiNode JS Mini-Framework (core.js)

A lightweight component system to avoid repeating nav/footer HTML:

```js
// Usage in each HTML file:
// <div data-component="navbar"></div>
// <div data-component="footer"></div>
// AqiNode.mount() called at bottom of each page

const AqiNode = {
  components: {},
  register(name, renderFn) { this.components[name] = renderFn; },
  mount() {
    document.querySelectorAll('[data-component]').forEach(el => {
      const name = el.dataset.component;
      if (this.components[name]) el.innerHTML = this.components[name](el.dataset);
    });
  }
};
```

---

## ✅ Build Progress

| Task | Status | Notes |
|---|---|---|
| PWD created | ✅ Done | This file |
| Design system defined | ✅ Done | See above |
| `css/reset.css` | ⬜ Pending | |
| `css/global.css` | ⬜ Pending | |
| `js/core.js` (AqiNode Framework) | ⬜ Pending | |
| `js/nav.js` | ⬜ Pending | |
| `js/animations.js` | ⬜ Pending | |
| `index.html` + `css/index.css` + `js/index.js` | ⬜ Pending | |
| `about.html` | ⬜ Pending | |
| `products.html` | ⬜ Pending | |
| `careers.html` | ⬜ Pending | |
| `contact.html` | ⬜ Pending | |
| Logo asset integrated | ⏳ Awaiting founder | Drop into `/img/logo.png` |
| Final review & QA | ⬜ Pending | |

---

## ⚠️ Rules for Continuing AI Models

1. **Do NOT rename** any CSS variables or JS functions without updating all references.
2. **Do NOT use** any external JS frameworks (React, Vue, etc.) — pure HTML/CSS/JS only.
3. **Google Fonts** allowed via `<link>` in `<head>`. CDN JS libs (e.g. GSAP from cdnjs) allowed.
4. **All pages share** the same nav and footer via `data-component` + `AqiNode.mount()`.
5. **Brand name is AqiNode** everywhere — never "OllyVerse" in user-visible text.
6. **Logo placeholder**: use text "AqiNode" styled in Syne until `/img/logo.png` is supplied.
7. **Mobile-first** responsive — breakpoints at 768px and 1024px.
8. **Animations must degrade gracefully** — use `@media (prefers-reduced-motion: reduce)`.
9. **Contact details** (email, WhatsApp) must match what's in this doc unless founder updates.
10. **Check this file's Build Progress table** and update it as tasks complete.

---

## 📝 Change Log

| Date | Change | By |
|---|---|---|
| 2026-04-12 | Project initialized, PWD created, full plan documented | Claude (Sonnet 4.6) |

---
*Last updated: 2026-04-12*
