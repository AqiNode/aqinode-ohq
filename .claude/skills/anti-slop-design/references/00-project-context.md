# AqiNode — Project Context (Anti-Slop Pin)

## Brief
Product: AqiNode — engineering studio building web platforms, AI agents, and automation systems for founders, businesses, and creators. Ships real products (Webyte AI, Aven) — not templates.
Audience: Founders & operators deciding "will this team ship reliably and will it scale?"
One emotional adjective: **precise**
Competitor to NOT look like: purple-gradient SaaS starter (Linear/Stripe clones, "Trusted by" marquee + 3 cards + glass orb)

## Axes (6)
- Density: sparse-medium — one idea per screen, 12-col grid, generous negative space, 66ch measure
- Warmth: cool-neutral — ink on warm paper, warm grays, not blue grays
- Formality: low-medium — direct, contracted copy, no hype
- Energy: low/still — no pulses, no floating, 150-300ms only
- Ornament: structural-only — type + rules + grid as decoration, no blobs/glass/gradients
- Contrast: high — 72px display vs 15px mono, editorial scale jumps

## Visual Thesis
"Ink & Grid — Editorial engineering. Swiss 12-column, monochrome ink on warm paper, single acidic green pinprick, hairline rules, type as texture."

## System Decisions
- Palette: ink #0A0A0B / paper #FCFCF9, warm neutrals, one green accent (#14B86E dark / #0E7A42 light). No indigo/purple, no rainbow gradients. 60-30-10.
- Type: Syne for display (tight, -0.03em), DM Sans for body (17px/1.7), JetBrains Mono for meta (12px/0.08em). Scale 12/14/17/20/28/40/56/72. Measure 66ch.
- Radii: 0 (rules/nav), 4 (inputs/tags), 8 (cards/buttons), 12 (featured only), 999 (avatars only). Nested = outer minus padding.
- Elevation: hairline borders + flat, one neutral shadow 0 1px 3px rgba(0,0,0,0.08) only where containment needed. No glows.
- Motion: 150ms fast / 250ms med, ease [0.4,0,0.2,1], no fade-everything. Respects prefers-reduced-motion.

## Copy Rules
No "Building Now. Shaping What's Next" vagueness. Use specific claims with numbers/names. Voice: "We ship X that does Y in Z time. Here's the proof."
