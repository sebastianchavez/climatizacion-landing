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

    const desktop = window.matchMedia('(min-width: 1280px)');
    const focusable = function () {
      return Array.from(menu.querySelectorAll('a[href], button:not([disabled])'));
    };

    const openMenu = function () {
      if (desktop.matches) return;
      btn.classList.add('menu-open');
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-label', 'Cerrar menú');
      menu.inert = false;
      menu.setAttribute('aria-hidden', 'false');
      menu.classList.remove('translate-x-full');
      menu.classList.add('translate-x-0');
      if (overlay) overlay.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      const first = focusable()[0];
      if (first) first.focus();
    };

    const closeMenu = function (restoreFocus = true) {
      btn.classList.remove('menu-open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Abrir menú');
      if (menu.contains(document.activeElement)) {
        if (restoreFocus && !desktop.matches) btn.focus();
        else document.activeElement.blur();
      }
      menu.inert = true;
      menu.setAttribute('aria-hidden', 'true');
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
      if (e.key === 'Tab' && btn.getAttribute('aria-expanded') === 'true') {
        const items = focusable();
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    desktop.addEventListener('change', function () {
      if (desktop.matches) closeMenu(false);
    });
  }

  function initActiveLink() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('[data-nav-link], #mobile-menu a[href]').forEach(function (link) {
      const href = link.getAttribute('href');
      link.classList.remove('active');
      if (href === path || (path === '' && href === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initScrollEffect();
    initMobileMenu();
    initActiveLink();
  });
})();
