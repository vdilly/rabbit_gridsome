export default function(url, alias, width, height) {
  // Test if img from cloudinary
  if (url.indexOf("cloudinary.com") == -1) return url;

  const base = url.slice(0, url.indexOf("upload")) + "upload/";
  const file = url.slice(url.indexOf("upload/") + 6, url.length);
  let w = "",
    h = "";

  if (alias) {
    if (aliases[alias]) {
      w = aliases[alias][0] ? "w_" + aliases[alias][0] : "";
      h = aliases[alias][1] ? "h_" + aliases[alias][1] : "";
    } else {
      console.warn("Unknown alias :" + alias);
    }
  } else {
    w = width ? "w_" + width : "";
    h = height ? "h_" + height : "";
  }
  const sep = w & h ? "," : "";
  return base + w + sep + h + file;
}

// Créer des alias plutôt
const aliases = {
  lazy: [50],
  mobile: [1000],
  full: [1920]
};
