// Motion and small enhancements. The site reads and works without this file,
// and everything here is skipped when the visitor asks for reduced motion.
(function () {
  var doc = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var raf = window.requestAnimationFrame;

  // ---------------------------------------------------------- header ---
  var header = document.getElementById('site-header');
  var menu = document.getElementById('menu-btn');
  if (header && menu) {
    menu.addEventListener('click', function () {
      var open = header.classList.toggle('is-open');
      menu.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  // The bar slides away while reading down and returns on the way up.
  if (header && !reduce) {
    var lastY = window.scrollY;
    window.addEventListener('scroll', function () {
      var y = window.scrollY, d = y - lastY;
      if (Math.abs(d) < 8) return;
      if (!header.classList.contains('is-open')) header.classList.toggle('is-hidden', d > 0 && y > 520);
      lastY = y;
    }, { passive: true });
    header.addEventListener('focusin', function () { header.classList.remove('is-hidden'); });
  }

  // ---------------------------------- headings rise in word by word ---
  function splitWords(el) {
    var text = el.textContent.replace(/\s+/g, ' ').trim();
    if (!text || el.children.length) return;
    el.setAttribute('aria-label', text);
    el.textContent = '';
    text.split(' ').forEach(function (w, i, all) {
      var outer = document.createElement('span');
      var inner = document.createElement('span');
      outer.className = 'word';
      outer.setAttribute('aria-hidden', 'true');
      inner.textContent = w;
      inner.style.setProperty('--i', i);
      outer.appendChild(inner);
      el.appendChild(outer);
      if (i < all.length - 1) el.appendChild(document.createTextNode(' '));
    });
    el.classList.add('words');
  }
  if (!reduce) {
    var heads = document.querySelectorAll('.hero .display, .page-head h1, .section-head h2, .split > h2, .cta__card h2, .media-block__text h2');
    [].forEach.call(heads, splitWords);
    // Headings at the top of the page start straight away. The timer is a
    // safety net for browsers that pause animation frames in background tabs.
    var go = function () {
      [].forEach.call(document.querySelectorAll('.hero .words, .page-head .words'), function (el) { el.classList.add('go'); });
    };
    raf(function () { raf(go); });
    setTimeout(go, 120);
  }

  // ------------------------------------- reveal on scroll into view ---
  var items = [].slice.call(document.querySelectorAll('.reveal'));
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -7% 0px', threshold: 0.05 });
    items.forEach(function (el) { io.observe(el); });
  }

  // --------------------------- tiles: a soft light follows the pointer ---
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('pointermove', function (e) {
      var tile = e.target.closest && e.target.closest('.tile');
      if (!tile) return;
      var r = tile.getBoundingClientRect();
      tile.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      tile.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
  }

  // ------------------------------- metric figures count up to value ---
  if (!reduce) {
    [].forEach.call(document.querySelectorAll('.metric__figure'), function (el) {
      var m = /^(\D*)(\d+)(.*)$/.exec(el.textContent.trim());
      if (!m) return;
      var end = parseInt(m[2], 10), t0 = 0, DUR = 1700, done = false;
      var finish = function () { done = true; el.textContent = m[1] + end + m[3]; };
      el.setAttribute('aria-label', el.textContent.trim());
      el.textContent = m[1] + '0' + m[3];
      function step(now) {
        if (done) return;
        if (!t0) t0 = now + 350;
        var k = Math.min(1, Math.max(0, (now - t0) / DUR));
        var eased = 1 - Math.pow(1 - k, 4);
        el.textContent = m[1] + Math.round(end * eased) + m[3];
        if (k < 1) raf(step); else done = true;
      }
      raf(step);
      // Safety net: never leave a figure short of its real value.
      setTimeout(function () { if (!done) finish(); }, 3200);
    });
  }

  // ------------------- skills line speeds up while the page scrolls ---
  var track = document.querySelector('.marquee__track');
  if (track && track.getAnimations && !reduce) {
    var anim = track.getAnimations()[0];
    var sy = window.scrollY, rate = 1;
    if (anim) {
      (function tick() {
        var y = window.scrollY, v = Math.abs(y - sy);
        sy = y;
        rate += ((1 + Math.min(v * 0.09, 5)) - rate) * 0.07;
        anim.playbackRate = rate;
        raf(tick);
      })();
    }
  }

  // ------------------------------------------- draft preview button ---
  var pill = document.getElementById('draft-pill');
  if (pill) {
    pill.addEventListener('click', function () {
      var on = document.body.classList.toggle('show-tbs');
      pill.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  // ------- Home hero: a field of points, like a surface plot of data ---
  var canvas = document.getElementById('field');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var w = 0, h = 0, t = 2, loop = 0, visible = true;
  var COLS = 84, ROWS = 38, R = 190;
  // Pointer position, eased so the surface follows smoothly.
  var px = 0, py = 0, tx = 0, ty = 0, near = 0, nearTarget = 0, seen = false;

  function rgb(name, fallback) {
    var v = getComputedStyle(doc).getPropertyValue(name).trim().replace('#', '');
    if (v.length === 3) v = v.replace(/(.)/g, '$1$1');
    if (!/^[0-9a-f]{6}$/i.test(v)) return fallback;
    return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)].join(',');
  }
  var ACCENT = rgb('--color-accent-text', '59,158,255');
  var TEXT = rgb('--color-text', '245,245,247');

  function size() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    var horizon = h * 0.2;
    for (var r = 0; r < ROWS; r++) {
      var z = r / (ROWS - 1);
      var p = Math.pow(z, 2.1);
      var baseY = horizon + p * (h - horizon) * 1.04;
      var spread = 0.6 + p * 1.7;
      var amp = 6 + p * 44;
      var dot = 0.7 + p * 1.9;
      for (var i = 0; i < COLS; i++) {
        var x = i / (COLS - 1) - 0.5;
        var sx = w / 2 + x * w * spread;
        if (sx < -8 || sx > w + 8) continue;
        var wave = Math.sin(x * 10 + t * 0.8 + r * 0.33) * 0.5 +
                   Math.sin(x * 4.6 - t * 0.55 + r * 0.19) * 0.5 +
                   Math.sin(r * 0.42 + t * 0.6) * 0.4;
        var sy = baseY - wave * amp;
        var a = (0.1 + p * 0.8) * (0.4 + 0.6 * ((wave + 1.4) / 2.8));
        var lit = wave > 0.72;
        if (near > 0.01) {
          var dx = sx - px, dy = sy - py;
          if (dx > -3 * R && dx < 3 * R && dy > -3 * R && dy < 3 * R) {
            var pull = Math.exp(-(dx * dx + dy * dy) / (R * R)) * near;
            sy -= pull * 30 * (0.35 + p);
            a = Math.min(1, a + pull * 0.7);
            if (pull > 0.22) lit = true;
          }
        }
        ctx.fillStyle = lit ? 'rgba(' + ACCENT + ',' + Math.min(1, a * 1.25) + ')' : 'rgba(' + TEXT + ',' + a * 0.7 + ')';
        ctx.beginPath();
        ctx.arc(sx, sy, dot, 0, 6.2832);
        ctx.fill();
      }
    }
  }

  function frame() {
    t += 0.016;
    px += (tx - px) * 0.07; py += (ty - py) * 0.07;
    near += (nearTarget - near) * 0.05;
    draw();
    loop = visible && !document.hidden ? raf(frame) : 0;
  }
  function start() { if (!loop && !reduce) loop = raf(frame); }

  var hero = canvas.parentNode;
  hero.addEventListener('pointermove', function (e) {
    var b = canvas.getBoundingClientRect();
    tx = e.clientX - b.left; ty = e.clientY - b.top; nearTarget = 1;
    if (!seen) { px = tx; py = ty; seen = true; }
  }, { passive: true });
  hero.addEventListener('pointerleave', function () { nearTarget = 0; });

  size(); draw();
  window.addEventListener('resize', function () { size(); draw(); });
  document.addEventListener('visibilitychange', start);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { visible = e[0].isIntersecting; start(); }).observe(canvas);
  }
  start();
})();
