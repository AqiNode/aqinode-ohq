/**
 * Robots — Controls crawler access.
 *
 * All known AI/search bots are explicitly allowed (transparent indexing).
 * Sitemap is exposed via `siteConfig.url`.
 */

import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

// -----------------------------------------------------------------------------
// Robots.txt config
// -----------------------------------------------------------------------------

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
