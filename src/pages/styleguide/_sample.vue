<template lang="pug">
  Layout
    Box(title="ParaSlide")
      ParaSlide
      code(slot="code") Voir ParaSlide.vue
</template>

<script>
import Layout from "~/styleguide/Layout.vue";
import pageMixin from "~/js/mixins/page";
export default {
  mixins: [pageMixin],
  components: {
    Layout
  },
  data() {
    return {
      BtnAvatar: `BtnAvatar
  Avatar(slot="pre")
    img(src="http://placeimg.com/50/50/any")
  span BtnAvatar
  div(slot="post") 11`
    }
  },
};
</script>
