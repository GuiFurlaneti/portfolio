(function () {
  // Navegação Ativa com IntersectionObserver
  // Apenas as seções de primeiro nível têm link no menu
  const sections = document.querySelectorAll("main > section[id]");
  const navLinks = document.querySelectorAll(".navbar-items a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const link = document.querySelector(`.navbar-items a[href="#${id}"]`);

        // Verifica se a seção está visível na tela
        if (entry.isIntersecting) {
          // Remove a classe active de todos os links
          navLinks.forEach((link) => {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
          });

          // Adiciona a classe active ao link correspondente à seção visível
          if (link) {
            link.classList.add("active");
            link.setAttribute("aria-current", "location");
          }
        }
      });
    },
    {
      // A "janela" de detecção é a linha no meio da tela: a seção que cruza essa linha fica ativa.
      // Como essa área tem altura zero, o threshold precisa ser 0 (um percentual nunca seria atingido).
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    }
  );

  // Observe cada seção no DOM
  sections.forEach((section) => observer.observe(section));
})();
