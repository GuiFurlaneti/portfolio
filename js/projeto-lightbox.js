(function () {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const imagem = lightbox.querySelector('.lightbox-imagem');
  const titulo = lightbox.querySelector('.lightbox-titulo');
  const contador = lightbox.querySelector('.lightbox-contador');
  const nota = lightbox.querySelector('.lightbox-nota');
  const btnFechar = lightbox.querySelector('.lightbox-fechar');
  const btnAnterior = lightbox.querySelector('.lightbox-seta.anterior');
  const btnProxima = lightbox.querySelector('.lightbox-seta.proxima');

  // Conteudo da pagina que fica inacessivel (inert) enquanto o dialogo esta aberto
  const fundo = [document.querySelector('.skip-link'), document.querySelector('.container'), document.querySelector('footer')]
    .filter(Boolean);

  let slides = [];
  let nomeProjeto = '';
  let indiceAtual = 0;
  let gatilho = null;

  function mostrarSlide(indice) {
    indiceAtual = (indice + slides.length) % slides.length;
    const slide = slides[indiceAtual];
    const temVariasImagens = slides.length > 1;

    imagem.src = slide.src;
    imagem.alt = slide.titulo ? `${nomeProjeto} — ${slide.titulo}` : nomeProjeto;
    titulo.textContent = slide.titulo ? `${nomeProjeto} · ${slide.titulo}` : nomeProjeto;
    contador.textContent = temVariasImagens ? `${indiceAtual + 1} / ${slides.length}` : '';
    btnAnterior.hidden = !temVariasImagens;
    btnProxima.hidden = !temVariasImagens;
  }

  function abrirLightbox(botao) {
    const galeria = botao.dataset.galeria;
    if (!galeria) return;

    slides = galeria.split(',').map((entrada) => {
      const [src, tituloSlide] = entrada.split('|');
      return { src: (src || '').trim(), titulo: (tituloSlide || '').trim() };
    }).filter((slide) => slide.src);
    if (slides.length === 0) return;

    gatilho = botao;
    nomeProjeto = botao.dataset.galeriaNome || '';
    nota.textContent = botao.dataset.galeriaNota || '';
    mostrarSlide(0);

    lightbox.hidden = false;
    document.body.classList.add('lightbox-travado');
    fundo.forEach((el) => { el.inert = true; });
    btnFechar.focus();
  }

  function fecharLightbox() {
    if (lightbox.hidden) return;
    lightbox.hidden = true;
    document.body.classList.remove('lightbox-travado');
    fundo.forEach((el) => { el.inert = false; });
    imagem.src = 'data:,';
    if (gatilho) {
      gatilho.focus();
      gatilho = null;
    }
  }

  // Mantem o foco do Tab dentro do dialogo (reforco para navegadores sem suporte a inert)
  function prenderFoco(evento) {
    const focaveis = Array.from(lightbox.querySelectorAll('button')).filter((el) => !el.hidden);
    if (focaveis.length === 0) return;
    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];

    if (evento.shiftKey && document.activeElement === primeiro) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primeiro.focus();
    } else if (!lightbox.contains(document.activeElement)) {
      evento.preventDefault();
      primeiro.focus();
    }
  }

  document.querySelectorAll('.projeto-imagem-wrap[data-galeria]').forEach((botao) => {
    botao.addEventListener('click', () => abrirLightbox(botao));
  });

  lightbox.querySelectorAll('[data-lightbox-fechar]').forEach((el) => {
    el.addEventListener('click', fecharLightbox);
  });

  btnAnterior.addEventListener('click', () => mostrarSlide(indiceAtual - 1));
  btnProxima.addEventListener('click', () => mostrarSlide(indiceAtual + 1));

  document.addEventListener('keydown', (evento) => {
    if (lightbox.hidden) return;
    if (evento.key === 'Escape') fecharLightbox();
    else if (evento.key === 'Tab') prenderFoco(evento);
    else if (slides.length > 1 && evento.key === 'ArrowLeft') mostrarSlide(indiceAtual - 1);
    else if (slides.length > 1 && evento.key === 'ArrowRight') mostrarSlide(indiceAtual + 1);
  });
})();
