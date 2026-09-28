"use strict";
// Capa, paralaxe, pétalas decorativas e contagem regressiva.
  /* ---------- HERO ---------- */
  function heroPetals() {
    const host = $("#hero3d"), kinds = ["w", "p", "b"];
    for (let i = 0; i < (innerWidth < 640 ? 8 : 14); i++) {
      const hp = document.createElement("div"); hp.className = "hp";
      hp.style.cssText = `left:${rand(4, 94)}%;top:${rand(6, 90)}%;transform:translateZ(${rand(-120, 220) | 0}px)`;
      const p = document.createElement("div"), s = rand(10, 20);
      p.className = "petal " + kinds[i % 3];
      p.style.cssText = `width:${s}px;height:${s * .9}px;--d:${rand(7, 13)}s;--dx:${rand(-60, 60) | 0}px;--dy:${rand(-70, 40) | 0}px;animation-delay:-${rand(0, 10)}s`;
      hp.appendChild(p); host.appendChild(hp);
    }
  }
  function heroIn() {
    const tl = gsap.timeline();
    tl.fromTo("#hero3d", { scale: 1.1, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 2.2, ease: "power2.out" }, 0)
      .fromTo(".hero-names > *", { clipPath: "inset(-40% 100% -40% -12%)" },
        { clipPath: "inset(-40% -12% -40% -12%)", duration: 1.5, stagger: .32, ease: "power2.inOut" }, .15)
      .fromTo(".hero [data-h]", { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 1, stagger: .12, ease: "power3.out" }, .7)
      .fromTo(".cd", { rotationX: -95, autoAlpha: 0, transformOrigin: "50% 0%" },
        { rotationX: 0, autoAlpha: 1, duration: 1, stagger: .1, ease: "back.out(1.5)" }, 1.1);
    return tl;
  }
  function heroScroll() {
    gsap.to(".hero-scene", { yPercent: 14, ease: "none", scrollTrigger: { trigger: "#inicio", start: "top top", end: "bottom top", scrub: true } });
    gsap.to("#heroContent", { y: () => innerHeight * .16, opacity: .15, ease: "none", scrollTrigger: { trigger: "#inicio", start: "top top", end: "bottom top", scrub: true } });
    if (!finePointer || reduced) return;
    const s = $("#hero3d");
    const ry = gsap.quickTo(s, "rotationY", { duration: 1.4, ease: "power3" });
    const rx = gsap.quickTo(s, "rotationX", { duration: 1.4, ease: "power3" });
    const nx = gsap.quickTo(".hero-names", "x", { duration: 1.6, ease: "power3" });
    addEventListener("pointermove", e => {
      if (state !== "site") return;
      const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
      ry(x * 9); rx(-y * 6); nx(x * -14);
    });
  }
  function countdown() {
    const target = new Date(WEDDING_CONFIG.eventDate).getTime();
    const rsvpBy = new Date(WEDDING_CONFIG.rsvpDeadline).getTime();
    const nums = $$(".cd-num"), prev = [];
    const tick = () => {
      const d = Math.max(0, target - Date.now());
      [Math.floor(d / 864e5), Math.floor(d / 36e5) % 24, Math.floor(d / 6e4) % 60, Math.floor(d / 1e3) % 60].forEach((n, i) => {
        const s = String(n).padStart(2, "0");
        if (prev[i] === s) return;
        nums[i].textContent = s;
        if (prev[i] !== undefined && !reduced && state === "site")
          gsap.fromTo(nums[i], { rotationX: -85, opacity: .2, transformPerspective: 300 }, { rotationX: 0, opacity: 1, duration: .6, ease: "back.out(2)" });
        prev[i] = s;
      });
      const left = Math.ceil((rsvpBy - Date.now()) / 864e5);
      $("#dlDays").textContent = left > 0 ? `faltam ${left} dias` : "prazo encerrado";
    };
    tick(); setInterval(tick, 1000);
  }

  /* ---------- NAV + MENU ---------- */
