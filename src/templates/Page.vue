<template>
  <Layout :pageTitle="pageTitle">
    <Container class="container--small">
      <RTE v-html="content"></RTE>
    </Container>
  </Layout>
</template>

<script>
export default {
  computed: {
    pageTitle() {
      return "";
    },
    content() {
      return "";
    }
  }
};
</script>

<style lang="scss"></style>
