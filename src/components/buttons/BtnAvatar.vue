<template lang="pug">
component.btn-avatar(:is="forceDiv ? 'div' : href ? 'a' : 'button'" :href="href", @click="$emit('click')")
  .flexbox
    slot(name="pre")
    .btn-avatar__text
      slot
    slot(name="post")
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: null
    },
    forceDiv: {
      default: false
    }
  }
};
</script>

<style lang="scss">
.btn-avatar {
  padding: 0.5rem 2rem;
  border: solid 2px $color__title;
  border-radius: 5rem;
  text-decoration: none !important;
  overflow: hidden;
  .flexbox {
    display: flex;
    align-items: center;
    & > * + .btn-avatar__text {
      margin-left: 1rem;
    }
    .btn-avatar__text + * {
      margin-left: 1rem;
    }
  }
  &__text {
    font-size: 1.6rem;
    font-family: $font__fancy;
    color: $color__title;
  }
}
</style>
