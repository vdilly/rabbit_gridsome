<template>
  <Layout>
    <Banner v-slot="banner" :pageTitle="page.title"></Banner>
    <Container class="container--small">
      <RTE v-html="page.content"></RTE>
    </Container>
  </Layout>
</template>

<script>
import pageMixin from "~/js/mixins/page";
export default {
  mixins: [pageMixin],
  computed: {
    page() {
      return this.$page.page;
    },
    seo() {
      return this.seoBuilder(
        this.page.yoastMeta,
        this.page.title,
        this.page.content
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
query($id: ID){
  page: wordPressPage(id: $id){
    title
    content,
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

<style lang="scss"></style>
