<template lang="pug">
  component.logo(:is="computedLinked ? 'a' : 'div'", :href="computedLinked ? '/' : null" :title="computedLinked ? siteName : null")
    img(:src="computedLogoUrl" :alt="computedLogoAlt")
</template>

<style lang="scss">
.logo {
  img {
  }
}
</style>

<script>
export default {
  props: ["linked", "logoUrl", "logoAlt"],
  computed: {
    computedLinked() {
      return this.linked ? true : false;
    },
    computedLogoUrl() {
      return this.logoUrl ? this.logoUrl : this.logo.url;
    },
    computedLogoAlt() {
      return this.logoAlt ? this.logoAlt : "Logo " + this.siteName;
    },
    siteName() {
      return this.$static.metadata.siteName;
    },
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