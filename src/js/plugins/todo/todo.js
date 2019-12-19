/**
 * Affiche des labels "todo" avec une border de couleur sur les élemtents à faire, en front
 * config : mettr eun attribut [todo=""] : configurer les valeurs possible avec les labels dans le fichier scss
 * le scss est a compiler directement en ligne
 */
document.addEventListener("DOMContentLoaded", function() {
  function createElementFromHTML(htmlString) {
    var div = document.createElement("div");
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
  }
  // todo
  document.querySelectorAll("[todo]").forEach(el => {
    var labels = el.dataset.todo.split(" ");

    var str = '<ul class="todo__labels unstyled">';

    labels.forEach(label => {
      str += '<li class="todo__label ' + label + '">' + label + "</li>";
    });

    str += "</ul>";

    // create wrapper container
    var wrapper = createElementFromHTML(
      '<div class="todo ' + el.dataset.todo + '">' + str + "</div>"
    );

    // insert wrapper before el in the DOM tree
    el.parentNode.insertBefore(wrapper, el);

    // move el into wrapper
    wrapper.appendChild(el);
  });
});
