/**
 * About Page — How We Build.
 *
 * Sections:
 * 1. Page hero (with VideoBackground)
 * 2. Three-node model intro
 * 3. Solar system visual (WEB / AI / SAAS orbits)
 * 4. Services detail (Web, SaaS, AI, Automation)
 */

import type { Metadata } from "next";

import { VideoBackground } from "@/components/VideoBackground";

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "About — How We Build",
  description:
    "AqiNode builds products in web, AI, and automation. Learn about our stack, process, and what we're building.",
  alternates: {
    canonical: "/about",
  },
};

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default function AboutPage() {
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Hero — page intro with video background                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="page-hero">
        <VideoBackground />

        <div className="container">
          <div className="page-hero-inner">
            <p className="section-label page-hero-eyebrow">About Us</p>

            <h1 className="h-display page-hero-title">
              How We <span className="accent-text">Build</span>
            </h1>

            <p className="page-hero-desc">
              At AqiNode, we build products — not services. Intelligent, scalable systems in web, AI,
              and automation that solve real problems.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Three-node model — editorial intro                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="three-nodes">
        <div
          className="container"
          style={{
            textAlign: "center",
            maxWidth: 560,
            margin: "0 auto",
          }}
        >
          <p
            className="section-label"
            style={{ justifyContent: "center" }}
          >
            Our Model
          </p>

          <h2 className="h-xl">
            The AqiNode <span className="accent-text">3-Node Model</span>
          </h2>

          <p
            style={{
              color: "var(--text-secondary)",
              marginTop: 16,
              lineHeight: 1.7,
            }}
          >
            Three interconnected disciplines that form the core of everything we build.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Solar system — AqiNode core with WEB / AI / SAAS orbits            */}
      {/* ------------------------------------------------------------------ */}
      <section
        className="solar-system"
        id="AqiNode-solar-system"
      >
        <div className="solar-core">
          <span>AqiNode</span>
        </div>

        <div className="orbit orbit-inner">
          <div className="planet">WEB</div>
        </div>

        <div className="orbit orbit-mid">
          <div className="planet">AI</div>
        </div>

        <div className="orbit orbit-outer">
          <div className="planet">SAAS</div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Services detail — stack and offerings                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="services-detail">
        <div className="container">
          <p
            className="section-label"
            style={{ marginBottom: 8 }}
          >
            Our Stack
          </p>

          <h2
            className="h-xl"
            style={{ marginBottom: 0 }}
          >
            What we work with
          </h2>

          {/* Web & Mobile */}
          <div
            className="svc-detail-item"
            id="web"
          >
            <div className="svc-text">
              <div className="svc-icon-lg">
                <i className="fa-solid fa-globe" />
              </div>

              <h3>Web &amp; Mobile</h3>

              <p>High-performance web and mobile apps — fast, responsive, built to last.</p>

              <p>Every product is crafted to be responsive, secure, and optimized for real users.</p>

              <div className="svc-features">
                <div className="svc-feature">Responsive, mobile-first design</div>
                <div className="svc-feature">Modern frameworks &amp; clean architecture</div>
                <div className="svc-feature">Performance optimization &amp; SEO</div>
                <div className="svc-feature">Progressive Web Apps (PWAs)</div>
              </div>
            </div>

            <div className="svc-visual">
              <span className="big-icon">
                <i className="fa-solid fa-globe" />
              </span>
            </div>
          </div>

          {/* Software & SaaS */}
          <div
            className="svc-detail-item"
            id="software"
          >
            <div className="svc-text">
              <div className="svc-icon-lg">
                <i className="fa-solid fa-screwdriver-wrench" />
              </div>

              <h3>Software &amp; SaaS</h3>

              <p>Scalable platforms designed for efficiency, automation, and the future of digital.</p>

              <p>Full lifecycle — planning, architecture, development, testing, and deployment.</p>

              <div className="svc-features">
                <div className="svc-feature">End-to-end development lifecycle</div>
                <div className="svc-feature">Internal tools &amp; dashboards</div>
                <div className="svc-feature">SaaS platform architecture</div>
                <div className="svc-feature">Long-term maintainability focus</div>
              </div>
            </div>

            <div className="svc-visual">
              <span className="big-icon">
                <i className="fa-solid fa-screwdriver-wrench" />
              </span>
            </div>
          </div>

          {/* AI & Agents */}
          <div
            className="svc-detail-item"
            id="ai"
          >
            <div className="svc-text">
              <div className="svc-icon-lg">
                <i className="fa-solid fa-brain" />
              </div>

              <h3>AI &amp; Agents</h3>

              <p>Intelligent systems that think, respond, and adapt — built for real value, not hype.</p>

              <p>Custom AI agents with tools, evals, fallbacks, and human-in-the-loop.</p>

              <div className="svc-features">
                <div className="svc-feature">Custom AI agents &amp; assistants</div>
                <div className="svc-feature">LLM integration &amp; fine-tuning</div>
                <div className="svc-feature">Computer vision &amp; NLP</div>
                <div className="svc-feature">Real-time decision systems</div>
              </div>
            </div>

            <div className="svc-visual">
              <span className="big-icon">
                <i className="fa-solid fa-brain" />
              </span>
            </div>
          </div>

          {/* Automation */}
          <div
            className="svc-detail-item"
            id="automation"
          >
            <div className="svc-text">
              <div className="svc-icon-lg">
                <i className="fa-solid fa-bolt" />
              </div>

              <h3>Automation</h3>

              <p>
                If it repeats twice, it shouldn&apos;t need you twice. Workflows, integrations, and
                cron jobs that run while you sleep.
              </p>
            </div>

            <div className="svc-visual">
              <span className="big-icon">
                <i className="fa-solid fa-bolt" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Structured data — Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "AqiNode",
            description: "A startup building products in web, AI, and automation.",
          }),
        }}
      />
    </>
  );
}
