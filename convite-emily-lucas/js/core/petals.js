"use strict";
// Utilitários aleatórios e explosões de pétalas compartilhadas.
  /* ---------- 5. Efeitos gerados por JS ---------- */
  /* ---------- Pétalas em explosão (celebração) ---------- */
  function burst(x, y, n = 30) {
    if (reduced) return;
    const kinds = ["w", "p", "b", "p", "w"];
    for (let i = 0; i < n; i++) {
      const p = document.createElement("div"), s = rand(9, 18);
      p.className = "petal " + kinds[i % kinds.length];
      Object.assign(p.style, { width: s + "px", height: s * rand(.8, 1.15) + "px" });
      el.petals.appendChild(p);
      gsap.set(p, { x, y, rotation: rand(0, 360) });
      const a = rand(-Math.PI * .95, -Math.PI * .05), v = rand(110, 360);
      gsap.timeline({ onComplete: () => p.remove() })
        .to(p, { x: x + Math.cos(a) * v, y: y + Math.sin(a) * v, rotation: `+=${rand(-180, 180)}`, rotationX: rand(90, 360), duration: rand(.7, 1.1), ease: "power3.out" })
        .to(p, { y: `+=${rand(280, 560)}`, x: `+=${rand(-70, 70)}`, rotationX: "+=360", autoAlpha: 0, duration: rand(1.8, 2.8), ease: "power1.in" });
    }
  }
