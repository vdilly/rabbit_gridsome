<template>
  <Layout>
    <Container>
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
    }
  }
};
</script>

<page-query>
query($id: ID){
  post: wordPressPost(id: $id){
    title
    content
    yoastMeta{
      yoastWpseoTitle
      yoastWpseoMetadesc
    }
  }
}
</page-query>