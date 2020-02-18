<template lang="pug">
  nav.main-menu
    div.main-menu__item(v-for="(item, index) in menu")
      a.main-menu__label(
        v-if="item.acf_fc_layout == 'liens'" 
        :href="parseWpUrl(item.liens.url)"
        :title="item.liens.title"
        :target="item.liens.target"
        v-html="item.liens.title"
        :key='index'
        :class="item.liens.url.indexOf($route.path) != -1 && $route.path != '/' ? 'active' : null"
      )
      Dropdown(v-if="item.acf_fc_layout == 'submenu'" :key='index')
        component.main-menu__label(
          slot="trigger" 
          :is="item.liens ? 'a' : 'div'" 
          :href="item.liens ? parseWpUrl(item.liens.url) : null" 
          :title="item.liens ? item.liens.title : null" :target="item.liens ? item.liens.target : null" 
          v-html="item.liens ? item.liens.title : item.label" 
          :class="getActiveClassFromSublist(item.submenu) && $route.path != '/' ? 'active': null"
        )
        a.main-menu__label(
          v-for="(subitem, subindex) in item.submenu" 
          :key="subindex" 
          :href="parseWpUrl(subitem.liens.url)" 
          :target="subitem.liens.target" 
          :title="subitem.liens.title" 
          v-html="subitem.liens.title"
        )
    Btn Devis
</template>

<script>
export default {
  computed: {
    option() {
      return this.$static.allAcfOption.edges[0].node;
    },
    menu() {
      return this.option.menu_header.menu;
    }
  },
  methods: {
    getActiveClassFromSublist(submenu) {
      let vm = this;
      let r = false;
      submenu.forEach(el => {
        if (el.liens && el.liens.url.indexOf(vm.$route.path) != -1) {
          r = true;
        }
      });
      return r;
    }
  }
};
</script>

<style lang="scss">
.main-menu {
  display: flex;
  &__item {
    position: relative;
    &:not(:last-child) {
      margin-right: 2rem;
    }
  }
  &__label {
    text-decoration: none;
    padding: 1.5rem;
    display: flex;
    align-items: center;

    &.active {
      &:after {
        content: "";
        position: absolute;
        bottom: 1.5rem;
        left: 50%;
        transform: translateX(-50%);
        background-color: $color__core;
        height: 0.5rem;
        width: 0.5rem;
        border-radius: 50%;
      }
    }
  }
  a {
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
  .dropdown {
    height: 100%;
  }
}
</style>

<static-query>
{
  allAcfOption {
    edges {
      node {
        menu_header {
          menu{
            acf_fc_layout
            label_is_link
            label
            liens {
              title
              url
              target
            }
            submenu {
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
}
</static-query>
