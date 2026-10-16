(function () {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  // aria-pressed="true" quando o tema claro está ativo
  function atualizarEstado() {
    toggleBtn.setAttribute('aria-pressed', String(document.body.classList.contains('light-mode')));
  }

  toggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    atualizarEstado();

    try {
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    } catch (e) {}
  });

  atualizarEstado();
})();
