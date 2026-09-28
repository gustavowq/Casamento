"use strict";
// Selo → aba → cartão: animação, reinício e eventos do convite.
  /* ---------- 4. Entrada da cena ---------- */
  function intro() {
    gsap.from(el.corners, { scale: .86, autoAlpha: 0, duration: 1.6, ease: "power3.out", stagger: .12 });
    gsap.fromTo([el.intro, el.wrap], { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, ease: "power3.out", stagger: .15, delay: .15 });
    setHint("Toque para abrir");
    el.wrap.classList.add("is-ready"); el.wrap.setAttribute("aria-disabled", "false");
    state = "idle";
  }
  function setHint(text) {
    el.hint.innerHTML = `<span>${text}</span>`;
    hintPulse && hintPulse.kill();
    gsap.fromTo(el.hint, { autoAlpha: 0 }, { autoAlpha: 1, duration: .6 });
    if (!reduced) hintPulse = gsap.fromTo(el.hint.firstChild, { opacity: 1, scale: 1 },
      { opacity: .4, scale: .97, duration: 1.3, ease: "sine.inOut", yoyo: true, repeat: -1 });
  }

  const rand = (a, b) => a + Math.random() * (b - a);
  function spawnChips() {
    const ew = el.envelope.offsetWidth, cx = ew * .5, cy = el.envelope.offsetHeight * .58;
    for (let i = 0; i < 16; i++) {
      const c = document.createElement("div"), s = rand(.008, .022) * ew;
      c.className = "wax-chip";
      Object.assign(c.style, { width: s + "px", height: s * rand(.6, 1.1) + "px", left: cx + "px", top: cy + "px",
        borderRadius: `${rand(20, 60)}% ${rand(20, 60)}% ${rand(30, 70)}% ${rand(20, 60)}%` });
      el.envelope.appendChild(c); extras.push(c);
      const ang = rand(-Math.PI, 0), dist = rand(.06, .2) * ew;
      gsap.timeline({ onComplete: () => c.remove() })
        .to(c, { x: Math.cos(ang) * dist, y: Math.sin(ang) * dist * .8, rotation: rand(-200, 200), duration: rand(.3, .45), ease: "power2.out" })
        .to(c, { y: `+=${rand(.25, .45) * ew}`, x: `+=${rand(-.04, .04) * ew}`, autoAlpha: 0, duration: rand(.5, .8), ease: "power2.in" });
    }
  }
  function startPetals() {
    if (reduced) return;
    const W = innerWidth, H = innerHeight, n = W < 640 ? 28 : 46, kinds = ["w", "w", "p", "p", "b"];
    for (let i = 0; i < n; i++) {
      const p = document.createElement("div"), s = rand(9, 19);
      p.className = "petal " + kinds[i % kinds.length];
      Object.assign(p.style, { width: s + "px", height: s * rand(.8, 1.15) + "px" });
      el.petals.appendChild(p); extras.push(p);
      gsap.set(p, { x: rand(-.05, 1.05) * W, y: -30, rotation: rand(0, 360) });
      const dur = rand(5, 8.5), delay = rand(0, 3.4);
      gsap.to(p, { y: H + 40, duration: dur, delay, ease: "none", onComplete: () => { gsap.killTweensOf(p); p.remove(); } });
      gsap.to(p, { x: `+=${rand(-90, 90)}`, duration: rand(1.6, 2.8), delay, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(p, { rotation: `+=${rand(-220, 220)}`, rotationX: rand(180, 720), duration: dur, delay, ease: "none" });
    }
  }

  /* ---------- 6. Cartão: sai do bolso, vai para a camada da frente ---------- */
  function cardTarget() {
    const vw = innerWidth, vh = innerHeight, bottomUI = 84, top = 20;
    const W = Math.min(vw * .88, (vh - bottomUI - top) / 1.5, 620), H = W * 1.5;
    return { W, H, x: (vw - W) / 2, y: top + (vh - bottomUI - top - H) / 2 };
  }
  function liftCard() {
    const r = el.card.getBoundingClientRect();
    el.pocket.style.overflow = "visible";                    // libera o bolso
    const t = cardTarget();
    gsap.set(el.card, { clearProps: "transform" });
    el.card.classList.add("lifted"); el.layer.appendChild(el.card);   // traz para a frente
    gsap.set(el.card, { width: t.W, x: r.left, y: r.top, scale: r.width / t.W });
    tlCard = gsap.timeline({ onComplete: () => { if (state === "opening") state = "open"; } })
      .to(el.card, { x: t.x, y: t.y, scale: 1, duration: 1.35, ease: "power3.inOut" }, 0)
      .fromTo(el.card, { rotation: -1.5 }, { rotation: 0, duration: 1.35, ease: "power2.out" }, 0)
      .to(el.envelope, { y: `+=${innerHeight * .12}`, autoAlpha: 0, duration: 1, ease: "power2.in" }, .1)
      .to(el.corners, { scale: 1.05, duration: 2.2, ease: "power2.out" }, 0)
      .call(startPetals, null, 1.05)
      .call(() => { if (state === "opening") state = "open"; }, null, 2.4)
      .to(el.after, { autoAlpha: 1, y: 0, duration: .7, ease: "power2.out" }, 2.4)
      .call(startAuto, null, 3.1);
    gsap.set(el.after, { y: 12 });
  }

  // Depois de ~5 s lendo o cartão, segue sozinho para o site (o botão mostra o progresso)
  function startAuto() {
    if (state !== "open") return;
    el.enterBtn.focus({ preventScroll: true });
    autoTl = gsap.fromTo(".eb-fill", { scaleX: 0 }, { scaleX: 1, duration: reduced ? 8 : 5.5, ease: "none", onComplete: enterSite });
  }

  /* ---------- 7. Sequência principal (~8 s) ---------- */
  function open() {
    if (state !== "idle") return;
    state = "opening";
    el.wrap.classList.remove("is-ready"); el.wrap.classList.add("is-busy");
    el.wrap.setAttribute("aria-disabled", "true");
    const ew = el.envelope.offsetWidth;

    tlOpen = gsap.timeline({ defaults: { ease: "power2.out" } })
      .to(el.hint, { autoAlpha: 0, duration: .3 }, 0)
      // 1. selo pulsa, racha e solta lascas
      .to(el.seal, { scale: 1.07, duration: .17, ease: "sine.inOut", yoyo: true, repeat: 5 }, .05)
      .to(el.seal, { scale: .96, duration: .08, ease: "power2.in" }, 1.1)
      .add("crack", 1.2)
      .to(el.seal, { scale: 1, duration: .2 }, "crack")
      .call(spawnChips, null, "crack")
      .to(el.halfL, { x: -ew * .012, rotation: -5, duration: .2, ease: "power3.out" }, "crack")
      .to(el.halfR, { x: ew * .012, rotation: 5, duration: .2, ease: "power3.out" }, "crack")
      // 2. metades caem e somem; ramo se afasta
      .to(el.halfL, { x: -ew * .08, y: ew * .42, rotation: -42, autoAlpha: 0, duration: .8, ease: "power2.in" }, 1.5)
      .to(el.halfR, { x: ew * .08, y: ew * .46, rotation: 38, autoAlpha: 0, duration: .8, ease: "power2.in" }, 1.55)
      .to(el.branch, { x: ew * .16, y: -ew * .1, rotation: 12, scale: .92, autoAlpha: 0, duration: .9, ease: "power2.inOut" }, 1.45)
      .to(el.intro, { autoAlpha: 0, y: -18, duration: .7, ease: "power2.inOut" }, 1.8)
      // 3. aba gira em 3D e revela o forro
      .to(el.flapShadow, { autoAlpha: 0, duration: .3 }, 2.05)
      .to(el.flap, { rotationX: 180, duration: 1.2, ease: "power2.inOut" }, 2.05)
      .set(el.flap, { zIndex: 2 }, 2.65)               // passou de 90°: vai para trás do cartão
      // 4. cartão desliza para fora, envelope desce
      .to(el.card, { yPercent: -96, duration: 1.4, ease: "power2.inOut" }, 3.2)
      .to(el.envelope, { y: innerHeight * .16, duration: 1.3, ease: "power2.inOut" }, 3.7)
      // 5. cartão para a frente, centraliza e cresce (timeline filha)
      .call(liftCard, null, 4.75);
    if (reduced) tlOpen.timeScale(2);
  }

  /* ---------- 8. Reiniciar ---------- */
  function reset() {
    tlOpen && tlOpen.kill(); tlCard && tlCard.kill(); autoTl && autoTl.kill();
    extras.splice(0).forEach(n => { gsap.killTweensOf(n); n.remove(); });
    el.card.classList.remove("lifted"); el.pocket.appendChild(el.card); el.pocket.style.overflow = "";
    gsap.set([el.card, el.envelope, el.seal, el.halfL, el.halfR, el.branch, el.flap, el.flapShadow,
      el.intro, el.hint, el.after, ".eb-fill", ...el.corners], { clearProps: "all" });
    el.wrap.classList.remove("is-busy");
    intro();
  }
  el.replay.addEventListener("click", () => {
    if (state !== "open") return;
    state = "resetting";
    autoTl && autoTl.kill();
    gsap.timeline({ onComplete: reset })
      .to(el.after, { autoAlpha: 0, duration: .3 }, 0)
      .to([el.card, el.petals], { autoAlpha: 0, y: "+=16", duration: .6, ease: "power2.in" }, 0)
      .set(el.petals, { clearProps: "all" });
  });

  el.enterBtn.addEventListener("click", enterSite);

  /* ---------- 9. Eventos ---------- */
  el.wrap.addEventListener("click", open);
  el.wrap.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
  });
  addEventListener("resize", () => {
    if (state !== "open") return;
    const t = cardTarget();
    gsap.set(el.card, { width: t.W, x: t.x, y: t.y, scale: 1 });
  });
