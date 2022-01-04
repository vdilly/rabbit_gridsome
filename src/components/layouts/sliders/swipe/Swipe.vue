<template lang="pug">
.swiper(js-observe-scroll, ref="root")
  ClientOnly
    .swipe(v-swiper:myswiper="swiperOption")
      .swiper-wrapper(ref="wrapper")
        slot
      button.swiper__prev.swiper__control(slot="button-prev", v-if="hasArrows")
        svg.icon
          use(xlink:href="#chevron")
      button.swiper__next.swiper__control(slot="button-next", v-if="hasArrows")
        svg.icon
          use(xlink:href="#chevron")
      .swiper-pagination(v-if="hasPagination")
</template>

<script>
import Vue from "vue";
import "swiper/dist/css/swiper.css";
export default {
  props: ["hasArrows", "hasPagination"],
  data() {
    const vm = this;
    return {
      swiperOption: {
        speed: 500,
        // virtualTranslate: true,
        spaceBetween: 20,
        grabCursor: true,
        // effect: "fade",

        slidesPerView: "auto",
        centeredSlides: true,
        freeMode: true,
        freeModeMomentumRatio: 0.7,
        freeModeMomentumVelocityRatio: 0.4,

        touchRatio: 1,
        longSwipesRatio: 0.4,
        mousewheel: {
          forceToAxis: true,
          // sensitivity: 18,
          eventsTarget: ".swipe",
        },
        breakpoints: {
          800: {
            centeredSlides: false,
            slidesPerView: 2,
            slidesOffsetBefore: 50,
            slidesOffsetAfter: 50,
            freeMode: false,
          },
          500: {
            spaceBetween: 20,
            slidesPerView: 1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
          },
        },
        navigation: {
          nextEl: ".swiper .swiper__next",
          prevEl: ".swiper .swiper__prev",
        },
        pagination: {
          el: ".swiper .swiper-pagination",
          clickable: true,
        },
        touchStartPreventDefault: true, // Utile pour le Follow Cursor
        on: {
          touchStart: function (e) {
            if (
              e.target.classList.contains(".swiper-wrapper") ||
              e.target.closest(".swiper-wrapper")
            ) {
              vm.$refs.wrapper.classList.add("grabbing");
            }
          },
          touchEnd: function (e) {
            vm.$refs.wrapper.classList.remove("grabbing");
          },
        },
      },
    };
  },
  computed: {
    wrapper() {
      return this.$refs.wrapper;
    },
  },
  mounted() {
    if (process.browser) {
      const VueAwesomeSwiper = require("vue-awesome-swiper/dist/ssr");
      Vue.use(VueAwesomeSwiper);
    }
  },
};
</script>

<style lang="scss">
.swiper {
  margin-left: calc(50% - (100vw / 2));
  margin-right: calc(50% - (100vw / 2));
  @media (max-width: 500px) {
    margin: 0;
  }
  .swiper-container {
    padding: 7rem 0;
    margin: -7rem 0;
    @media (max-width: 500px) {
      padding: 7rem;
      margin: -7rem;
    }
  }
}
.swipe {
  .swiper-slide {
    transition: 0.2s ease-out;
    will-change: transform;
    transform: translateY(0);
  }
  .swiper-wrapper {
    left: -25vw;
    @include RWD(tablet) {
      left: -17vw;
    }
    @media (max-width: 800px) {
      left: unset;
    }

    // Etat Grab
    &.grabbing {
      transition: 0.5s ease-out !important; // Important le ease-out
      .swiper-slide {
        transform: scale(0.9);
      }
    }
    // Etat non actif (au grab, sur les non actif au pas grab et pas last active)
    &.grabbing .swiper-slide,
    &:not(.grabbing):not(.overrideLastActive)
      .swiper-slide:not(.swiper-slide-active),
    &.overrideLastActive:not(.grabbing) .swiper-slide:not(.swiper-slide-next) {
      .swiper-slide {
        opacity: 0.5;
      }
      .swiper-slide__title {
        transition: ease 0.25s;
        transform: translateY(100%);
      }
    }
  }

  // Controls
  .swiper {
    &__prev,
    &__next {
      position: absolute;
      top: 50%;
      transform: translatey(-50%);
      z-index: 10;
      height: 100%;
      width: 8rem;
      .icon {
        fill: black;
        height: 4rem;
        width: 4rem;
        opacity: 0.3;
      }
    }
    &__prev {
      left: 0;
      .icon {
        transform: rotate(90deg);
      }
    }
    &__next {
      right: 0;
      .icon {
        transform: rotate(-90deg);
      }
    }
  }
  .swiper-pagination {
    z-index: 10;
  }
}
</style>
