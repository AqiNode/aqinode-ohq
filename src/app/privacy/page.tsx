/**
 * Privacy Page — Brief policy. Sabilytics is privacy-friendly (no cookies).
 */

import type { Metadata } from "next";

import { VideoBackground } from "@/components/VideoBackground";

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Privacy — AqiNode",
  alternates: {
    canonical: "/privacy",
  },
};

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default function Privacy() {
  return (
    <section className="page-hero">
      <VideoBackground />

      <div className="container">
        <p className="section-label">Privacy</p>

        <h1 className="h-display">Privacy Policy</h1>

        <p className="page-hero-desc">
          We collect minimal data; Sabilytics analytics is privacy-friendly. Contact
          aqinodelabs@gmail.com.
        </p>
      </div>
    </section>
  );
}
