// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections and content blocks
document.addEventListener('DOMContentLoaded', () => {
    // Section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => observer.observe(header));
    
    // Philosophy content
    const philosophyContent = document.querySelector('.philosophy-content');
    if (philosophyContent) observer.observe(philosophyContent);
    
    // Projects
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => observer.observe(project));
    
    // Timeline content
    const timelineContent = document.querySelector('.timeline-content');
    if (timelineContent) observer.observe(timelineContent);
    
    // Speaking grid
    const speakingGrid = document.querySelector('.speaking-grid');
    if (speakingGrid) observer.observe(speakingGrid);
    
    // Contact content
    const contactContent = document.querySelector('.contact-content');
    if (contactContent) observer.observe(contactContent);
});

// ===== SMOOTH SCROLL FOR NAVIGATION =====

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== PARALLAX EFFECT ON HERO =====

let lastScrollY = window.scrollY;
let ticking = false;

function updateParallax() {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        const opacity = 1 - (scrolled / window.innerHeight) * 0.8;
        const translateY = scrolled * 0.5;
        hero.style.transform = `translateY(${translateY}px)`;
        hero.style.opacity = opacity;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ===== PROJECT VISUAL HOVER EFFECTS =====

document.addEventListener('DOMContentLoaded', () => {
    const projectVisuals = document.querySelectorAll('.project-visual');
    
    projectVisuals.forEach(visual => {
        visual.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        visual.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// ===== GLITCH EFFECT ON TITLE (RANDOM ACTIVATION) =====

function glitchTitle() {
    const titleLines = document.querySelectorAll('.title-line');
    if (!titleLines.length) return;
    
    const randomLine = titleLines[Math.floor(Math.random() * titleLines.length)];
    const originalText = randomLine.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    // Quick glitch
    let iterations = 0;
    const maxIterations = 3;
    
    const glitchInterval = setInterval(() => {
        randomLine.textContent = originalText
            .split('')
            .map((char, index) => {
                if (Math.random() < 0.3) {
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                }
                return char;
            })
            .join('');
        
        iterations++;
        
        if (iterations >= maxIterations) {
            randomLine.textContent = originalText;
            clearInterval(glitchInterval);
        }
    }, 50);
}

// Random glitch every 15-30 seconds
setInterval(() => {
    if (Math.random() < 0.5) {
        glitchTitle();
    }
}, 20000);

// ===== CURSOR TRAIL EFFECT (SUBTLE) =====

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const diffX = mouseX - cursorX;
    const diffY = mouseY - cursorY;
    
    cursorX += diffX * 0.1;
    cursorY += diffY * 0.1;
    
    // Create subtle glow effect at cursor position
    // (Optional - can be removed if too heavy)
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// ===== TYPEWRITER EFFECT FOR PHILOSOPHY QUOTE (ON SCROLL IN) =====

let quoteAnimated = false;

const quoteObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !quoteAnimated) {
            typewriterEffect(entry.target);
            quoteAnimated = true;
        }
    });
}, { threshold: 0.5 });

function typewriterEffect(element) {
    const originalText = element.textContent;
    element.textContent = '';
    element.style.opacity = 1;
    
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
        if (charIndex < originalText.length) {
            element.textContent += originalText.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(typeInterval);
        }
    }, 30);
}

document.addEventListener('DOMContentLoaded', () => {
    const philosophyQuote = document.querySelector('.philosophy-quote');
    if (philosophyQuote) {
        philosophyQuote.style.opacity = 0;
        quoteObserver.observe(philosophyQuote);
    }
});

// ===== STATS COUNTER ANIMATION =====

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('.stat-value');
            if (statValue && !statValue.dataset.animated) {
                const target = parseInt(statValue.textContent);
                animateCounter(statValue, target);
                statValue.dataset.animated = 'true';
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => statsObserver.observe(stat));
});

// ===== DYNAMIC BACKGROUND SHIFT ON SCROLL =====

let currentSection = 'hero';

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId) {
                currentSection = sectionId;
                updateBackgroundGradient(sectionId);
            }
        }
    });
}, { threshold: 0.3 });

function updateBackgroundGradient(section) {
    // Subtle background color shifts as user scrolls through sections
    // This creates a sense of progression
    const body = document.body;
    
    switch(section) {
        case 'hero':
            body.style.transition = 'background 1s ease';
            break;
        case 'philosophy':
            body.style.transition = 'background 1s ease';
            break;
        case 'projects':
            body.style.transition = 'background 1s ease';
            break;
        case 'timeline':
            body.style.transition = 'background 1s ease';
            break;
        case 'speaking':
            body.style.transition = 'background 1s ease';
            break;
        case 'contact':
            body.style.transition = 'background 1s ease';
            break;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => sectionObserver.observe(section));
});

// ===== SCROLL PROGRESS INDICATOR =====

function updateScrollProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    
    // Could add a progress bar if desired
    // For now, just tracking for potential use
}

window.addEventListener('scroll', updateScrollProgress);

// ===== PERFORMANCE OPTIMIZATION: REDUCE MOTION FOR USERS WHO PREFER IT =====

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-base', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

console.log('🎮 Kira Tanaka Portfolio — Loaded');
