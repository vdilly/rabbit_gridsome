/**
 * Trigg des mutation observer pour savoir quand les child d'un élément de dom change
 * @argument domScripts function callback, des scripts à lancer sur ces éléments prenant comme paramètre l'élément root
 *
 * EG: sur le ul d'un blog on attache un [domChange], quand les vignettes sont mis à jour sans pageReload, ce script le capte et lance des scripts comme LazyImg
 */

import debug from "~/js/plugins/debug";
export default function(domScripts) {
  let $els = document.querySelectorAll("[domchange]");
  $els.forEach($el => {
    const observer = new MutationObserver(function(mutationsList) {
      for (var mutation of mutationsList) {
        if (mutation.type == "childList") {
          debug("domChange on node :", $el);
          domScripts($el);
        }
      }
    });
    observer.observe($el, { childList: true });
  });
}
