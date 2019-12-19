/**
 * Lance le chargement des éléments (img, bg) avvec l'attribut [lazy] en différé
 * [lazy] = vide pour image, bg pour bg
 * [lazy-src] = src de l'image à load
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
        rootMargin: "0px 0px 700px 0px"
      }
    );
    observer.observe(el);
  } else {
    cb();
  }
}

function dispatchType($el) {
  let type = $el.getAttribute("lazy");
  if ($el.getAttribute("lazy-placeholder")) {
    if (type == "bg") {
      let src = $el.getAttribute("lazy-placeholder");
      $el.style.backgroundImage = "url(" + src + ")";
    }
  }

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
  $el.setAttribute("src", src);
}
function lazyBg($el) {
  let src = $el.getAttribute("lazy-src");
  $el.style.backgroundImage = "url(" + src + ")";
}
function lazyVideo($el) {
  let src = $el.getAttribute("lazy-src");
}

export default function() {
  debug("Lazyload imgs and bgs");
  let $els = document.querySelectorAll("[lazy]");
  $els.forEach($el => {
    dispatchType($el);
  });
}
