<template lang="pug">
.burger-icon
  svg.icon
    use(xlink:href="#burger")
</template>

<style lang="scss">
.burger-icon {
  height: 2.5rem;
  width: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  span {
    width: 100%;
    height: 0.3rem;
    background-color: $color__core;
  }
}
</style>