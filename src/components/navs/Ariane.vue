<template lang="pug">
nav.ariane(role='navigation', aria-label="Fil d'ariane")
  ul.ariane__list
    li.ariane__item
      a(href='/') Home
    li.ariane__item(v-for='item in ariane', :key='item.link')
      a(:href='item.link', v-html='item.label')
</template>

<script>
export default {
  props: ["ariane"]
};
</script>

<style lang="scss">
.ariane {
  margin-bottom: 4rem;
  &__list {
    display: flex;
    align-items: center;
  }
  &__item {
    display: flex;
    align-items: center;
    &:not(:last-child):after {
      content: ">";
      margin: 0 1rem;
    }
  }
}
</style>