(function () {
  const toggleBtn = document.getElementById('theme-toggle');
  const metaTema = document.querySelector('meta[name="theme-color"]');
  if (!toggleBtn) return;

  // aria-pressed="true" quando o tema claro está ativo; a cor da barra do navegador acompanha o tema
  function atualizarEstado() {
    const claro = document.body.classList.contains('light-mode');
    toggleBtn.setAttribute('aria-pressed', String(claro));
    if (metaTema) metaTema.setAttribute('content', claro ? '#E7EFF3' : '#121212');
  }

  toggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    atualizarEstado();

    try {
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    } catch (e) {}
  });

  // Sem escolha salva, acompanha a mudança de tema do sistema
  if (window.matchMedia) {
    const consulta = window.matchMedia('(prefers-color-scheme: light)');
    const aoMudar = (evento) => {
      let salvo = null;
      try { salvo = localStorage.getItem('theme'); } catch (e) {}
      if (salvo) return;
      document.body.classList.toggle('light-mode', evento.matches);
      atualizarEstado();
    };
    if (consulta.addEventListener) consulta.addEventListener('change', aoMudar);
  }

  atualizarEstado();
})();
