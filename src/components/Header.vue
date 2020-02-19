<template lang="pug">
  Navbar
    HeaderLayout1
      Logo.img-contain-left(slot="logo", :linked="!isFront")
      MainMenu1(slot="menu",  v-show="window.range == 'desktop'")
      Popin(
        slot="burger"
        v-show="window.range != 'desktop'"
        panelType="side-right-panel"
        @close="closeDrawers"
      )
        BurgerIcon(slot="trigger") 
        div(slot="close") Close
        MainMenuRwd1(ref="menuRwd")
</template>

<script>
import Navbar from "~/components/layouts/Navbar.vue";
import HeaderLayout1 from "~/components/layouts/HeaderLayout1";
import BurgerIcon from "~/components/atoms/BurgerIcon.vue";
import MainMenu1 from "~/components/navs/MainMenu1.vue";
import MainMenuRwd1 from "~/components/navs/MainMenuRwd1.vue";
export default {
  props: ["isFront"],
  components: { HeaderLayout1, Navbar, MainMenu1, MainMenuRwd1, BurgerIcon },
  methods: {
    closeDrawers: function() {
      // Au close du burger on close les éventuels drawers, on achemine l'event: Default -> MainMenuRwd -> Drawer
      this.$refs.menuRwd.closeDrawers();
    }
  }
};
</script>
