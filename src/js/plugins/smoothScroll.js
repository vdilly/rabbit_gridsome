export default function($target, offset) {
  const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
  const originalTop = distanceToTop($target) - offset;
  window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });
}
