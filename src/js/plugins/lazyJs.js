/**
 * Load un JS unique à la volée
 */

export default function(url, cb) {
  var scriptTag = document.createElement("script");
  scriptTag.src = url;

  scriptTag.onload = cb;
  scriptTag.onreadystatechange = cb;

  document.head.appendChild(scriptTag);
}
