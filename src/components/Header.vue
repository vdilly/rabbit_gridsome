<template lang="pug">
Navbar
  header.header
    Container
      Logo.img-contain-left(:linked="!isFront")
      .filler
      MainMenu1(v-show="window.range == 'desktop'")
      Popin(
        v-show="window.range != 'desktop'",
        panelType="side-right-panel",
        @close="closeDrawers"
      )
        BurgerIcon(slot="trigger") 
        div(slot="close") 
          svg.burger-close.icon
            use(xlink:href="#close-circled")
        MainMenuRwd1(ref="menuRwd")
</template>

<script>
import Navbar from "~/components/layouts/Navbar.vue";
import BurgerIcon from "~/components/atoms/BurgerIcon.vue";
import MainMenu1 from "~/components/navs/MainMenu1.vue";
import MainMenuRwd1 from "~/components/navs/MainMenuRwd1.vue";
export default {
  props: ["isFront"],
  components: { Navbar, MainMenu1, MainMenuRwd1, BurgerIcon },
  methods: {
    closeDrawers: function () {
      // Au close du burger on close les éventuels drawers, on achemine l'event: Default -> MainMenuRwd -> Drawer
      this.$refs.menuRwd.closeDrawers();
    },
  },
};
</script>

<style lang="scss">
$header-force-full-height: false;
$header-bg: white;
.header {
  height: 100%;
  background-color: $header-bg;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    @if $header-force-full-height {
      & > * {
        height: 100%;
      }
    }
  }
  .logo {
    height: calc(100% - 2rem);
    width: 12rem;
  }
  .popin__close {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .burger-close {
    height: 3rem;
    width: 3rem;
    fill: $color__text;
    margin: 2rem;
  }
}
</style>