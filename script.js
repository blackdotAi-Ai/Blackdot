/* ============================================================
   Ghost AI — script.js
   Handles: navbar scroll, mobile menu, countdown, form, reveal
   ============================================================ */

'use strict';

/* ============================================================
   1. NAVBAR — add .scrolled class on scroll
   ============================================================ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };

window.addEventListener("scroll", () => {
  const logo = document.querySelector(".logo-icon");

  let scroll = window.scrollY;

  logo.style.transform = `rotateY(${scroll * 0.5}deg)`;
});


/* ============================================================
   2. HAMBURGER — toggle mobile menu
   ============================================================ */
(function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a mobile link is clicked
  menu.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();


/* ============================================================
   3. COUNTDOWN TIMER
   Target: 60 days from today
   ============================================================ */
(function initCountdown() {
  const daysEl    = document.getElementById('days');
  const hoursEl   = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  if (!daysEl) return;

  // Set launch date 60 days from right now
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 60);
  launchDate.setHours(0, 0, 0, 0);

  /**
   * Pads a number to two digits.
   * @param {number} n
   * @returns {string}
   */
  const pad = n => String(Math.max(0, n)).padStart(2, '0');

  /**
   * Briefly adds a flip animation class to a number element
   * when its value changes, for a subtle visual pop.
   * @param {HTMLElement} el
   * @param {string} newVal
   */
  const updateUnit = (el, newVal) => {
    if (el.textContent !== newVal) {
      el.textContent = newVal;
      el.classList.add('flip');
      setTimeout(() => el.classList.remove('flip'), 200);
    }
  };

  const tick = () => {
    const now  = new Date();
    const diff = launchDate - now;

    if (diff <= 0) {
      // Countdown complete
      daysEl.textContent = hoursEl.textContent =
      minutesEl.textContent = secondsEl.textContent = '00';
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const d = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    updateUnit(daysEl,    pad(d));
    updateUnit(hoursEl,   pad(h));
    updateUnit(minutesEl, pad(m));
    updateUnit(secondsEl, pad(s));
  };

  tick();
  setInterval(tick, 1000);
})();


/* ============================================================
   4. EMAIL SIGNUP FORM
   ============================================================ */
(function initSignupForm() {
  const form    = document.getElementById('signupForm');
  const input   = document.getElementById('emailInput');
  const message = document.getElementById('formMessage');
  if (!form) return;

  /**
   * Very simple email format check.
   * @param {string} email
   * @returns {boolean}
   */
  const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  form.addEventListener('submit', e => {
    e.preventDefault();

    const email = input.value.trim();
    message.className = 'form-message'; // reset classes

    if (!email) {
      message.textContent = 'Please enter your email address.';
      message.classList.add('error');
      input.focus();
      return;
    }

    if (!isValidEmail(email)) {
      message.textContent = 'Please enter a valid email address.';
      message.classList.add('error');
      input.focus();
      return;
    }

    // Simulate a successful signup (replace with real API call)
    message.textContent = '✓ You\'re on the ghost list. We\'ll be in touch.';
    message.classList.add('success');
    input.value = '';

    // Optionally log to console for dev
    console.log('[Ghost AI] Early access sign-up:', email);
  });
})();


/* ============================================================
   5. SCROLL REVEAL — fade in sections on scroll
   ============================================================ */
(function initScrollReveal() {
  // Add .reveal class to all target elements
  const selectors = [
    '.section-tag',
    '.section-heading',
    '.body-text',
    '.stat-row',
    '.about-visual',
    '.feature-card',
    '.countdown',
    '.signup-box',
  ];

  const elements = document.querySelectorAll(selectors.join(', '));
  elements.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger cards slightly
    if (el.classList.contains('feature-card')) {
      const delay = (el.dataset.index || 0) * 120;
      el.style.transitionDelay = `${delay}ms`;
    }
  });

  // IntersectionObserver for efficient scroll detection
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();


/* ============================================================
   6. SMOOTH ACTIVE NAV LINK HIGHLIGHTING
   Highlights nav links as the user scrolls past sections.
   ============================================================ */
(function initActiveSections() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .mob-link');

  const highlight = () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.45) current = sec.id;
    });

    navLinks.forEach(link => {
      link.style.color = '';
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.style.color = 'var(--cyan)';
      }
    });
  };

  window.addEventListener('scroll', highlight, { passive: true });
})();
