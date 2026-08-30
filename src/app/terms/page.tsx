/**
 * Terms Page — Usage terms for aqinode.click.
 */

import type { Metadata } from "next";

import { VideoBackground } from "@/components/VideoBackground";

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Terms — AqiNode",
  alternates: {
    canonical: "/terms",
  },
};

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default function Terms() {
  return (
    <section className="page-hero">
      <VideoBackground />

      <div className="container">
        <p className="section-label">Terms</p>

        <h1 className="h-display">Terms &amp; Conditions</h1>

        <p className="page-hero-desc">Use of aqinode.click is subject to these terms.</p>
      </div>
    </section>
  );
}
