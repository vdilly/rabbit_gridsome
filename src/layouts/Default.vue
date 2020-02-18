<template lang="pug">
  div.layout-default(:class="[window.windowScrolled ? 'js-scrolled ' + window.scrollDirection : '',siteLoaded ? 'loaded' : '',isFront ? 'front' : 'not-front',$context.template ? $context.template : null]")
    div.page-transition-overlay
    FollowCursor(:customHovers="[{ selector: 'swiper-wrapper', class: 'slider_drag' }]")
    Navbar(:autoAppPadding="true")
      Header
        Logo.img-contain-left(slot="logo", :linked="!isFront")
    main
      slot(name="banner")
      slot
      Footer
</template>

<script>
import Navbar from "~/components/layouts/Navbar.vue";
import Header from "~/components/layouts/Header.vue";
import Footer from "~/components/Footer.vue";
import FollowCursor from "~/components/FollowCursor.vue";
export default {
  props: ["isFront", "pageTitle"],
  components: { Header, Footer, FollowCursor, Navbar }
};
</script>
