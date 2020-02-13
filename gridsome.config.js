// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const path = require("path");

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
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/scss/_settings.scss";`
      }
    }
  },
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
    },
    {
      use: "gridsome-plugin-pug",
      options: {
        pug: {
          /* Options for `pug-plain-loader` */
        },
        pugLoader: {
          /* Options for `pug-loader` */
        }
      }
    }
  ]
};
