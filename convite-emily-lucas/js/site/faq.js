"use strict";
// Abertura e fechamento das perguntas frequentes.
  function faq() {
    $$(".faq-q").forEach(q => q.addEventListener("click", () => {
      const it = q.parentElement, open = !it.classList.contains("open");
      it.classList.toggle("open", open); q.setAttribute("aria-expanded", open);
      setTimeout(() => ScrollTrigger.refresh(), 650);
    }));
  }

  /* ---------- RODAPÉ: selo de cera 3D girando com o scroll ---------- */
