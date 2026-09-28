"use strict";
// Navegação, menu móvel, âncoras e faixa animada.
  function nav() {
    const navEl = $("#nav"), prog = $(".nav-prog"), links = $$(".nav-links a");
    ScrollTrigger.create({ trigger: "#inicio", start: "bottom 75%", onEnter: () => navEl.classList.add("show"), onLeaveBack: () => navEl.classList.remove("show") });
    ScrollTrigger.create({ start: 0, end: "max", onUpdate: s => gsap.set(prog, { scaleX: s.progress }) });
    links.forEach(a => {
      const sec = $(a.getAttribute("href"));
      ScrollTrigger.create({ trigger: sec, start: "top 45%", end: "bottom 45%",
        onToggle: s => s.isActive && links.forEach(l => l.classList.toggle("active", l === a)) });
    });
    $("#burger").addEventListener("click", () => {
      const open = !$("#navRoot").classList.contains("menu-open");
      $("#navRoot").classList.toggle("menu-open", open);
      $("#burger").setAttribute("aria-expanded", open);
      if (open) gsap.fromTo("#menu > *", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .6, stagger: .06, ease: "power3.out", delay: .1 });
    });
    $$("[data-back]").forEach(b => b.addEventListener("click", backToInvite));
  }
  function closeMenu() { $("#navRoot").classList.remove("menu-open"); $("#burger").setAttribute("aria-expanded", "false"); }
  function anchors() {
    site.addEventListener("click", e => {
      const a = e.target.closest('a[href^="#"]'); if (!a) return;
      const t = $(a.getAttribute("href")); if (!t) return;
      e.preventDefault(); closeMenu();
      const y = t.getBoundingClientRect().top + scrollY - (t.id === "inicio" ? 0 : 20);
      window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
    });
  }

  /* ---------- FAIXA (acelera com a velocidade do scroll) ---------- */
  function marquee() {
    const t = gsap.to(".mq-track", { xPercent: -50, duration: 30, ease: "none", repeat: -1 });
    ScrollTrigger.create({ trigger: ".marquee", start: "top bottom", end: "bottom top", onUpdate: s => {
      t.timeScale(1 + Math.min(Math.abs(s.getVelocity()) / 220, 6) * (s.direction));
      gsap.to(t, { timeScale: 1, duration: 1.4, ease: "power2.out", overwrite: true });
    } });
  }

  /* ---------- NOSSA HISTÓRIA ---------- */
