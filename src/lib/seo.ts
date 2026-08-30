/**
 * SEO helpers — JSON-LD generators for structured data.
 *
 * Organization graph is injected in `src/app/layout.tsx` via <script type="application/ld+json">.
 * Breadcrumb helper is available for inner pages (unused by default).
 */

import { siteConfig } from "./site";

// -----------------------------------------------------------------------------
// Organization — describes AqiNode as a company and website publisher
// -----------------------------------------------------------------------------

export function jsonLdOrganization() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        // Primary organization entity
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/img/logo.png`,
        image: `${siteConfig.url}/og.png`,
        email: siteConfig.email,
        description: "AqiNode builds products in web, AI, and automation.",
        sameAs: [siteConfig.twitterUrl],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: siteConfig.email,
          availableLanguage: "English",
        },
      },
      {
        // Associated website entity (publisher = organization)
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
    ],
  };
}

// -----------------------------------------------------------------------------
// Breadcrumb — builds BreadcrumbList from an array of { name, item } pairs
// -----------------------------------------------------------------------------

export function jsonLdBreadcrumb(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}
