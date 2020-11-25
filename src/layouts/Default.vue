<template lang="pug">
.layout-default(
  :class="[window.windowScrolled ? 'js-scrolled ' + window.scrollDirection : '', siteLoaded ? 'loaded' : '', isFront ? 'front' : 'not-front', $context.template ? $context.template : null]"
)
  .page-transition-overlay
  SiteLoader
  //- FollowCursor(:customHovers="[{ selector: 'swiper-wrapper', class: 'slider_drag' }]")
  Header(:isFront="isFront")
  main
    slot(name="banner")
    slot
    Footer
</template>

<script>
import SiteLoader from "~/components/SiteLoader.vue";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
// import FollowCursor from "~/components/FollowCursor.vue";
export default {
  props: ["isFront", "pageTitle"],
  components: {
    Header,
    Footer,
    // FollowCursor,
    SiteLoader,
  },
};
</script>