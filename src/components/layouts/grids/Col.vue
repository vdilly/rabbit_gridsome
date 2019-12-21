<template>
  <div class="col"></div>
</template>
<style lang="scss">
@for $i from 1 through 10 {
  .col-#{$i} {
    flex: #{$i};
  }
}
</style>