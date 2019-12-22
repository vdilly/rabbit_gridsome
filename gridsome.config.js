// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const path = require("path");

// Rend settings accessible partout
function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [
        path.resolve(__dirname, "./src/assets/scss/_settings.scss")
        // you can also use a glob if you'd prefer
        // path.resolve(__dirname, './src/assets/sass/*.sass'),
      ]
    });
}

module.exports = {
  siteName: "Rabbit",
  metadata: {
    siteUrl: "https://www.vdillyprod.ovh/"
  },
  plugins: [
    {
      use: "@gridsome/source-datocms",
      options: {
        apiToken: process.env.DATO_READ_TOKEN, // required
        previewMode: false,
        apiUrl: "https://site-api.datocms.com",
        typeName: "DatoCms"
      }
    }
  ],
  chainWebpack: config => {
    // Load variables for all vue-files
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach(type =>
      addStyleResource(config.module.rule("scss").oneOf(type))
    );
  }
};
