/**
 * Products Page — Showcase of shipped products.
 *
 * Data is static for now (3 products live).
 * Each card links to product detail / external site in future.
 */

import type { Metadata } from "next";

import { VideoBackground } from "@/components/VideoBackground";

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Products",
  description:
    "The products we're building — AI, web, and automation from concept to production.",
  alternates: {
    canonical: "/products",
  },
};

// -----------------------------------------------------------------------------
// Static data
// -----------------------------------------------------------------------------

const products = [
  {
    name: "Webyte AI",
    year: 2026,
    tag: "Web Infra",
    desc: "The AI Website Developer that actually understands you and your business. Build websites, go live and manage in real-time — no headaches.",
    stack: ["AI", "Web"],
    status: "On Build",
  },
  {
    name: "StraightLine",
    year: 2026,
    tag: "Organization",
    desc: "Create live queue in 10 seconds, share one link, everyone joins, and see the queue in real-time.",
    stack: ["Web", "Organization"],
    status: "On Build",
  },
  {
    name: "Aven",
    year: 2025,
    tag: "Edtech",
    desc: "Streamline assignment management, track student progress, and deliver feedback — all in one elegant platform designed for modern education.",
    stack: ["AI", "EdTech"],
    status: "On Build",
  },
];

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="page-hero">
        <VideoBackground />

        <div className="container">
          <div className="page-hero-inner">
            <p className="section-label page-hero-eyebrow">Products</p>

            <h1 className="h-display page-hero-title">
              What We&apos;re <span className="accent-text">Building</span>
            </h1>

            <p className="page-hero-desc">
             Every product goes from concept to production —
              designed, built, and shipped by the same team.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Grid                                                               */}
      {/* ------------------------------------------------------------------ */}
      <section
        style={{
          padding: "0 0 var(--section-py)",
        }}
      >
        <div className="container">
          <div className="projects-grid">
            {products.map((product) => (
              <div
                key={product.name}
                className="card project-card"
              >
                {/* Card header: tag + year */}
                <div className="card-top">
                  <div className="tag">{product.tag}</div>

                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    {product.year}
                  </span>
                </div>

                <h3>{product.name}</h3>

                <p className="desc">{product.desc}</p>

                {/* Stack tags */}
                <div className="stack">
                  {product.stack.map((tag) => (
                    <span
                      key={tag}
                      className="tag"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="divider-line" />

                {/* Footer */}
                <div className="card-footer">
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    {product.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structured data — ItemList of Products */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "AqiNode Products",
            itemListElement: products.map((product, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Product",
                name: product.name,
                description: product.desc,
                brand: {
                  "@type": "Organization",
                  name: "AqiNode",
                },
              },
            })),
          }),
        }}
      />
    </>
  );
}
