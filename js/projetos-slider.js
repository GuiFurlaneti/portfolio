(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.projetos-container');
    const wrapper = document.querySelector('.carrossel-wrapper');
    const projetos = document.querySelectorAll('.projeto-card');
    const btnAnterior = document.querySelector('.seta.anterior');
    const btnProxima = document.querySelector('.seta.proxima');
    const bolinhas = document.querySelectorAll('.bolinha');

    let indiceAtual = 0;

    function mostrarProjeto(indice) {
      const largura = container.offsetWidth;

      // Move o carrossel para o slide correto
      container.style.transform = `translateX(-${indice * largura}px)`;

      // Ajusta altura dinamicamente com base no projeto visível
      const projetoVisivel = projetos[indice];
      wrapper.style.height = `${projetoVisivel.offsetHeight}px`;

      // Atualiza bolinhas de navegação
      bolinhas.forEach((bolinha, i) => {
        bolinha.classList.toggle('ativa', i === indice);
      });
    }

    // Navegar para o projeto anterior
    btnAnterior.addEventListener('click', () => {
      indiceAtual = (indiceAtual - 1 + projetos.length) % projetos.length;
      mostrarProjeto(indiceAtual);
    });

    // Navegar para o próximo projeto
    btnProxima.addEventListener('click', () => {
      indiceAtual = (indiceAtual + 1) % projetos.length;
      mostrarProjeto(indiceAtual);
    });

    // Clique nas bolinhas
    bolinhas.forEach((bolinha, i) => {
      bolinha.addEventListener('click', () => {
        indiceAtual = i;
        mostrarProjeto(indiceAtual);
      });
    });

    // Garante que a altura inicial seja correta após carregamento
    window.addEventListener('load', () => {
      mostrarProjeto(indiceAtual);
    });

    // Também reajusta se redimensionar a janela
    window.addEventListener('resize', () => {
      mostrarProjeto(indiceAtual);
    });
  });
})();
