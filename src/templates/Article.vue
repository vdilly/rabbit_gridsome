<template>
  <Layout>
    <Banner
      v-slot="banner"
      :pageTitle="post.title"
      lazy="bg"
      :lazy-src="bannerSrc"
      :lazy-placeholder="bannerPlaceholder"
    ></Banner>
    <Container class="container--small">
      <Ariane :ariane="$context.ariane"></Ariane>
      <RTE :rte="post.content"></RTE>
    </Container>
  </Layout>
</template>

<script>
import pageMixin from "~/js/mixins/page";
export default {
  mixins: [pageMixin],
  computed: {
    bannerSrc() {
      return this.post.featuredMedia
        ? this.size(this.post.featuredMedia.sourceUrl, "mobile")
        : null;
    },
    bannerPlaceholder() {
      return this.post.featuredMedia
        ? this.size(this.post.featuredMedia.sourceUrl, "lazy")
        : null;
    },
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
    blocks{
      innerHtml
      innerContent
      blockName
      attrs{
        id
        sizeSlug
        width
        height
      }
    }
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
