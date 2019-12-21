<template>
  <div class="row">
    <slot></slot>
  </div>
</template>
<style lang="scss">
.row {
  display: flex;
}
.col {
  flex: 1;
}
.row:not(.no-gutter) {
  .col + .col {
    margin-left: $m3;
  }
}
</style>