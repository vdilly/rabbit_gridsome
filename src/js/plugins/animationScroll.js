const attribute = "js-observe-scroll",
  attrValue = "in-view";

function manageIntersection(entries, observer) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.setAttribute(attribute, attrValue);
      observer.unobserve(entry.target);
    }
  });
}

export default function() {
  // Animations scroll
  let elems = document.querySelectorAll("[" + attribute + "]");
  if ("IntersectionObserver" in window) {
    let scrollAnimationObserver = new IntersectionObserver(
      function(entries, observer) {
        manageIntersection(entries, observer);
      },
      {
        rootMargin: "0px 0px -200px 0px"
      }
    );

    elems.forEach(function(e) {
      scrollAnimationObserver.observe(e);
    });
  } else {
    elems.forEach(function(el) {
      el.setAttribute(attribute, attrValue);
    });
  }
}
