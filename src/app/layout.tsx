/**
 * RootLayout — Global HTML shell for AqiNode.
 *
 * Responsibilities:
 * - Sets HTML lang, metadata, viewport/theme colors
 * - Injects global CSS, SEO JSON-LD, analytics
 * - Renders persistent UI: ribbon, navigation, footer
 *
 * Notes:
 * - `suppressHydrationWarning` prevents mismatch from theme toggling (data-theme on <html>)
 * - Video backgrounds are NOT global; each hero mounts its own <VideoBackground /> as a decorative layer
 */

import type { Metadata, Viewport } from "next";
import Script from "next/script";

import { siteConfig } from "@/lib/site";
import { jsonLdOrganization } from "@/lib/seo";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

// Global styles — design tokens, resets, Ink & Grid system
import "./globals.css";

// -----------------------------------------------------------------------------
// Metadata — SEO defaults (page-level metadata extends this)
// -----------------------------------------------------------------------------

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: "AqiNode — Products in web, AI, and automation",
    template: "%s — AqiNode",
  },

  description: siteConfig.description,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    locale: "en_NG",
    url: siteConfig.url,
    title: "AqiNode — Products in web, AI, and automation",
    description: siteConfig.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/og.png"],
    creator: siteConfig.twitter,
  },

  verification: {
    google: siteConfig.verification.google,
  },

  robots: {
    index: true,
    follow: true,
  },

  // Favicon & PWA icons are defined via:
  // - src/app/favicon.ico  (multi-size ICO)
  // - src/app/icon.png      (512)
  // - src/app/apple-icon.png (180)
  // - public/icon-*.png + public/apple-touch-icon.png
  // Explicit `icons` are also declared here for clarity.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico",
  },
};

// -----------------------------------------------------------------------------
// Viewport — theme-color for browser UI (light/dark)
// -----------------------------------------------------------------------------

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FCFCF9" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0B" },
  ],
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect for Font Awesome CDN */}
        <link
          rel="preconnect"
          href="https://cdnjs.cloudflare.com"
        />

        {/* Icon font — used for hero / service icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* Structured data — Organization + WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdOrganization()),
          }}
        />
      </head>

      <body>
        {/* Top hairline gradient — visual process marker */}
        <div
          className="ribbon-gradient"
          aria-hidden="true"
        />

        {/* Persistent navigation */}
        <Nav />

        {/* Page content */}
        {children}

        {/* Persistent footer */}
        <Footer />

        {/* Analytics — Sabilytics (privacy-friendly) */}
        <Script
          async
          src="https://www.sabilytics.com/script.js"
          data-site="8o2d6bnchthb"
          data-domain="aqinode.click"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
