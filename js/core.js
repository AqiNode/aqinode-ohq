/* ============================================================
   AqiNode JS Framework — core.js
   Mini component system + shared behaviors
   ============================================================ */

// ── Component Registry ──────────────────────────────────────
const AqiNode = {
  _components: {},

  register(name, renderFn) {
    this._components[name] = renderFn;
  },

  mount() {
    document.querySelectorAll('[data-component]').forEach(el => {
      const name = el.dataset.component;
      if (this._components[name]) {
        el.outerHTML = this._components[name](el.dataset);
      }
    });
    this._postMount();
  },

  _postMount() {
    initNav();
    initCursor();
    initReveal();
    markActiveNav();
    initTheme();
  }
};

// ── NAVBAR COMPONENT ────────────────────────────────────────
AqiNode.register('navbar', () => `
  <nav id="navbar">
    <div class="container">
      <div class="nav-inner">

        <a href="index.html" class="nav-logo">
          <img src="img/logo.png" alt="AqiNode logo">
          <span><em>Aqi</em>Node</span>
        </a>

        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="products.html">Products</a></li>
          <li><a href="careers.html">Careers</a></li>
          <li><a href="faq.html">FAQ</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>

        <div class="nav-right">
          <a href="contact.html" class="btn-nav">Let's Talk</a>
          <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
            <span class="theme-icon sun">☀️</span>
            <span class="theme-icon moon">🌙</span>
          </button>
          <button class="hamburger" id="hamburger" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>

      </div>
    </div>
  </nav>
  <div class="mobile-overlay" id="mobileOverlay"></div>
  <div class="mobile-menu" id="mobileMenu">
    <button class="mobile-menu-close" id="mobileClose" aria-label="Close menu"></button>
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="products.html">Products</a>
    <a href="careers.html">Careers</a>
    <a href="faq.html">FAQ</a>
    <a href="contact.html">Contact</a>
    <a href="terms.html">Terms and Conditions</a>
    <a href="privacy.html">Privacy Policy</a>
    
     <a href="#">Chat Arc AI (Coming Soon)</a>   
    <button class="theme-toggle theme-toggle--mobile" id="themeToggleMobile" aria-label="Toggle theme">

    </button>
  </div>
`);

// ── FOOTER COMPONENT ────────────────────────────────────────
AqiNode.register('footer', () => `
  <footer id="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="nav-logo">
            <img src="img/logo.png" alt="AqiNode">
            <span><em>Aqi</em>Node</span>
          </a>
          <p>Building intelligent, scalable digital systems that solve real-world problems and grow with your business.</p>
          <div class="footer-socials">
            <a href="https://x.com/aqinode_hq" target="_blank" rel="noopener" class="social-btn" title="X / Twitter">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="mailto:aqinodelabs@gmail.com" class="social-btn" title="Email">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
            <a href="https://wa.me/2347057182425" target="_blank" rel="noopener" class="social-btn" title="WhatsApp">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="about.html">About Us</a></li>
            <li><a href="products.html">Our Work</a></li>
            <li><a href="careers.html">Careers</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="about.html#web">Web & Mobile</a></li>
            <li><a href="about.html#ai">Artificial Intelligence</a></li>
            <li><a href="about.html#software">Software Solutions</a></li>
            <li><a href="about.html#automation">Automation</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a href="faq.html">FAQ</a></li>
            <li><a href="mailto:aqinodelabs@gmail.com">Email Us</a></li>
            <li><a href="https://wa.me/2347057182425">WhatsApp</a></li>
            <li><a href="https://x.com/aqinode_hq">Follow @X</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© <span id="footerYear"></span> <span>AqiNode</span>. All rights reserved.</p>
        <p>Built with <span>♥</span> — aqinodelabs@gmail.com</p>
      </div>
    </div>
  </footer>
  <div id="cursor"><div class="dot"></div><div class="ring"></div></div>
`);

// ── CURSOR ───────────────────────────────────────────────────
function initCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor || window.innerWidth < 768) return;
  const dot = cursor.querySelector('.dot');
  const ring = cursor.querySelector('.ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function tick() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(tick);
  }
  tick();

  document.querySelectorAll('a, button, .card, .btn, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '48px'; ring.style.height = '48px';
      ring.style.borderColor = 'rgba(26,140,255,0.7)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '32px'; ring.style.height = '32px';
      ring.style.borderColor = 'rgba(0,180,255,0.5)';
    });
  });
}

// ── NAV ─────────────────────────────────────────────────────
function initNav() {
  const nav = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mobileOverlay');
  const closeBtn = document.getElementById('mobileClose');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  if (hamburger && mobileMenu && overlay) {
    function openMenu() {
      hamburger.classList.add('open');
      mobileMenu.classList.add('open');
      overlay.style.display = 'block';
      requestAnimationFrame(() => overlay.classList.add('open'));
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(() => { overlay.style.display = 'none'; }, 400);
    }

    hamburger.addEventListener('click', () => {
      mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    });

    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });
  }

  const year = document.getElementById('footerYear');
  if (year) year.textContent = new Date().getFullYear();
}

// ── ACTIVE NAV ──────────────────────────────────────────────
function markActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ── SCROLL REVEAL ────────────────────────────────────────────
function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}

// ── COUNTER ANIMATION ────────────────────────────────────────
function animateCounter(el, target, duration = 1800, suffix = '') {
  let start = 0;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ── THEME ────────────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('aqinode-theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const resolved = saved || (systemDark ? 'dark' : 'light');

  document.documentElement.dataset.theme = resolved;

  if (!saved) {
    showToast(resolved === 'dark'
      ? '🌙 Dark mode detected from your system'
      : '☀️ Light mode detected from your system'
    );
  }

  document.addEventListener('click', function(e) {
    const btn = e.target.closest('#themeToggle, #themeToggleMobile');
    if (!btn) return;

    const current = document.documentElement.dataset.theme;
    const next = current === 'dark' ? 'light' : 'dark';

    document.documentElement.dataset.theme = next;
    localStorage.setItem('aqinode-theme', next);
    showToast(next === 'dark' ? '🌙 Switched to dark mode' : '☀️ Switched to light mode');
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (localStorage.getItem('aqinode-theme')) return;
    const auto = e.matches ? 'dark' : 'light';
    document.documentElement.dataset.theme = auto;
    showToast(auto === 'dark' ? '🌙 System switched to dark' : '☀️ System switched to light');
  });
}

// ── TOAST ────────────────────────────────────────────────────
function showToast(message) {
  document.querySelectorAll('.toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-dot"></span>${message}`;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 3000);
}

window.AqiNode = AqiNode;
window.animateCounter = animateCounter;
