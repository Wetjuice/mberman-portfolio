/* ============================================================
   MARCUS REEVE — Portfolio Interactions
   ============================================================ */

(function () {
  'use strict';

  /* --- Cursor Glow --- */
  const glow = document.getElementById('cursor-glow');
  if (glow && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    (function animate() {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      requestAnimationFrame(animate);
    })();
  } else if (glow) {
    glow.style.display = 'none';
  }

  /* --- Hero Letter Stagger --- */
  const heroTitle = document.querySelector('.hero__title');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.innerHTML = '';
    let charIndex = 0;
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      if (text[i] === ' ') {
        span.innerHTML = '&nbsp;';
        span.className = 'char';
        span.style.animationDelay = charIndex * 0.025 + 's';
      } else {
        span.textContent = text[i];
        span.className = 'char';
        span.style.animationDelay = charIndex * 0.025 + 's';
      }
      heroTitle.appendChild(span);
      charIndex++;
    }
  }

  /* --- Scroll Reveal (IntersectionObserver) --- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* --- Parallax (Hero Geo Shape) --- */
  const heroGeo = document.querySelector('.hero__geo');
  if (heroGeo) {
    window.addEventListener('scroll', function () {
      var scrollY = window.pageYOffset;
      heroGeo.style.transform = 'rotate(15deg) translateY(' + scrollY * 0.15 + 'px)';
    }, { passive: true });
  }

  /* --- Mobile Nav Toggle --- */
  const navToggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

})();
