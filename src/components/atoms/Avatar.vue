<template lang="pug">
  div.avatar.img-contain-center(:class="bordered ? 'bordered' : null")
    slot
</template>
<script>
export default {
  props: {
    bordered: {
      default: true
    }
  }
};
</script>
<style lang="scss">
.avatar {
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  height: 2rem;
  width: 2rem;

  &.bordered {
    border: solid 2px $color__core;
  }
}
</style>