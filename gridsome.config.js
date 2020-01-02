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
  titleTemplate: "%s",
  siteUrl: process.env.GRIDSOME_SITE_URL,
  metadata: {
    siteUrl: process.env.GRIDSOME_SITE_URL
  },
  // configureWebpack: {
  //   mode: "development"
  // },
  plugins: [
    {
      use: "@gridsome/source-wordpress",
      options: {
        baseUrl: process.env.GRIDSOME_WP_URL, // required
        apiBase: "wp-json",
        typeName: "WordPress",
        perPage: 100,
        concurrent: 10
      }
    },
    {
      use: "@gridsome/plugin-sitemap",
      options: {
        // exclude: ["/exclude-me"],
        config: {}
      }
    },
    {
      use: "gridsome-plugin-robots-txt",
      options: {
        host: process.env.GRIDSOME_SITE_URL,
        sitemap: process.env.GRIDSOME_SITE_URL + "/sitemap.xml",
        policy: [
          {
            userAgent: "*",
            disallow: "/"
          }
        ]
      }
    },
    {
      use: "@gridsome/plugin-critical"
      // options: {
      //   paths: ["/"],
      //   width: 1300,
      //   height: 900
      // }
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
