<template>
  <nav class="main-menu">
    <template v-for="(item, index) in menu">
      <div class="main-menu__item" :key="index" v-if="item.acf_fc_layout == 'liens'">
        <a
          :href="parseWpUrl(item.liens.url)"
          :title="item.liens.title"
          :target="item.liens.target"
          v-html="item.liens.title"
        ></a>
      </div>
      <div
        class="main-menu__item"
        :key="index"
        v-if="item.acf_fc_layout == 'submenu'"
        @mouseenter="openSubmenu($event, index)"
        @mouseleave="closeSubmenu($event)"
      >
        <a
          :href="parseWpUrl(item.liens.url)"
          :title="item.liens.title"
          :target="item.liens.target"
          v-html="item.liens.title"
        ></a>
        <transition name="slideIn">
          <div
            class="main-menu__sub-wrap"
            v-show="submenuOpen == index || window.range != 'desktop'"
          >
            <ul>
              <li v-for="(subitem, subindex) in item.submenu" :key="subindex">
                <a
                  :href="parseWpUrl(subitem.liens.url)"
                  :target="subitem.liens.target"
                  :title="subitem.liens.title"
                  v-html="subitem.liens.title"
                ></a>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </template>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      submenuOpen: null
    };
  },
  computed: {
    option() {
      return this.$static.allAcfOption.edges[0].node;
    },
    menu() {
      return this.option.header_menu;
    }
  },
  methods: {
    openSubmenu: function(e, index) {
      e.stopPropagation();
      this.submenuOpen = index;
    },
    closeSubmenu: function(e) {
      e.stopPropagation();
      this.submenuOpen = null;
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
    a {
      text-decoration: none;
      padding: 1.5rem 0;
      display: flex;
      align-items: center;
      &:hover,
      &:focus {
        text-decoration: underline;
      }
    }
  }
  &__sub-wrap {
    position: absolute;
    bottom: 0rem;
    left: 50%;
    transform: translate(-50%, 100%);
    z-index: 3;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.3);

    ul {
      background-color: white;
      overflow: hidden;
      position: relative;
    }
    a {
      padding: 1.5rem 2.5rem;
      white-space: nowrap;
    }
  }
}
</style>

<static-query>
{
  allAcfOption {
    edges {
      node {
        header_menu {
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
</static-query>