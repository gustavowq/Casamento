"use strict";
// Cartões da cerimônia/recepção e programação do dia.
  function day() {
    $$(".flip").forEach(f => {
      const toggle = () => { f.classList.toggle("is-flipped"); f.setAttribute("aria-pressed", f.classList.contains("is-flipped")); };
      f.addEventListener("click", e => { if (!e.target.closest("a, .btn")) toggle(); });
      f.addEventListener("keydown", e => { if (e.target === f && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); toggle(); } });
    });
    gsap.fromTo(".tl-line i", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".tl", start: "top 62%", end: "bottom 62%", scrub: .6 } });
    $$(".tl li").forEach(li => ScrollTrigger.create({ trigger: li, start: "top 64%", onEnter: () => li.classList.add("on"), onLeaveBack: () => li.classList.remove("on") }));
  }

  /* ---------- DRESS CODE ---------- */
