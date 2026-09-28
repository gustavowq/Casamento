# Convite · Emily & Augusto

Convite digital em HTML, CSS e JavaScript, com abertura animada do envelope e site completo do casamento.

## Executar localmente

1. Abra esta pasta no VS Code.
2. Instale a extensão recomendada Live Server.
3. Clique com o botão direito em index.html e escolha Open with Live Server.

É necessário acesso à internet para carregar Google Fonts e GSAP.

## Onde encontrar cada parte

- index.html: apenas marcação do convite, do site e do modal.
- css/main.css: somente imports, na ordem da cascata.
- css/base/: tokens, normalização e tipografia.
- css/components/: botões, filtros, formulários, modal e arte provisória.
- css/invite/: envelope, selo, cartão e pétalas.
- css/site/: um arquivo visual para cada seção.
- js/main.js: carrega os módulos na ordem correta.
- js/data/: datas, local, PIX e lista de presentes.
- js/core/: utilitários compartilhados.
- js/invite/: sequência de abertura e transição para o site.
- js/site/: comportamento de cada seção.
- js/art/fallbacks.js: ilustrações CSS usadas quando faltam imagens.
- docs/imagens.md: nomes, formatos e destinos das imagens.
- docs/editar.md: guia rápido para alterar o conteúdo.

## Observação importante

A lista de presentes e o RSVP ainda não persistem dados em um servidor. Os pontos de integração continuam marcados com TODO.
