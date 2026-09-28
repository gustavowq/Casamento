"use strict";
// Leque de cores e alternância das sugestões de traje.
  function dress() {
    const sw = $$(".swatch"), n = sw.length, info = $("#swInfo");
    const off = i => i - (n - 1) / 2;
    const wide = () => sw[0].offsetWidth * (innerWidth < 640 ? .34 : .5);
    gsap.fromTo(sw, { rotation: 0, x: 0, y: 70, rotationY: 0, autoAlpha: 0 }, {
      rotation: i => off(i) * 11, x: i => off(i) * wide(), y: i => Math.abs(off(i)) * 12, rotationY: i => off(i) * -8,
      autoAlpha: 1, duration: 1.5, stagger: .09, ease: "power3.out", scrollTrigger: { trigger: "#fan", start: "top 78%" } });
    sw.forEach(s => s.addEventListener("click", () => {
      sw.forEach(o => o.classList.toggle("is-active", o === s));
      info.innerHTML = `<b>${s.dataset.name}</b><br>${s.dataset.note}`;
      gsap.fromTo(info, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: .5 });
    }));
    const seg = $("#dressSeg"), btns = $$("button", seg), panels = $$(".tips");
    gsap.from(".tips[data-for='0'] li", { autoAlpha: 0, y: 24, stagger: .1, duration: .8, ease: "power3.out", scrollTrigger: { trigger: ".tips", start: "top 85%" } });
    btns.forEach((b, i) => b.addEventListener("click", () => {
      if (seg.dataset.i === String(i)) return;
      seg.dataset.i = i; btns.forEach((o, j) => o.setAttribute("aria-pressed", j === i));
      const out = panels.find(p => !p.hidden), inn = panels[i];
      gsap.to(out.children, { autoAlpha: 0, x: -16, stagger: .04, duration: .22, onComplete() {
        out.hidden = true; inn.hidden = false;
        gsap.fromTo(inn.children, { autoAlpha: 0, x: 18 }, { autoAlpha: 1, x: 0, stagger: .07, duration: .5, ease: "power2.out" });
      } });
    }));
  }

  /* ---------- PRESENTES ---------- */
