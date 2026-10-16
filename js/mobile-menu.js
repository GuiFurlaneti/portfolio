(function () {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navItems = document.querySelector('.navbar-items');
  if (!menuToggle || !navItems) return;

  function setMenu(isOpen) {
    navItems.classList.toggle('mobile-open', isOpen);
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
  }

  menuToggle.addEventListener('click', () => {
    setMenu(!navItems.classList.contains('mobile-open'));
  });

  navItems.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  // Escape fecha o menu aberto e devolve o foco ao botão
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && navItems.classList.contains('mobile-open')) {
      setMenu(false);
      menuToggle.focus();
    }
  });
})();
