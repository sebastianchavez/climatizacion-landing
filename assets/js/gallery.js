/* gallery.js
   ClimatPro · filtros + lightbox para la galería
*/
(function () {
  'use strict';

  function initFilters() {
    const filterContainer = document.getElementById('gallery-filters');
    const grid = document.getElementById('gallery-grid');
    if (!filterContainer || !grid) return;

    const items = grid.querySelectorAll('[data-category]');

    filterContainer.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-filter]');
      if (!btn) return;

      // Actualizar botón activo
      filterContainer.querySelectorAll('[data-filter]').forEach(function (b) {
        b.classList.remove('bg-brand-700', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-slate-700');
      });
      btn.classList.add('bg-brand-700', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'text-slate-700');

      const filter = btn.getAttribute('data-filter');
      items.forEach(function (item) {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = '';
          // Re-trigger animación
          item.style.animation = 'none';
          requestAnimationFrame(() => { item.style.animation = ''; });
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  function initLightbox() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    const images = Array.from(grid.querySelectorAll('[data-lightbox]'));
    if (images.length === 0) return;

    // Crear overlay DOM
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[80] hidden items-center justify-center lightbox-backdrop';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML =
      '<button type="button" id="lb-close" aria-label="Cerrar" class="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition">' +
      '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>' +
      '</button>' +
      '<button type="button" id="lb-prev" aria-label="Anterior" class="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition">' +
      '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>' +
      '</button>' +
      '<img id="lb-img" class="lightbox-img rounded-2xl" alt="" />' +
      '<div id="lb-caption" class="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-center px-4">' +
      '<p id="lb-title" class="font-display text-xl font-semibold"></p>' +
      '<p id="lb-subtitle" class="text-sm text-cyan-200 mt-1"></p>' +
      '</div>' +
      '<button type="button" id="lb-next" aria-label="Siguiente" class="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition">' +
      '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>' +
      '</button>';
    document.body.appendChild(overlay);

    const imgEl = overlay.querySelector('#lb-img');
    const titleEl = overlay.querySelector('#lb-title');
    const subtitleEl = overlay.querySelector('#lb-subtitle');
    let currentIndex = 0;

    const open = function (idx) {
      currentIndex = idx;
      const item = images[idx];
      const src = item.getAttribute('data-src') || item.querySelector('img').src;
      const title = item.getAttribute('data-title') || '';
      const subtitle = item.getAttribute('data-subtitle') || '';
      imgEl.src = src;
      imgEl.alt = title;
      titleEl.textContent = title;
      subtitleEl.textContent = subtitle;
      overlay.classList.remove('hidden');
      overlay.classList.add('flex');
      document.body.classList.add('overflow-hidden');
    };

    const close = function () {
      overlay.classList.add('hidden');
      overlay.classList.remove('flex');
      document.body.classList.remove('overflow-hidden');
    };

    const next = function () { open((currentIndex + 1) % images.length); };
    const prev = function () { open((currentIndex - 1 + images.length) % images.length); };

    grid.addEventListener('click', function (e) {
      const item = e.target.closest('[data-lightbox]');
      if (!item) return;
      const idx = images.indexOf(item);
      if (idx !== -1) open(idx);
    });

    overlay.querySelector('#lb-close').addEventListener('click', close);
    overlay.querySelector('#lb-prev').addEventListener('click', prev);
    overlay.querySelector('#lb-next').addEventListener('click', next);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', function (e) {
      if (overlay.classList.contains('hidden')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initFilters();
    initLightbox();
  });
})();