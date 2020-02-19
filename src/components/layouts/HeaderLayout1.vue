<template lang="pug">
  header.header.header-layout-1
    Container
      slot(name="logo")
      div.filler
      slot(name="menu")
      slot(name="burger")
</template>

<script>
/**
 * Manage le layout du header, utiliser les slots pour placer les éléments needed
 */
export default {};
</script>

<style lang="scss">
$header-force-full-height: false;
$header-bg: white;
.header-layout-1 {
  height: 100%;
  background-color: $header-bg;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    @if $header-force-full-height {
      & > * {
        height: 100%;
      }
    }
  }
  .logo {
    height: calc(100% - 2rem);
    width: 12rem;
  }
}
</style>