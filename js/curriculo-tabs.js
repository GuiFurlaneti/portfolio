const botoes = document.querySelectorAll('.secoes-btn');
const secoes = document.querySelectorAll('.secao-conteudo');

botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    // Alternar classe 'ativo' nos botões
    botoes.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');

    // Esconder todas as seções
    secoes.forEach(secao => secao.classList.remove('ativa'));

    // Mostrar a seção correspondente ao botão clicado
    const idAlvo = botao.getAttribute('data-target');
    document.getElementById(idAlvo).classList.add('ativa');
  });
});
