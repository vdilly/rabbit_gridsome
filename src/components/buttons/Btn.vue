<template lang="pug">
component.btn(:is="forceDiv ? 'div' : href ? 'a' : 'button'" :href="href", @click="$emit('click')")
  .flexbox
    slot(name="pre")
    .btn__text
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
.btn {
  padding: 1.5rem 2rem;
  border: solid 2px $color__title;
  .flexbox {
    display: flex;
    align-items: center;
    & > * + .btn__text {
      margin-left: 1rem;
    }
    .btn__text + * {
      margin-left: 1rem;
    }
  }
  &__text {
    font-size: 1.8rem;
    font-family: $font__fancy;
    color: $color__title;
  }
}
</style>
