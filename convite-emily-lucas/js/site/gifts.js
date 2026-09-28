"use strict";
// Renderização, filtros, modal e reserva local de presentes.
  let myGift = null, current = null, qty = 1, filter = "all";

  function giftHTML(g) {
    return `<article class="gift" data-id="${g.id}" data-cat="${g.cat}" data-hue="${g.hue}">
      <div class="g-tilt">
        <div class="g-visual"><div class="g-wash"></div><span class="g-mono" aria-hidden="true">${g.ini}</span>
          <span class="g-cat">${CAT[g.cat]}</span><span class="g-seal" aria-hidden="true">E&amp;A</span></div>
        <div class="g-body"><h3>${g.name}</h3><p>${g.desc}</p>
          ${g.quota ? `<div class="quota"><div class="quota-bar"><i></i></div><small></small></div>` : ""}
          <div class="g-foot"><span class="g-price">${brl(g.price)}${g.quota ? "<small> / cota</small>" : ""}</span>
          <button class="g-btn" type="button"></button></div></div>
        <i class="g-glare"></i>
      </div></article>`;
  }
  function refreshGift(g) {
    const c = $(`.gift[data-id="${g.id}"]`), mine = myGift && myGift.id === g.id;
    c.classList.toggle("taken", !!g.taken && !mine);
    c.classList.toggle("mine", !!mine);
    const b = $(".g-btn", c);
    b.textContent = mine ? "Seu presente ✓" : g.taken ? "Escolhido" : "Escolher";
    b.disabled = !!g.taken && !mine;
    b.setAttribute("aria-label", `${b.textContent}: ${g.name}`);
    if (g.quota) {
      const sold = g.quota.sold + (mine ? myGift.qty : 0);
      $(".quota-bar i", c).style.setProperty("--p", Math.min(100, sold / g.quota.total * 100) + "%");
      $(".quota small", c).textContent = `${sold} de ${g.quota.total} cotas`;
    }
  }
  function updateCount() {
    const vis = GIFTS.filter(g => filter === "all" || g.cat === filter);
    const free = vis.filter(g => !g.taken && !(myGift && myGift.id === g.id)).length;
    $("#giftCount").textContent = `${vis.length} presentes · ${free} disponíveis`;
  }
  function gifts() {
    const grid = $("#giftGrid");
    grid.innerHTML = GIFTS.map(giftHTML).join("");
    $$(".g-visual", grid).forEach((v, i) => {
      cluster(v, { x: 2, y: 104, w: 38, rot: 8 + i * 2 });
      cluster(v, { x: 98, y: 104, w: 32, rot: -10, flip: true, lily: false });
    });
    GIFTS.forEach(refreshGift); updateCount();

    gsap.from(".gift", { autoAlpha: 0, y: 50, rotationX: -18, transformPerspective: 900, duration: 1, stagger: { each: .07, grid: "auto" }, ease: "power3.out",
      scrollTrigger: { trigger: grid, start: "top 82%" } });

    // filtros com animação de layout (Flip)
    $$("#giftChips .chip").forEach(ch => ch.addEventListener("click", () => {
      filter = ch.dataset.f;
      $$("#giftChips .chip").forEach(o => o.setAttribute("aria-pressed", o === ch));
      const cards = $$(".gift", grid), stateF = Flip.getState(cards);
      cards.forEach(c => c.classList.toggle("is-hidden", !(filter === "all" || c.dataset.cat === filter)));
      Flip.from(stateF, { duration: .7, ease: "power3.inOut", scale: true, absolute: true,
        onEnter: els => gsap.fromTo(els, { autoAlpha: 0, scale: .85 }, { autoAlpha: 1, scale: 1, duration: .6 }),
        onLeave: els => gsap.to(els, { autoAlpha: 0, scale: .85, duration: .4 }),
        onComplete: () => ScrollTrigger.refresh() });
      updateCount();
    }));

    // inclinação 3D + brilho seguindo o cursor
    if (finePointer && !reduced) $$(".gift", grid).forEach(c => {
      const t = $(".g-tilt", c);
      c.addEventListener("pointermove", e => {
        const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        t.classList.add("tracking");
        t.style.setProperty("--ry", (x - .5) * 12 + "deg"); t.style.setProperty("--rx", (.5 - y) * 10 + "deg");
        t.style.setProperty("--mx", x * 100 + "%"); t.style.setProperty("--my", y * 100 + "%");
      });
      c.addEventListener("pointerleave", () => { t.classList.remove("tracking"); t.style.setProperty("--rx", "0deg"); t.style.setProperty("--ry", "0deg"); });
    });

    grid.addEventListener("click", e => {
      const b = e.target.closest(".g-btn"); if (!b || b.disabled) return;
      openGift(GIFTS.find(g => g.id === b.closest(".gift").dataset.id), b);
    });

    // caixa 3D: gira sozinha e flutua
    gsap.set("#gbox", { rotationX: -20, rotationY: 30 });
    if (!reduced) {
      gsap.to("#gbox", { rotationY: "+=360", duration: 16, ease: "none", repeat: -1 });
      gsap.to("#boxFloat", { y: -14, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
    }
    gsap.fromTo("#boxFloat", { scale: .6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.4, ease: "back.out(1.6)", scrollTrigger: { trigger: ".box-stage", start: "top 80%" } });

    // modal
    const modal = $("#giftModal"), form = $("#giftForm");
    $$("[data-close]", modal).forEach(b => b.addEventListener("click", closeGift));
    modal.addEventListener("cancel", e => { e.preventDefault(); closeGift(); });
    modal.addEventListener("click", e => { if (e.target === modal) closeGift(); });
    $$("[name=mode]", form).forEach(r => r.addEventListener("change", () => { $("#gmPix").hidden = form.mode.value !== "pix"; }));
    $$("#gmStep button").forEach(b => b.addEventListener("click", () => {
      const max = current.quota.total - current.quota.sold;
      qty = Math.max(1, Math.min(max, qty + Number(b.dataset.step))); paintQty();
    }));
    $("[data-copy]", modal).addEventListener("click", () => copy(WEDDING_CONFIG.pixKey));
    form.addEventListener("submit", e => { e.preventDefault(); confirmGift(); });
    $("#mgUndo").addEventListener("click", () => {
      const g = GIFTS.find(x => x.id === myGift.id); myGift = null; refreshGift(g); updateCount();
      gsap.to("#myGift", { autoAlpha: 0, y: 20, duration: .35, onComplete: () => { $("#myGift").hidden = true; gsap.set("#myGift", { clearProps: "all" }); } });
      toast("Tudo bem! O presente voltou para a lista.");
    });
  }
  function paintQty() { $("#gmQty").textContent = qty; $("#gmTotal").textContent = "Total: " + brl(qty * current.price); }
  function openGift(g, btn) {
    current = g; qty = myGift && myGift.id === g.id ? myGift.qty : 1;
    const modal = $("#giftModal"), form = $("#giftForm");
    $("#gmTitle").textContent = g.name;
    $("#gmPrice").textContent = brl(g.price) + (g.quota ? " por cota" : "");
    $("#gmQtyWrap").hidden = !g.quota; if (g.quota) paintQty();
    $("#gmNote").hidden = !(myGift && myGift.id !== g.id);
    $("#gmErr").textContent = "";
    if (myGift && myGift.id === g.id) { $("#gmName").value = myGift.name; $("#gmMsg").value = myGift.msg; form.mode.value = myGift.mode; }
    else form.mode.value = form.mode.value || "dia";
    $("#gmPix").hidden = form.mode.value !== "pix";
    modal.showModal();
    gsap.fromTo(".modal-card", { y: 40, scale: .94, rotationX: 8, transformPerspective: 900, autoAlpha: 0 }, { y: 0, scale: 1, rotationX: 0, autoAlpha: 1, duration: .6, ease: "power3.out" });
    setTimeout(() => $("#gmName").focus(), 60);
  }
  function closeGift() {
    const modal = $("#giftModal"); if (!modal.open) return;
    gsap.to(".modal-card", { y: 24, scale: .96, autoAlpha: 0, duration: .3, ease: "power2.in", onComplete: () => modal.close() });
  }
  function confirmGift() {
    const name = $("#gmName").value.trim();
    if (name.length < 2) { $("#gmErr").textContent = "Conta pra gente quem está presenteando."; gsap.fromTo("#gmName", { x: -8 }, { x: 0, duration: .5, ease: "elastic.out(1,.3)" }); return; }
    const prev = myGift && GIFTS.find(x => x.id === myGift.id);
    myGift = { id: current.id, name, qty: current.quota ? qty : 1, mode: $("#giftForm").mode.value, msg: $("#gmMsg").value.trim() };
    // TODO: enviar myGift para um backend (Google Sheets, Formspree, Supabase…) para bloquear o presente para os outros convidados.
    if (prev) refreshGift(prev);
    refreshGift(current); updateCount(); closeGift();
    const first = name.split(" ")[0];
    $("#mgText").textContent = `${current.name}${current.quota ? ` · ${qty} cota${qty > 1 ? "s" : ""}` : ""} · ${myGift.mode === "pix" ? "via PIX" : "levo no dia"}`;
    const bar = $("#myGift"); bar.hidden = false;
    gsap.fromTo(bar, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: .6, ease: "back.out(1.6)", delay: .3 });
    celebrateGift($(`.gift[data-id="${current.id}"]`));
    toast(`Obrigado, ${first}! Seu presente foi reservado.`);
  }
  function celebrateGift(card) {
    const r = card.getBoundingClientRect();
    setTimeout(() => burst(r.left + r.width / 2, r.top + 80, 28), 250);
    gsap.timeline()
      .to("#lid", { y: -40, rotationZ: -10, rotationX: 14, duration: .6, ease: "back.out(2)" }, .2)
      .to("#boxGlow", { scale: 1.35, opacity: 1, duration: .6 }, .2)
      .to("#lid", { y: 0, rotationZ: 0, rotationX: 0, duration: .8, ease: "bounce.out" }, 1.6)
      .to("#boxGlow", { scale: 1, opacity: .7, duration: .8 }, 1.6);
  }
  function copy(text) {
    const done = () => toast("Chave PIX copiada!");
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
    function fallback() {
      const t = document.createElement("textarea"); t.value = text; t.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(t); t.select(); try { document.execCommand("copy"); done(); } catch (e) { toast(text); } t.remove();
    }
  }

  /* ---------- RSVP ---------- */
