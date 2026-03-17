/* cursor.js — shared across all Tekashi Designs pages */
(function () {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  if (!cursor || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a, button, .pcard, .review-card, .stat-cell, .svc, .del-card, .price-card, .budget-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width  = '20px';
      cursor.style.height = '20px';
      ring.style.width    = '58px';
      ring.style.height   = '58px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width  = '12px';
      cursor.style.height = '12px';
      ring.style.width    = '40px';
      ring.style.height   = '40px';
    });
  });

  // Nav shrink on scroll
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if (!nav) return;
    nav.style.padding = window.scrollY > 60 ? '0.85rem 4rem' : '1.3rem 4rem';
  });
})();
