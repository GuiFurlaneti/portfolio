(function () {
  const elements = document.querySelectorAll('.reveal');

  // Sem animação: preferência do sistema por movimento reduzido ou navegador sem IntersectionObserver
  const semAnimacao =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !('IntersectionObserver' in window);

  if (semAnimacao) {
    elements.forEach((el) => el.classList.add('active'));
    return;
  }

  // Revela uma única vez: o conteúdo não some de novo ao sair da tela
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach((el) => observer.observe(el));
})();
