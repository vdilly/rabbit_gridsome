export default function(string) {
  const urls = [
    process.env.GRIDSOME_WP_LOCAL_URL,
    process.env.GRIDSOME_WP_PERSO_URL,
    process.env.GRIDSOME_WP_PREPROD_URL,
    process.env.GRIDSOME_WP_PROD_URL
  ];

  urls.forEach(url => {
    if (!url) return;
    const wpurl = new RegExp(url, "g");
    string = string.replace(wpurl, process.env.GRIDSOME_SITE_URL);
  });

  return string;
}
