"use strict";
// Lista editável de categorias e presentes.
  const CAT = { casa: "Casa", lua: "Lua de mel", exp: "Experiência" };
  const GIFTS = [
    { id: "cotas", cat: "lua", ini: "L", hue: "blue", name: "Cotas da lua de mel", desc: "Cada cota nos leva um pouco mais longe pela costa de Portugal.", price: 150, quota: { total: 40, sold: 14 } },
    { id: "tacas", cat: "casa", ini: "T", hue: "blush", name: "Jogo de taças de cristal", desc: "Para brindarmos cada conquista — e cada sexta-feira à noite.", price: 380 },
    { id: "lisboa", cat: "lua", ini: "J", hue: "blush", name: "Jantar com vista em Lisboa", desc: "Uma noite no miradouro, com vinho verde e fado ao fundo.", price: 450 },
    { id: "espresso", cat: "casa", ini: "C", hue: "sage", name: "Máquina de café espresso", desc: "Para o café que começou toda esta história.", price: 1200 },
    { id: "barco", cat: "lua", ini: "B", hue: "blue", name: "Passeio de barco em Amalfi", desc: "Um dia inteiro entre Positano e Amalfi, com mergulho incluso.", price: 620, taken: true },
    { id: "ceramica", cat: "exp", ini: "A", hue: "sage", name: "Aula de cerâmica a dois", desc: "Vamos fazer as nossas próprias xícaras (tortas, provavelmente).", price: 280 },
    { id: "cama", cat: "casa", ini: "E", hue: "blue", name: "Jogo de cama 400 fios", desc: "Algodão egípcio para domingos preguiçosos.", price: 520, taken: true },
    { id: "jardim", cat: "casa", ini: "M", hue: "sage", name: "Mudas para o nosso jardim", desc: "Lírios, miosótis e uma oliveira para crescer com a gente.", price: 190 },
    { id: "panela", cat: "casa", ini: "P", hue: "blush", name: "Panela de ferro esmaltada", desc: "Para os almoços de família que ainda vão acontecer.", price: 890 },
    { id: "spa", cat: "exp", ini: "S", hue: "blush", name: "Dia de spa para o casal", desc: "Porque organizar um casamento também cansa.", price: 540 }
  ];
  const brl = v => "R$ " + v.toLocaleString("pt-BR");
