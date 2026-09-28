/**
 * Ponto de entrada.
 * Os arquivos abaixo são scripts clássicos para preservar o escopo compartilhado
 * da versão original, enquanto cada responsabilidade fica em seu próprio módulo.
 */
const modules = [
  "./core/dom.js",
  "./core/state.js",
  "./data/config.js",
  "./data/gifts.js",
  "./core/grain.js",
  "./art/fallbacks.js",
  "./core/preload.js",
  "./core/petals.js",
  "./invite/transition.js",
  "./invite/sequence.js",
  "./site/hero.js",
  "./site/nav.js",
  "./site/story.js",
  "./site/day.js",
  "./site/dress.js",
  "./site/gifts.js",
  "./site/rsvp.js",
  "./site/faq.js",
  "./site/footer.js"
];

for (const modulePath of modules) {
  await loadClassicScript(new URL(modulePath, import.meta.url));
}

function loadClassicScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url.href;
    script.onload = resolve;
    script.onerror = () => reject(new Error("Não foi possível carregar " + url.pathname));
    document.head.appendChild(script);
  });
}
