<template>
  <div class="site-loader" :class="siteLoaded ? 'loaded' : ''">
    <g-image alt="Example image" src="~/favicon.png" width="135" />
  </div>
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
  background-color: #1f1f1f;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  &.loaded {
    transition: 0s 0.5s;
    // transform: translate(100%);
    // opacity: 0;
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
}
</style>