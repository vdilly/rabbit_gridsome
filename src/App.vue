<template>
  <transition name="pageTransition" appear duration="1400">
    <router-view />
  </transition>
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
export default {
  metaInfo() {
    return {
      title: this.$static.metadata.siteName,
      meta: [
        {
          key: "description",
          name: "description",
          content: this.$static.metadata.siteDescription
        }
      ]
    };
  }
};
</script>

<style lang="scss">
@keyframes pageTransition {
  0% {
    transform: perspective(0) scale(1);
  }
  70% {
    transform: perspective(700px) scale(0.9);
  }
  100% {
    transform: perspective(700px) scale(0.9) translateX(110%);
  }
}
@keyframes ipageTransition {
  0% {
    transform: perspective(700px) scale(0.9) translateX(-110%);
  }
  70% {
    transform: perspective(700px) scale(0.9);
  }
  90% {
    transform: perspective(0) scale(1);
  }
  100% {
    transform: perspective(0) scale(1);
  }
}
.pageTransition-enter-active,
.pageTransition-leave-active {
  transition: 0.5s;
}
#app.pageTransition-leave-active + #app {
  transform: perspective(700px) scale(0.9) translateX(-110%);
  animation-fill-mode: forwards;
  animation: ipageTransition 0.8s; // Plus de temps ici pour éviter le flickr
  animation-delay: 0.7s;
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
}
.pageTransition-leave-to, .pageTransition-enter /* .fade-leave-active below version 2.1.8 */ {
  /* opacity: 0; */
  animation: pageTransition 0.7s;
  animation-fill-mode: forwards;
}
</style>
