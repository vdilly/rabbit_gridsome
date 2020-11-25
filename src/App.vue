<template lang="pug">
transition(name="page", appear, mode="out-in")
  router-view(:key="$route.fullPath")
</template>

<static-query>
query {
  metadata {
    siteName
    siteDescription
  }
}
</static-query>

<script>
// Key sur le router view pour forcer le reload même si c'est le même composant utilisé.
// Si on utilise un overlay ou autre élément pour la transition, à mettre dans le layout
// Dans main.js => override scrollbehavior pour éviter les scroll top avant l'anim
export default {
  metaInfo() {
    return {
      title: this.$static.metadata.siteName,
      meta: [
        {
          key: "description",
          name: "description",
          content: this.$static.metadata.siteDescription,
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.page-enter-active {
  transition: opacity 0.5s ease;
}
.page-leave-active {
  transition: opacity 0.5s ease;
}

.page-enter,
.page-leave-to {
  opacity: 0;
  .navbar {
    transform: translateY(-100%);
  }
}
</style>
