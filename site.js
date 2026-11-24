// Lukas' — mobile menu, sticky offsets, today's hours, lightbox
(function () {
  'use strict';

  /* ---------- sticky header height ----------
     The header's height depends on its own content (wordmark vs. button),
     so anything that sticks underneath it has to read the real number
     rather than assume one. Write it back as --header-h and let the CSS
     use it for the jump bar and the anchor scroll padding. */
  var headerEl = document.querySelector('.header');
  function syncHeaderHeight() {
    if (!headerEl) return;
    document.documentElement.style.setProperty('--header-h', headerEl.offsetHeight + 'px');
  }
  syncHeaderHeight();
  window.addEventListener('resize', syncHeaderHeight);
  window.addEventListener('load', syncHeaderHeight);

  /* ---------- mobile menu ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    function setOpen(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.hidden = !open;
    }
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ---------- today's hours (hero trust strip) ---------- */
  var todayEl = document.querySelector('[data-today-hours]');
  if (todayEl) {
    var dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var todayIdx = new Date().getDay();
    var hoursRows = document.querySelectorAll('.hours-table tr');
    for (var h = 0; h < hoursRows.length; h++) {
      var th = hoursRows[h].querySelector('th');
      var td = hoursRows[h].querySelector('td');
      if (!th || !td) continue;
      var label = th.textContent.replace(/\s+/g, ' ').trim();
      if (label.toLowerCase().indexOf('brunch') !== -1) continue;
      var m = label.match(/(\w+)\s*(?:[\u2013-]\s*(\w+))?/);
      if (!m) continue;
      var from = dayNames.indexOf(m[1]);
      if (from === -1) continue;
      var to = m[2] ? dayNames.indexOf(m[2]) : from;
      if (to === -1) to = from;
      var hit = (from <= to)
        ? (todayIdx >= from && todayIdx <= to)
        : (todayIdx >= from || todayIdx <= to);
      if (hit) {
        todayEl.textContent = 'Today ' + td.textContent.replace(/\s+/g, ' ').trim();
        break;
      }
    }
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      var revealIO = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            entries[i].target.classList.add('in');
            revealIO.unobserve(entries[i].target);
          }
        }
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0 });
      for (var r = 0; r < revealEls.length; r++) revealIO.observe(revealEls[r]);
    } else {
      for (var r2 = 0; r2 < revealEls.length; r2++) revealEls[r2].classList.add('in');
    }
  }

  /* ---------- hero photo parallax (desktop only) ---------- */
  var heroImg = document.querySelector('.hero-photo img');
  if (heroImg && window.matchMedia && window.matchMedia('(min-width: 761px)').matches) {
    var paraTicking = false;
    function paraUpdate() {
      // scale(1.08) leaves ~4% headroom on every side, so the photo can drift
      // without ever exposing an edge. The cap keeps the drift inside that.
      var limit = 18;
      var y = Math.min((window.pageYOffset || 0) * 0.04, limit);
      heroImg.style.transform = 'translate3d(0,' + y.toFixed(1) + 'px,0) scale(1.08)';
      paraTicking = false;
    }
    window.addEventListener('scroll', function () {
      if (!paraTicking) {
        paraTicking = true;
        window.requestAnimationFrame(paraUpdate);
      }
    }, { passive: true });
    window.addEventListener('resize', paraUpdate);
    paraUpdate();
  }

  /* ---------- directions: Apple Maps on iPhone/iPad, Google Maps elsewhere ----------
     The button is a Google Maps universal link by default, which is what
     Android wants and what a no-JS visitor gets. On an Apple device it is
     rewritten to an Apple Maps URL so the phone opens the map app the
     guest actually has. iPadOS 13+ reports itself as a Mac, so it only
     gives itself away by touch. */
  var dirLinks = document.querySelectorAll('a[data-directions]');
  if (dirLinks.length) {
    var appleDevice = /iPad|iPhone|iPod/.test(navigator.userAgent || '') ||
      (navigator.platform === 'MacIntel' && (navigator.maxTouchPoints || 0) > 1);
    if (appleDevice) {
      // encodeURIComponent leaves a raw apostrophe alone; escape it so the
      // query string is clean for every parser and log pipeline.
      var appleMapsUrl = 'https://maps.apple.com/?daddr=' +
        encodeURIComponent('61C Mountain Blvd, Warren, NJ 07059') +
        '&q=' + encodeURIComponent("Lukas' Seafood & Grille").replace(/'/g, '%27');
      for (var d = 0; d < dirLinks.length; d++) dirLinks[d].href = appleMapsUrl;
    }
  }

  /* ---------- gallery lightbox ---------- */
  var grid = document.querySelector('.gallery-grid');
  if (!grid) return;
  var shots = Array.prototype.slice.call(grid.querySelectorAll('img'));
  if (!shots.length) return;

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.innerHTML =
    '<button class="lb-close" type="button" aria-label="Close">&times;</button>' +
    '<button class="lb-prev" type="button" aria-label="Previous">&#8249;</button>' +
    '<img alt="">' +
    '<button class="lb-next" type="button" aria-label="Next">&#8250;</button>';
  document.body.appendChild(box);
  var lbImg = box.querySelector('img');
  var current = 0;

  function show(i) {
    current = (i + shots.length) % shots.length;
    lbImg.src = shots[current].currentSrc || shots[current].src;
    lbImg.alt = shots[current].alt || '';
  }
  var lastFocus = null;
  function open(i) {
    show(i);
    lastFocus = shots[i];
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
    var closer = box.querySelector('.lb-close');
    if (closer) closer.focus();
  }
  function close() {
    box.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    lastFocus = null;
  }

  shots.forEach(function (shot, i) {
    shot.style.cursor = 'zoom-in';
    if (!shot.getAttribute('tabindex')) shot.setAttribute('tabindex', '0');
    shot.setAttribute('role', 'button');
    shot.setAttribute('aria-label', 'Open photo: ' + (shot.alt || 'Lukas'));
    shot.addEventListener('click', function () { open(i); });
    shot.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        open(i);
      }
    });
  });
  box.querySelector('.lb-close').addEventListener('click', close);
  box.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
  box.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
})();
