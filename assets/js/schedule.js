/* schedule.js
   ClimatPro · tabs por día y filtros de nivel para horario de clases
*/
(function () {
  'use strict';

  function initDayTabs() {
    const tabsContainer = document.getElementById('day-tabs');
    const cards = document.querySelectorAll('[data-day]');
    if (!tabsContainer || cards.length === 0) return;

    tabsContainer.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-day-target]');
      if (!btn) return;

      tabsContainer.querySelectorAll('[data-day-target]').forEach(function (b) {
        b.classList.remove('bg-brand-700', 'text-white', 'shadow-lg');
        b.classList.add('bg-white', 'text-slate-700');
      });
      btn.classList.add('bg-brand-700', 'text-white', 'shadow-lg');
      btn.classList.remove('bg-white', 'text-slate-700');

      const day = btn.getAttribute('data-day-target');
      cards.forEach(function (card) {
        if (day === 'all' || card.getAttribute('data-day') === day) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  function initLevelFilter() {
    const levelSelect = document.getElementById('level-filter');
    const cards = document.querySelectorAll('[data-level]');
    if (!levelSelect || cards.length === 0) return;

    levelSelect.addEventListener('change', function () {
      const level = levelSelect.value;
      cards.forEach(function (card) {
        if (level === 'all' || card.getAttribute('data-level') === level) {
          if (card.style.display !== 'none') {
            card.style.display = '';
          }
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initDayTabs();
    initLevelFilter();
  });
})();