# Vídeo de demonstração do Campin

`Campin_Preview_Portfolio_V8_Anonimizada.mp4` é exibido no modal `#campin-video-dialog` do `index.html`, acionado pelo botão **Assistir demonstração** do card do Campin.

- 22,25 s · 1920×1080 · 24 fps · H.264 · sem áudio · 3.677.071 bytes
- SHA-256: `f24504f78da4b57a8cf008bf6c7ee6d0218eea18ffeff236a903e896ea43de2b`
- Carregamento sob demanda (`preload="none"`, sem autoplay): nada é baixado ao abrir a página nem o modal.

## Auditoria de privacidade (26/11/2026): APROVADA

A versão anterior (V7) foi rejeitada porque o desfoque cobria só as transições e deixava dados legíveis. A V8 foi auditada de forma independente antes da inclusão:

- **Todos os 534 quadros** foram extraídos (um a cada ~41,7 ms), sem perdas e em resolução original, pelo decodificador do navegador.
- **Estrutura:** abertura, cinco telas estáticas com zoom lento (dashboard, mapa, campanhas, fotos e relatórios) e encerramento.
- **Transições:** as seis foram verificadas matematicamente como fusões lineares das cenas vizinhas, sem nenhum pixel fora do modelo. Nenhum quadro isolado foi detectado.
- **Máscaras:** inspecionadas em ampliação de até 5× e com contraste amplificado (8 a 12×). As máscaras são opacas e uniformes, e nenhum texto pode ser recuperado sob elas nem nas bordas.
- **OCR** (motor nativo do Windows) em todos os quadros: nenhum nome de cliente, loja, campanha ou pessoa, nenhum e-mail e nenhum telefone.
- **Permanecem visíveis, por serem de baixo risco:**
  - nome da empresa (já citada no portfólio);
  - usuário de teste "Operacional";
  - datas do calendário;
  - nomes de cidades do mapa base;
  - rótulos da interface.

Qualquer nova versão do vídeo precisa passar pela mesma revisão quadro a quadro antes de substituir este arquivo. **Nunca incluir no repositório a gravação original nem versões com dados legíveis.**
