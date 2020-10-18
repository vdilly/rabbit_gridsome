<template lang="pug">
.container
  slot
</template>
<style lang="scss">
.container {
  width: 100%;
  max-width: 120rem;
  display: block;
  margin: 0 auto;
  padding-left: 8rem;
  padding-right: 8rem;

  @include RWD(tablet) {
    width: 100%;
    padding-left: 5rem;
    padding-right: 5rem;
  }

  @include RWD(mobile) {
    width: 100%;
    padding-left: 2.4rem;
    padding-right: 2.4rem;
  }
  &--small {
    max-width: 111rem;
  }
}
</style>
