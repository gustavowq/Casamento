# Especificação das imagens

As ilustrações do envelope ficam em `assets/img/convite/`. Use WebP com transparência e estilo de aquarela botânica. Enquanto uma delas faltar, a página mostra uma ilustração provisória feita em CSS.

O cartão revelado ao abrir o envelope usa a fotografia `assets/img/cartao/save-the-date-emily-augusto.jpeg` (1136 × 1600 px), já incluída no projeto. Para trocá-la, substitua o arquivo mantendo o mesmo nome. A imagem enviada traz o horário **5PM**; o site informa cerimônia às **16h**.

1. lirio-buque.webp        ~1200x1200  Buquê de lírios brancos (pintinhas rosadas, estames cor de ferrugem, botões),
                                       miosótis azuis e folhas longas verde-sálvia, com manchas leves de aquarela.
                                       Desenhe para o CANTO SUPERIOR ESQUERDO: base no canto, flores crescendo para dentro.
                                       (As outras 3 cópias são espelhadas via CSS.)
2. selo-EA.webp            ~600x600    Selo de cera verde-escuro (#1f4a2a) visto de frente, borda irregular, brilho,
                                       monograma "E & A" e duas alianças prensadas. Centralizado, sem sombra projetada
                                       (a sombra é CSS).
3. ramo-lirio-pomba.webp   ~900x700    Ramo de lírio na diagonal (base embaixo à esquerda, subindo para a direita),
                                       com uma pomba branca pousada perto do topo.
4. aliancas.webp           ~400x240    Duas alianças entrelaçadas em dourado envelhecido (#b9a36a).
5. selo-postal.webp        ~400x500    Ilustração de um lírio em aquarela sobre fundo claro, para o miolo do selo postal
                                       (a serrilha, a moldura e os textos são CSS).
6. forro-lirios.webp       ~300x300    (OPCIONAL) Estampa que se repete, sem emendas, para o forro azul do envelope
                                       (lírios brancos + alianças). Sem ela, o forro usa uma estampa feita em CSS.

Dica: exporte em 2x o tamanho de exibição e comprima em WebP com qualidade entre 80 e 85.

SITE (depois do convite) — reaproveita lirio-buque.webp no topo e no rodapé, e acrescenta:
7.  historia-1.webp … historia-4.webp  ~800x1000 (4:5)  Fotos do casal para as polaroides da "Nossa história"
                                       (2019, 2021, 2024, 2027). Sem elas, aparece uma aquarela com o ano.


## Pastas de destino

- assets/img/convite/: elementos do convite.
- assets/img/cartao/: fotografia revelada pela abertura do envelope.
- assets/img/site/: fotos da história.
- assets/icons/: favicon e prévia social.
