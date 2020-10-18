<template lang="pug">
  .boxAppear(js-observe-scroll)
    div.inner
      slot
</template>

<style lang="scss">
.boxAppear {
  overflow: hidden;
  .inner {
    transition: 0.7s ease-out;
  }
  &.right:not([js-observe-scroll="in-view"]) .inner {
    transform: translateX(100%);
  }
  &.left:not([js-observe-scroll="in-view"]) .inner {
    transform: translateX(-100%);
  }
  &.top:not([js-observe-scroll="in-view"]) .inner {
    transform: translateY(-100%);
  }
  &.bottom:not([js-observe-scroll="in-view"]) .inner {
    transform: translateY(100%);
  }
}
</style>