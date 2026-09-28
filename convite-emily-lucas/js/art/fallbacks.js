"use strict";
// Desenha artes provisórias em CSS quando um arquivo de imagem estiver ausente.
  /* ---------- 2. Fallbacks em CSS para imagens ausentes ---------- */
  const mk = (parent, cls, css = {}) => {
    const n = document.createElement("i"); n.className = cls;
    Object.assign(n.style, css); parent.appendChild(n); return n;
  };
  // Um raminho: base no canto inferior-esquerdo, crescendo para cima-direita
  function cluster(parent, { x, y, w, rot = 0, flip = false, lily = true }) {
    const c = document.createElement("div"); c.className = "cl";
    Object.assign(c.style, { left: x + "%", bottom: (100 - y) + "%", width: w + "%",
      transform: `rotate(${rot}deg) scaleX(${flip ? -1 : 1})` });
    [[-18, 78], [-34, 70], [-52, 82], [-70, 62], [-8, 55], [-44, 50]].forEach(([r, l]) =>
      mk(c, "leaf", { width: l + "%", transform: `rotate(${r}deg)` }));
    mk(c, "stem", { width: "58%", transform: "rotate(-40deg)" });
    mk(c, "stem", { width: "74%", transform: "rotate(-58deg)" });
    if (lily) {
      const f = mk(c, "lily", { left: "44%", top: "46%", width: "46%" });
      for (let i = 0; i < 6; i++) mk(f, "p", { transform: `rotate(${i * 60 + 15}deg)` });
      for (let i = 0; i < 6; i++) mk(f, "st", { transform: `rotate(${i * 60 + 45}deg)` });
    }
    mk(c, "bud", { left: "62%", top: "20%", width: "8%", rotate: "40deg" });
    mk(c, "bud", { left: "30%", top: "30%", width: "6%", rotate: "-20deg" });
    [[24, 58, 7], [70, 58, 6], [18, 30, 5], [52, 16, 6], [80, 36, 5]].forEach(([l, t, s]) =>
      mk(c, "fmn", { left: l + "%", top: t + "%", width: s + "%" }));
    parent.appendChild(c); return c;
  }
  function dove(parent, css, flip) {
    const d = document.createElement("div"); d.className = "dove";
    Object.assign(d.style, css, flip ? { transform: "scaleX(-1)" } : {});
    ["t", "b", "w", "h", "k", "e"].forEach(k => mk(d, k)); parent.appendChild(d);
  }
  function rings(parent, css) {
    const r = document.createElement("div"); r.className = "rings-css";
    Object.assign(r.style, css); mk(r, ""); mk(r, ""); parent.appendChild(r);
  }
  const FALLBACK = {
    bouquet(fb) {
      cluster(fb, { x: 3, y: 3, w: 74, rot: 92 });
      cluster(fb, { x: 3, y: 3, w: 62, rot: 55, lily: true });
      cluster(fb, { x: 3, y: 3, w: 58, rot: 128, lily: false });
    },
    branch(fb) { cluster(fb, { x: 6, y: 96, w: 64, rot: 8 }); dove(fb, { left: "42%", top: "0%", width: "42%" }); },
    arch(fb) {
      cluster(fb, { x: 4, y: 16, w: 32, rot: 62 }); cluster(fb, { x: 4, y: 16, w: 28, rot: 24, lily: false });
      cluster(fb, { x: 96, y: 16, w: 32, rot: -62, flip: true }); cluster(fb, { x: 96, y: 16, w: 28, rot: -24, flip: true, lily: false });
      const rib = mk(fb, "", { position: "absolute", left: "30%", right: "30%", top: "30%", height: "22%",
        borderBottom: "max(1px,.5cqw) solid #9fb3cf", borderRadius: "0 0 50% 50%" });
      mk(fb, "", { position: "absolute", left: "49.8%", top: "52%", width: "max(1px,.2cqw)", height: "12%", background: "#9fb3cf" });
      dove(fb, { left: "16%", top: "8%", width: "18%" }); dove(fb, { left: "66%", top: "8%", width: "18%" }, true);
      rings(fb, { left: "43%", top: "62%", width: "14%" });
    },
    bow(fb) {
      cluster(fb, { x: 50, y: 76, w: 30, rot: -62 }); cluster(fb, { x: 50, y: 76, w: 30, rot: 62, flip: true });
      cluster(fb, { x: 50, y: 76, w: 25, rot: -30, lily: false }); cluster(fb, { x: 50, y: 76, w: 25, rot: 30, flip: true, lily: false });
      const b = document.createElement("div"); b.className = "bow";
      Object.assign(b.style, { left: "34%", top: "50%", width: "32%" });
      ["lp l", "lp r", "tl l", "tl r", "kn"].forEach(k => mk(b, k)); fb.appendChild(b);
    },
    stamp(fb) { cluster(fb, { x: 14, y: 96, w: 80, rot: 0 }); },
    photo(fb, box) {
      fb.innerHTML = `<div class="ph-sky"></div><span class="ph-year">${box.dataset.year || ""}</span>`;
      cluster(fb, { x: 2, y: 102, w: 62, rot: 6 }); cluster(fb, { x: 98, y: 102, w: 52, rot: -8, flip: true, lily: false });
    },
    rings(fb) { rings(fb, { left: "18%", top: "6%", width: "64%" }); }
  };
