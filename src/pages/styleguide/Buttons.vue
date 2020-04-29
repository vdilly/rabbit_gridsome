<template lang="pug">
  Layout
    Box.small
      Btn Btn
      code(slot="code") {{Btn}}
    Box.small
      BtnAvatar
        Avatar(slot="pre")
          img(src="http://placeimg.com/50/50/any")
        span BtnAvatar
        div(slot="post") 11
      code(slot="code") {{BtnAvatar}}
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
      Btn: `Btn Btn`,
      BtnAvatar: `BtnAvatar
  Avatar(slot="pre")
    img(src="http://placeimg.com/50/50/any")
  span BtnAvatar
  div(slot="post") 11`
    }
  },
};
</script>
