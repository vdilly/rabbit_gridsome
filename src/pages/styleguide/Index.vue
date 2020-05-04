<template lang="pug">
  Layout
    div Home
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
