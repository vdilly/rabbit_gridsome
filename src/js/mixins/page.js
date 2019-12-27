import animationScroll from "~/js/plugins/animationScroll";
import lazyImg from "~/js/plugins/lazyImg/lazyImg";
import seoBuilder from "~/js/plugins/seoBuilder";
import "~/js/plugins/lazyImg/lazyImg.scss";
import Banner from "~/components/Banner.vue";
import Ariane from "~/components/navs/Ariane.vue";

// Todo uniquement en dev mode
import todo from "~/js/plugins/todo/todo.js";

export default {
  components: { Banner, Ariane },
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
    seoBuilder: seoBuilder
  }
};
