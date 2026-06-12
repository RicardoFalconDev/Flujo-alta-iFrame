/* ─── Exit Warning Modal ─────────────────────────────────── */
(function () {
  // Cargar Material Symbols Rounded si no está ya cargado
  if (!document.querySelector('link[href*="Material+Symbols+Rounded"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0';
    document.head.appendChild(link);
  }

  // Inyectar HTML del modal en el body
  const overlay = document.createElement('div');
  overlay.className = 'exit-modal-overlay';
  overlay.innerHTML = `
    <div class="exit-modal" role="dialog" aria-modal="true" aria-labelledby="exit-modal-title">
      <button class="exit-modal-close" id="exit-modal-close" aria-label="Cerrar">
        <span class="icon">close</span>
      </button>
      <div class="exit-modal-icon">
        <span class="material-symbols-rounded">error</span>
      </div>
      <h2 class="exit-modal-title" id="exit-modal-title">¿Dejás el proceso?</h2>
      <p class="exit-modal-body">Si cerrás ahora, vas a perder la información que ya cargaste.</p>
      <button class="exit-modal-btn-primary" id="exit-modal-stay">
        <span>Continuar el proceso</span>
      </button>
      <button class="exit-modal-btn-secondary" id="exit-modal-leave">
        <span>Salir de todos modos</span>
      </button>
    </div>
  `;
  document.body.appendChild(overlay);

  let exitAction = null;

  // Mostrar modal
  function showExitModal(action) {
    exitAction = action;
    overlay.classList.add('visible');
  }

  // Cerrar modal sin salir
  function closeModal() {
    overlay.classList.remove('visible');
    exitAction = null;
  }

  // Ejecutar acción de salida
  document.getElementById('exit-modal-leave').addEventListener('click', () => {
    overlay.classList.remove('visible');
    if (typeof exitAction === 'function') exitAction();
  });

  // Continuar en el proceso
  document.getElementById('exit-modal-stay').addEventListener('click', closeModal);
  document.getElementById('exit-modal-close').addEventListener('click', closeModal);

  // Cerrar al hacer click en el overlay (fuera del modal)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Interceptar todos los botones de cerrar en el header
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.icon-btn[aria-label="Cerrar"]').forEach(btn => {
      const originalOnclick = btn.getAttribute('onclick');
      btn.removeAttribute('onclick');
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        showExitModal(() => {
          if (originalOnclick) {
            // eslint-disable-next-line no-eval
            eval(originalOnclick);
          } else {
            window.location.href = 'index.html';
          }
        });
      });
    });
  });
})();
