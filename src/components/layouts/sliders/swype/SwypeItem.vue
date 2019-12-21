<template>
  <li class="swype__item">
    <slot></slot>
  </li>
</template>
<script>
export default {};
</script>
<style lang="scss">
.swype__item {
  user-select: none;
  cursor: grab;
  flex-shrink: 0;

  & + & {
    margin-left: 1.5rem;
  }

  & > * {
    width: 42rem;
    @include RWD(mobile) {
      max-width: calc(100vw - 5rem);
    }
  }
}
</style>
