<template>
  <Layout>
    <Container>
      <h1 v-html="post.title"></h1>
      <RTE v-html="post.content"></RTE>
    </Container>
  </Layout>
</template>

<script>
export default {
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