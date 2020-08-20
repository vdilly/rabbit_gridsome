<template lang="pug">
.loader
</template>
<style lang="scss">
.loader {
  position: relative;
  animation: loader-10-1 2s infinite linear;
  height: 2em;
  width: 2em;
  display: inline-block;
  &:before,
  &:after {
    content: "";
    width: 0;
    height: 0;
    border: 0.5em solid $color__core;
    display: block;
    position: absolute;
    border-radius: 100%;
    animation: loader-10-2 1s infinite ease-in-out;
  }
  &:before {
    top: 0;
    left: 50%;
  }
  &:after {
    bottom: 0;
    right: 50%;
    animation-delay: -0.5s;
  }
}

@keyframes loader-10-1 {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loader-10-2 {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
</style>
