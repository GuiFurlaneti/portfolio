(function () {
  'use strict';

  const abrir = document.getElementById('campin-video-abrir');
  const dialogo = document.getElementById('campin-video-dialog');
  const fechar = document.getElementById('campin-video-fechar');
  const video = document.getElementById('campin-video-player');

  if (!abrir || !dialogo || !fechar || !video || typeof dialogo.showModal !== 'function') return;

  // O vídeo será disponibilizado apenas após uma revisão final da anonimização.
  // Não exibir um botão que abriria um player com arquivo ausente.
  const source = video.querySelector('source');
  if (source && typeof fetch === 'function') {
    fetch(source.getAttribute('src'), { method: 'HEAD' })
      .then(function (response) {
        if (response.ok) abrir.hidden = false;
      })
      .catch(function () {});
  }

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
