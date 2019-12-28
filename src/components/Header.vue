<template>
  <header class="header">
    <Container>
      <g-link to="/" class="logo">
        <img :src="logo.url" :alt="logo.alt" />
      </g-link>
      <MainMenu></MainMenu>
    </Container>
  </header>
</template>

<script>
import MainMenu from "~/components/navs/MainMenu.vue";
export default {
  components: { MainMenu },
  computed: {
    logo() {
      return this.$static.allAcfOption.edges[0].node.header_logo;
    }
  }
};
</script>

<static-query>
query {
  metadata {
    siteName
  }
  allAcfOption {
    edges {
      node {
        header_logo {
          url
          alt
        }
      }
    }
  }
}
</static-query>

<style lang="scss">
.header {
  height: 80px;
  background-color: rgba($color: white, $alpha: 0.7);
  .logo img {
    height: 7rem;
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
}
</style>
