(function () {
  /* ── Language toggle ─────────────────────────────── */
  var body   = document.body;
  var btns   = document.querySelectorAll('.lang-btn');
  var KEY    = 'fa-portfolio-lang';

  function setLang(lang) {
    body.classList.remove('lang-es', 'lang-en');
    body.classList.add(lang === 'en' ? 'lang-en' : 'lang-es');
    document.documentElement.lang = lang === 'en' ? 'en' : 'es';
    btns.forEach(function (b) {
      b.classList.toggle('is-active', b.dataset.lang === lang);
    });
    try { localStorage.setItem(KEY, lang); } catch (_) {}
  }

  btns.forEach(function (btn) {
    btn.addEventListener('click', function () { setLang(btn.dataset.lang || 'es'); });
  });

  try {
    var saved = localStorage.getItem(KEY);
    if (saved === 'en' || saved === 'es') setLang(saved);
  } catch (_) {}

  /* ── Year stamp ──────────────────────────────────── */
  var y = new Date().getFullYear();
  document.querySelectorAll('#y, #y-en').forEach(function (el) {
    el.textContent = String(y);
  });

  /* ── Counter animation ───────────────────────────── */
  function animateCount(el, target, duration) {
    var start = null;
    var startVal = 0;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(startVal + eased * (target - startVal));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ── Scroll reveal + counter trigger ────────────── */
  if ('IntersectionObserver' in window) {
    var countersTriggered = false;

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });

    /* Counter observer — triggers once when stats section enters viewport */
    var statsEl = document.querySelector('.hero-stats');
    if (statsEl) {
      var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !countersTriggered) {
            countersTriggered = true;
            document.querySelectorAll('[data-count]').forEach(function (el) {
              var target = parseInt(el.getAttribute('data-count'), 10);
              animateCount(el, target, 1400);
            });
            counterObserver.disconnect();
          }
        });
      }, { threshold: 0.5 });
      counterObserver.observe(statsEl);
    }
  } else {
    /* Fallback: show everything immediately */
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
    document.querySelectorAll('[data-count]').forEach(function (el) {
      el.textContent = el.getAttribute('data-count');
    });
  }

  /* ── Broken image placeholders ───────────────────── */
  document.querySelectorAll('img.project-photo').forEach(function (img) {
    var phId = img.getAttribute('data-ph');
    img.addEventListener('error', function () {
      img.style.display = 'none';
      if (phId) {
        var ph = document.getElementById(phId);
        if (ph) ph.hidden = false;
      }
    });
  });

  /* ── Smooth active nav highlight on scroll ───────── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  if (sections.length && navLinks.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            var href = link.getAttribute('href') || '';
            var isMatch = href === '#' + id || href.endsWith('#' + id);
            link.classList.toggle('is-active', isMatch);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (s) { sectionObserver.observe(s); });
  }
})();
