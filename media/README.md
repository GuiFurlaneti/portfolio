# Vídeo de demonstração do Campin

O modal do vídeo está pronto no `index.html` (`#campin-video-dialog`), com reprodução sob demanda (`preload="none"`, sem autoplay). O botão **Assistir prévia (22s)** continua com o atributo `hidden` até que um MP4 aprovado seja adicionado a esta pasta.

## Situação em 26/11/2026: V7 bloqueada por privacidade

O arquivo `Campin_Preview_Portfolio_V7_Blur_Revisado.mp4` (22,25 s, 1920×1080, H.264, sem áudio, 1.398.188 bytes, SHA-256 `569a2b63…6b341126`) **não foi incluído no repositório**. Na revisão quadro a quadro (a cada 0,25 s, em resolução original), o desfoque cobre apenas as transições de cena. Em vários trechos, os dados abaixo ficam legíveis:

Os dados expostos não são reproduzidos aqui de propósito; o detalhamento ficou com o autor, fora do repositório.

| Trecho | Tela | Tipo de dado legível |
|---|---|---|
| ~5,25–6,25 s e ~8,0 s | Dashboard / calendário | Nome de cliente e nomes de campanhas |
| ~6,75–7,75 s | Mensagens dos Supervisores | Nome de loja e de campanha |
| ~11,0–11,5 s | Campanhas | Nomes de campanhas e de cliente |
| ~12,5–13,0 s | Fotos das Ações | Nome de campanha |
| ~13,25–14,0 s | Clientes | Nome de cliente |
| ~14,5–15,0 s | Equipes | **Nome e e-mail corporativo de uma pessoa real**, além de outros e-mails |
| ~15,5–19,25 s | Relatórios | Parte do nome do cliente escapando do desfoque |

## Correção necessária antes de publicar

1. Aplicar desfoque (ou máscara sólida) **em todos os quadros** de cada cena, e não só nas transições, cobrindo:
   - nomes de clientes, lojas e campanhas;
   - nomes e e-mails de pessoas;
   - a coluna Cliente inteira nos relatórios.
2. Para a tela Equipes, preferir regravar com uma base só de usuários de teste ou cortar a cena.
3. Exportar uma nova versão (ex.: V8) e repetir a revisão quadro a quadro em resolução original, inclusive com o vídeo pausado.
4. Só então copiar o arquivo aprovado para esta pasta.

## Ativação (no mesmo commit que adicionar o MP4 aprovado)

1. Copiar o arquivo para `media/` e ajustar o `src` do `<source>` em `index.html` se o nome mudar.
2. Remover o atributo `hidden` do botão `#campin-video-abrir`.
3. Hierarquia de botões: manter o vídeo como `btn-primario` e trocar o "Case técnico em PDF" para `btn-secundario`, para não haver dois botões azuis.
4. Opcional: reintroduzir na nota do card a frase "Prévia de 22 segundos com navegação pelos módulos."
5. Confirmar que a nota do modal ("Os nomes de clientes e campanhas apresentados estão desfocados") é verdadeira para a nova versão.
6. Testar a reprodução no desktop e no mobile, a pausa ao fechar, Esc, o clique fora do modal e o retorno do foco.

**Não incluir no repositório público a gravação original nem versões com dados legíveis.**
