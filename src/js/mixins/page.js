import animationScroll from "~/js/plugins/animationScroll";
import lazyImg from "~/js/plugins/lazyImg";
// import loadJs from "~/mixins/loadJs";
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
  }
};
