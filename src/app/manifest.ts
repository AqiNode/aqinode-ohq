/**
 * Web App Manifest — PWA metadata.
 *
 * Icons are generated from `public/img/logo.png` (720x720):
 * - favicon.ico (16/32/48 multi-size)
 * - icon-192.png, icon-512.png, apple-touch-icon.png (180)
 * See `public/icon-*.png` and `src/app/*-icon.png`.
 */

import type { MetadataRoute } from "next";

// -----------------------------------------------------------------------------
// Manifest
// -----------------------------------------------------------------------------

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AqiNode",
    short_name: "AqiNode",
    description:
      "AqiNode builds products in web, AI, and automation — from concept to production.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0B",
    theme_color: "#0A0A0B",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
