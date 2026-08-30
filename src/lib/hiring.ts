/**
 * Hiring Config — Single place to toggle hiring status site-wide.
 *
 * Careers hero reads from here via `HiringStatusCard`. No rebuild of components needed
 * — just edit this file and redeploy (or wire to CMS / API later).
 *
 * Status types:
 * - "open"      → actively hiring, shows roles and apply CTA
 * - "selective" → not broadly hiring, but open to exceptional outliers
 * - "closed"    → not hiring right now, invites speculative outreach
 */

export type HiringStatus = "open" | "selective" | "closed";

export type HiringRole = {
  title: string;
  type: string; // e.g. "Full-time • Remote"
  location: string;
};

export type HiringConfig = {
  status: HiringStatus;
  badge: string; // e.g. "Hiring" / "Selective" / "Not hiring"
  title: string;
  description: string;
  roles: HiringRole[];
  cta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
};

// -----------------------------------------------------------------------------
// Edit this object to change hiring status instantly
// -----------------------------------------------------------------------------

export const hiringConfig: HiringConfig = {
  // Toggle between "open" | "selective" | "closed"
  status: "closed",

  badge: "Not hiring — selective",

  title: "Not hiring right now",

  description:
    "We're a small, focused team shipping two products live. We review every exceptional application — if you build at a high bar, we want to hear from you.",

  roles: [
    // Example when open — uncomment to show:
    // { title: "Founding Engineer, Web", type: "Full-time • Remote", location: "Nigeria / Remote" },
    // { title: "AI Engineer — Agents", type: "Full-time • Remote", location: "Remote" },
  ],

  cta: {
    label: "Send your work",
    href: "mailto:aqinodelabs@gmail.com?subject=Application%20—%20AqiNode",
  },

  secondaryCta: {
    label: "What we look for",
    href: "/about",
  },
};

// Helper for styling
export const hiringStatusMeta: Record<
  HiringStatus,
  { dot: string; badgeClass: string }
> = {
  open: {
    dot: "#14B86E", // green
    badgeClass: "hiring-badge--open",
  },
  selective: {
    dot: "#C8A600", // amber
    badgeClass: "hiring-badge--selective",
  },
  closed: {
    dot: "#9A9590", // muted
    badgeClass: "hiring-badge--closed",
  },
};
