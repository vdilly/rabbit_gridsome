/**
 * V-directive appelée dans main.js, à utiliser comme ça : v-intersect=""
 * On peut spécifier une méthode de callback qui recevra en premier argument le VNODE ex :
 * v-intersect="maMethod"
 * methods: {
 *   meMethod(vnode){}
 * }
 *
 * Si on veut passer d'autres arguments à cette fonction, on peut la wrap dans une fonction auto déclarée :
 *
 * v-intersect="(vnode)=>{maMethod(vnode, argument)}"
 * methods: {
 *   meMethod(vnode, argument){}
 * }
 */

function manageIntersection(entries, observer, cb, vnode) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      cb(vnode);
      observer.unobserve(entry.target);
    }
  });
}

export default {
  inserted: function(el, binding, vnode) {
    // console.log(el, binding.value);
    const cb = binding.value;
    if ("IntersectionObserver" in window) {
      let observer = new IntersectionObserver(
        function(entries, observer) {
          manageIntersection(entries, observer, cb, vnode);
        },
        {
          rootMargin: "0px 0px -200px 0px"
        }
      );
      observer.observe(el);
    } else {
      elems.forEach(function(el) {
        el.setAttribute(attribute, attrValue);
      });
    }
  }
};
