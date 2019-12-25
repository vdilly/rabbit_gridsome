<template>
  <Layout :pageTitle="page.title">
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
    }
  }
};
</script>

<page-query>
query($id: ID){
  page: wordPressPage(id: $id){
    title
    content
  }
}
</page-query>

<style lang="scss"></style>
