<template lang="pug">
div.site-loader(:class="siteLoaded ? 'loaded' : ''")
  Logo
</template>
<style lang="scss">
.site-loader {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: white;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  &.loaded {
    transition: 0s 0.5s;
    height: 0;
    width: 0;
    animation: fadeOut 0.5s;
    animation-fill-mode: forwards;
    @keyframes fadeOut {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  }
  .logo {
    animation: bounce 1.5s infinite ease 0.2s;
    @keyframes bounce {
      0% {
        transform: scale(1, 1) translateY(0);
      }
      7% {
        transform: scale(1.1, 0.9) translateY(0);
      }
      22% {
        transform: scale(0.9, 1.1) translateY(-2rem);
      }
      37% {
        transform: scale(1, 1) translateY(0);
      }
      75% {
        transform: scale(1, 1) translateY(0);
      }
    }
  }
}
</style>