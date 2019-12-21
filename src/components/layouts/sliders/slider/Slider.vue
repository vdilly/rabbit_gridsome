<template>
  <div class="slider__wrapper">
    <slot name="prepend"></slot>
    <div class="slider__shadow" :class="shadowed ? 'shadowed': ''">
      <div class="slider__overflow">
        <ul :class="'slider js-slide-'+index + ' ' + animation" :style="translateX">
          <slot></slot>
        </ul>
      </div>
    </div>
    <slot name="navigation" v-if="hasNavigation && slideCount > 1">
      <Navigation @dotClick="dotClick"></Navigation>
    </slot>
  </div>
</template>
<script>
import Navigation from "./Navigation.vue";
export default {
  props: {
    slideCount: Number,
    hasNavigation: {
      type: Boolean,
      default: true
    },
    animation: {
      type: String,
      default: "translateX"
    },
    shadowed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      index: 1
    };
  },
  computed: {
    translateX() {
      if (this.animation == "translateX") {
        let translate = (this.index - 1) * 100;
        let margin = (this.index - 1) * 40;
        return (
          "transform: translateX(-" +
          translate +
          "%) translateX(-" +
          margin +
          "px);"
        );
      }
    }
  },
  provide() {
    return {
      slider: this
    };
  },
  components: { Navigation },
  methods: {
    dotClick(index) {
      this.slideTo(index);
    },
    slideTo(index) {
      this.index = index;
    }
  }
};
</script>
<style lang="scss">
.slider {
  & > * + * {
    margin-left: 4rem;
  }
  &__wrapper {
  }
  &__shadow.shadowed {
    position: relative;
    & > * {
      position: relative;
      z-index: 1;
    }
    &:before {
      box-shadow: 0 2px 44px 0 rgba(0, 0, 0, 0.3);
      width: 95%;
      height: 70%;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: 0;
      content: "";
    }
  }
  &__overflow {
    overflow: hidden;
  }

  &__navigation {
    margin-top: 2rem;
  }

  &.display {
    &__item {
      display: none;
    }
    @for $i from 1 through 5 {
      &.js-slide-#{$i} {
        .slider__item:nth-child(#{$i}) {
          display: block;
        }
      }
    }
  }

  &.translateX {
    display: flex;
    transition: 0.7s ease-in-out;
    .slider__item {
      width: 100%;
      flex-shrink: 0;
      opacity: 0.7;
      transition: 0.25s;
    }
    @for $i from 1 through 5 {
      &.js-slide-#{$i} {
        .slider__item:nth-child(#{$i}) {
          opacity: 1;
        }
      }
    }
  }
}
</style>
