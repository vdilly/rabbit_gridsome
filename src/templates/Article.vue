<template>
  <Layout>
    <Container>
      <img
        v-if="post.featuredMedia"
        lazy="img"
        :lazy-src="size(post.featuredMedia.sourceUrl, 'mobile')"
        :lazy-placeholder="size(post.featuredMedia.sourceUrl, 'lazy')"
        width="1000"
        alt
      />
      <h1 v-html="post.title"></h1>
      <RTE v-html="post.content"></RTE>
    </Container>
  </Layout>
</template>

<script>
import pageMixin from "~/js/mixins/page";
export default {
  mixins: [pageMixin],
  computed: {
    post() {
      return this.$page.post;
    },
    seo() {
      return this.seoBuilder(
        this.post.yoastMeta,
        this.post.title,
        this.post.content
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
  post: wordPressPost(id: $id){
    title
    content
    featuredMedia{
      sourceUrl
    }
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
