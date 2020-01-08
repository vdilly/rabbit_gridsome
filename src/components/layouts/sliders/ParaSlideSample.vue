<template>
  <div class="paraslide">
    <!-- <Swype class="paraslide__viewport">
      <SwypeItem class="paraslide__slide" v-for="i in 10" :key="i">
        <img
          src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=325&w=630"
          alt=""
        />
      </SwypeItem>
    </Swype> -->
    <ClientOnly>
      <div
        v-swiper:mySwiper="swiperOption"
        class="paraslide-sample"
        ref="swiper"
      >
        <div class="swiper-wrapper" ref="wrapper">
          <div class="swiper-slide" v-for="i in 7" :key="i">
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=325&w=630"
              alt=""
            />
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
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
        spaceBetween: 80,
        grabCursor: true,
        slidesPerView: "auto",
        centeredSlides: true,
        touchRatio: 1,
        freeMode: true,
        freeModeMomentumRatio: 1,
        freeModeMomentumVelocityRatio: 0.2,
        on: {
          touchStart: function(e) {
            if (
              e.target.classList.contains(".swiper-wrapper") ||
              e.target.closest(".swiper-wrapper")
            ) {
              document
                .querySelector(".paraslide-sample .swiper-wrapper")
                .classList.add("grabbing");
            }
          },
          touchEnd: function(e) {
            document
              .querySelector(".paraslide-sample .swiper-wrapper")
              .classList.remove("grabbing");
          },
          sliderMove: function(e) {},
          progress: function(progress) {},
          setTranslate: function(translate) {
            const progress = _this.swiper.progress;
            const length = _this.imgs.length;
            const range = length * 10;
            _this.imgs.forEach((el, index) => {
              const x = length * 10 * (progress - index / (length - 1)) - 50;
              el.style.transform = `translate3d(${x}%,-50%,0)`;
            });
          },
          transitionStart: function() {
            _this.imgs.forEach(el => {
              el.style.transition = "all 1s ease-out";
            });
          },
          transitionEnd: function() {
            _this.imgs.forEach(el => {
              el.style.transition = "all 0s ease-out";
            });
          }
        }
      }
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
    }
  }
}
</style>
