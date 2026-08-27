(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const imagem = lightbox.querySelector('.lightbox-imagem');
    const contador = lightbox.querySelector('.lightbox-contador');
    const btnAnterior = lightbox.querySelector('.lightbox-seta.anterior');
    const btnProxima = lightbox.querySelector('.lightbox-seta.proxima');

    let slides = [];
    let indiceAtual = 0;
    let gatilho = null;

    function mostrarSlide(indice) {
      indiceAtual = (indice + slides.length) % slides.length;
      imagem.src = slides[indiceAtual];
      const temVariasImagens = slides.length > 1;
      contador.textContent = temVariasImagens ? `${indiceAtual + 1} / ${slides.length}` : '';
      contador.style.display = temVariasImagens ? '' : 'none';
      btnAnterior.style.display = temVariasImagens ? '' : 'none';
      btnProxima.style.display = temVariasImagens ? '' : 'none';
    }

    function abrirLightbox(wrap) {
      const galeria = wrap.dataset.galeria;
      if (!galeria) return;
      slides = galeria.split(',').map((src) => src.trim()).filter(Boolean);
      if (slides.length === 0) return;

      gatilho = wrap;
      imagem.alt = wrap.querySelector('img')?.alt || '';
      mostrarSlide(0);

      lightbox.classList.add('aberto');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-travado');
    }

    function fecharLightbox() {
      lightbox.classList.remove('aberto');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-travado');
      if (gatilho) {
        gatilho.focus();
        gatilho = null;
      }
    }

    document.querySelectorAll('.projeto-imagem-wrap').forEach((wrap) => {
      wrap.addEventListener('click', () => abrirLightbox(wrap));
      wrap.addEventListener('keydown', (evento) => {
        if (evento.key === 'Enter' || evento.key === ' ') {
          evento.preventDefault();
          abrirLightbox(wrap);
        }
      });
    });

    lightbox.querySelectorAll('[data-lightbox-fechar]').forEach((el) => {
      el.addEventListener('click', fecharLightbox);
    });

    btnAnterior.addEventListener('click', () => mostrarSlide(indiceAtual - 1));
    btnProxima.addEventListener('click', () => mostrarSlide(indiceAtual + 1));

    document.addEventListener('keydown', (evento) => {
      if (!lightbox.classList.contains('aberto')) return;
      if (evento.key === 'Escape') fecharLightbox();
      if (evento.key === 'ArrowLeft') mostrarSlide(indiceAtual - 1);
      if (evento.key === 'ArrowRight') mostrarSlide(indiceAtual + 1);
    });
  });
})();
