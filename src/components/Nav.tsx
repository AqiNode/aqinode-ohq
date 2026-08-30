/**
 * Nav — Site navigation with theme toggle and mobile drawer.
 *
 * Features:
 * - Fixed top nav with scroll state (adds `scrolled` class after 20px)
 * - Active link highlighting via `usePathname`
 * - Theme toggle (light/dark) persisted to localStorage and `document.documentElement.dataset.theme`
 * - Mobile drawer with overlay and body scroll lock
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navLinks, siteConfig } from "@/lib/site";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function Nav() {
  const pathname = usePathname();

  // UI state
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // ---------------------------------------------------------------------------
  // Theme — restore saved preference or system preference on mount
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const savedTheme =
      typeof window !== "undefined"
        ? (localStorage.getItem("aqinode-theme") as "light" | "dark" | null)
        : null;

    const systemPrefersDark =
      typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)").matches : true;

    const resolvedTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

    setTheme(resolvedTheme);
    document.documentElement.dataset.theme = resolvedTheme;

    // Scroll listener for navbar background
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /** Toggle between light and dark, persist to localStorage */
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("aqinode-theme", nextTheme);
  };

  // ---------------------------------------------------------------------------
  // Body scroll lock when mobile menu is open
  // ---------------------------------------------------------------------------

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      {/* --------------------------------------------------------------- */}
      {/* Top navbar                                                       */}
      {/* --------------------------------------------------------------- */}
      <nav
        id="navbar"
        className={isScrolled ? "scrolled" : ""}
      >
        <div className="container">
          <div className="nav-inner">
            {/* Brand */}
            <Link
              href="/"
              className="nav-logo"
            >
              <img
                src="/img/logo.png"
                alt="AqiNode logo"
                width={30}
                height={30}
              />
              <span>
                <em>Aqi</em>Node
              </span>
            </Link>

            {/* Desktop links */}
            <ul className="nav-links">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={isActive ? "active" : ""}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Right actions */}
            <div className="nav-right">
              <Link
                href="/contact"
                className="btn-nav"
              >
                Let&apos;s Talk
              </Link>

              {/* Theme toggle — sun/moon swap via CSS */}
              <button
                className="theme-toggle"
                aria-label="Toggle theme"
                onClick={toggleTheme}
              >
                <span className="theme-icon sun">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="5"
                    />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                </span>

                <span className="theme-icon moon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                </span>
              </button>

              {/* Hamburger — visible <1024px */}
              <button
                className={`hamburger ${isOpen ? "open" : ""}`}
                aria-label="Menu"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --------------------------------------------------------------- */}
      {/* Mobile overlay + drawer                                           */}
      {/* --------------------------------------------------------------- */}
      <div
        className={`mobile-overlay ${isOpen ? "open" : ""}`}
        style={{
          display: isOpen ? "block" : "none",
        }}
        onClick={() => setIsOpen(false)}
      />

      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <button
          className="mobile-menu-close"
          aria-label="Close menu"
          onClick={() => setIsOpen(false)}
        >
          ×
        </button>

        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        ))}

        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            alert("Coming soon");
          }}
        >
          Chat Arc AI (Coming Soon)
        </a>

        <a
          href={siteConfig.whatsapp}
          target="_blank"
          rel="noopener"
        >
          WhatsApp
        </a>

        <Link
          href="/terms"
          onClick={() => setIsOpen(false)}
        >
          Terms
        </Link>

        <Link
          href="/privacy"
          onClick={() => setIsOpen(false)}
        >
          Privacy
        </Link>

        <button
          className="theme-toggle--mobile"
          onClick={toggleTheme}
        >
          <span>Switch Theme</span>
        </button>
      </div>
    </>
  );
}
