(function () {
  // Destaca no menu a seção visível. Apenas as seções de primeiro nível têm link no menu.
  const sections = Array.from(document.querySelectorAll('main > section[id]'));
  const navLinks = document.querySelectorAll('.navbar-items a');
  if (sections.length === 0 || navLinks.length === 0) return;

  let atual = null;

  function marcar(id) {
    if (id === atual) return;
    atual = id;
    navLinks.forEach((link) => {
      const ativo = id !== null && link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', ativo);
      if (ativo) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  // Ativa a última seção cujo topo já passou do meio da tela.
  // No fim da página, a última seção (Contato, que é curta e nunca chega ao meio) fica ativa.
  function atualizar() {
    const alturaPagina = document.documentElement.scrollHeight;
    // Sem rolagem possível (janela do tamanho da página inteira), nenhuma seção é destacada
    if (alturaPagina - window.innerHeight <= 2) return marcar(null);

    const noFim = window.innerHeight + window.scrollY >= alturaPagina - 2;
    if (noFim) return marcar(sections[sections.length - 1].id);

    const meio = window.innerHeight / 2;
    let ativa = null;
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= meio) ativa = section.id;
    });
    marcar(ativa);
  }

  let agendado = false;
  function agendar() {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(() => {
      agendado = false;
      atualizar();
    });
  }

  window.addEventListener('scroll', agendar, { passive: true });
  window.addEventListener('resize', agendar);
  atualizar();
})();
