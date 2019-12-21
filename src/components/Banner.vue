<template>
  <div class="banner">
    <Container class="container--small">
      <h1 class="h1" v-html="pageTitle"></h1>
    </Container>
  </div>
</template>

<script>
export default {
  props: ["pageTitle"]
};
</script>

<style lang="scss">
.banner {
  .h1 {
    margin-bottom: 8rem;
  }
}
</style>
