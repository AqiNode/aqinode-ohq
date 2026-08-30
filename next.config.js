/**
 * Next.js Configuration — Redirects and security headers.
 *
 * - Redirects legacy `.html` URLs to clean routes (from previous static build)
 * - Adds basic hardening headers to all responses
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Legacy redirects — handle old static `*.html` links.
   * Catches index.html, about.html, etc. and forwards to canonical route.
   */
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/products.html", destination: "/products", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/faq.html", destination: "/faq", permanent: true },
      { source: "/careers.html", destination: "/careers", permanent: true },
      { source: "/privacy.html", destination: "/privacy", permanent: true },
      { source: "/terms.html", destination: "/terms", permanent: true },
      { source: "/:path*.html", destination: "/:path*", permanent: true },
    ];
  },

  /**
   * Security headers — applied to all routes.
   * `nosniff` prevents MIME sniffing, `DENY` blocks framing, strict referrer policy.
   */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
