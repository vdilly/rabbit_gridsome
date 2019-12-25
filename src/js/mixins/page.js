import animationScroll from "~/js/plugins/animationScroll";
import lazyImg from "~/js/plugins/lazyImg/lazyImg";
import "~/js/plugins/lazyImg/lazyImg.scss";

// Todo uniquement en dev mode
import todo from "~/js/plugins/todo/todo.js";

export default {
  mounted() {
    const _this = this;

    // Device
    this.$debug("> current-device");
    if (process.isClient) {
      let currentDevice = require("current-device")["default"];
      this.$store.dispatch("device/updateDevice", currentDevice);
      window.addEventListener("touchstart", function() {
        _this.$store.commit("device/setNoMouse", currentDevice);
      });
    }
    // Window
    this.$debug("> window-events");
    this.$store.dispatch("window/update");
    window.addEventListener("scroll", function() {
      _this.$store.dispatch("window/updateScroll");
    });
    window.addEventListener("resize", function() {
      _this.$store.dispatch("window/updateRange");
    });
    // Loadsite + Callback lazyImg
    this.$debug("> site-load");
    this.$store.dispatch("siteLoad/siteLoad", lazyImg);
    // Animation scroll
    animationScroll();
    // Todo
    if (process.env.GRIDSOME_BROWSER_ENV != "prod") {
      this.$debug("> Todo labels");
      todo();
      require("~/js/plugins/todo/todo.scss");
    }
  },
  methods: {
    seoBuilder: function(yoast, postTitle, postContent) {
      let _this = this;
      const title = yoast.yoastWpseoTitle ? yoast.yoastWpseoTitle : postTitle,
        desc = yoast.yoastWpseoMetadesc
          ? yoast.yoastWpseoMetadesc
          : postContent.substring(0, 600) + "...",
        img = yoast.yoastWpseoFacebookImage
          ? yoast.yoastWpseoFacebookImage
          : yoast.yoastWpseoSocialDefaults.ogDefaultImage;
      let seo = {
        title: title,
        link: [{ rel: "canonical", href: yoast.yoastWpseoCanonical }],
        meta: [
          {
            key: "robots",
            name: "robots",
            content:
              "follow,index,max-snippet:-1,max-video-preview:-1,max-image-preview:large"
          },
          {
            key: "description",
            name: "description",
            content: desc
          },
          { property: "og:type", content: yoast.yoastWpseoFacebookType },
          {
            property: "og:title",
            content: yoast.yoastWpseoFacebookTitle
              ? yoast.yoastWpseoFacebookTitle
              : title
          },
          {
            property: "og:description",
            content: yoast.yoastWpseoFacebookDescription
              ? yoast.yoastWpseoFacebookDescription
              : desc
          },
          {
            property: "og:url",
            content: yoast.yoastWpseoCanonical
          },
          {
            property: "og:image",
            content: img
          },
          {
            name: "twitter:card",
            content: yoast.yoastWpseoSocialDefaults.twitterCardType
          },
          {
            name: "twitter:title",
            content: yoast.yoastWpseoTwitterTitle
              ? yoast.yoastWpseoTwitterTitle
              : title
          },
          {
            name: "twitter:description",
            content: yoast.yoastWpseoTwitterDescription
              ? yoast.yoastWpseoTwitterDescription
              : desc
          },
          {
            name: "twitter:image",
            content: yoast.yoastWpseoTwitterImage
              ? yoast.yoastWpseoTwitterImage
              : img
          }
        ]
      };

      return seo;
    }
  }
};
