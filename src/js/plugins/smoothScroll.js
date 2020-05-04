export default function(selector, offset = 0) {
  const distanceToTop = el => Math.floor(document.querySelector(el).getBoundingClientRect().top);
  const originalTop = distanceToTop(selector) - offset;
  window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });
}
