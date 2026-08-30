/**
 * Careers Page — Hiring status with glassmorphic card over video background.
 *
 * The hero keeps `VideoBackground` as decorative layer; the card sits inside
 * `page-hero` (z-index:1) so it inherits the dark video scrim. Hiring state
 * is dynamic via `src/lib/hiring.ts` — toggle `hiringConfig.status` without
 * touching this page.
 */

import type { Metadata } from "next";

import { HiringStatusCard } from "@/components/HiringStatusCard";
import { VideoBackground } from "@/components/VideoBackground";

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Careers — AqiNode",
  alternates: {
    canonical: "/careers",
  },
};

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default function Careers() {
  return (
    <section className="page-hero">
      {/* Decorative video layer behind content */}
      <VideoBackground />

      <div className="container">
        <div className="careers-hero-grid">
          {/* Left — copy */}
          <div>
            <p className="section-label">Careers</p>

            <h1 className="h-display">Join AqiNode</h1>

            <p className="page-hero-desc">
              We&apos;re early, remote-native, and shipping. Our hiring state changes — check the card
              for the latest. Email{" "}
              <a
                href="mailto:aqinodelabs@gmail.com"
                style={{ textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                aqinodelabs@gmail.com
              </a>{" "}
              with your work.
            </p>
          </div>

          {/* Right — glassmorphic hiring status (over vid bg) */}
          <HiringStatusCard />
        </div>
      </div>
    </section>
  );
}
