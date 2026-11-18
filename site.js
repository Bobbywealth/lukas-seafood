// Lukas' — mobile menu + gallery lightbox
(function () {
  'use strict';

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
  function open(i) {
    show(i);
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    box.classList.remove('open');
    document.body.style.overflow = '';
  }

  shots.forEach(function (shot, i) {
    shot.style.cursor = 'zoom-in';
    shot.addEventListener('click', function () { open(i); });
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
