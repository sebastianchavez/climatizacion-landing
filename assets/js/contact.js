/* contact.js
   ClimatPro · validación y simulación de envío del formulario de contacto
*/
(function () {
  'use strict';

  function showError(input, message) {
    const wrap = input.closest('div');
    let err = wrap.querySelector('.field-error');
    if (!err) {
      err = document.createElement('p');
      err.className = 'field-error text-xs text-red-600 mt-1 flex items-center gap-1';
      wrap.appendChild(err);
    }
    err.innerHTML = '<svg class="w-3.5 h-3.5 inline" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg> ' + message;
    input.classList.add('border-red-500');
    input.classList.remove('border-slate-300');
  }

  function clearError(input) {
    const wrap = input.closest('div');
    const err = wrap.querySelector('.field-error');
    if (err) err.remove();
    input.classList.remove('border-red-500');
    input.classList.add('border-slate-300');
  }

  function validate(form) {
    let valid = true;
    const fields = [
      { id: 'nombre', msg: 'Ingresá tu nombre completo' },
      { id: 'email', msg: 'Ingresá un email válido',
        custom: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) },
      { id: 'telefono', msg: 'Ingresá un teléfono válido',
        custom: (val) => /^[+\d\s]{6,15}$/.test(val) },
      { id: 'servicio', msg: 'Elegí un servicio' },
      { id: 'mensaje', msg: 'Contanos en qué podemos ayudarte' }
    ];

    fields.forEach(function (f) {
      const el = document.getElementById(f.id);
      if (!el) return;
      const v = el.value.trim();
      if (!v || (f.custom && !f.custom(v))) {
        showError(el, f.msg);
        valid = false;
      } else {
        clearError(el);
      }
    });

    const privacidad = document.getElementById('privacidad');
    if (privacidad && !privacidad.checked) {
      const wrap = privacidad.closest('div');
      let err = wrap.querySelector('.field-error');
      if (!err) {
        err = document.createElement('p');
        err.className = 'field-error text-xs text-red-600 mt-1';
        wrap.appendChild(err);
      }
      err.textContent = 'Debés aceptar la política de privacidad';
      valid = false;
    }

    return valid;
  }

  function init() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Limpiar error en blur al cambiar
    form.querySelectorAll('input, select, textarea').forEach(function (el) {
      el.addEventListener('input', function () { clearError(el); });
      el.addEventListener('change', function () { clearError(el); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(form)) {
        window.showToast('Revisá los campos marcados en rojo', 'error');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner"></span> <span>Enviando…</span>';

      // Simulación de envío
      setTimeout(function () {
        const data = {
          nombre: document.getElementById('nombre').value.trim(),
          email: document.getElementById('email').value.trim(),
          telefono: document.getElementById('telefono').value.trim(),
          servicio: document.getElementById('servicio').value,
          mensaje: document.getElementById('mensaje').value.trim()
        };
        console.log('[Contact: mock submit]', data);

        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;

        window.showToast('¡Mensaje enviado! Te contactaremos en menos de 24 h.', 'success');
      }, 1400);
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();