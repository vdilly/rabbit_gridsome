<template>
  <Layout :pageTitle="pageTitle">
    <Container>
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
