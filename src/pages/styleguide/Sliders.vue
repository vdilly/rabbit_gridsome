<template lang="pug">
  Layout
    Box(title="ParaSlide")
      ParaSlide
      code(slot="code") Voir ParaSlide.vue
    Box(title="Swipe")
      Swipe1
      code(slot="code") Voir Swipe1.vue
</template>

<script>
import Layout from "~/styleguide/Layout.vue";
import pageMixin from "~/js/mixins/page";

import ParaSlide from "~/components/layouts/sliders/ParaSlide.vue"
import Swipe1 from "~/components/layouts/sliders/Swipe1.vue"
export default {
  mixins: [pageMixin],
  components: {
    Layout,
    ParaSlide,
    Swipe1
  }
};
</script>
