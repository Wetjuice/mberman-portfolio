/* ============================================
   V10 — FLOATING GLASS PANEL ENGINE
   Elite Dangerous–inspired cockpit UI
   ============================================ */

(function () {
  'use strict';

  /* -----------------------------------------------
     CONFIG
  ----------------------------------------------- */
  const PANEL_COUNT = 6;
  const PARALLAX_STRENGTH = 2.5;       // degrees max tilt
  const STAR_LAYERS = [
    { count: 220, speed: 0.08, sizeMin: 0.4, sizeMax: 1.2, opacity: 0.35 },
    { count: 140, speed: 0.2,  sizeMin: 0.8, sizeMax: 2.0, opacity: 0.55 },
    { count: 60,  speed: 0.5,  sizeMin: 1.5, sizeMax: 3.0, opacity: 0.8  },
  ];
  const NEBULA_COLORS = [
    { r: 20, g: 30, b: 80 },   // deep blue
    { r: 60, g: 20, b: 90 },   // purple
    { r: 80, g: 50, b: 20 },   // amber hint
  ];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -----------------------------------------------
     STATE
  ----------------------------------------------- */
  let currentPanel = 0;
  let isTransitioning = false;
  let mouseX = 0, mouseY = 0;
  let targetRotX = 0, targetRotY = 0;
  let currentRotX = 0, currentRotY = 0;

  /* -----------------------------------------------
     DOM REFS
  ----------------------------------------------- */
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  const scene = document.getElementById('scene');
  const sceneInner = document.getElementById('scene-inner');
  const panels = document.querySelectorAll('.panel');
  const hudDots = document.querySelectorAll('.hud-dot');
  const ambientGlow = document.getElementById('ambient-glow');
  const indicatorCurrent = document.querySelector('.indicator-current');
  const mobileHint = document.getElementById('mobile-hint');

  /* -----------------------------------------------
     STARFIELD
  ----------------------------------------------- */
  let stars = [];
  let nebulae = [];
  let canvasW, canvasH;

  function initCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvasW = window.innerWidth;
    canvasH = window.innerHeight;
    canvas.width = canvasW * dpr;
    canvas.height = canvasH * dpr;
    canvas.style.width = canvasW + 'px';
    canvas.style.height = canvasH + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createStars() {
    stars = [];
    STAR_LAYERS.forEach(layer => {
      for (let i = 0; i < layer.count; i++) {
        stars.push({
          x: Math.random() * canvasW,
          y: Math.random() * canvasH,
          size: layer.sizeMin + Math.random() * (layer.sizeMax - layer.sizeMin),
          speed: layer.speed,
          baseOpacity: layer.opacity,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.005 + Math.random() * 0.015,
        });
      }
    });
  }

  function createNebulae() {
    nebulae = [];
    for (let i = 0; i < 4; i++) {
      const color = NEBULA_COLORS[i % NEBULA_COLORS.length];
      nebulae.push({
        x: Math.random() * canvasW,
        y: Math.random() * canvasH,
        radius: 150 + Math.random() * 250,
        color: color,
        opacity: 0.015 + Math.random() * 0.02,
        driftX: (Math.random() - 0.5) * 0.05,
        driftY: (Math.random() - 0.5) * 0.03,
      });
    }
  }

  function drawStarfield() {
    ctx.clearRect(0, 0, canvasW, canvasH);

    // Background gradient
    const bgGrad = ctx.createRadialGradient(
      canvasW * 0.5, canvasH * 0.5, 0,
      canvasW * 0.5, canvasH * 0.5, canvasW * 0.7
    );
    bgGrad.addColorStop(0, '#0a1628');
    bgGrad.addColorStop(1, '#030812');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvasW, canvasH);

    // Nebulae
    nebulae.forEach(n => {
      if (!prefersReducedMotion) {
        n.x += n.driftX;
        n.y += n.driftY;
        if (n.x < -n.radius) n.x = canvasW + n.radius;
        if (n.x > canvasW + n.radius) n.x = -n.radius;
        if (n.y < -n.radius) n.y = canvasH + n.radius;
        if (n.y > canvasH + n.radius) n.y = -n.radius;
      }

      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
      grad.addColorStop(0, `rgba(${n.color.r}, ${n.color.g}, ${n.color.b}, ${n.opacity})`);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(n.x - n.radius, n.y - n.radius, n.radius * 2, n.radius * 2);
    });

    // Stars
    stars.forEach(s => {
      if (!prefersReducedMotion) {
        s.x -= s.speed;
        s.twinkle += s.twinkleSpeed;
        if (s.x < -5) {
          s.x = canvasW + 5;
          s.y = Math.random() * canvasH;
        }
      }

      const twinkleVal = 0.5 + 0.5 * Math.sin(s.twinkle);
      const opacity = s.baseOpacity * (0.6 + 0.4 * twinkleVal);

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();

      // Glow for larger stars
      if (s.size > 1.8) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${opacity * 0.15})`;
        ctx.fill();
      }
    });
  }

  /* -----------------------------------------------
     ANIMATION LOOP
  ----------------------------------------------- */
  let rafId;
  function animate() {
    drawStarfield();

    // Smooth parallax interpolation
    if (!prefersReducedMotion) {
      currentRotX += (targetRotX - currentRotX) * 0.06;
      currentRotY += (targetRotY - currentRotY) * 0.06;
      sceneInner.style.transform =
        `rotateX(${currentRotX.toFixed(3)}deg) rotateY(${currentRotY.toFixed(3)}deg)`;
    }

    rafId = requestAnimationFrame(animate);
  }

  /* -----------------------------------------------
     3D PANEL POSITIONING
  ----------------------------------------------- */
  // Define where each non-active panel rests in 3D space
  // [translateX, translateY, translateZ, rotateY, rotateX, opacity]
  function getOffPositions(fromIndex, toIndex, total) {
    const positions = [];
    for (let i = 0; i < total; i++) {
      if (i === toIndex) continue;
      const diff = i - toIndex;
      const absDiff = Math.abs(diff);
      const sign = diff > 0 ? 1 : -1;

      // Stack panels to the sides with increasing depth and rotation
      let tx, tz, ry, op;
      if (absDiff === 1) {
        tx = sign * 420;
        tz = -200;
        ry = sign * -25;
        op = 0.3;
      } else if (absDiff === 2) {
        tx = sign * 680;
        tz = -450;
        ry = sign * -40;
        op = 0.15;
      } else {
        tx = sign * 850;
        tz = -650;
        ry = sign * -50;
        op = 0.05;
      }

      positions.push({ index: i, tx, ty: 0, tz, ry, rx: 0, opacity: op });
    }
    return positions;
  }

  function setPanelPositions(activeIndex, instant) {
    const offPositions = getOffPositions(currentPanel, activeIndex, PANEL_COUNT);

    panels.forEach((panel, i) => {
      if (i === activeIndex) return;

      const pos = offPositions.find(p => p.index === i);
      if (!pos) return;

      if (instant) {
        gsap.set(panel, {
          x: pos.tx,
          y: pos.ty,
          z: pos.tz,
          rotateY: pos.ry,
          rotateX: pos.rx,
          opacity: pos.opacity,
          scale: 0.85,
        });
      } else {
        gsap.to(panel, {
          x: pos.tx,
          y: pos.ty,
          z: pos.tz,
          rotateY: pos.ry,
          rotateX: pos.rx,
          opacity: pos.opacity,
          scale: 0.85,
          duration: 1.2,
          ease: 'power3.inOut',
        });
      }

      panel.classList.remove('active');
      panel.querySelector('.panel-status').textContent = 'STANDBY';
    });
  }

  /* -----------------------------------------------
     PANEL TRANSITIONS
  ----------------------------------------------- */
  function navigateTo(index) {
    if (index === currentPanel || isTransitioning || index < 0 || index >= PANEL_COUNT) return;
    isTransitioning = true;

    const oldPanel = panels[currentPanel];
    const newPanel = panels[index];
    const direction = index > currentPanel ? 1 : -1;
    const accent = newPanel.dataset.accent;

    // Update HUD
    hudDots.forEach(d => {
      d.classList.remove('active', 'amber-active');
      d.removeAttribute('aria-current');
    });
    const activeHud = hudDots[index];
    activeHud.classList.add('active');
    if (accent === 'amber') activeHud.classList.add('amber-active');
    activeHud.setAttribute('aria-current', 'true');

    // Update indicator
    indicatorCurrent.textContent = String(index + 1).padStart(2, '0');
    indicatorCurrent.style.color = accent === 'amber' ? '#F59E0B' : '#22D3EE';

    // Update ambient glow
    ambientGlow.classList.toggle('amber', accent === 'amber');

    // Animate old panel out
    gsap.to(oldPanel, {
      x: direction * -500,
      z: -400,
      rotateY: direction * 30,
      opacity: 0.1,
      scale: 0.8,
      duration: 0.9,
      ease: 'power3.in',
      onComplete() {
        oldPanel.classList.remove('active');
        oldPanel.querySelector('.panel-status').textContent = 'STANDBY';
      }
    });

    // Animate new panel in — start off-screen opposite side
    gsap.set(newPanel, {
      x: direction * 600,
      z: -300,
      rotateY: direction * -35,
      opacity: 0,
      scale: 0.9,
    });

    gsap.to(newPanel, {
      x: 0,
      y: 0,
      z: 0,
      rotateY: 0,
      rotateX: 0,
      opacity: 1,
      scale: 1,
      duration: 1.1,
      ease: 'back.out(1.2)',
      delay: 0.15,
      onStart() {
        newPanel.classList.add('active');
        newPanel.querySelector('.panel-status').textContent = 'ACTIVE';
      },
      onComplete() {
        isTransitioning = false;
        currentPanel = index;
        // Reposition all background panels
        setPanelPositions(index, false);
      }
    });

    // Animate entrance sub-elements for specific panels
    animatePanelContent(index, direction);
  }

  function animatePanelContent(index, direction) {
    const panel = panels[index];

    // Stagger in child elements
    const staggerEls = panel.querySelectorAll(
      '.identity-sigil, .identity-name, .identity-title, .identity-tagline, .identity-stats,' +
      '.dossier-avatar, .dossier-heading, .dossier-text p,' +
      '.ops-card,' +
      '.sys-category,' +
      '.traj-node,' +
      '.transmit-heading, .transmit-sub, .transmit-link, .transmit-form'
    );

    if (staggerEls.length) {
      gsap.fromTo(staggerEls,
        { opacity: 0, y: 20 * direction, },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.05,
          delay: 0.4,
        }
      );
    }

    // Trajectory flight path animation
    if (index === 4) {
      const path = panel.querySelector('.traj-flight-path');
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          delay: 0.6,
        });
      }
    }

    // Systems bars animation
    if (index === 3) {
      const bars = panel.querySelectorAll('.sys-bars i');
      gsap.fromTo(bars,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.02,
          delay: 0.5,
        }
      );
    }
  }

  /* -----------------------------------------------
     INITIALIZE PANEL POSITIONS
  ----------------------------------------------- */
  function initPanels() {
    panels.forEach((panel, i) => {
      if (i === 0) {
        // Home panel starts active
        gsap.set(panel, { x: 0, y: 0, z: 0, rotateY: 0, rotateX: 0, opacity: 1, scale: 1 });
        panel.classList.add('active');
        panel.querySelector('.panel-status').textContent = 'ACTIVE';
      }
    });
    setPanelPositions(0, true);

    // Animate in initial panel content
    const homeEls = panels[0].querySelectorAll(
      '.identity-sigil, .identity-name, .identity-title, .identity-tagline, .identity-stats .stat'
    );
    gsap.fromTo(homeEls,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1, delay: 0.3 }
    );
  }

  /* -----------------------------------------------
     MOUSE PARALLAX
  ----------------------------------------------- */
  function onMouseMove(e) {
    if (prefersReducedMotion) return;
    const cx = window.innerWidth * 0.5;
    const cy = window.innerHeight * 0.5;
    mouseX = (e.clientX - cx) / cx;
    mouseY = (e.clientY - cy) / cy;
    targetRotY = mouseX * PARALLAX_STRENGTH;
    targetRotX = -mouseY * PARALLAX_STRENGTH * 0.6;
  }

  /* -----------------------------------------------
     HUD NAVIGATION
  ----------------------------------------------- */
  function onHudClick(e) {
    const btn = e.target.closest('.hud-dot');
    if (!btn) return;
    const idx = parseInt(btn.dataset.panel, 10);
    navigateTo(idx);
  }

  /* -----------------------------------------------
     KEYBOARD NAVIGATION
  ----------------------------------------------- */
  function onKeyDown(e) {
    // Skip if user is in a form field
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        navigateTo(currentPanel + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        navigateTo(currentPanel - 1);
        break;
      case '1': case '2': case '3': case '4': case '5': case '6':
        navigateTo(parseInt(e.key, 10) - 1);
        break;
      case 'Home':
        e.preventDefault();
        navigateTo(0);
        break;
      case 'End':
        e.preventDefault();
        navigateTo(PANEL_COUNT - 1);
        break;
    }
  }

  /* -----------------------------------------------
     TOUCH / SWIPE
  ----------------------------------------------- */
  let touchStartX = 0;
  let touchStartY = 0;
  let isSwiping = false;

  function onTouchStart(e) {
    // Don't intercept touches on interactive elements
    if (e.target.closest('a, button, input, textarea, .ops-card')) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isSwiping = true;
  }

  function onTouchEnd(e) {
    if (!isSwiping) return;
    isSwiping = false;

    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;

    // Only count horizontal swipes
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;

    if (dx < 0) {
      navigateTo(currentPanel + 1);
    } else {
      navigateTo(currentPanel - 1);
    }
  }

  /* -----------------------------------------------
     OPERATIONS CARD FLIP
  ----------------------------------------------- */
  function initOpsCards() {
    document.querySelectorAll('.ops-card').forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });
    });
  }

  /* -----------------------------------------------
     PERIPHERAL PANEL CLICK
  ----------------------------------------------- */
  function initPanelClicks() {
    panels.forEach((panel, i) => {
      panel.addEventListener('click', (e) => {
        // Only navigate if this panel is NOT the active one
        if (i !== currentPanel && !e.target.closest('.ops-card, a, button, input, textarea')) {
          navigateTo(i);
        }
      });
    });
  }

  /* -----------------------------------------------
     MOBILE HINT
  ----------------------------------------------- */
  function showMobileHint() {
    if (window.innerWidth > 768) return;
    mobileHint.style.opacity = '1';
    setTimeout(() => {
      mobileHint.style.opacity = '0';
    }, 4000);
  }

  /* -----------------------------------------------
     RESIZE HANDLER (debounced)
  ----------------------------------------------- */
  let resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      initCanvas();
      createStars();
      createNebulae();
      // Reposition panels instantly
      setPanelPositions(currentPanel, true);
      gsap.set(panels[currentPanel], { x: 0, y: 0, z: 0, rotateY: 0, rotateX: 0, opacity: 1, scale: 1 });
    }, 150);
  }

  /* -----------------------------------------------
     TRANSMIT FORM
  ----------------------------------------------- */
  function initForm() {
    const form = document.querySelector('.transmit-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.transmit-send');
      const origText = btn.innerHTML;
      btn.innerHTML = '<span class="transmit-send-icon" aria-hidden="true">&gt;&gt;</span> TRANSMITTED';
      btn.style.borderColor = 'rgba(34, 211, 238, 0.5)';
      btn.style.color = '#22D3EE';

      setTimeout(() => {
        btn.innerHTML = origText;
        btn.style.borderColor = '';
        btn.style.color = '';
        form.reset();
      }, 2500);
    });
  }

  /* -----------------------------------------------
     BOOT
  ----------------------------------------------- */
  function init() {
    initCanvas();
    createStars();
    createNebulae();
    initPanels();
    initOpsCards();
    initPanelClicks();
    initForm();

    // Events
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.getElementById('hud-nav').addEventListener('click', onHudClick);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('resize', onResize);

    // Start render loop
    animate();

    // Mobile hint
    showMobileHint();
  }

  // Wait for fonts + GSAP
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
