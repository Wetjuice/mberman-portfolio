/* ═══════════════════════════════════════════════════
   KIRA TANAKA — Portfolio Script
   Progressive enhancement — content visible by default
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Boot overlay removal ──
  const boot = document.getElementById('bootOverlay');
  if (boot) {
    setTimeout(() => {
      boot.style.pointerEvents = 'none';
    }, 1500);
    // Clean up DOM after animation
    setTimeout(() => {
      boot.remove();
    }, 2500);
  }

  // ── Mobile nav toggle ──
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // ── Scroll reveal (Intersection Observer) ──
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything
    reveals.forEach(el => el.classList.add('visible'));
  }

  // ── Career log typewriter ──
  const logTerminal = document.getElementById('logTerminal');
  if (logTerminal && 'IntersectionObserver' in window) {
    let logRevealed = false;
    const logObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !logRevealed) {
            logRevealed = true;
            const logEntries = logTerminal.querySelectorAll('.log-entry');
            logEntries.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('typed');
              }, i * 400);
            });
            logObserver.unobserve(logTerminal);
          }
        });
      },
      { threshold: 0.3 }
    );
    logObserver.observe(logTerminal);
  } else {
    // Fallback
    document.querySelectorAll('.log-entry').forEach(el => {
      el.style.opacity = '1';
    });
  }

  // ── Smooth scroll for nav (backup for browsers without CSS smooth) ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
