<template lang="pug">
.paraslide(js-observe-scroll)
  ClientOnly
    .paraslide-sample(v-swiper:mySwiper="swiperOption", ref="swiper")
      .swiper-wrapper(ref="wrapper")
        .swiper-slide(
          v-for="(url, index) in photos",
          :key="index",
          scroll-anim="y8",
          :scroll-delay="index"
        )
          img(:src="url")
</template>

<script>
import Vue from "vue";
import "swiper/dist/css/swiper.css";
export default {
  data() {
    const _this = this;
    return {
      photos: [
        "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=375&w=630",
        "https://images.pexels.com/photos/372042/pexels-photo-372042.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=375&w=630",
        "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=375&w=630",
        "https://images.pexels.com/photos/756453/pexels-photo-756453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=375&w=630",
        "https://images.pexels.com/photos/2332415/pexels-photo-2332415.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=375&w=630",
        "https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=375&w=630",
        "https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&dpr=2&h=375&w=630",
        "https://images.pexels.com/photos/975657/pexels-photo-975657.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=375&w=630",
        "https://images.pexels.com/photos/371160/pexels-photo-371160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=375&w=630",
      ],
      swiperOption: {
        speed: 500,
        spaceBetween: 80,
        grabCursor: true,
        slidesPerView: "auto",
        centeredSlides: true,
        touchRatio: 1,
        freeMode: true,
        freeModeMomentumRatio: 1,
        freeModeMomentumVelocityRatio: 0.5,
        touchStartPreventDefault: false, // Utile pour le Follow Cursor
        on: {
          touchStart: function (e) {
            if (
              e.target.classList.contains(".swiper-wrapper") ||
              e.target.closest(".swiper-wrapper")
            ) {
              document
                .querySelector(".paraslide-sample .swiper-wrapper")
                .classList.add("grabbing");
            }
          },
          touchEnd: function (e) {
            document
              .querySelector(".paraslide-sample .swiper-wrapper")
              .classList.remove("grabbing");
          },
          sliderMove: function (e) {},
          progress: function (progress) {},
          setTranslate: function (translate) {
            const progress = _this.swiper.progress;
            const length = _this.imgs.length;
            const range = length * 10;
            _this.imgs.forEach((el, index) => {
              const x = length * 10 * (progress - index / (length - 1)) - 50;
              el.style.transform = `translate3d(${x}%,-50%,0)`;
            });
          },
          transitionStart: function () {
            _this.imgs.forEach((el) => {
              el.style.transition = "all 1s ease-out";
            });
          },
          transitionEnd: function () {
            _this.imgs.forEach((el) => {
              el.style.transition = "all 0s ease-out";
            });
          },
        },
      },
    };
  },
  computed: {
    imgs() {
      return this.wrapper.querySelectorAll("img");
    },
    swiper() {
      return this.$refs.swiper.swiper;
    },
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
.paraslide__viewport {
  display: flex;
}
.paraslide-sample {
  .swiper-wrapper.grabbing {
    transition: 0.1s ease-out !important;
  }
  .swiper-slide {
    width: 500px;
    height: 522px;
    position: relative;
    overflow: hidden;
    img {
      max-width: 10000px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 100%;
      width: auto;
      filter: grayscale(0.3);
    }
  }
}
</style>
