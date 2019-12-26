<template>
  <header class="header">
    <Container>
      <strong>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <nav class="nav">
        <g-link class="nav__link" to="/about/">About</g-link>
        <g-link class="nav__link" to="/blog/">Blog</g-link>
      </nav>
    </Container>
  </header>
</template>

<script>
export default {};
</script>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style lang="scss">
.header {
  height: 80px;
  // position: absolute;
  // top: 0;
  // left: 0;
  // width: 100%;
  background-color: rgba($color: white, $alpha: 0.7);
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
}
</style>
