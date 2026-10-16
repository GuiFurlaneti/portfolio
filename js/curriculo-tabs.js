(function () {
  // Abas do currículo no padrão WAI-ARIA: role="tab" + aria-selected + painel com hidden.
  // Setas esquerda/direita, Home e End movem entre as abas (tabindex "roving").
  const tablist = document.querySelector('.secoes[role="tablist"]');
  if (!tablist) return;

  const abas = Array.from(tablist.querySelectorAll('[role="tab"]'));
  if (abas.length === 0) return;

  function ativar(abaAtiva, focar) {
    abas.forEach((aba) => {
      const selecionada = aba === abaAtiva;
      aba.setAttribute('aria-selected', String(selecionada));
      aba.tabIndex = selecionada ? 0 : -1;
      aba.classList.toggle('ativo', selecionada);

      const painel = document.getElementById(aba.getAttribute('aria-controls'));
      if (painel) {
        painel.hidden = !selecionada;
        painel.classList.toggle('ativa', selecionada);
      }
    });

    if (focar) abaAtiva.focus();
  }

  abas.forEach((aba, i) => {
    aba.addEventListener('click', () => ativar(aba, false));

    aba.addEventListener('keydown', (evento) => {
      let alvo = null;
      if (evento.key === 'ArrowRight') alvo = abas[(i + 1) % abas.length];
      else if (evento.key === 'ArrowLeft') alvo = abas[(i - 1 + abas.length) % abas.length];
      else if (evento.key === 'Home') alvo = abas[0];
      else if (evento.key === 'End') alvo = abas[abas.length - 1];

      if (alvo) {
        evento.preventDefault();
        ativar(alvo, true);
      }
    });
  });

  ativar(abas.find((aba) => aba.getAttribute('aria-selected') === 'true') || abas[0], false);
})();
