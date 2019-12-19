// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue";

import "~/assets/scss/global.scss";

// Store
import Vuex from "vuex";
import { mapState } from "vuex";
import windowStore from "~/js/store/window";
import deviceStore from "~/js/store/device";
import siteLoadStore from "~/js/store/siteLoad";

// Plugins/mixins
import Vue2TouchEvents from "vue2-touch-events";
import InfiniteLoading from "vue-infinite-loading";
import Debugger from "~/js/plugins/debug";

const isProduction = process.env.ENV === "production";

export default function(Vue, { app, router, head, isClient, appOptions }) {
  // Plugins vue
  Vue.use(Vue2TouchEvents);
  Vue.use(InfiniteLoading);
  Vue.prototype.$debug = Debugger;

  // HEAD
  head.link.push({
    rel: "stylesheet",
    href:
      "https://fonts.googleapis.com/css?family=Rubik:400,500|Source+Sans+Pro:400,400i,600,700,700i&display=swap"
  });

  // Main App store
  Vue.use(Vuex);
  appOptions.store = new Vuex.Store({
    modules: {
      window: windowStore,
      device: deviceStore,
      siteLoad: siteLoadStore
    }
  });

  // Global computed related to store
  Vue.mixin({
    computed: {
      ...mapState("window", ["window"]),
      ...mapState("device", ["device"]),
      ...mapState("siteLoad", ["siteLoaded"])
    }
  });

  // Global components
  Vue.component("Layout", DefaultLayout);
}
