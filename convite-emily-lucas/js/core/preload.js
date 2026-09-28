"use strict";
// Pré-carrega imagens/fontes e aciona os fallbacks necessários.
  /* ---------- 3. Pré-carregamento (imagens + fontes) ---------- */
  function loadImg(img) {
    return new Promise(res => {
      if (img.complete) return res(img.naturalWidth > 0);
      img.addEventListener("load", () => res(true), { once: true });
      img.addEventListener("error", () => res(false), { once: true });
    }).then(ok => ok && img.decode ? img.decode().then(() => true, () => true) : ok);
  }
  function markArt(img, ok) {
    const box = img.parentElement;
    if (ok) return box.classList.add("ok");
    box.classList.add("missing");
    const kind = box.dataset.fb;
    if (kind && FALLBACK[kind] && !box.querySelector(".fb")) {
      const fb = document.createElement("div"); fb.className = "fb"; box.appendChild(fb); FALLBACK[kind](fb, box);
    }
  }
  async function preload() {
    const imgs = $$("#invite img[data-art]");     // só o convite bloqueia o clique; o site carrega depois
    const results = await Promise.all(imgs.map(loadImg));
    imgs.forEach((img, i) => markArt(img, results[i]));
    const missing = [...new Set(imgs.filter((_, i) => !results[i]).map(i => i.getAttribute("src")))];
    if (missing.length) console.info("[convite] Imagens ausentes — usando ilustrações CSS provisórias:", missing);
    await Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise(r => setTimeout(r, 2500))]);
  }
