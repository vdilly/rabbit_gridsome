/**
 * @use :
 * On utilise la directive intersection observer pour lancer l'animation
 * @args : el, number, duration, refresh
  import animateNumber from "~/js/plugins/animateNumber";
  methods: {
    animateNumber: animateNumber,
  }
  <span v-html="0" v-intersect="vnode => {animateNumber(vnode.elm, 2345);}"></span>
 */

// MAJ du dom
function setNumber(el, number) {
  el.innerHTML = number;
}
// De combien on incrémente à chaque interval ?
function getStep(number, duration, refresh) {
  return Math.ceil(number / (duration / refresh));
}
// Test si le chiffre est assez grand pour l'interval prévu, sinon l'ajuste
function setMinimalRefresh(refresh, duration, number) {
  return refresh > duration / number ? refresh : duration / number;
}

export default function(el, number, duration = 2000, refresh = 20) {
  let currentNumb = 0;
  setNumber(el, currentNumb);
  refresh = setMinimalRefresh(refresh, duration, number);
  const step = getStep(number, duration, refresh);
  let ival = setInterval(() => {
    let end = false;
    if (currentNumb + step > number) {
      end = true;
      currentNumb = number;
    } else {
      currentNumb += step;
    }
    setNumber(el, currentNumb);
    if (end) clearInterval(ival);
  }, refresh);
}
