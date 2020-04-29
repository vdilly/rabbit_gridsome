<template lang="pug">
  div.iframe__wrapper
    div.iframe-control Controls iframe
    iframe(src="/styleguide")
</template>

<script>
import pageMixin from "~/js/mixins/page";
import SwipeSample from "~/components/layouts/sliders/SwipeSample.vue";
import ParaSlideSample from "~/components/layouts/sliders/ParaSlideSample.vue";
export default {
  mixins: [pageMixin],
  components: {
    SwipeSample,
    ParaSlideSample
  },
  computed: {
    home() {
      return this.$page.home.edges[0].node;
    },
    seo() {
      return this.seoBuilder(
        this.home.yoastMeta,
        this.home.title,
        this.home.content
      );
    }
  },
  metaInfo() {
    return {
      title: this.seo.title,
      link: this.seo.link,
      meta: this.seo.meta
    };
  }
};
</script>

<page-query>
{
  home: allWordPressPage(filter: {template: {eq: "homepage.php"}}) {
    edges {
      node {
        slug
        title
        content
        acf{titre}
        yoastMeta {
          yoastWpseoTitle
          yoastWpseoMetadesc
          yoastWpseoCanonical
          yoastWpseoFacebookType
          yoastWpseoFacebookTitle
          yoastWpseoFacebookDescription
          yoastWpseoFacebookImage
          yoastWpseoTwitterTitle
          yoastWpseoTwitterDescription
          yoastWpseoTwitterImage
          yoastWpseoSocialDefaults {
            ogDefaultImage
            twitterCardType
          }
        }
      }
    }
  }
}
</page-query>

<style lang="scss">
html {
  height: 99.4%;
  body {
    height: 100vh;
  }
  .iframe__wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
.iframe-control {
  background: $color__core;
}
iframe {
  flex: 1;
  width: 100%;
  height: 100%;
}
.swipe-sample,
.paraslide {
  margin-top: 8rem;
}
</style>
