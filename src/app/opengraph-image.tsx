/**
 * OG Image — Dynamic edge-generated social preview (1200x630).
 *
 * Used for Open Graph / Twitter cards when no static `og.png` is present.
 * Static `public/og.png` currently takes precedence; this is a fallback.
 */

import { ImageResponse } from "next/og";

// -----------------------------------------------------------------------------
// Config
// -----------------------------------------------------------------------------

export const runtime = "edge";

export const alt = "AqiNode — Systems that ship.";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// -----------------------------------------------------------------------------
// Image
// -----------------------------------------------------------------------------

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0A0A0B",
          color: "#F2F0EB",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 20,
            letterSpacing: 4,
            opacity: 0.6,
          }}
        >
          AQINODE — 2024—
        </div>

        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: -2,
            marginTop: 16,
          }}
        >
          Systems that <span style={{ color: "#14B86E" }}>ship.</span>
        </div>

        <div
          style={{
            fontSize: 22,
            opacity: 0.7,
            marginTop: 16,
          }}
        >
          Web • AI • Automation — Ink &amp; Grid
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
