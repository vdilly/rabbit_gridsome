<template lang="pug">
  Layout
    Box.small(title="TeaserBlog")
      TeaserBlog(link="#" thumbnail="http://placeimg.com/700/300/any" title="Teaser Blog" date="11 Janvier 2020" excerpt="Une petite phrase d'accroche. Pour en savoir plus, cliquez sur la carte."  :tags="tags")
    Box.small(title="TeaserSlideVimeo")
      strong Viméo (playInView)
      TeaserSlideVimeo(vimeo="405776195", :playInView="true")
      strong Image
      TeaserSlideVimeo(image="http://placeimg.com/700/700/any")
      code(slot="code") {{TeaserSlideVimeo}}
</template>

<script>
import Layout from "~/styleguide/Layout.vue";
import pageMixin from "~/js/mixins/page";
import TeaserBlog from "~/components/teasers/TeaserBlog.vue"
import TeaserSlideVimeo from "~/components/teasers/TeaserSlideVimeo.vue"
export default {
  mixins: [pageMixin],
  components: {
    Layout,
    TeaserBlog,
    TeaserSlideVimeo
  },
  data() {
    return {
      tags: [{title: "Développement"}, {title: "Bien-être"}],
      TeaserSlideVimeo: `TeaserSlideVimeo(vimeo="405776195", :playInView="true")
TeaserSlideVimeo(image="http://placeimg.com/700/700/any")`
    }
  },
};
</script>
