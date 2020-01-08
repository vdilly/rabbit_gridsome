<template>
  <div
    class="layout-default"
    :class="[
      window.windowScrolled ? 'js-scrolled ' + window.scrollDirection : '',
      siteLoaded ? 'loaded' : '',
      isFront ? 'front' : 'not-front',
      $context.template ? $context.template : null
    ]"
  >
    <FollowCursor
      bounds=".swipe-sample"
      :customHovers="[
        { selector: '.swiper__prev', class: 'slider-prev' },
        { selector: '.swiper__next', class: 'slider-next' }
      ]"
    ></FollowCursor>
    <Header></Header>
    <slot name="banner"></slot>
    <slot />
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import FollowCursor from "~/components/FollowCursor.vue";
export default {
  props: ["isFront", "pageTitle"],
  components: { Header, Footer, FollowCursor }
};
</script>
