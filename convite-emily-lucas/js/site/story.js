"use strict";
// Linha do tempo responsiva da história do casal.
  function story() {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const track = $(".story-track"), dist = () => track.scrollWidth - innerWidth;
      const tw = gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: {
        trigger: ".story", start: "top top", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true,
        onUpdate: s => gsap.set(".story-progress i", { scaleX: s.progress }) } });
      $$(".chapter").forEach(ch => {
        const st = { trigger: ch, containerAnimation: tw, start: "left right", end: "right left", scrub: true };
        gsap.fromTo($(".polaroid", ch), { rotationY: 34, rotationZ: -7, z: -180, y: 30 }, { rotationY: -24, rotationZ: 4, z: 0, y: 0, ease: "none", scrollTrigger: st });
        gsap.fromTo($(".ch-year", ch), { xPercent: 30 }, { xPercent: -30, ease: "none", scrollTrigger: { ...st } });
        gsap.fromTo($(".ch-text", ch), { autoAlpha: 0, x: 80 }, { autoAlpha: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ch, containerAnimation: tw, start: "left 72%", toggleActions: "play none none reverse" } });
      });
    });
    mm.add("(max-width: 899px), (prefers-reduced-motion: reduce)", () => {
      $$(".chapter").forEach(ch => gsap.fromTo($(".polaroid", ch), { rotationY: -28, rotationX: 12, autoAlpha: 0, y: 60 },
        { rotationY: 0, rotationX: 0, autoAlpha: 1, y: 0, duration: 1.3, ease: "power3.out", scrollTrigger: { trigger: ch, start: "top 82%" } }));
    });
  }

  /* ---------- O GRANDE DIA ---------- */
