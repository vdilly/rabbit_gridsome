<template lang="pug">
footer.footer
  ul
    li(v-for="(item, index) in menu", :key="index")
      a(
        :href="parseWpUrl(item.liens.url)",
        :title="item.liens.title",
        :target="item.liens.target",
        v-html="item.liens.title"
      )
</template>

<script>
export default {
  computed: {
    menu() {
      return this.$static.allAcfOption.edges[0].node.menu_footer.menu;
    },
  },
};
</script>

<style lang="scss">
.footer {
  margin-top: 8rem;
  padding: 4rem 0;
  background-color: #2d2d2d;
}
</style>

<static-query>
{
  allAcfOption {
    edges {
      node {
        menu_footer {
          menu{
            liens {
              title
              url
              target
            }
          }
        }
      }
    }
  }
}
</static-query>