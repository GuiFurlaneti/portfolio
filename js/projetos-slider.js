(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.carrossel-wrapper');
    const track = document.querySelector('.projetos-grid');
    const cards = document.querySelectorAll('.projeto-card');
    const btnAnterior = document.querySelector('.carrossel-seta.anterior');
    const btnProxima = document.querySelector('.carrossel-seta.proxima');
    const dots = document.querySelectorAll('.carrossel-dot');

    if (!wrapper || !track || cards.length === 0) return;

    let indiceAtual = 0;

    function mostrarProjeto(indice) {
      const largura = wrapper.offsetWidth;

      track.style.transform = `translateX(-${indice * largura}px)`;
      wrapper.style.height = `${cards[indice].offsetHeight}px`;

      dots.forEach((dot, i) => {
        dot.classList.toggle('ativa', i === indice);
      });
    }

    btnAnterior.addEventListener('click', () => {
      indiceAtual = (indiceAtual - 1 + cards.length) % cards.length;
      mostrarProjeto(indiceAtual);
    });

    btnProxima.addEventListener('click', () => {
      indiceAtual = (indiceAtual + 1) % cards.length;
      mostrarProjeto(indiceAtual);
    });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        indiceAtual = i;
        mostrarProjeto(indiceAtual);
      });
    });

    window.addEventListener('load', () => mostrarProjeto(indiceAtual));
    window.addEventListener('resize', () => mostrarProjeto(indiceAtual));
  });
})();
