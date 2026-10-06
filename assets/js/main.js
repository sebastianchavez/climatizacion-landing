/* main.js
   ClimatPro · lógica transversal (init AOS, año dinámico, smooth scroll, helpers)
*/
(function () {
  'use strict';

  // Inicializar animaciones AOS
  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60,
        disable: function () {
          return window.innerWidth < 1;
        }
      });
    }
  }

  // Año dinámico en footer
  function setYear() {
    const el = document.getElementById('current-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  // Smooth scroll para anchors internos
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        const targetId = link.getAttribute('href');
        if (targetId.length > 1) {
          const target = document.querySelector(targetId);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  // Toast global reutilizable
  window.showToast = function (message, type) {
    type = type || 'success';
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    const colors = type === 'success'
      ? 'bg-emerald-500 text-white'
      : type === 'error'
      ? 'bg-red-500 text-white'
      : 'bg-slate-800 text-white';

    toast.className = 'toast fixed left-1/2 bottom-8 -translate-x-1/2 z-[100] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 ' + colors;
    const icon = type === 'success'
      ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>'
      : type === 'error'
      ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>'
      : '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>';

    toast.innerHTML = icon + '<span class="font-medium">' + message + '</span>';
    document.body.appendChild(toast);

    setTimeout(function () {
      toast.style.transition = 'opacity .3s ease, transform .3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translate(-50%, 20px)';
      setTimeout(function () { toast.remove(); }, 320);
    }, 3200);
  };

  document.addEventListener('DOMContentLoaded', function () {
    initAOS();
    setYear();
    initSmoothScroll();
  });
})();