<template lang="pug">
  div.layout-default(:class="[window.windowScrolled ? 'js-scrolled ' + window.scrollDirection : '',siteLoaded ? 'loaded' : '',isFront ? 'front' : 'not-front',$context.template ? $context.template : null]")
    div.page-transition-overlay
    FollowCursor(:customHovers="[{ selector: 'swiper-wrapper', class: 'slider_drag' }]")
    Navbar
      Header
        Logo.img-contain-left(slot="logo", :linked="!isFront")
        MainMenu(slot="menu",  v-show="window.range == 'desktop'")
        Popin(
          slot="burger"
          v-show="window.range != 'desktop'"
          panelType="side-right-panel"
        )
          BurgerIcon(slot="trigger") 
          div(slot="close") Close
          MainMenuRwd
    main
      slot(name="banner")
      slot
      Footer
</template>

<script>
import Navbar from "~/components/layouts/Navbar.vue";
import Header from "~/components/layouts/Header.vue";
import BurgerIcon from "~/components/atoms/BurgerIcon.vue";
import MainMenu from "~/components/navs/MainMenu.vue";
import MainMenuRwd from "~/components/navs/MainMenuRwd.vue";
import Footer from "~/components/Footer.vue";
import FollowCursor from "~/components/FollowCursor.vue";
export default {
  props: ["isFront", "pageTitle"],
  components: {
    Header,
    Footer,
    FollowCursor,
    Navbar,
    MainMenu,
    MainMenuRwd,
    BurgerIcon
  }
};
</script>