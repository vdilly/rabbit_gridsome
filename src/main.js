// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue";
import Gridy from "~/components/layouts/grids/Gridy.vue";
import GridyItem from "~/components/layouts/grids/GridyItem.vue";
import Container from "~/components/layouts/Container.vue";
import RTE from "~/components/rte/RTE.vue";
import Btn from "~/components/buttons/Btn.vue";

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
import smoothScroll from "~/js/plugins/smoothScroll";

const isProduction = process.env.ENV === "production";

export default function(Vue, { app, router, head, isClient, appOptions }) {
  // Global components
  Vue.component("Layout", DefaultLayout);

  Vue.component("Container", Container);
  Vue.component("Gridy", Gridy);
  Vue.component("GridyItem", GridyItem);
  Vue.component("RTE", RTE);
  Vue.component("Btn", Btn);

  // Plugins vue
  Vue.use(Vue2TouchEvents);
  Vue.use(InfiniteLoading);
  Vue.prototype.$debug = Debugger;
  Vue.prototype.$smoothScroll = smoothScroll;

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
}
