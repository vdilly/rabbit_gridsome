<template lang="pug">
.sliderTemoignage
  ul.slider(:class="'slide-' + currentSlide")
    li.slide(v-for="(item, index) in slider", :key="index")
      img(
        src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=375&w=630"
      )
  .arrows
    Btn.ghost.arrow.left(@click="prevSlide")
    Btn.ghost.arrow.right(@click="nextSlide")
</template>

<script>
export default {
  props: ["slider"],
  data() {
    return {
      currentSlide: 0,
      autoplayInterval: null,
    };
  },
  computed: {
    slideLength() {
      return this.slider.length;
    },
  },
  methods: {
    goToSlide(index) {
      this.currentSlide = index;
      clearInterval(this.autoplayInterval);
    },
    nextSlide() {
      this.currentSlide =
        this.currentSlide + 1 == this.slideLength ? 0 : this.currentSlide + 1;
    },
    prevSlide() {
      this.currentSlide =
        this.currentSlide - 1 < 0
          ? this.slideLength - 1
          : this.currentSlide - 1;
    },
  },
  mounted() {
    // const vm = this;
    // this.autoplayInterval = setInterval(() => {
    //   vm.nextSlide();
    // }, 6500);
  },
};
</script>

<style lang="scss">
.sliderTemoignage {
  $slideWidthDesktop: 60rem;
  $slideWidthMobile: 100%;

  $marginDesktop: 1rem;
  $marginMobile: 2.5rem;

  .slider {
    display: flex;
    margin-left: -#{$marginDesktop};
    transition: 0.5s ease;

    @include RWD(mobile) {
      margin-left: -#{$marginMobile};
    }
  }
  .slide {
    flex-shrink: 0;
    width: 60rem;
    display: flex;
    margin-left: #{$marginDesktop};
    max-width: calc(100% - #{$marginDesktop});

    @include RWD(mobile) {
      margin-left: #{$marginMobile};
      max-width: calc(100% - #{$marginMobile});
    }
  }

  .slider {
    @for $i from 1 through 10 {
      &.slide-#{$i} {
        transform: translateX(#{-$i * $slideWidthDesktop});
        @include RWD(mobile) {
          transform: translateX(#{-$i * $slideWidthMobile});
        }
      }
    }
  }
}
</style>