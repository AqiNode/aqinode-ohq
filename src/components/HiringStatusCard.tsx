/**
 * HiringStatusCard — Glassmorphic status card for careers hero.
 *
 * Sits INSIDE `page-hero` so it inherits `VideoBackground`'s dark video + scrim.
 * Dynamic: reads from `src/lib/hiring.ts` — toggle `hiringConfig.status` to update
 * hiring state without touching components.
 *
 * Glass: `backdrop-filter: blur(16px) + translucent bg + hairline border`.
 * Works on both themes because hero forces dark vars; card keeps dark context.
 */

import Link from "next/link";

import { hiringConfig, hiringStatusMeta } from "@/lib/hiring";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function HiringStatusCard() {
  const meta = hiringStatusMeta[hiringConfig.status];

  const isOpen = hiringConfig.status === "open";
  const hasRoles = hiringConfig.roles.length > 0;

  return (
    <div
      className="hiring-glass"
      aria-label="Hiring status"
    >
      {/* Header — dot + label + badge */}
      <div className="hiring-glass-header">
        <span className="hiring-glass-label">
          <span
            className="hiring-dot"
            style={{ background: meta.dot }}
            aria-hidden="true"
          />
          <span className="mono">Hiring Status</span>
        </span>

        <span className={`hiring-badge ${meta.badgeClass}`}>{hiringConfig.badge}</span>
      </div>

      {/* Title + description */}
      <h3 className="hiring-glass-title">{hiringConfig.title}</h3>

      <p className="hiring-glass-desc">{hiringConfig.description}</p>

      {/* Roles — only shown when hiring is open/selective and roles exist */}
      {hasRoles && (
        <ul className="hiring-roles">
          {hiringConfig.roles.map((role) => (
            <li
              key={role.title}
              className="hiring-role"
            >
              <div>
                <span className="hiring-role-title">{role.title}</span>
                <span className="hiring-role-meta">
                  {role.type} • {role.location}
                </span>
              </div>

              <span className="hiring-role-arrow">→</span>
            </li>
          ))}
        </ul>
      )}

      {/* Empty state hint when closed */}
      {!hasRoles && !isOpen && (
        <div className="hiring-empty">
          <span className="mono muted">No open roles — speculative applications welcome</span>
        </div>
      )}

      {/* CTAs */}
      <div className="hiring-glass-actions">
        <a
          href={hiringConfig.cta.href}
          className="btn btn-primary hiring-cta"
        >
          {hiringConfig.cta.label}
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </a>

        {hiringConfig.secondaryCta && (
          <Link
            href={hiringConfig.secondaryCta.href}
            className="hiring-secondary"
          >
            {hiringConfig.secondaryCta.label} <span>→</span>
          </Link>
        )}
      </div>

      {/* Footnote */}
      <p className="hiring-footnote mono">
        Reply in 24h • <a href="mailto:aqinodelabs@gmail.com">aqinodelabs@gmail.com</a>
      </p>
    </div>
  );
}
