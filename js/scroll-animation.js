(function () {
  const elements = document.querySelectorAll(".reveal");

  elements.forEach((el) => {
    const animationType = el.dataset.animate || "fade-up"; // fallback
    el.classList.add("reveal-" + animationType); // adiciona a classe baseada no data
  });

  // Sem animação: preferência do sistema por movimento reduzido ou navegador sem IntersectionObserver
  const semAnimacao =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window);

  if (semAnimacao) {
    elements.forEach((el) => el.classList.add("active"));
    return;
  }

  // Revela uma única vez: o conteúdo não some de novo ao sair da tela
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  elements.forEach((el) => observer.observe(el));
})();
