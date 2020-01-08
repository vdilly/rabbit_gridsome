<template>
  <ClientOnly>
    <div v-swiper:mySwiper="swiperOption" class="swipe-sample">
      <div class="swiper-wrapper" ref="wrapper">
        <div class="swiper-slide" v-for="i in 6" :key="i">
          <div class="swiper-slide__inner">
            <div class="swiper-slide__title-container">
              <div class="swiper-slide__title">Slide {{ i }}</div>
            </div>
            <div class="swiper-slide__bg"></div>
          </div>
        </div>
      </div>
      <button class="swiper__prev swiper__control" slot="button-prev">
        <svg class="icon">
          <use xlink:href="#chevron" />
        </svg>
      </button>
      <button class="swiper__next swiper__control" slot="button-next">
        <svg class="icon">
          <use xlink:href="#chevron" />
        </svg>
      </button>
      <div class="swiper-pagination"></div>
    </div>
  </ClientOnly>
</template>

<script>
import Vue from "vue";
import "swiper/dist/css/swiper.css";
export default {
  data() {
    const _this = this;
    return {
      swiperOption: {
        speed: 500,
        // virtualTranslate: true,
        spaceBetween: 0,
        // slidesPerView: 3,
        grabCursor: true,
        // effect: "fade",
        slidesPerView: "auto",
        centeredSlides: true,
        touchRatio: 1.5,
        longSwipesRatio: 0.4,
        // mousewheel: true,
        navigation: {
          nextEl: ".swiper__next",
          prevEl: ".swiper__prev"
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        touchStartPreventDefault: false, // Utile pour le Follow Cursor
        on: {
          touchStart: function(e) {
            if (
              e.target.classList.contains(".swiper-wrapper") ||
              e.target.closest(".swiper-wrapper")
            ) {
              document
                .querySelector(".swipe-sample .swiper-wrapper")
                .classList.add("grabbing");
            }
          },
          touchEnd: function(e) {
            document
              .querySelector(".swipe-sample .swiper-wrapper")
              .classList.remove("grabbing");
          },
          sliderMove: function(e) {
            // console.log(e);
          },

          // Fix le last active qui marche pas en size auto
          reachEnd: function() {
            // _this.wrapper.classList.add("overrideLastActive");
          },
          fromEdge: function() {
            // _this.wrapper.classList.remove("overrideLastActive");
          }
        }
      }
    };
  },
  computed: {
    wrapper() {
      return this.$refs.wrapper;
    }
  },
  mounted() {
    if (process.browser) {
      const VueAwesomeSwiper = require("vue-awesome-swiper/dist/ssr");
      Vue.use(VueAwesomeSwiper);
    }
  }
};
</script>

<style lang="scss">
.swipe-sample {
  height: 500px;
  .swiper-wrapper {
    left: -15vw;

    // Etat Grab
    &.grabbing {
      transition: 0.5s ease-out !important; // Important le ease-out
      .swiper-slide__bg {
        transform: scale(0.85);
        transition: 0.2s ease-out;
      }
    }
    // Etat non actif (au grab, sur les non actif au pas grab et pas last active)
    &.grabbing .swiper-slide,
    &:not(.grabbing):not(.overrideLastActive)
      .swiper-slide:not(.swiper-slide-active),
    &.overrideLastActive:not(.grabbing) .swiper-slide:not(.swiper-slide-next) {
      .swiper-slide__bg {
        opacity: 0.5;
      }
      .swiper-slide__title {
        transition: ease 0.25s;
        transform: translateY(100%);
      }
    }
  }

  // Slide
  .swiper-slide {
    width: 106rem;
    &__inner {
      margin-left: 25rem;
      width: calc(100% - 20rem);
      height: 100%;
      position: relative;
    }
    &__bg {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      background-color: grey;
      transition: 0.5s ease;
    }
    &__title {
      font-size: 4rem;
      color: blue;
      transition: ease 0.5s;
      line-height: 1em;
      &-container {
        position: absolute;
        bottom: 25%;
        left: 0;
        transform: translateX(-20%);
        z-index: 3;
        overflow: hidden;
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
