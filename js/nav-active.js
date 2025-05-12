// Navegação Ativa com IntersectionObserver
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".navbar-items a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`.navbar-items a[href="#${id}"]`);

      // Verifica se a seção está visível na tela
      if (entry.isIntersecting) {
        // Remove a classe active de todos os links
        navLinks.forEach((link) => link.classList.remove("active"));
        
        // Adiciona a classe active ao link correspondente à seção visível
        if (link) {
          link.classList.add("active");
        }
      }
    });
  },
  {
    rootMargin: "-50% 0px -50% 0px", // Ajuste para quando a seção estiver 50% visível
    threshold: 0.1, // Começa a detectar quando 10% da seção está visível
  }
);

// Observe cada seção no DOM
sections.forEach((section) => observer.observe(section));
