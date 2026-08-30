/**
 * Home Page — Editorial landing for AqiNode.
 *
 * Sections:
 * 1. Hero (with VideoBackground as decorative layer, not the hero itself)
 * 2. Marquee (infinite mono ticker)
 * 3. About snippet (2-col intro + 4-item list)
 * 4. Systems (3-col grid with wireframe cube)
 * 5. Vision (editorial 2-col)
 */

import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/site";
import { VideoBackground } from "@/components/VideoBackground";

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Building Now, Shaping What's Next.",
  description:
    "AqiNode builds products in web, AI, and automation — from concept to production. Two products live, more on the way.",
  alternates: {
    canonical: "/",
  },
};

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default function Home() {
  return (
    <>
      {/* ================================================================== */}
      {/* Hero — 12-col asymmetric, video behind content                     */}
      {/* ================================================================== */}
      <section className="hero">
        {/* Decorative video — absolute layer, not hero content */}
        <VideoBackground />

        <div className="container-wide">
          <div className="hero-grid12">
            {/* Main copy */}
            <div className="hero-main">
              {/* Kicker */}
              <div className="hero-kicker">
                <span className="kicker-rule" />
                <span className="kicker-text">
                  Startup — Building the next wave of AI-powered platforms and experiments.
                </span>
                <span className="kicker-index">INDEX 01 / 05</span>
              </div>

              {/* Title */}
              <h1 className="hero-title">
                Building Now, <br />
                <span className="hero-title-accent">Shaping What&apos;s Next.</span>
              </h1>

              {/* Description */}
              <p className="hero-desc">
                AqiNode builds products in web, AI, and automation. We design, code, and ship — from
                concept to production. Two products live, more on the way.
              </p>

              {/* CTAs */}
              <div className="hero-actions">
                <Link
                  href="/products"
                  className="btn btn-primary"
                >
                  See our products
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>

                <Link
                  href="/about"
                  className="hero-link"
                >
                  How we build <span>→</span>
                </Link>
              </div>

              {/* Proof bar */}
              <div className="hero-proof">
                <span className="proof-item">AI Systems</span>
                <span className="proof-dot" />
                <span className="proof-item">Web • AI • Automation</span>
                <span className="proof-dot" />
                <span className="proof-item">
                  Reply in 24h —{" "}
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </span>
              </div>
            </div>

            {/* Side spec table — keeps its own light theme on dark hero */}
            <aside
              className="hero-side"
              aria-label="Products index"
            >
              <div className="side-head">
                <span className="mono">PRODUCTS</span>
                <span className="mono muted">2 entries</span>
              </div>

              <div className="spec-table">
                <Link
                  href="/products"
                  className="spec-row"
                >
                  <span className="spec-num">01</span>
                  <span className="spec-name">Webyte AI</span>
                  <span className="spec-meta">AI • Web</span>
                  <span className="spec-year">2026</span>
                </Link>

                <Link
                  href="/products"
                  className="spec-row"
                >
                  <span className="spec-num">02</span>
                  <span className="spec-name">StraightLine</span>
                  <span className="spec-meta">Organization • Web</span>
                  <span className="spec-year">2026</span>
                </Link>

                <Link
                  href="/products"
                  className="spec-row"
                >
                  <span className="spec-num">03</span>
                  <span className="spec-name">Aven</span>
                  <span className="spec-meta">AI • EdTech</span>
                  <span className="spec-year">2025</span>
                </Link>
              </div>

              <div className="side-foot">
                <span className="mono">Stack: Next.js / React.js / Node.js / Python / LLMs</span>
                <span className="mono muted">
                  → <Link href="/about">Our stack</Link>
                </span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* Marquee — mono ticker, hairline borders                            */}
      {/* ================================================================== */}
      <div
        className="marquee-section"
        aria-hidden="true"
      >
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[
              "Web Platforms",
              "AI Agents",
              "Automation",
              "SaaS",
              "API Integration",
              "LLM Systems",
              "Data Pipelines",
              "Cloud",
              "Web Platforms",
              "AI Agents",
            ].map((label, index) => (
              <span
                key={`${label}-${index}`}
                className="marquee-item"
              >
                <span className="dot" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* About snippet — 2-col editorial                                     */}
      {/* ================================================================== */}
      <section className="about-snippet">
        <div className="container-wide">
          <div className="about-grid">
            {/* Text column */}
            <div className="about-text-col">
              <p className="section-label">About AqiNode</p>

              <h2 className="h-xl">
                We don&apos;t just build software,
                <br />
                <span className="accent-text">we architect the future.</span>
              </h2>

              <div className="about-copy">
                <p>
                  Most AI demos die in a Notion doc. Ours go to production. We plan the data model,
                  wire the APIs, write the agents, and stay for the bug reports.
                </p>
                <p className="muted">
                  Web, AI, and automation aren&apos;t three departments here. They&apos;re one stack — the
                  same engineers who build the frontend write the agent&apos;s tool.
                </p>
              </div>

              <Link
                href="/about"
                className="text-link"
              >
                How we build — stack, process, ownership <span>→</span>
              </Link>
            </div>

            {/* List */}
            <div
              className="about-list"
              role="list"
            >
              <div className="about-item">
                <span className="about-num">01</span>
                <div className="about-item-body">
                  <h3>Web &amp; Mobile</h3>
                  <p>Next.js, PWAs, dashboards that load in under 1s on 3G.</p>
                </div>
              </div>

              <div className="about-item">
                <span className="about-num">02</span>
                <div className="about-item-body">
                  <h3>AI &amp; Agents</h3>
                  <p>Custom agents with tools, not wrappers. Eval sets, fallbacks, human in loop.</p>
                </div>
              </div>

              <div className="about-item">
                <span className="about-num">03</span>
                <div className="about-item-body">
                  <h3>Automation</h3>
                  <p>Workflows that run while you sleep. If it repeats twice, we automate it.</p>
                </div>
              </div>

              <div className="about-item">
                <span className="about-num">04</span>
                <div className="about-item-body">
                  <h3>SaaS &amp; Cloud</h3>
                  <p>Multi-tenant, billed, observable from day one.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* Systems — 3 surfaces on one stack                                   */}
      {/* ================================================================== */}
      <section className="systems">
        <div className="container-wide">
          <div
            className="systems-head"
            style={{ position: "relative" }}
          >
            <p className="section-label">Systems</p>
            <h2 className="h-xl">One stack. Three surfaces.</h2>
            <p className="systems-sub">
              Every product touches all three. One team, one codebase, one deploy.
            </p>

            {/* Wireframe cube — decorative, pauses on hover */}
            <div
              className="cube-lite"
              aria-hidden="true"
            >
              <div className="cube-lite-inner">
                <div className="cube-lite-face" />
                <div className="cube-lite-face" />
                <div className="cube-lite-face" />
                <div className="cube-lite-face" />
                <div className="cube-lite-face" />
                <div className="cube-lite-face" />
                <div className="cube-lite-dot" />
              </div>
            </div>
          </div>

          <div className="systems-grid">
            <div className="system-col">
              <div className="system-num">01</div>
              <h3>Interface</h3>
              <p>Web and mobile that feel instant.</p>
              <ul className="system-list">
                <li>Design → code in one pass</li>
                <li>Perf budget: TTFB &lt; 200ms</li>
                <li>Accessible, keyboard-first</li>
              </ul>
            </div>

            <div className="system-col">
              <div className="system-num">02</div>
              <h3>Intelligence</h3>
              <p>Agents that use tools and know when not to.</p>
              <ul className="system-list">
                <li>Tool calls, not chat theater</li>
                <li>Confidence + undo, always</li>
                <li>Own your model, own your data</li>
              </ul>
            </div>

            <div className="system-col">
              <div className="system-num">03</div>
              <h3>Operations</h3>
              <p>Infrastructure that pages us before it pages you.</p>
              <ul className="system-list">
                <li>Infra as code, preview envs</li>
                <li>Queues, crons, webhooks</li>
                <li>Observability from day one</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* Vision — operational, not ornamental                               */}
      {/* ================================================================== */}
      <section className="vision">
        <div className="container-wide">
          <div className="vision-grid">
            <div className="vision-head">
              <p className="section-label">Vision</p>
              <h2 className="h-xl">
                The next layer is
                <br />
                operational, not ornamental.
              </h2>
            </div>

            <div className="vision-body">
              <p>
                We build technology that people operate daily — not technology they look at once. That
                means fewer gradients, more states. Fewer promises, more logs.
              </p>

              <div className="vision-cols">
                <div className="vision-item">
                  <h3>Intelligence, not theater</h3>
                  <p>We show confidence, sources, and a way to correct the model.</p>
                </div>

                <div className="vision-item">
                  <h3>Built to be run</h3>
                  <p>Every product ships with runbooks, not just roadmaps.</p>
                </div>

                <div className="vision-item">
                  <h3>Calm by default</h3>
                  <p>Still interfaces, fast responses. Energy on latency, not wobble.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
