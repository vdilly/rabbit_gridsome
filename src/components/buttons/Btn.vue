<template>
  <component class="btn" :is="tag" @click="$emit('click')">
    <div class="flexbox">
      <div class="btn__text">
        <slot></slot>
      </div>
    </div>
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: "button"
    }
  }
};
</script>

<style lang="scss">
.btn {
  padding: 1.5rem 2rem;
  border: solid 2px $color__title;
  .flexbox {
  }
  &__text {
    font-size: 1.8rem;
    font-family: $font__fancy;
    color: $color__title;
  }
}
</style>
