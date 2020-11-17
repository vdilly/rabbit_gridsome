/**
 * V-directive appelée dans main.js, à utiliser comme ça : v-feedback=""
 *
 */

function whichAnimationEvent() {
  var t,
    el = document.createElement("fakeelement");

  var animations = {
    animation: "animationend",
    OAnimation: "oAnimationEnd",
    MozAnimation: "animationend",
    WebkitAnimation: "webkitAnimationEnd",
  };

  for (t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
}

export default {
  inserted: function(el, binding, vnode) {
    if (!window.animationEnd) {
      window.animationEnd = whichAnimationEvent();
    }
    let c = document.createElement("div");
    c.classList.add("pulse");
    el.appendChild(c);
    el.classList.add("feedback");
    el.addEventListener("click", function() {
      c.classList.add("clicked");
    });
    c.addEventListener(animationEnd, function() {
      c.classList.remove("clicked");
    });
  },
};
