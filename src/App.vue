<template lang="pug">
transition(name="pageTransition", duration="500")
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
@keyframes pageTransition {
  0% {
    transform: rotate(-10deg) translateY(100%) translateX(-50%);
  }
  100% {
    transform: rotate(3deg) translateY(-100%) translateX(-50%);
  }
}
.page-transition-overlay {
  background-color: $color__core;
  content: "";
  position: fixed;
  top: 0;
  left: 50%;
  width: 150%;
  height: 150%;
  z-index: 2;
  z-index: 99999999999;
  transform: rotate(3deg) translateY(-100%) translateX(-50%);
  transition: 1.5s ease;
}
.pageTransition-enter .page-transition-overlay {
  transform: rotate(-10deg) translateY(100%) translateX(-50%);
}
#app + #app .header {
  opacity: 0;
}
</style>
