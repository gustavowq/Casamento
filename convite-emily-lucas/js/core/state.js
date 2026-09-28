"use strict";
// Estado compartilhado da sequência e referências centrais do DOM.
  const el = {
    wrap: $("#envWrap"), envelope: $("#envelope"), intro: $("#intro"), hint: $("#hint"),
    seal: $("#seal"), halfL: $("#halfL"), halfR: $("#halfR"), branch: $("#branch"),
    flap: $("#flap"), flapShadow: $("#flapShadow"), pocket: $("#pocket"), card: $("#card"),
    layer: $("#cardLayer"), petals: $("#petals"), replay: $("#replay"),
    after: $("#after"), enterBtn: $("#enterBtn"),
    corners: $$(".corner-in")
  };
  let state = "loading";      // loading → idle → opening → open
  let tlOpen, tlCard, hintPulse, autoTl;
  const extras = [];          // lascas e pétalas criadas via JS
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const lockScroll = on => document.documentElement.classList.toggle("lock", on);
  let siteReady = false;
