/**
 * siteConfig — Single source of truth for site-wide constants.
 *
 * Used by:
 * - src/app/layout.tsx (metadata, viewport, JSON-LD)
 * - src/components/Nav.tsx, Footer.tsx (links, email, social)
 * - src/app/sitemap.ts, robots.ts, manifest.ts
 *
 * Keep this in sync with `public/` assets (logo, OG image) and env-based URL overrides.
 */

// -----------------------------------------------------------------------------
// Site configuration
// -----------------------------------------------------------------------------

export const siteConfig = {
  /** Canonical URL — used for metadataBase, sitemap, robots, JSON-LD */
  url: "https://aqinode.click",

  /** Brand name */
  name: "AqiNode",

  /** Default meta description */
  description: "AqiNode builds products in web, AI, and automation — from concept to production.",

  /** Contact email — used for `mailto:` links in hero, footer, contact page */
  email: "aqinodelabs@gmail.com",

  /** Twitter / X handle and URL */
  twitter: "@aqinode_hq",
  twitterUrl: "https://x.com/aqinode_hq",

  /** WhatsApp deep link */
  whatsapp: "https://wa.me/2347057182425",

  /** Default locale */
  locale: "en_NG",

  /** Search verification tokens */
  verification: {
    google: "9g1lIY2tXg8z6fL3Fpay5v7ENpw7-rZ18qMMSo9ETNE" as string,
  },
};

// -----------------------------------------------------------------------------
// Navigation links — used by Nav (desktop + mobile) and Footer
// -----------------------------------------------------------------------------

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/careers", label: "Careers" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];
