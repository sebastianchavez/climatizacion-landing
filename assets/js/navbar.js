/* navbar.js
   ClimatPro · comportamiento de la barra de navegación
*/
(function () {
  'use strict';

  function initScrollEffect() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const onScroll = function () {
      if (window.scrollY > 30) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initMobileMenu() {
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-overlay');
    if (!btn || !menu) return;

    const openMenu = function () {
      btn.classList.add('menu-open');
      btn.setAttribute('aria-expanded', 'true');
      menu.classList.remove('translate-x-full');
      menu.classList.add('translate-x-0');
      if (overlay) overlay.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    };

    const closeMenu = function () {
      btn.classList.remove('menu-open');
      btn.setAttribute('aria-expanded', 'false');
      menu.classList.add('translate-x-full');
      menu.classList.remove('translate-x-0');
      if (overlay) overlay.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    };

    btn.addEventListener('click', function () {
      if (btn.getAttribute('aria-expanded') === 'true') {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (overlay) overlay.addEventListener('click', closeMenu);

    // Cerrar al clickear un link del menú móvil
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Cerrar con Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        closeMenu();
      }
    });
  }

  function initActiveLink() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('[data-nav-link]').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initScrollEffect();
    initMobileMenu();
    initActiveLink();
  });
})();