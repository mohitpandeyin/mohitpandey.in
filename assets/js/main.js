// ============================================================
// Mohit Pandey — Senior UX Developer Portfolio
// Interactive behaviors & micro-interactions
// ============================================================

// ===== Theme Toggle =====
(function () {
  const toggle = document.getElementById('themeToggle');
  const icon = toggle?.querySelector('i');
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');

  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    if (icon) {
      icon.className = t === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
    }
  }

  setTheme(theme);

  toggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
})();

// ===== Navbar Scroll Effect =====
(function () {
  const navbar = document.getElementById('mp-navbar');
  if (!navbar) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 40) {
          navbar.classList.add('mp-scrolled');
        } else {
          navbar.classList.remove('mp-scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ===== Scroll Animations (IntersectionObserver) =====
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('mp-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('.mp-animate-on-scroll').forEach((el) => {
    observer.observe(el);
  });
})();

// ===== Smooth Scroll for Nav Links =====
(function () {
  document.querySelectorAll('.mp-nav-link[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

// ===== Scroll to Top =====
(function () {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 400) {
          btn.classList.add('mp-visible');
        } else {
          btn.classList.remove('mp-visible');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ===== Active Nav Link Highlight =====
(function () {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.mp-nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle(
              'mp-active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
})();

