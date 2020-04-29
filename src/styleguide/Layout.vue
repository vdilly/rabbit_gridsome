<template lang="pug">
  div.layout-default(:class="[window.windowScrolled ? 'js-scrolled ' + window.scrollDirection : '',siteLoaded ? 'loaded' : '',isFront ? 'front' : 'not-front',$context.template ? $context.template : null]")
    div.page-transition-overlay
    SiteLoader
    StyleguideHeader
    main
      div.sg-grid-components
        slot
</template>

<script>
import SiteLoader from "~/components/SiteLoader.vue";
import StyleguideHeader from "~/styleguide/StyleguideHeader.vue";
export default {
  props: ["isFront", "pageTitle"],
  components: {
    SiteLoader,
    StyleguideHeader
  }
};
</script>

<style lang="scss">
main{
  min-height: 100vh;
}
.sg-grid-components{
  display: flex;
  flex-wrap: wrap;

  .sg-box:not(.small) + .sg-box:not(.small){
    margin-top: 8rem;
  }
}
</style>