"use strict";
// Gera a textura de papel uma única vez na inicialização.
  /* ---------- 1. Textura de papel (ruído em canvas → PNG) ---------- */
  (function grain() {
    const c = document.createElement("canvas"); c.width = c.height = 180;
    const x = c.getContext("2d"), d = x.createImageData(180, 180);
    for (let i = 0; i < d.data.length; i += 4) {
      const v = 95 + Math.random() * 60 | 0;
      d.data[i] = v; d.data[i + 1] = v - 6; d.data[i + 2] = v - 18;
      d.data[i + 3] = Math.random() < .5 ? Math.random() * 26 | 0 : 0;
    }
    x.putImageData(d, 0, 0);
    document.documentElement.style.setProperty("--grain", `url(${c.toDataURL("image/png")})`);
  })();
