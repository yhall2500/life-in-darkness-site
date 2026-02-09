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
     NEWSLETTER FORM (Netlify submission)
     ═══════════════════════════════════════ */
  document.querySelectorAll('.newsletter-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var btn = form.querySelector('button');
      if (input && input.value && input.value.includes('@')) {
        var formData = new FormData(form);
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString()
        }).then(function() {
          btn.textContent = 'Subscribed ✓';
          btn.style.background = 'var(--lid-green-pale)';
          input.value = '';
          setTimeout(function () {
            btn.textContent = 'Subscribe';
            btn.style.background = '';
          }, 3000);
        }).catch(function() {
          btn.textContent = 'Error — try again';
          setTimeout(function () { btn.textContent = 'Subscribe'; }, 3000);
        });
      } else if (input) {
        input.style.borderColor = 'var(--accent-rose)';
        setTimeout(function () {
          input.style.borderColor = '';
        }, 2000);
      }
    });
  });
})();


/* ═══════════════════════════════════════
   FORM AJAX SUBMISSION — stay on page
   ═══════════════════════════════════════ */
(function() {
  var forms = document.querySelectorAll('form[data-netlify="true"]:not(.newsletter-form)');
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var origText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      var formData = new FormData(form);
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      }).then(function() {
        form.innerHTML = '<div style="text-align:center;padding:3rem 1rem;">' +
          '<div style="width:56px;height:56px;margin:0 auto 1.25rem;border-radius:50%;background:#3a5438;display:flex;align-items:center;justify-content:center;">' +
          '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>' +
          '<h3 style="font-family:Cormorant Garamond,serif;font-size:1.8rem;font-weight:400;color:#2a2520;margin-bottom:.5rem;">Thank You</h3>' +
          '<p style="font-family:DM Sans,sans-serif;font-size:.95rem;color:#6b6560;line-height:1.6;">Your message has been received. A real person on our team will follow up with you personally.</p>' +
          '</div>';
      }).catch(function() {
        btn.textContent = 'Error — please try again';
        btn.disabled = false;
        setTimeout(function() { btn.textContent = origText; }, 3000);
      });
    });
  });
})();
