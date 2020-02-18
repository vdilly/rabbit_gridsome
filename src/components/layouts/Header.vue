<template lang="pug">
  header.header
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
$header-bg: white;
.header {
  height: 100%;
  background-color: $header-bg;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
  .logo {
    height: calc(100% - 2rem);
    width: 12rem;
  }
}
</style>
