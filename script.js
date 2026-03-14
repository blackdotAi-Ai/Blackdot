/* ================================================================
   GHOST AI — script.js
   Blackdot Company | Frontend Logic & Animations
   ================================================================ */

'use strict';

/* ----------------------------------------------------------------
   PLACEHOLDER API / BACKEND FUNCTIONS
   These functions are stubs — replace with real implementations
   when backend integration is ready.
---------------------------------------------------------------- */

/**
 * Placeholder: Save email to database / mailing list
 * @param {string} email - The user's email address
 * @returns {Promise<boolean>} - Success status
 */
async function saveEmailToDatabase(email) {
  // TODO: Replace with real API call
  // Example:
  // const res = await fetch('/api/waitlist', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, timestamp: new Date().toISOString() })
  // });
  // return res.ok;

  console.log(`[Ghost AI] Email queued for storage: ${email}`);
  return new Promise((resolve) => setTimeout(() => resolve(true), 800));
}

/**
 * Placeholder: Connect to persistent storage layer
 * @returns {Promise<void>}
 */
async function connectStorage() {
  // TODO: Initialize IndexedDB / localStorage / backend sync
  console.log('[Ghost AI] Storage connection initialized (placeholder)');
}

/**
 * Placeholder: Initialize AI inference module
 * @param {object} config - AI configuration options
 * @returns {Promise<void>}
 */
async function initializeAI(config = {}) {
  // TODO: Bootstrap Ghost AI runtime, load models, establish WS connection
  const defaults = {
    model: 'ghost-v1',
    mode: 'autonomous',
    learning: true,
    ...config,
  };
  console.log('[Ghost AI] AI runtime initialized (placeholder)', defaults);
}

/**
 * Placeholder: Track analytics event
 * @param {string} event - Event name
 * @param {object} data - Event payload
 */
function trackEvent(event, data = {}) {
  // TODO: Connect to Mixpanel / PostHog / Segment
  console.log(`[Ghost AI Analytics] ${event}`, data);
}

/**
 * Placeholder: Subscribe to Ghost AI update newsletter
 * @param {string} email
 * @param {string[]} preferences
 */
async function subscribeNewsletter(email, preferences = ['launch', 'updates']) {
  // TODO: Connect to Mailchimp / Resend / Brevo API
  console.log(`[Ghost AI] Newsletter subscription queued: ${email}`, preferences);
}

/* ================================================================
   CORE INITIALIZATION
================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Boot sequence
  initializeAI({ mode: 'preview' });
  connectStorage();

  // Initialize all modules
  initNavbar();
  initHamburger();
  initSmoothScroll();
  initScrollReveal();
  initNeuralCanvas();
  initParticles();
  initCountdown();
  initActiveNavLinks();

  // Track page load
  trackEvent('page_view', { page: 'home', timestamp: Date.now() });
});

/* ================================================================
   1. NAVBAR — Scroll Behavior & Glass Effect
================================================================ */

function initNavbar() {
  const navbar = document.getElementById('navbar');

  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run on load
}

/* ================================================================
   2. HAMBURGER MENU
================================================================ */

function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on nav link click
  navLinks.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ================================================================
   3. SMOOTH SCROLLING
================================================================ */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
        10
      ) || 72;

      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
      trackEvent('nav_click', { target: targetId });
    });
  });
}

/* ================================================================
   4. ACTIVE NAV LINKS (Intersection Observer)
================================================================ */

