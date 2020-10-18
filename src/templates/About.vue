<template lang="pug">
Layout
  Banner(v-slot="banner", :pageTitle="about.title")
  Container
    p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error doloremque omnis animi, eligendi magni a voluptatum, vitae, consequuntur rerum illum odit fugit assumenda rem dolores inventore iste reprehenderit maxime! Iusto.
</template>

<script>
import pageMixin from "~/js/mixins/page";
export default {
  mixins: [pageMixin],
  computed: {
    about() {
      return this.$page.about;
    },
    seo() {
      return this.seoBuilder(
        this.$page.about.yoastMeta,
        this.about.title,
        this.about.content
      );
    },
  },
  metaInfo() {
    return {
      title: this.seo.title,
      link: this.seo.link,
      meta: this.seo.meta,
    };
  },
};
</script>
<page-query>
query($id: ID){
  about: wordPressPage(id: $id){
    title
    content
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
</page-query>
