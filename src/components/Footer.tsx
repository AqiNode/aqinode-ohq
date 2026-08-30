/**
 * Footer — Site-wide footer with brand, navigation, and social links.
 *
 * Layout:
 * - 4-col grid (brand + 3 link columns) on desktop
 * - Stacks to 2-col / 1-col on tablet / mobile
 * - Bottom bar with copyright
 */

import Link from "next/link";

import { siteConfig } from "@/lib/site";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function Footer() {
  return (
    <footer id="footer">
      <div className="container">
        {/* --------------------------------------------------------------- */}
        {/* Main grid                                                       */}
        {/* --------------------------------------------------------------- */}
        <div className="footer-grid">
          {/* Brand column */}
          <div className="footer-brand">
            <Link
              href="/"
              className="nav-logo"
            >
              <img
                src="/img/logo.png"
                alt="AqiNode"
                width={30}
                height={30}
              />
              <span>
                <em>Aqi</em>Node
              </span>
            </Link>

            <p>Building products in web, AI, and automation that people actually use.</p>

            <div className="footer-socials">
              <a
                href={siteConfig.twitterUrl}
                target="_blank"
                rel="noopener"
                className="social-btn"
                aria-label="X / Twitter"
              >
                𝕏
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="social-btn"
                aria-label="Email"
              >
                ✉
              </a>

              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener"
                className="social-btn"
                aria-label="WhatsApp"
              >
                ◉
              </a>
            </div>
          </div>

          {/* Company links */}
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/products">Products</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Products links */}
          <div className="footer-col">
            <h4>Products</h4>
            <ul>
              <li>
                <Link href="/products">Webyte AI</Link>
              </li>
              <li>
                <Link href="/products">Aven</Link>
              </li>
              <li>
                <Link href="/about">Our Stack</Link>
              </li>
            </ul>
          </div>

          {/* Resources links */}
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`}>Email Us</a>
              </li>
              <li>
                <a href={siteConfig.whatsapp}>WhatsApp</a>
              </li>
              <li>
                <a href={siteConfig.twitterUrl}>Follow @X</a>
              </li>
            </ul>
          </div>
        </div>

        {/* --------------------------------------------------------------- */}
        {/* Bottom bar                                                      */}
        {/* --------------------------------------------------------------- */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} <span>AqiNode</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