function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${entry.target.id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ================================================================
   5. SCROLL REVEAL ANIMATIONS
================================================================ */

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el    = entry.target;
        const delay = parseInt(el.dataset.delay || '0', 10);

        setTimeout(() => {
          el.classList.add('visible');
        }, delay);

        observer.unobserve(el);
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ================================================================
   6. NEURAL NETWORK CANVAS — Hero Background
================================================================ */

function initNeuralCanvas() {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, nodes, animId;

  const NODE_COUNT  = 55;
  const LINK_DIST   = 180;
  const NODE_SPEED  = 0.4;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createNodes() {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * NODE_SPEED,
      vy: (Math.random() - 0.5) * NODE_SPEED,
      r:  Math.random() * 2 + 1,
      pulse: Math.random() * Math.PI * 2,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Update positions
    nodes.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      n.pulse += 0.02;

      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });

    // Draw links
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx   = nodes[i].x - nodes[j].x;
        const dy   = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < LINK_DIST) {
          const alpha = (1 - dist / LINK_DIST) * 0.35;
          const grad  = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
          grad.addColorStop(0, `rgba(0, 245, 255, ${alpha})`);
          grad.addColorStop(1, `rgba(191, 0, 255, ${alpha * 0.5})`);

          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = grad;
          ctx.lineWidth   = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach((n) => {
      const r = n.r + Math.sin(n.pulse) * 0.5;

      // Glow
      const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 5);
      glow.addColorStop(0, 'rgba(0, 245, 255, 0.3)');
      glow.addColorStop(1, 'rgba(0, 245, 255, 0)');
      ctx.beginPath();
      ctx.arc(n.x, n.y, r * 5, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 245, 255, 0.8)`;
      ctx.fill();
    });

    animId = requestAnimationFrame(draw);
  }

  function init() {
    resize();
    createNodes();
    if (animId) cancelAnimationFrame(animId);
    draw();
  }

  init();

  const resizeObs = new ResizeObserver(() => {
    resize();
    createNodes();
  });
  resizeObs.observe(canvas.parentElement);
}

/* ================================================================
   7. PARTICLE ANIMATION — Hero Background
================================================================ */

function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const PARTICLE_COUNT = 25;

  function createParticle() {
    const el = document.createElement('div');
    el.className = 'particle';

    const size  = Math.random() * 3 + 1;
    const left  = Math.random() * 100;
    const dur   = Math.random() * 12 + 8;
    const delay = Math.random() * 10;
    const drift = (Math.random() - 0.5) * 150;

    el.style.cssText = `
      width:  ${size}px;
      height: ${size}px;
      left:   ${left}%;
      bottom: -10px;
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
      --drift: ${drift}px;
      background: ${Math.random() > 0.5 ? 'var(--cyan)' : 'var(--purple)'};
      box-shadow: 0 0 ${size * 4}px currentColor;
    `;

    container.appendChild(el);

    // Remove and recreate after animation
    el.addEventListener('animationend', () => {
      el.remove();
      createParticle();
    });
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    setTimeout(() => createParticle(), Math.random() * 5000);
  }
}

/* ================================================================
   8. COUNTDOWN TIMER
================================================================ */

function initCountdown() {
  // Target: set your own launch date here
  const LAUNCH_DATE = new Date('2025-09-01T00:00:00Z');

  const els = {
    days:    document.getElementById('days'),
    hours:   document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
  };

  if (!els.days) return;

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function updateCountdown() {
    const now  = Date.now();
    const diff = LAUNCH_DATE.getTime() - now;

    if (diff <= 0) {
      // Launch has passed
      Object.values(els).forEach((el) => { if (el) el.textContent = '00'; });
      return;
    }

    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000)  / 60000);
    const seconds = Math.floor((diff % 60000)    / 1000);

    // Animate digit flip on change
    function setVal(el, val) {
      const padded = pad(val);
      if (el && el.textContent !== padded) {
        el.style.transform = 'scale(1.05)';
        el.style.color     = 'var(--cyan)';
        el.textContent     = padded;
        setTimeout(() => {
          el.style.transform = '';
          el.style.color     = '';
        }, 150);
      }
    }

    setVal(els.days,    days);
    setVal(els.hours,   hours);
    setVal(els.minutes, minutes);
    setVal(els.seconds, seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* ================================================================
   9. EMAIL FORM VALIDATION & SUBMISSION
================================================================ */

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

async function handleEmailSubmit() {
  const emailInput = document.getElementById('emailInput');
  const submitBtn  = document.getElementById('submitBtn');
  const formError  = document.getElementById('formError');
  const formSuccess = document.getElementById('formSuccess');

  if (!emailInput || !submitBtn) return;

  const email = emailInput.value.trim();

  // Reset state
  formError.textContent = '';
  emailInput.classList.remove('error');

  // Validate
  if (!email) {
    formError.textContent = 'Please enter your email address.';
    emailInput.classList.add('error');
    emailInput.focus();
    return;
  }

  if (!validateEmail(email)) {
    formError.textContent = 'Please enter a valid email address.';
    emailInput.classList.add('error');
    emailInput.focus();
    return;
  }

  // Submit state
  submitBtn.disabled = true;
  submitBtn.textContent = 'Securing your spot...';
  submitBtn.style.opacity = '0.7';

  try {
    const success = await saveEmailToDatabase(email);

    if (success) {
      // Also subscribe to newsletter
      await subscribeNewsletter(email);

      // Track conversion
      trackEvent('waitlist_signup', { email, source: 'hero_form' });

      // Show success
      const signupForm = document.getElementById('signupForm');
      if (signupForm) signupForm.style.display = 'none';
      if (formSuccess) formSuccess.classList.add('visible');

    } else {
      throw new Error('Submission failed');
    }

  } catch (err) {
    formError.textContent = 'Something went wrong. Please try again shortly.';
    submitBtn.disabled    = false;
    submitBtn.innerHTML   = '<span class="btn-glow"></span>Get Early Access';
    submitBtn.style.opacity = '';
    console.error('[Ghost AI] Form submission error:', err);
  }
}

// Also allow Enter key in email input
document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('emailInput');
  if (emailInput) {
    emailInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleEmailSubmit();
    });
  }
});

/* ================================================================
   10. ADDITIONAL ANIMATION TRIGGERS
================================================================ */

/**
 * Animate progress bars in roadmap section when they come into view
 */
function initProgressBars() {
  const progressBars = document.querySelectorAll('.progress-bar');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  progressBars.forEach((bar) => observer.observe(bar));
}

/**
 * Add tilt / mouse-tracking effect to feature cards
 */
function initCardTilt() {
  const cards = document.querySelectorAll('.feature-card, .use-case-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;

      card.style.transform = `
        translateY(-8px)
        rotateX(${-y * 8}deg)
        rotateY(${x * 8}deg)
      `;

      // Move glow relative to cursor
      const glow = card.querySelector('.card-glow');
      if (glow) {
        glow.style.left = `${(x + 0.5) * 100}%`;
        glow.style.top  = `${(y + 0.5) * 100}%`;
        glow.style.transform = 'translate(-50%, -50%)';
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/**
 * Typing animation for hero badge text
 */
function initTypingEffect() {
  const badge = document.querySelector('.hero-badge span:last-child');
  if (!badge) return;

  const original = badge.textContent;
  const texts    = [
    'Blackdot Intelligence Lab — 2025',
    'Invisible AI. Real Results.',
    'The Future Runs Quietly.',
    'Autonomous. Adaptive. Always.',
  ];

  let index    = 0;
  let charIdx  = 0;
  let deleting = false;
  let paused   = false;

  function type() {
    if (paused) return;

    const current = texts[index % texts.length];

    if (!deleting) {
      badge.textContent = current.substring(0, charIdx + 1);
      charIdx++;

      if (charIdx === current.length) {
        paused = true;
        setTimeout(() => { paused = false; deleting = true; }, 2800);
      }
    } else {
      badge.textContent = current.substring(0, charIdx - 1);
      charIdx--;

      if (charIdx === 0) {
        deleting = false;
        index++;
      }
    }

    const speed = deleting ? 35 : charIdx === 1 ? 400 : 75;
    setTimeout(type, speed);
  }

  // Start after page load animation
  setTimeout(type, 2000);
}

/**
 * Counter animation for stat numbers
 */
function initCounterAnimation() {
  const stats = document.querySelectorAll('.bd-stat-num');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el  = entry.target;
        const raw = el.textContent.trim();

        // Only animate numbers
        if (!/^\d/.test(raw)) return;

        const hasPlus = raw.includes('+');
        const hasK    = raw.includes('K');
        const hasM    = raw.includes('M');
        const target  = parseFloat(raw.replace(/[^0-9.]/g, ''));

        let start = 0;
        const duration = 1800;
        const startTime = performance.now();

        function update(now) {
          const elapsed  = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased    = 1 - Math.pow(1 - progress, 3);
          const current  = Math.round(start + (target - start) * eased);

          let display = String(current);
          if (hasK) display += 'K';
          if (hasM) display += 'M';
          if (hasPlus) display += '+';

          el.textContent = display;

          if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach((el) => observer.observe(el));
}

/* ================================================================
   BOOT — Run additional features after DOM is ready
================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initProgressBars();
  initCardTilt();
  initTypingEffect();
  initCounterAnimation();
});

/* ================================================================
   UTILITY: Debounce
================================================================ */

function debounce(fn, delay = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

window.addEventListener('resize', debounce(() => {
  // Re-trigger canvas resize via ResizeObserver already attached
}, 200));

/* ================================================================
   Export public API (for future module use or extension)
================================================================ */

window.GhostAI = {
  saveEmailToDatabase,
  connectStorage,
  initializeAI,
  trackEvent,
  subscribeNewsletter,
  handleEmailSubmit,
  version: '1.0.0-preview',
};
