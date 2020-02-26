<template lang="pug">
  Layout
    div Home
    a(href="/styleguide/Buttons") Boutons
</template>

<script>
import Layout from "~/styleguide/Layout.vue";
import pageMixin from "~/js/mixins/page";
export default {
  mixins: [pageMixin],
  components: {
    Layout
  }
};
</script>
