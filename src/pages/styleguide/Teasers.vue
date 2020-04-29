<template lang="pug">
  Layout
    Box(title="ParaSlide")
      TeaserBlog
</template>

<script>
import Layout from "~/styleguide/Layout.vue";
import pageMixin from "~/js/mixins/page";
import TeaserBlog from "~/components/teasers/TeaserBlog.vue"
import TeaserVimeo from "~/components/teasers/TeaserVimeo.vue"
export default {
  mixins: [pageMixin],
  components: {
    Layout,
    TeaserBlog,
    TeaserVimeo
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
