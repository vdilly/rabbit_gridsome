<template>
  <div
    class="teaser-slide"
    :class="slide.vimeo ? 'teaser-slide--vimeo' : ''"
    :lazy="!slide.vimeo ? 'bg' : null"
    :lazy-src="
      !slide.vimeo && slide.image
        ? slide.image.mediaDetails.sizes.mobile.sourceUrl
        : null
    "
  >
    <iframe
      ref="vimeo"
      v-if="slide.vimeo"
      :src="
        'https://player.vimeo.com/video/' +
          slide.vimeo +
          '?&transparent=false&muted=true'
      "
      webkitallowfullscreen
      mozallowfullscreen
      allowfullscreen
    ></iframe>
  </div>
</template>
<script>
import Player from "@vimeo/player";
export default {
  props: ["slide"],
  mounted() {
    if ("IntersectionObserver" in window && this.device.type == "desktop") {
      let elem = this.$refs.vimeo;
      if (elem) {
        const player = new Player(elem);
        let autoplayObserver = new IntersectionObserver(function(
          entries,
          observer
        ) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              player.play();
            } else {
              player.pause();
            }
          });
        });
        autoplayObserver.observe(elem);
      }
    }
  }
};
</script>
<style lang="scss">
.teaser-slide {
  height: 35rem;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 1rem;
  position: relative;

  @include RWD(mobile) {
    padding-bottom: 61%;
    height: auto;
  }

  &--vimeo {
    iframe {
      height: 100%;
      width: 100%;
      border-radius: 1rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
