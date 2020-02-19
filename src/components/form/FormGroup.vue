<template lang="pug">
  div.form__group
    slot
    label.form__label(:for="id" v-if="label")
      span(v-html="label")
      span.form__required(v-if="required") *
</template>

<script>
export default {
  props: ["id", "label", "required"]
};
</script>

<style lang="scss"></style>
