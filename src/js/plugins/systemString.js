export default function(string) {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");
  string = string
    .trim()
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/\s{2,}/g, " ") // Remove multiple spaces
    .replace(/\s+/g, "_") // Replace spaces with _
    .replace(/\?/g, ""); // Replace spaces with _
  return string;
}