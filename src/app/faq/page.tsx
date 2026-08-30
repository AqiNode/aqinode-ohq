/**
 * FAQ Page — Static Q&A with FAQPage structured data.
 */

import type { Metadata } from "next";

import { VideoBackground } from "@/components/VideoBackground";

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "FAQ — AqiNode",
  alternates: {
    canonical: "/faq",
  },
};

// -----------------------------------------------------------------------------
// Static data
// -----------------------------------------------------------------------------

const faqs = [
  {
    question: "What does AqiNode do?",
    answer: "AqiNode builds products in web, AI, and automation — from concept to production.",
  },
  {
    question: "What are your products?",
    answer: "Webyte AI (AI website builder) and Aven (EdTech assignment platform) — both live.",
  },
  {
    question: "How to contact?",
    answer: "Email aqinodelabs@gmail.com or WhatsApp via wa.me/2347057182425. Reply in 24h.",
  },
];

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <VideoBackground />

        <div className="container">
          <p className="section-label">FAQ</p>

          <h1 className="h-display">Frequently Asked Questions</h1>
        </div>
      </section>

      {/* List */}
      <section
        style={{
          padding: "0 0 var(--section-py)",
        }}
      >
        <div className="container">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              style={{
                padding: "24px 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                {faq.question}
              </h3>

              <p
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </>
  );
}
