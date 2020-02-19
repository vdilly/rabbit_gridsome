<template lang="pug">
  nav.main-menu-rwd
    div.main-menu-rwd__item(v-for="(item, index) in menu")
      a.main-menu-rwd__label(
        v-if="item.acf_fc_layout == 'liens'" 
        :href="parseWpUrl(item.liens.url)"
        :title="item.liens.title"
        :target="item.liens.target"
        v-html="item.liens.title"
        :key='index'
        :class="item.liens.url.indexOf($route.path) != -1 && $route.path != '/' ? 'active' : null"
      )
      Drawer.main-menu-rwd__sub(
        v-if="item.acf_fc_layout == 'submenu'" 
        :key='index' 
        :triggerIsLink="true"
        drawerType="drawer-from-right"
        ref="drawer"
      )
        component.main-menu-rwd__label.main-menu-rwd__sub-label(
          slot="label" 
          :is="item.liens ? 'a' : 'div'" 
          :href="item.liens ? parseWpUrl(item.liens.url) : null" 
          :title="item.liens ? item.liens.title : null" :target="item.liens ? item.liens.target : null" 
          v-html="item.liens ? item.liens.title : item.label" 
          :class="getActiveClassFromSublist(item.submenu) && $route.path != '/' ? 'active': null"
        )
        svg.icon(slot="trigger")
          use(xlink:href="#chevron")
        div.main-menu-rwd__label(slot="back")
          svg.icon
              use(xlink:href="#chevron")
          span(v-html="item.liens ? item.liens.title : item.label")
        a.main-menu-rwd__label(
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
    closeDrawers() {
      if (this.$refs.drawer) {
        this.$refs.drawer.forEach(el => {
          el.closeDrawer();
        });
      }
    },
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
.main-menu-rwd {
  display: flex;
  flex-direction: column;
  min-width: 30rem;
  @include RWD(mobile) {
    min-width: 0;
  }
  &__item {
    &:not(:last-child) {
      margin-bottom: 2rem;
    }
  }
  &__label {
    text-decoration: none;
    padding: 1.5rem;
    display: flex;
    align-items: center;

    // Etat actif
    &.active {
    }
  }
  a {
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
  &__sub {
    &-label {
      font-weight: 700;
    }
    & > *:not(:first-child) {
      margin-left: 2rem;
    }
  }
  .drawer {
    &__trigger {
      .icon {
        height: 1rem;
        width: 1rem;
        transform: rotate(-90deg);
      }
    }
    &__sub-back {
      .icon {
        height: 1rem;
        width: 1rem;
        transform: rotate(90deg);
        margin-right: 2rem;
      }
      span {
        font-weight: 700;
      }
    }
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
