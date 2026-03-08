/* ══════════════════════════════════════════
   Kira Tanaka — Portfolio JS
   Progressive enhancement only.
   All content visible by default.
   ══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ═══════════════════════════════════════
       1. SCROLL REVEAL
       Content visible by default — JS adds reveal animation on scroll.
       ═══════════════════════════════════════ */
    const revealEls = document.querySelectorAll('.reveal-el');
    revealEls.forEach(el => el.classList.add('reveal-ready'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px' });

    revealEls.forEach(el => revealObserver.observe(el));


    /* ═══════════════════════════════════════
       2. SCROLL PROGRESS BAR
       Thin orange line across the top — fills as you scroll.
       ═══════════════════════════════════════ */
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    document.body.appendChild(progressBar);

    let progressTicking = false;
    window.addEventListener('scroll', () => {
        if (!progressTicking) {
            requestAnimationFrame(() => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                progressBar.style.width = pct + '%';
                progressTicking = false;
            });
            progressTicking = true;
        }
    }, { passive: true });


    /* ═══════════════════════════════════════
       3. HERO PARALLAX + FADE
       ═══════════════════════════════════════ */
    const hero = document.querySelector('.hero');
    let heroTicking = false;

    if (hero) {
        window.addEventListener('scroll', () => {
            if (!heroTicking) {
                requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    if (scrolled < window.innerHeight) {
                        const ratio = scrolled / window.innerHeight;
                        hero.style.opacity = 1 - ratio * 0.6;
                        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                    }
                    heroTicking = false;
                });
                heroTicking = true;
            }
        }, { passive: true });
    }


    /* ═══════════════════════════════════════
       4. HERO NAME GLITCH
       One-time glitch flicker on load. Feels like a system boot.
       ═══════════════════════════════════════ */
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const originalText = heroName.innerHTML;

        // Glitch chars pool
        const glitchChars = 'ABCDEFGHIJKLMNOPRSTUVWXYZ0123456789$#@%&!?';
        const glitchTextEl = heroName.querySelector('.hero-line') || heroName;

        // Delay glitch until hero has appeared (~1.2s after load)
        setTimeout(() => {
            let iterations = 0;
            const maxIterations = 12;
            const originalStr = 'KIRA TANAKA';
            const target = heroName.querySelector('.hero-line:first-child') || heroName;

            const glitch = setInterval(() => {
                if (!target) { clearInterval(glitch); return; }

                target.textContent = originalStr
                    .split('')
                    .map((char, i) => {
                        if (char === ' ') return ' ';
                        if (i < iterations * (originalStr.length / maxIterations)) return char;
                        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    })
                    .join('');

                iterations++;
                if (iterations > maxIterations) {
                    target.textContent = originalStr;
                    clearInterval(glitch);
                }
            }, 60);
        }, 1200);
    }


    /* ═══════════════════════════════════════
       5. STAT COUNTER ANIMATION
       Numbers count up from 0 when project cards enter view.
       ═══════════════════════════════════════ */
    function animateCounter(el, target, suffix, duration) {
        const isFloat = target % 1 !== 0;
        const startTime = performance.now();

        function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = isFloat
                ? (eased * target).toFixed(1)
                : Math.round(eased * target);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const card = entry.target;

            card.querySelectorAll('.ps-val').forEach(el => {
                const raw = el.textContent.trim();
                // Parse: "92" → 92, "4.2M" → 4.2 + suffix "M", "DICE" → skip
                const numMatch = raw.match(/^([\d.]+)([A-Z]*)$/);
                if (!numMatch) return;

                const num = parseFloat(numMatch[1]);
                const suffix = numMatch[2] || '';
                el.textContent = '0' + suffix;
                animateCounter(el, num, suffix, 1200);
            });

            statObserver.unobserve(card);
        });
    }, { threshold: 0.4 });

    document.querySelectorAll('.project-card').forEach(card => {
        statObserver.observe(card);
    });


    /* ═══════════════════════════════════════
       6. PROJECT CARD — CROSSHAIR CURSOR + HUD SCAN LINE
       Custom targeting cursor and scan-line sweep on hover.
       ═══════════════════════════════════════ */
    document.querySelectorAll('.project-card').forEach(card => {
        const img = card.querySelector('.project-card-image');
        if (!img) return;

        // Inject scan-line element
        const scanLine = document.createElement('div');
        scanLine.className = 'hud-scan';
        img.appendChild(scanLine);

        // Cursor crosshair
        const crosshair = document.createElement('div');
        crosshair.className = 'hud-crosshair';
        crosshair.innerHTML = `
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <line x1="16" y1="2"  x2="16" y2="12" stroke="#ff7a1a" stroke-width="1.5"/>
                <line x1="16" y1="20" x2="16" y2="30" stroke="#ff7a1a" stroke-width="1.5"/>
                <line x1="2"  y1="16" x2="12" y2="16" stroke="#ff7a1a" stroke-width="1.5"/>
                <line x1="20" y1="16" x2="30" y2="16" stroke="#ff7a1a" stroke-width="1.5"/>
                <circle cx="16" cy="16" r="3" stroke="#ff7a1a" stroke-width="1.5" fill="none"/>
            </svg>`;
        img.appendChild(crosshair);

        // Move crosshair with mouse
        img.addEventListener('mousemove', (e) => {
            const rect = img.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            crosshair.style.left = x + 'px';
            crosshair.style.top = y + 'px';
            crosshair.style.opacity = '1';
        });

        img.addEventListener('mouseleave', () => {
            crosshair.style.opacity = '0';
        });
    });


    /* ═══════════════════════════════════════
       7. SMOOTH SCROLL
       ═══════════════════════════════════════ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

});
