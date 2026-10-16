(function () {
  const wrapper = document.querySelector('.carrossel-wrapper');
  const track = wrapper && wrapper.querySelector('.projetos-grid');
  const nav = document.querySelector('.carrossel-nav');
  const indicadores = document.querySelector('.carrossel-indicadores');
  const btnAnterior = document.querySelector('.carrossel-seta.anterior');
  const btnProxima = document.querySelector('.carrossel-seta.proxima');
  const status = document.getElementById('carrossel-status');

  if (!wrapper || !track) return;

  const cards = Array.from(track.querySelectorAll('.projeto-card'));
  if (cards.length === 0) return;

  // Com um único projeto não há navegação: o card aparece normalmente
  if (cards.length === 1 || !nav || !indicadores || !btnAnterior || !btnProxima) {
    if (nav) nav.hidden = true;
    return;
  }

  let indiceAtual = 0;

  function nomeDoCard(card) {
    const titulo = card.querySelector('.projeto-nome');
    return titulo ? titulo.textContent.trim() : '';
  }

  // Um indicador (botão) por card — a quantidade acompanha o HTML automaticamente
  const dots = cards.map((card, i) => {
    card.setAttribute('aria-label', `${i + 1} de ${cards.length}: ${nomeDoCard(card)}`);

    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carrossel-dot';
    dot.setAttribute('aria-label', `Mostrar projeto ${i + 1} de ${cards.length}: ${nomeDoCard(card)}`);
    dot.setAttribute('aria-controls', wrapper.id);
    dot.addEventListener('click', () => irPara(i, true));
    indicadores.appendChild(dot);
    return dot;
  });

  // Mantem a altura do wrapper sincronizada com a altura real do card ativo
  // o tempo todo (inclusive depois que uma imagem lazy termina de carregar),
  // em vez de medir uma unica vez — evita que a borda inferior do card fique
  // cortada por uma altura calculada cedo demais.
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      wrapper.style.height = `${entry.target.offsetHeight}px`;
    }
  });

  function irPara(indice, anunciar) {
    indiceAtual = (indice + cards.length) % cards.length;

    // Percentual da propria trilha (= largura do wrapper): nao precisa recalcular no resize
    track.style.transform = `translateX(-${indiceAtual * 100}%)`;

    resizeObserver.disconnect();
    wrapper.style.height = `${cards[indiceAtual].offsetHeight}px`;
    resizeObserver.observe(cards[indiceAtual]);

    dots.forEach((dot, i) => {
      dot.setAttribute('aria-current', i === indiceAtual ? 'true' : 'false');
    });

    if (anunciar && status) {
      status.textContent = `Projeto ${indiceAtual + 1} de ${cards.length}: ${nomeDoCard(cards[indiceAtual])}`;
    }
  }

  btnAnterior.addEventListener('click', () => irPara(indiceAtual - 1, true));
  btnProxima.addEventListener('click', () => irPara(indiceAtual + 1, true));

  // Setas do teclado quando o foco esta nos controles do carrossel
  nav.addEventListener('keydown', (evento) => {
    if (evento.key === 'ArrowLeft') {
      evento.preventDefault();
      irPara(indiceAtual - 1, true);
      if (evento.target.classList.contains('carrossel-dot')) dots[indiceAtual].focus();
    } else if (evento.key === 'ArrowRight') {
      evento.preventDefault();
      irPara(indiceAtual + 1, true);
      if (evento.target.classList.contains('carrossel-dot')) dots[indiceAtual].focus();
    }
  });

  // Os cards fora da tela continuam acessiveis (leitores de tela e Tab):
  // ao receber foco, o card correspondente passa a ser exibido.
  cards.forEach((card, i) => {
    card.addEventListener('focusin', () => {
      if (i !== indiceAtual) irPara(i, false);
    });
  });

  // Ao focar um elemento fora da area visivel, o navegador rola o wrapper
  // (mesmo com overflow:hidden), o que somaria ao translateX. Quem posiciona é so o transform.
  wrapper.addEventListener('scroll', () => {
    if (wrapper.scrollLeft !== 0) wrapper.scrollLeft = 0;
  });

  irPara(indiceAtual, false);
})();
