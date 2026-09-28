"use strict";
// Interações e validação da confirmação de presença.
  function rsvp() {
    const form = $("#rsvpForm"), card = $("#rsvpCard"), seg = $("#rSeg"), btns = $$("button", seg);
    let going = true, guests = 0;
    btns.forEach((b, i) => b.addEventListener("click", () => {
      going = i === 0; seg.dataset.i = i; btns.forEach((o, j) => o.setAttribute("aria-pressed", j === i));
      form.classList.toggle("is-no", !going);
    }));
    $$("#rStep button").forEach(b => b.addEventListener("click", () => {
      guests = Math.max(0, Math.min(4, guests + Number(b.dataset.step))); $("#rGuests").textContent = guests;
      gsap.fromTo("#rGuests", { scale: 1.4 }, { scale: 1, duration: .4, ease: "back.out(3)" });
    }));
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = $("#rName").value.trim(), fl = $("#rName").parentElement;
      fl.classList.toggle("invalid", name.length < 2);
      if (name.length < 2) { $("#rErr").textContent = "Precisamos do seu nome para reservar o lugar."; $("#rName").focus(); return; }
      $("#rErr").textContent = "";
      const first = name.split(" ")[0];
      const diet = $$("#rDiet input:checked").map(i => i.value);
      // TODO: enviar { name, contato, going, guests, diet, música, recado } para um backend.
      $("#rbTitle").textContent = going ? `Que alegria, ${first}!` : `Obrigado, ${first}`;
      $("#rbText").textContent = going
        ? `Reservamos ${1 + guests} lugar${guests ? "es" : ""} para você${guests ? " e sua companhia" : ""}${diet.length ? ` (${diet.join(", ").toLowerCase()})` : ""}. Nos vemos em 24 de julho!`
        : "Vamos sentir sua falta, mas agradecemos muito o carinho de avisar. Você vai estar no nosso coração nesse dia.";
      card.classList.add("done");
      if (going) setTimeout(() => { const r = card.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height * .3, 36); }, 600);
    });
    $("#rEdit").addEventListener("click", () => card.classList.remove("done"));
    $("#rName").addEventListener("input", () => $("#rName").parentElement.classList.remove("invalid"));
  }

  /* ---------- FAQ ---------- */
