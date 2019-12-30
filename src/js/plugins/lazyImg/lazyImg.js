/**
 * Lance le chargement des éléments (img, bg) avvec l'attribut [lazy] en différé
 * [lazy] = img ou bg
 * [lazy-src] = src de l'image à load
 * [src] = pour gérer le placeholder blurry en attendant le chargement, /!\ pour les images il faut définir une taille d'image
 * @TODO: video
 */
import debug from "~/js/plugins/debug";
function observeIntersection(el, cb) {
  if ("IntersectionObserver" in window) {
    let observer = new IntersectionObserver(
      function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            cb();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px 100px 0px"
      }
    );
    observer.observe(el);
  } else {
    cb();
  }
}

function dispatchType($el) {
  let type = $el.getAttribute("lazy");

  observeIntersection($el, function() {
    if (type == "img") {
      lazyImg($el);
    }
    if (type == "bg") {
      lazyBg($el);
    }
    if (type == "video") {
      lazyVideo($el);
    }
  });
}
function lazyImg($el) {
  let src = $el.getAttribute("lazy-src");
  let img = new Image();
  img.onload = function() {
    $el.setAttribute("src", src);
    $el.classList.remove("lazy");
    $el.removeAttribute("lazy");
    $el.removeAttribute("lazy-src");
  };
  img.src = src;
  if (img.complete) img.onload();
}
function lazyBg($el) {
  let src = $el.getAttribute("lazy-src");
  let img = new Image();
  img.onload = function() {
    $el.style.backgroundImage = "url(" + src + ")";
    $el.classList.remove("lazy");
    $el.removeAttribute("lazy");
    $el.removeAttribute("lazy-src");
  };
  img.src = src;
  if (img.complete) img.onload();
}
function lazyVideo($el) {
  let src = $el.getAttribute("lazy-src");
}

export default function($root) {
  debug("Lazyload imgs and bgs");
  $root = $root ? $root : document;
  let $els = $root.querySelectorAll("[lazy]");
  $els.forEach($el => {
    dispatchType($el);
  });
}
