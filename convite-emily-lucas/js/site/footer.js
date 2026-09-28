"use strict";
// Rodapé, revelações gerais, aura e inicialização final.
  /* ---------- Inicialização (uma vez) ---------- */
  function initSite() {
    siteReady = true;
    gsap.registerPlugin(ScrollTrigger, Flip);
    $$("#site img[data-art]").forEach(img => loadImg(img).then(ok => markArt(img, ok)));
    $$("#site .orn[data-orn]").forEach(o => o.dataset.orn.split(";").forEach(p => {
      const [x, y, w, rot, flip, lily] = p.split(",").map(Number);
      cluster(o, { x, y, w, rot, flip: !!flip, lily: lily !== 0 });
    }));
    heroPetals();
    story();                 // o pin vem antes dos outros gatilhos
    heroScroll(); marquee(); nav(); countdown(); day(); dress(); gifts(); rsvp(); faq(); coin(); reveals(); aura(); anchors();
    ScrollTrigger.sort();
  }

  function coin() {
    const c = $("#coin");
    for (let i = 1; i <= 8; i++) { const e = document.createElement("i"); e.className = "edge"; e.style.setProperty("--z", -i + "px"); c.prepend(e); }
    gsap.fromTo(c, { rotationY: -30, rotationX: 10 }, { rotationY: 540, rotationX: -6, ease: "none", scrollTrigger: { trigger: ".footer", start: "top bottom", end: "bottom bottom", scrub: 1.2 } });
  }

  /* ---------- Revelações no scroll ---------- */
  function reveals() {
    if (reduced) return;
    const items = $$("#site [data-reveal]").filter(n => !n.closest(".chapter"));
    gsap.set(items, { autoAlpha: 0, y: 36 });
    ScrollTrigger.batch(items, { start: "top 90%", once: true,
      onEnter: b => gsap.to(b, { autoAlpha: 1, y: 0, duration: 1.1, stagger: .1, ease: "power3.out", overwrite: true }) });
    $$("#site .h2").forEach(h => gsap.fromTo(h, { clipPath: "inset(-40% 100% -40% -10%)" },
      { clipPath: "inset(-40% -10% -40% -10%)", duration: 1.7, ease: "power2.inOut", scrollTrigger: { trigger: h, start: "top 88%", once: true } }));
    gsap.utils.toArray(".flip").forEach((f, i) => gsap.fromTo(f, { rotationY: i ? 25 : -25, transformPerspective: 1200 }, { rotationY: 0, duration: 1.4, ease: "power3.out", scrollTrigger: { trigger: f, start: "top 88%" } }));
  }

  /* ---------- Aura suave que segue o cursor ---------- */
  function aura() {
    if (!finePointer || reduced) return;
    const a = $(".aura"), xT = gsap.quickTo(a, "x", { duration: .9, ease: "power3" }), yT = gsap.quickTo(a, "y", { duration: .9, ease: "power3" });
    addEventListener("pointermove", e => { if (state !== "site") return; xT(e.clientX); yT(e.clientY); a.style.opacity = 1; });
  }

  /* ---------- Início ---------- */
  gsap.set([el.intro, el.wrap], { autoAlpha: 0 });
  preload().then(intro);
