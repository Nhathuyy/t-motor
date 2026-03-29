// Smooth scroll + đóng menu mobile
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeMobileNav();
  });
});

const header = document.querySelector('.header');
const navToggle = document.querySelector('.nav-toggle');
const mobileDrawer = document.querySelector('[data-mobile-drawer]');
const navBackdrop = document.querySelector('[data-nav-backdrop]');
const navClose = document.querySelector('[data-nav-close]');

function setNavOpen(open) {
  if (!header || !navToggle) return;
  header.classList.toggle('nav-open', open);
  document.body.classList.toggle('nav-open', open);
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  navToggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
  if (mobileDrawer) {
    mobileDrawer.setAttribute('aria-hidden', open ? 'false' : 'true');
  }
}

function closeMobileNav() {
  setNavOpen(false);
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    setNavOpen(!header.classList.contains('nav-open'));
  });
}

if (navBackdrop) {
  navBackdrop.addEventListener('click', closeMobileNav);
}

if (navClose) {
  navClose.addEventListener('click', closeMobileNav);
}

document.querySelectorAll('[data-mobile-menu-logo]').forEach((el) => {
  el.addEventListener('click', () => {
    closeMobileNav();
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileNav();
});

if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

const observerOptions = {
  root: null,
  rootMargin: '0px 0px -80px 0px',
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach((el) => {
  observer.observe(el);
});

// FAQ accordion
document.querySelectorAll('.faq-trigger').forEach((btn) => {
  const panelId = btn.getAttribute('aria-controls');
  const panel = panelId ? document.getElementById(panelId) : null;
  if (!panel) return;

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-trigger').forEach((other) => {
      const pid = other.getAttribute('aria-controls');
      const p = pid ? document.getElementById(pid) : null;
      other.setAttribute('aria-expanded', 'false');
      if (p) p.hidden = true;
    });
    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      panel.hidden = false;
    }
  });
});

document.querySelectorAll('.motor-image img').forEach((img) => {
  img.addEventListener('error', function () {
    this.style.display = 'none';
    this.parentElement.style.background =
      'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)';
    const placeholder = document.createElement('div');
    placeholder.className = 'motor-placeholder';
    placeholder.innerHTML = '🛵<span>Hình ảnh xe</span>';
    this.parentElement.appendChild(placeholder);
  });
});

function initHeroCarousel() {
  const root = document.querySelector('[data-hero-carousel]');
  if (!root) return;

  const track = root.querySelector('[data-carousel-track]');
  const slides = root.querySelectorAll('[data-carousel-slide]');
  const dots = root.querySelectorAll('[data-carousel-goto]');
  if (!track || slides.length === 0) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) root.classList.add('reduced-motion');

  let index = 0;
  let timer;
  const intervalMs = 6200;

  function go(n) {
    index = ((n % slides.length) + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((el, i) => {
      el.classList.toggle('is-active', i === index);
      el.setAttribute('aria-hidden', i === index ? 'false' : 'true');
    });
    dots.forEach((btn, i) => {
      const on = i === index;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }

  function next() {
    go(index + 1);
  }

  function prev() {
    go(index - 1);
  }

  const btnPrev = root.querySelector('[data-carousel-prev]');
  const btnNext = root.querySelector('[data-carousel-next]');
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      prev();
      startAutoplay();
    });
  }
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      next();
      startAutoplay();
    });
  }

  function startAutoplay() {
    clearInterval(timer);
    if (!reduced) timer = setInterval(next, intervalMs);
  }

  function pauseAutoplay() {
    clearInterval(timer);
  }

  dots.forEach((btn) => {
    btn.addEventListener('click', () => {
      go(parseInt(btn.getAttribute('data-carousel-goto'), 10));
      startAutoplay();
    });
  });

  root.addEventListener('mouseenter', pauseAutoplay);
  root.addEventListener('mouseleave', startAutoplay);
  root.addEventListener('focusin', pauseAutoplay);
  root.addEventListener('focusout', () => {
    setTimeout(() => {
      if (!root.contains(document.activeElement)) startAutoplay();
    }, 0);
  });

  go(0);
  startAutoplay();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroCarousel);
} else {
  initHeroCarousel();
}

function initFleetCatalog() {
  const root = document.querySelector('[data-fleet-catalog]');
  if (!root) return;

  const tabs = root.querySelectorAll('[data-fleet-filter]');
  const cards = root.querySelectorAll('[data-fleet-cat]');

  function applyFilter(key) {
    tabs.forEach((tab) => {
      const on = tab.getAttribute('data-fleet-filter') === key;
      tab.classList.toggle('is-active', on);
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    cards.forEach((card) => {
      const cat = card.getAttribute('data-fleet-cat');
      const match = key === 'all' || cat === key;
      card.classList.toggle('fleet-card--hidden', !match);
      card.hidden = !match;
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      applyFilter(tab.getAttribute('data-fleet-filter'));
    });
  });

  applyFilter('all');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFleetCatalog);
} else {
  initFleetCatalog();
}

document.querySelectorAll('.hero-carousel__slide .hero-bike-img').forEach((img) => {
  img.addEventListener('error', function () {
    this.style.opacity = '0.35';
    this.alt = this.alt || 'Hình ảnh xe';
  });
});
