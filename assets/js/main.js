/**
 * Life in Darkness — Main JavaScript
 * Production-ready static site interactions
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════
     NAVIGATION — scroll effect
     ═══════════════════════════════════════ */
  const nav = document.getElementById('mainNav');

  function handleScroll() {
    if (!nav) return;
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run on load for internal pages

  /* ═══════════════════════════════════════
     MOBILE MENU
     ═══════════════════════════════════════ */
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function () {
      navLinks.classList.toggle('mobile-open');
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('mobile-open');
      });
    });

    // Close on resize to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        navLinks.classList.remove('mobile-open');
      }
    });
  }

  /* ═══════════════════════════════════════
     SMOOTH SCROLL for same-page anchors
     ═══════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId.length <= 1) return; // bare "#"
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ═══════════════════════════════════════
     INTERSECTION OBSERVER — scroll reveal
     ═══════════════════════════════════════ */
  var revealTargets = document.querySelectorAll(
    '.pillar-card, .program-card, .process-step, .testimonial, .donate-tier, .transparency-card'
  );

  if (revealTargets.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // only animate once
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    revealTargets.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  /* ═══════════════════════════════════════
     NEWSLETTER FORM (placeholder handler)
     ═══════════════════════════════════════ */
  document.querySelectorAll('.newsletter-form button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var form = this.closest('.newsletter-form');
      var input = form ? form.querySelector('input[type="email"]') : null;
      if (input && input.value && input.value.includes('@')) {
        this.textContent = 'Subscribed ✓';
        this.style.background = 'var(--lid-green-pale)';
        input.value = '';
        setTimeout(function () {
          btn.textContent = 'Subscribe';
          btn.style.background = '';
        }, 3000);
      } else if (input) {
        input.style.borderColor = 'var(--accent-rose)';
        setTimeout(function () {
          input.style.borderColor = '';
        }, 2000);
      }
    });
  });
})();

