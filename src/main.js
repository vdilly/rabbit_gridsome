// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

// Components
import DefaultLayout from "~/layouts/Default.vue";
import Gridy from "~/components/layouts/grids/Gridy.vue";
import GridyItem from "~/components/layouts/grids/GridyItem.vue";
import Container from "~/components/layouts/Container.vue";
import Dropdown from "~/components/layouts/Dropdown.vue";
import Drawer from "~/components/layouts/Drawer.vue";
import Popin from "~/components/layouts/Popin.vue";
import RTE from "~/components/rte/RTE.vue";
import Btn from "~/components/buttons/Btn.vue";
import BtnAvatar from "~/components/buttons/BtnAvatar.vue";
import Logo from "~/components/atoms/Logo.vue";
import Avatar from "~/components/atoms/Avatar.vue";
import Loader from "~/components/atoms/Loader.vue";
import FormCheckbox from "~/components/form/FormCheckbox.vue";
import FormGroup from "~/components/form/FormGroup.vue";
import FormInput from "~/components/form/FormInput.vue";
import FormRadio from "~/components/form/FormRadio.vue";
import FormSelect from "~/components/form/FormSelect.vue";
import FormTextarea from "~/components/form/FormTextarea.vue";
import FormFieldset from "~/components/form/FormFieldset.vue";

// CSS
import "~/assets/scss/global.scss";

// Store
import Vuex from "vuex";
import { mapState } from "vuex";
import windowStore from "~/js/store/window";
import deviceStore from "~/js/store/device";
import siteLoadStore from "~/js/store/siteLoad";

// Plugins/mixins/directives
import Vue2TouchEvents from "vue2-touch-events";
import InfiniteLoading from "vue-infinite-loading";
import Debugger from "~/js/plugins/debug";
import smoothScroll from "~/js/plugins/smoothScroll";
import imgSizeMixin from "./js/mixins/imgSize";
import InterSectionObserverDirective from "~/js/directives/intersectionObserver.js";
import FeedbackDirective from "~/js/directives/feedback.js";
import parseWpUrl from "~/js/plugins/parseWpUrl";
import parseWpRteUrl from "~/js/plugins/ParseWpRteUrl";

const isProduction = process.env.ENV === "production";

export default function(Vue, { app, router, head, isClient, appOptions }) {
  // Global components
  Vue.component("Layout", DefaultLayout);

  Vue.component("Container", Container);
  Vue.component("Dropdown", Dropdown);
  Vue.component("Drawer", Drawer);
  Vue.component("Popin", Popin);
  Vue.component("Gridy", Gridy);
  Vue.component("GridyItem", GridyItem);
  Vue.component("RTE", RTE);
  Vue.component("Btn", Btn);
  Vue.component("BtnAvatar", BtnAvatar);
  Vue.component("Logo", Logo);
  Vue.component("Loader", Loader);
  Vue.component("Avatar", Avatar);
  Vue.component("FormGroup", FormGroup);
  Vue.component("FormFieldset", FormFieldset);
  Vue.component("FormCheckbox", FormCheckbox);
  Vue.component("FormInput", FormInput);
  Vue.component("FormRadio", FormRadio);
  Vue.component("FormSelect", FormSelect);
  Vue.component("FormTextarea", FormTextarea);

  // Plugins vue
  Vue.use(Vue2TouchEvents);
  Vue.use(InfiniteLoading);
  Vue.prototype.$debug = Debugger;
  Vue.prototype.$smoothScroll = smoothScroll;
  Vue.mixin(imgSizeMixin);
  Vue.mixin({
    methods: {
      parseWpUrl: parseWpUrl,
      parseWpRteUrl: parseWpRteUrl,
    },
  });

  // Directives
  Vue.directive("intersect", InterSectionObserverDirective);
  Vue.directive("feedback", FeedbackDirective);

  // HEAD
  head.link.push({
    rel: "stylesheet",
    href:
      "https://fonts.googleapis.com/css?family=Rubik:400,500|Source+Sans+Pro:400,400i,600,700,700i&display=swap",
  });
  head.htmlAttrs = {
    lang: "fr",
  };

  // Main App store
  Vue.use(Vuex);
  appOptions.store = new Vuex.Store({
    modules: {
      window: windowStore,
      device: deviceStore,
      siteLoad: siteLoadStore,
    },
  });

  // Global computed related to store
  Vue.mixin({
    computed: {
      ...mapState("window", ["window"]),
      ...mapState("device", ["device"]),
      ...mapState("siteLoad", ["siteLoaded", "siteLoad"]),
    },
  });

  // ROUTE OPTIONS
  const pageTransitionTime = 500;
  router.afterEach(function () {
    setTimeout(function () {
      if (!process.isClient) return;
      document.querySelector("html").classList.remove("no-scroll"); // Remove no scroll ajouté par la popin
    }, pageTransitionTime)
  })
  router.options.scrollBehavior = function(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
    setTimeout(function() {
      // Force le retour top après un changement de page, timeout à gérer par rapport au temps de l'animation de page
      window.scrollTo(0, 0);
    }, pageTransitionTime);
    return window.scrollHeight; // On retourne le scroll actuel pour tricker la transition de page, sinon il remonte au top avant d'appliquer la transition ça flickr
  };
}
