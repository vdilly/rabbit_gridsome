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
    <Header></Header>
    <slot name="banner"></slot>
    <slot />
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
export default {
  props: ["isFront", "pageTitle"],
  components: { Header, Footer }
};
</script>
