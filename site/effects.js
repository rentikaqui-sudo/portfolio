/* effects.js — dynamic visual enhancements */
(function () {
  'use strict';

  /* ── 1. Neon cursor ─────────────────────────────────── */
  var dot  = document.querySelector('.cursor-dot');
  var ring = document.querySelector('.cursor-ring');

  if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
    var mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });

    (function loopRing() {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(loopRing);
    })();

    document.querySelectorAll('a, button, .btn, .service-card, .project-card, .nav-link').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        dot.classList.add('is-hover');
        ring.classList.add('is-hover');
      });
      el.addEventListener('mouseleave', function () {
        dot.classList.remove('is-hover');
        ring.classList.remove('is-hover');
      });
    });
  }

  /* ── 2. Hero particle network ────────────────────────── */
  var cvs = document.getElementById('hero-canvas');
  if (cvs) {
    var ctx   = cvs.getContext('2d');
    var COUNT = 52, LINK = 125, REPEL = 72;
    var W, H, nodes = [], pmx = -9999, pmy = -9999;

    function resize() {
      W = cvs.offsetWidth;
      H = cvs.offsetHeight;
      cvs.width  = W;
      cvs.height = H;
    }

    function initNodes() {
      nodes = [];
      for (var i = 0; i < COUNT; i++) {
        nodes.push({
          x:     Math.random() * W,
          y:     Math.random() * H,
          vx:    (Math.random() - 0.5) * 0.32,
          vy:    (Math.random() - 0.5) * 0.32,
          r:     Math.random() * 1.8 + 1.1,
          phase: Math.random() * Math.PI * 2,
          spd:   0.011 + Math.random() * 0.016,
          hot:   Math.random() > 0.83,
        });
      }
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);

      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.phase += n.spd;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        var ddx = n.x - pmx, ddy = n.y - pmy;
        var dd  = Math.sqrt(ddx * ddx + ddy * ddy);
        if (dd < REPEL && dd > 0) {
          var f = (REPEL - dd) / REPEL;
          n.vx += ddx / dd * f * 0.09;
          n.vy += ddy / dd * f * 0.09;
        }
        n.vx *= 0.982;
        n.vy *= 0.982;
      }

      /* connections */
      for (var i = 0; i < COUNT; i++) {
        for (var j = i + 1; j < COUNT; j++) {
          var a = nodes[i], b = nodes[j];
          var cdx = a.x - b.x, cdy = a.y - b.y;
          var cd  = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cd < LINK) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = 'rgba(0,212,255,' + ((1 - cd / LINK) * 0.13) + ')';
            ctx.lineWidth   = 0.65;
            ctx.stroke();
          }
        }
      }

      /* dots */
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        var p = Math.sin(n.phase) * 0.32 + 0.68;
        if (n.hot) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 4.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0,212,255,' + (0.055 * p) + ')';
          ctx.fill();
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 1.7, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0,212,255,' + (0.82 * p) + ')';
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(168,85,247,' + (0.25 * p) + ')';
          ctx.fill();
        }
      }

      requestAnimationFrame(frame);
    }

    var hero = document.querySelector('.hero');
    if (hero) {
      hero.addEventListener('mousemove', function (e) {
        var r = cvs.getBoundingClientRect();
        pmx = e.clientX - r.left;
        pmy = e.clientY - r.top;
      });
      hero.addEventListener('mouseleave', function () {
        pmx = -9999; pmy = -9999;
      });
    }

    window.addEventListener('resize', function () { resize(); initNodes(); });
    resize();
    initNodes();
    requestAnimationFrame(frame);
  }

  /* ── 3. Typewriter on hero accent ────────────────────── */
  var PHRASES = {
    es: ['sistemas que trabajan solos', 'flujos inteligentes', 'automatizaciones sin fricción'],
    en: ['systems that run themselves', 'intelligent flows', 'friction-free automations'],
  };

  function startTypewriter(selector, lang) {
    var parent = document.querySelector(selector);
    if (!parent) return;
    var accent = parent.querySelector('.accent');
    if (!accent) return;

    var cur = document.createElement('span');
    cur.className   = 'tw-cursor';
    cur.textContent = '|';
    accent.insertAdjacentElement('afterend', cur);

    var words = PHRASES[lang];
    var wi = 0, ci = words[0].length, del = false, wait = 0;
    accent.textContent = words[0];

    function tick() {
      if (wait > 0) { wait--; setTimeout(tick, 80); return; }
      var w = words[wi];
      if (!del) {
        if (ci < w.length) {
          accent.textContent = w.slice(0, ++ci);
          setTimeout(tick, 60 + Math.random() * 40);
        } else {
          del = true; wait = 30;
          setTimeout(tick, 80);
        }
      } else {
        if (ci > 0) {
          accent.textContent = w.slice(0, --ci);
          setTimeout(tick, 35);
        } else {
          del = false;
          wi  = (wi + 1) % words.length;
          wait = 5;
          setTimeout(tick, 80);
        }
      }
    }
    setTimeout(tick, 2200);
  }

  startTypewriter('.hero-sub.lang-es', 'es');
  startTypewriter('.hero-sub.lang-en', 'en');

  /* ── 4. GSAP hero entrance ───────────────────────────── */
  (function () {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    var seqs = [
      ['.hero-badge',   { y: -18, delay: 0    }],
      ['.hero-title',   { x: -28, delay: 0.1  }],
      ['.hero-sub',     { x: -28, delay: 0.2  }],
      ['.hero-lead',    { y:  18, delay: 0.3  }],
      ['.hero-stats',   { y:  18, delay: 0.42 }],
      ['.hero-actions', { y:  18, delay: 0.52 }],
    ];

    seqs.forEach(function (item) {
      var els = document.querySelectorAll(item[0]);
      if (!els.length) return;
      var opts = item[1];
      gsap.from(els, {
        opacity: 0,
        x: opts.x || 0,
        y: opts.y || 0,
        duration: 0.75,
        delay: opts.delay,
        ease: 'power3.out',
      });
    });
  })();

})();
