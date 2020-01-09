export default function(string, debug = false) {
  const urls = [
    process.env.GRIDSOME_WP_FRAMEWORK_URL,
    process.env.GRIDSOME_WP_LOCAL_URL,
    process.env.GRIDSOME_WP_PERSO_URL,
    process.env.GRIDSOME_WP_PREPROD_URL,
    process.env.GRIDSOME_WP_PROD_URL
  ];

  urls.forEach(url => {
    if (!url) return;
    if (debug) console.log("--------------");
    if (debug) console.log("Search for " + url + " in " + string);
    const wpurl = new RegExp(url, "g");
    string = string.replace(wpurl, process.env.GRIDSOME_SITE_URL);
    if (debug) console.log("Result: " + string);
  });

  return string;
}
