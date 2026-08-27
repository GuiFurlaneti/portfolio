(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.carrossel-wrapper');
    const track = document.querySelector('.projetos-grid');
    const cards = track.querySelectorAll('.projeto-card');
    const btnAnterior = document.querySelector('.carrossel-seta.anterior');
    const btnProxima = document.querySelector('.carrossel-seta.proxima');
    const dots = document.querySelectorAll('.carrossel-dot');

    if (!wrapper || !track || cards.length === 0) return;

    let indiceAtual = 0;

    // Mantem a altura do wrapper sincronizada com a altura real do card ativo
    // o tempo todo (inclusive depois que uma imagem lazy termina de carregar),
    // em vez de medir uma unica vez — evita que a borda inferior do card fique
    // cortada por uma altura calculada cedo demais.
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        wrapper.style.height = `${entry.target.offsetHeight}px`;
      }
    });

    function irPara(indice) {
      const largura = wrapper.offsetWidth;

      resizeObserver.disconnect();
      track.style.transform = `translateX(-${indice * largura}px)`;
      wrapper.style.height = `${cards[indice].offsetHeight}px`;
      resizeObserver.observe(cards[indice]);

      dots.forEach((dot, i) => {
        dot.classList.toggle('ativa', i === indice);
      });
    }

    btnAnterior.addEventListener('click', () => {
      indiceAtual = (indiceAtual - 1 + cards.length) % cards.length;
      irPara(indiceAtual);
    });

    btnProxima.addEventListener('click', () => {
      indiceAtual = (indiceAtual + 1) % cards.length;
      irPara(indiceAtual);
    });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        indiceAtual = i;
        irPara(indiceAtual);
      });
    });

    window.addEventListener('resize', () => irPara(indiceAtual));

    irPara(indiceAtual);
  });
})();
