<template>
  <Layout>
    <Banner :pageTitle="page.title"></Banner>
    <Container>
      <RTE :rte="page.content"></RTE>
    </Container>
  </Layout>
</template>

<script>
import pageMixin from "~/js/mixins/page";
export default {
  mixins: [pageMixin],
  computed: {
    page() {
      return this.$page.page.edges[0].node;
    }
  }
};
</script>

<page-query>
{
  page: allWordPressPage(filter: {template: {eq: "404.php"}}) {
    edges{
      node{
        title
        content
      }
    }
  }
}
</page-query>