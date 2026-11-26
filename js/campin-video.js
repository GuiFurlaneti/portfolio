(function () {
  'use strict';

  const abrir = document.getElementById('campin-video-abrir');
  const dialogo = document.getElementById('campin-video-dialog');
  const fechar = document.getElementById('campin-video-fechar');
  const video = document.getElementById('campin-video-player');

  if (!abrir || !dialogo || !fechar || !video || typeof dialogo.showModal !== 'function') return;

  // O botão só aparece quando o atributo `hidden` é removido do HTML, no mesmo commit
  // que adiciona o MP4 aprovado em media/ (ver media/README.md). Não há verificação
  // de rede no carregamento: um HEAD com o arquivo ausente gerava erro 404 no console.

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
