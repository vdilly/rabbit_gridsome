<template lang="pug">
  Layout
    Box(title="ParaSlide")
      ParaSlideSample
      code(slot="code") Voir ParaSlideSample.vue
    Box(title="Swipe")
      SwipeSample
      code(slot="code") Voir SwipeSample.vue
</template>

<script>
import Layout from "~/styleguide/Layout.vue";
import pageMixin from "~/js/mixins/page";

import ParaSlideSample from "~/components/layouts/sliders/ParaSlideSample.vue"
import SwipeSample from "~/components/layouts/sliders/SwipeSample.vue"
export default {
  mixins: [pageMixin],
  components: {
    Layout,
    ParaSlideSample,
    SwipeSample
  }
};
</script>
