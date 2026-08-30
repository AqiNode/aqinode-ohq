/**
 * Contact Page — Mailto form (no backend).
 *
 * The form builds a `mailto:` URL with subject/body and opens the user's email client.
 * This avoids backend handling while keeping UX simple. Validation is HTML5 required.
 *
 * VideoBackground is used as hero decorative layer, not content.
 */

"use client";

import { useState } from "react";

import { siteConfig } from "@/lib/site";
import { VideoBackground } from "@/components/VideoBackground";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export default function Contact() {
  // ---------------------------------------------------------------------------
  // Form state
  // ---------------------------------------------------------------------------

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  /** Update a single field in the form state. */
  const update = (field: string, value: string) =>
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

  /** Build mailto URL and navigate — opens native email client. */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const subject = encodeURIComponent(`[Inquiry] ${form.name}`);

    const body = encodeURIComponent(
      `Hi AqiNode,\n\n` +
        `I'm ${form.name} (${form.email}).\n\n` +
        `${form.message}\n\n` +
        `---\nSent via aqinode.click/contact`,
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  const filled = Boolean(form.name && form.email && form.message);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="page-hero">
        <VideoBackground />

        <div className="container">
          <p className="section-label">Contact</p>

          <h1 className="h-display">
            Let&apos;s <span className="accent-text">talk.</span>
          </h1>

          <p className="page-hero-desc">
            Tell us what you&apos;re building. We&apos;ll reply within 24h with a concrete next step.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Form + sidebar layout                                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-layout">
            {/* Form — glass card */}
            <form
              className="contact-glass"
              onSubmit={handleSubmit}
            >
              <div className="glass-header">
                <h2 className="h-lg">Get in touch</h2>
                <p className="glass-sub">Fill this out and we&apos;ll open a thread in your inbox.</p>
              </div>

              <div className="glass-grid">
                {/* Name */}
                <div className="field">
                  <label htmlFor="c-name">Name *</label>
                  <input
                    id="c-name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(event) => update("name", event.target.value)}
                  />
                </div>

                {/* Email */}
                <div className="field">
                  <label htmlFor="c-email">Email *</label>
                  <input
                    id="c-email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                  />
                </div>

                {/* Message */}
                <div className="field field-full">
                  <label htmlFor="c-message">What&apos;s on your mind? *</label>
                  <textarea
                    id="c-message"
                    required
                    rows={5}
                    placeholder="Tell us what you're working on or how we can help..."
                    value={form.message}
                    onChange={(event) => update("message", event.target.value)}
                  />
                </div>
              </div>

              <div className="glass-footer">
                <button
                  type="submit"
                  className={`btn btn-primary glass-submit ${filled ? "glass-submit--ready" : ""}`}
                >
                  Send inquiry
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </button>

                <span className="glass-hint">Opens your email client with a pre-filled message.</span>
              </div>
            </form>

            {/* Sidebar — reply promise + social */}
            <aside className="contact-sidebar">
              <div className="sidebar-card">
                <span className="sidebar-dot" />
                <h3>Reply in 24h</h3>
                <p>
                  We read every inquiry and respond with a concrete next step — not a sales pitch.
                </p>
              </div>

              <a
                href={siteConfig.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar-social card"
              >
                <span className="sidebar-social-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="22"
                    height="22"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </span>

                <div>
                  <span className="sidebar-social-label">X / Twitter</span>
                  <span className="sidebar-social-value">{siteConfig.twitter}</span>
                </div>

                <span className="sidebar-social-arrow">→</span>
              </a>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
