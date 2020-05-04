<template lang="pug">
  Layout(:isFront="true")
    Banner(slot="banner" :pageTitle="home.title")
    Container
      p(js-observe-scroll scroll-anim="y8")
        img(
          lazy="img"
          lazy-src="https://images.pexels.com/photos/1953451/pexels-photo-1953451.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
          src="https://images.pexels.com/photos/1953451/pexels-photo-1953451.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=32&w=63"
          height="1260"
          width="750"
          alt
        )
      //- Learn how to use images here: https://gridsome.org/docs/images 
      g-image(alt="Example image" src="~/favicon.png" width="135" js-observe-scroll scroll-anim="scale0")
      p(js-observe-scroll scroll-anim="x8") Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur excepturi labore tempore expedita, et iste tenetur suscipit explicabo! Dolores, aperiam non officia eos quod asperiores
      p.home-links(js-observe-scroll)
        a(href="https://gridsome.org/docs/" target="_blank" rel="noopener" scroll-anim="y8" style="display: inline-block;") Gridsome Docs
        a(href="https://github.com/gridsome/gridsome" target="_blank" rel="noopener" scroll-anim="y8" scroll-delay="1" style="display: inline-block;") Github
    Swipe1
    ParaSlide
</template>

<script>
import pageMixin from "~/js/mixins/page";
import Swipe1 from "~/components/layouts/sliders/Swipe1.vue";
import ParaSlide from "~/components/layouts/sliders/ParaSlide.vue";
export default {
  mixins: [pageMixin],
  components: {
    Swipe1,
    ParaSlide
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
