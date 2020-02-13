<template lang="pug">
  Layout(:isFront="true")
    Banner(v-slot="banner" :pageTitle="home.title")
    Container
      //- Learn how to use images here: https://gridsome.org/docs/images 
      g-image(alt="Example image" src="~/favicon.png" width="135")
      p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur excepturi labore tempore expedita, et iste tenetur suscipit explicabo! Dolores, aperiam non officia eos quod asperiores
      p.home-links
        a(href="https://gridsome.org/docs/" target="_blank" rel="noopener") Gridsome Docs
        a(href="https://github.com/gridsome/gridsome" target="_blank" rel="noopener") Github
      img(lazy="img"
        lazy-src="https://images.pexels.com/photos/1953451/pexels-photo-1953451.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
        src="https://images.pexels.com/photos/1953451/pexels-photo-1953451.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=32&w=63"
        height="1260"
        width="750"
        alt)
    SwipeSample
    ParaSlideSample
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
.swipe-sample,
.paraslide {
  margin-top: 8rem;
}
</style>
