(function () {
  'use strict';

  const abrir = document.getElementById('campin-video-abrir');
  const dialogo = document.getElementById('campin-video-dialog');
  const fechar = document.getElementById('campin-video-fechar');
  const video = document.getElementById('campin-video-player');

  if (!abrir || !dialogo || !fechar || !video) return;

  // Navegadores sem <dialog>: o botão abre o MP4 diretamente em vez de não fazer nada.
  if (typeof dialogo.showModal !== 'function') {
    const source = video.querySelector('source');
    abrir.addEventListener('click', function () {
      if (source) window.open(source.getAttribute('src'), '_blank', 'noopener');
    });
    return;
  }

  // O vídeo (V8 anonimizada, ver media/README.md) tem preload="none": nada é baixado
  // ao carregar a página nem ao abrir o diálogo, só quando a reprodução começa.

  abrir.addEventListener('click', function () {
    dialogo.showModal();
    fechar.focus();
  });

  fechar.addEventListener('click', function () {
    dialogo.close();
  });

  dialogo.addEventListener('click', function (event) {
    // Em <dialog>, clicar fora da caixa produz alvo no próprio elemento.
    if (event.target === dialogo) {
      const rect = dialogo.getBoundingClientRect();
      const dentro = event.clientX >= rect.left && event.clientX <= rect.right &&
                     event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!dentro) dialogo.close();
    }
  });

  dialogo.addEventListener('close', function () {
    video.pause();
    video.currentTime = 0;
    abrir.focus();
  });
})();
