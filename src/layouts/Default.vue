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
    <Banner :pageTitle="pageTitle"></Banner>
    <slot />
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import Banner from "~/components/Banner.vue";
export default {
  props: ["isFront", "pageTitle"],
  components: { Header, Banner, Footer }
};
</script>

<style></style>
