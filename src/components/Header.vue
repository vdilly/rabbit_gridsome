<template lang="pug">
  Navbar
    HeaderLayout1
      Logo.img-contain-left(slot="logo", :linked="!isFront")
      MainMenu(slot="menu",  v-show="window.range == 'desktop'")
      Popin(
        slot="burger"
        v-show="window.range != 'desktop'"
        panelType="side-right-panel"
        @close="closeDrawers"
      )
        BurgerIcon(slot="trigger") 
        div(slot="close") Close
        MainMenuRwd(ref="menuRwd")
</template>

<script>
import Navbar from "~/components/layouts/Navbar.vue";
import HeaderLayout1 from "~/components/layouts/HeaderLayout1";
import BurgerIcon from "~/components/atoms/BurgerIcon.vue";
import MainMenu from "~/components/navs/MainMenu.vue";
import MainMenuRwd from "~/components/navs/MainMenuRwd.vue";
export default {
  props: ["isFront"],
  components: { HeaderLayout1, Navbar, MainMenu, MainMenuRwd, BurgerIcon },
  methods: {
    closeDrawers: function() {
      // Au close du burger on close les éventuels drawers, on achemine l'event: Default -> MainMenuRwd -> Drawer
      this.$refs.menuRwd.closeDrawers();
    }
  }
};
</script>
