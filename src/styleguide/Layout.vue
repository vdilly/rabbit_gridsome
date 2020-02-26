<template lang="pug">
  div.layout-default(:class="[window.windowScrolled ? 'js-scrolled ' + window.scrollDirection : '',siteLoaded ? 'loaded' : '',isFront ? 'front' : 'not-front',$context.template ? $context.template : null]")
    div.page-transition-overlay
    SiteLoader
    main
      a(href="/styleguide") Retour au styleguide
      slot
</template>

<script>
import SiteLoader from "~/components/SiteLoader.vue";
export default {
  props: ["isFront", "pageTitle"],
  components: {
    SiteLoader
  }
};
</script>