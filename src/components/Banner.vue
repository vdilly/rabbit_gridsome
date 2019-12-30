<template>
  <div
    class="banner"
    lazy="bg"
    :lazy-src="bannerSrc"
    :style="bannerPlaceholder ? `background-image: url(${bannerPlaceholder})` : null"
  >
    <Container class="container--small">
      <h1 class="h1" v-html="pageTitle"></h1>
    </Container>
  </div>
</template>

<script>
export default {
  props: ["pageTitle", "bannerSrc", "bannerPlaceholder"]
};
</script>

<style lang="scss">
.banner {
  height: 35rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  padding-bottom: 8rem;
  margin-bottom: 4rem;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba($color: #000000, $alpha: 0.5);
  }
  & > * {
    position: relative;
    z-index: 2;
  }

  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .h1 {
    color: white;
  }
}
</style>
