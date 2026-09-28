# Guia de edição

## Dados centrais

Edite js/data/config.js para alterar:

- data e horário do casamento;
- prazo do RSVP;
- nome do local;
- chave PIX.

A chave PIX `presente@emilyelucas.com.br` e o código de hospedagem `EMILYELUCAS` foram mantidos a pedido dos noivos. Atualize-os somente quando houver novos dados confirmados.

A lista de presentes fica em js/data/gifts.js. Cada item possui identificador, categoria, nome, descrição e preço. Use taken: true para marcar um presente indisponível; itens com quota usam quota.total e quota.sold.

## Textos e seções

Os textos visíveis continuam em index.html, organizados pelos comentários:

- Convite;
- Navegação;
- Hero;
- Nossa história;
- O grande dia;
- Dress code;
- Presentes;
- RSVP;
- Dúvidas;
- Rodapé;
- Modal de presente.

## Aparência

- Cores e fontes: css/base/tokens.css.
- Envelope e cartão: css/invite/.
- Componentes reutilizáveis: css/components/.
- Cada seção do site: arquivo de mesmo nome em css/site/.

## Imagens

Consulte docs/imagens.md. Os caminhos já apontam para assets/img/convite, assets/img/cartao, assets/img/site e assets/icons.

## Integrações futuras

Procure por TODO em js/site/gifts.js e js/site/rsvp.js para conectar um backend e persistir reservas e confirmações.
