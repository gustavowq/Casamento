"use strict";
// Faz a transição circular entre o convite e o site.
  /* =====================================================
     SITE — transição, seções e interações
     ===================================================== */
  const site = $("#site"), invite = $("#invite"), ring = $("#revealRing");
  function setReveal(r) {
    invite.style.setProperty("--r", r + "vmax");
    const d = Math.max(0, 2 * (r - 4.5));
    ring.style.width = ring.style.height = d + "vmax";
  }

  /* ---------- Convite → site ---------- */
  function enterSite() {
    if (state !== "open") return;
    state = "entering";
    autoTl && autoTl.kill();
    window.scrollTo(0, 0);
    site.classList.add("on"); site.inert = false;
    if (!siteReady) initSite();
    const proxy = { r: 0 };
    invite.classList.add("revealing"); setReveal(0);
    gsap.set(ring, { autoAlpha: 1 });
    gsap.set(el.card, { transformOrigin: "50% 50%", transformPerspective: 900 });
    gsap.timeline({
      onComplete() {
        invite.style.display = "none"; invite.classList.remove("revealing");
        gsap.set(ring, { autoAlpha: 0 });
        lockScroll(false); state = "site";
        ScrollTrigger.refresh();
      }
    })
      .to(el.after, { autoAlpha: 0, y: 10, duration: .4 }, 0)
      .to(el.card, { scale: 1.4, rotationX: 12, y: "-=40", autoAlpha: 0, duration: 1.1, ease: "power2.in" }, .1)
      .call(() => burst(innerWidth / 2, innerHeight * .55, innerWidth < 640 ? 26 : 40), null, .55)
      .to(proxy, { r: 150, duration: 1.8, ease: "power2.inOut", onUpdate: () => setReveal(proxy.r) }, .45)
      .add(heroIn(), 1.05);
  }

  /* ---------- Site → convite ---------- */
  function backToInvite() {
    if (state !== "site") return;
    state = "leaving";
    closeMenu();
    window.scrollTo(0, 0);
    lockScroll(true);
    invite.style.display = "";
    reset();                                   // devolve o convite ao estado inicial (envelope fechado)
    invite.classList.add("revealing"); setReveal(150);
    gsap.set(ring, { autoAlpha: 1 });
    const proxy = { r: 150 };
    gsap.to(proxy, {
      r: 0, duration: 1.5, ease: "power2.inOut", onUpdate: () => setReveal(proxy.r),
      onComplete() {
        invite.classList.remove("revealing"); gsap.set(ring, { autoAlpha: 0 });
        site.classList.remove("on"); site.inert = true;
      }
    });
  }

  function toast(msg) {
    const t = $("#toast"); t.textContent = msg;
    gsap.killTweensOf(t);
    gsap.timeline().fromTo(t, { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: .45, ease: "power3.out" })
      .to(t, { autoAlpha: 0, y: 10, duration: .4, delay: 2.8 });
  }
