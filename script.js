/* ============================================================
   PORTFOLIO V2.0 — Main JavaScript
   Features: AOS, typing effect, counters, ripple, mobile menu,
   navbar scroll, smooth scroll, lazy loading.
   ============================================================ */

// ── AOS (Animate On Scroll) ──────────────────────────────────
AOS.init({
    once: true,
    offset: 50,
    duration: 800,
});

// ── Navbar Scroll Effect ─────────────────────────────────────
(function () {
    const nav = document.querySelector('.navbar');
    if (!nav) return;

    function onScroll() {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
})();

// ── Mobile Menu Toggle ───────────────────────────────────────
(function () {
    const btn = document.querySelector('.mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', function () {
        const isOpen = menu.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(isOpen));
        const icon = btn.querySelector('i');
        if (icon) {
            icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
        }
    });

    // Close menu when a link is clicked
    menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            menu.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
            var icon = btn.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        });
    });
})();

// ── Typing Effect ────────────────────────────────────────────
(function () {
    var textEl = document.getElementById('dynamic-text');
    if (!textEl) return;

    var words = [
        'an AI Engineer',
        'a Full Stack Developer',
        'a Computer Vision Specialist',
        'a Problem Solver',
        'a Python Developer'
    ];
    var wordIndex = 0;
    var charIndex = 0;
    var isDeleting = false;

    function typeEffect() {
        var currentWord = words[wordIndex];

        if (isDeleting) {
            textEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        var speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentWord.length) {
            speed = 2000; // pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 400; // pause before next word
        }

        setTimeout(typeEffect, speed);
    }

    setTimeout(typeEffect, 800);
})();

// ── Animated Counters ────────────────────────────────────────
(function () {
    var counters = document.querySelectorAll('[data-count]');
    if (counters.length === 0) return;

    var animated = new Set();

    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        if (isNaN(target)) return;

        var suffix = el.textContent.replace(/[0-9]/g, '').trim(); // capture "+", "%+", etc.
        var start = 0;
        var duration = 1500;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            // easeOutQuart
            var ease = 1 - Math.pow(1 - progress, 4);
            var current = Math.floor(ease * target);
            el.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target + suffix;
            }
        }

        requestAnimationFrame(step);
    }

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !animated.has(entry.target)) {
                    animated.add(entry.target);
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.3 });

        counters.forEach(function (c) { observer.observe(c); });
    } else {
        // Fallback: animate all immediately
        counters.forEach(animateCounter);
    }
})();

// ── Button Ripple Effect ─────────────────────────────────────
(function () {
    document.addEventListener('click', function (e) {
        var btn = e.target.closest('.btn');
        if (!btn) return;

        // Remove existing ripples
        var existing = btn.querySelectorAll('.ripple');
        existing.forEach(function (r) { r.remove(); });

        var ripple = document.createElement('span');
        ripple.className = 'ripple';

        var rect = btn.getBoundingClientRect();
        var size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

        btn.appendChild(ripple);

        // Cleanup after animation
        ripple.addEventListener('animationend', function () {
            ripple.remove();
        });
    });
})();

// ── Smooth Scroll for Anchor Links ───────────────────────────
(function () {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            var navHeight = document.querySelector('.navbar') ?
                document.querySelector('.navbar').offsetHeight : 0;

            window.scrollTo({
                top: target.offsetTop - navHeight - 16,
                behavior: 'smooth'
            });
        });
    });
})();

// ── Lazy Loading (native + fallback) ─────────────────────────
(function () {
    // Native lazy loading is handled by loading="lazy" attribute
    // This adds Intersection Observer fallback for older browsers
    if ('loading' in HTMLImageElement.prototype) return;

    var lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if (lazyImages.length === 0) return;

    if ('IntersectionObserver' in window) {
        var imgObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    imgObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(function (img) { imgObserver.observe(img); });
    }
})();