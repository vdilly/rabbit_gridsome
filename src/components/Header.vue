<template>
  <header class="header">
    <Container>
      <strong>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <nav class="nav">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/about/">About</g-link>
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
  margin-bottom: 20px;
  height: 80px;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
