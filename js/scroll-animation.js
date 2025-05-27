document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.classList.add("active");
      } else {
        el.classList.remove("active"); // opcional: remove ao sair
      }
    });
  }, {
    threshold: 0.15
  });

  elements.forEach(el => {
    const animationType = el.dataset.animate || "fade-up"; // fallback
    el.classList.add("reveal-" + animationType); // adiciona a classe baseada no data
    observer.observe(el);
  });
});
