<template lang="pug">
.cursor(
  :class="cursorHover ? 'over_link' : null",
  v-show="showCursor && siteLoaded",
  ref="cursor"
)
  svg.grab
    use(xlink:href="#grab")
</template>
<style lang="scss">
html:not(.desktop) {
  .cursor {
    display: none !important;
  }
}
.cursor {
  border: solid 2px $color__core;
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
  transform: translate(-50%, -50%);
  position: absolute;
  left: 50%;
  top: 50%;
  pointer-events: none;
  z-index: 9999999;
  transition: background-color 0.25s, width 0.25s, height 0.25s,
    border 0.25s ease;

  .grab {
    fill: $color__core;
    width: 10rem;
    height: 10rem;
    transform: translate(-50%, -50%);
    position: absolute;
    left: 50%;
    top: 50%;
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  &.over_link {
    width: 2rem;
    height: 2rem;
    background-color: $color__core;
    opacity: 0.7;
  }
  &.slider-prev {
    height: 6rem;
    width: 6rem;
    background-color: $color__core;
    border: solid 2px $color__core-font;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      border: solid 2px $color__core;
      border-radius: 50%;
      transform: scale(1.4);
    }
    &:before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      top: 50%;
      left: 50%;
      border-style: solid;
      border-width: 0.4rem 0 0 0.4rem;
      border-color: white;
      width: 1.2rem;
      height: 1.2rem;
      content: "";
      display: inline-block;
      position: relative;
      transform: translate(-50%, -50%) rotate(-45deg) translateX(2px);
      vertical-align: top;
    }
  }
  &.slider-next {
    @extend .slider-prev;
    &:before {
      border-width: 0 0.4rem 0.4rem 0;
      transform: translate(-50%, -50%) rotate(-45deg) translateX(-2px);
    }
  }
  &.slider_drag {
    background-color: $color__core;
    .grab {
      opacity: 1;
    }
  }
}
</style>
<script>
/**
 * A appeler dans le layout
 *
 * Props:
 *  customHovers : [{selector, class}],  selector = cible, class = class à appliquer sur le followcursor
 *  hovers: [selector] : selector = cible de la classe over_link
 */
export default {
  props: {
    bounds: {
      type: String,
      default: "body",
    },
    hovers: {
      type: Array,
      default: () => ["a", "button"],
    },
    disable: {
      type: Array,
      default: () => ["iframe", ".calendly-overlay"],
    },
    customHovers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showCursor: false,
      cursorHover: false,
      xmouse: void 0,
      ymouse: void 0,
      yscroll: void 0,
      x: void 0,
      y: void 0,
      dx: void 0,
      dy: void 0,
      tx: void 0,
      ty: void 0,
      key: -1,
    };
  },
  computed: {
    cursor() {
      return this.$refs.cursor;
    },
  },
  methods: {
    getMouseCoordinates: function (e) {
      this.xmouse = e.clientX || e.pageX;
      this.ymouse = e.clientY || e.pageY;
    },
    followMouse: function () {
      this.key = requestAnimationFrame(this.followMouse);

      if (!this.x || !this.y) {
        this.x = this.xmouse;
        this.y = this.ymouse;
      } else {
        this.dx = (this.xmouse - this.x) * 0.35;
        this.dy = (this.ymouse - this.y) * 0.35;
        if (Math.abs(this.dx) + Math.abs(this.dy) < 0.1) {
          this.x = this.xmouse;
          this.y = this.ymouse;
        } else {
          this.x += this.dx;
          this.y += this.dy;
        }
        this.cursor.style.left = this.x + "px";
        this.cursor.style.top = this.y + this.yscroll + "px";
      }
    },
    mouseMoveHandler(e) {
      this.getMouseCoordinates(e);

      // Etat Disable
      this.showCursor = true;
      this.disable.forEach((el) => {
        if (
          e.target.tagName.toLowerCase == el ||
          e.target.classList.contains(el) ||
          e.target.closest(el)
        ) {
          this.showCursor = false;
        }
      });
      this.getMouseCoordinates(e);

      // Etat Hover
      let hover = false;
      this.hovers.forEach((el) => {
        if (
          e.target.tagName.toLowerCase == el ||
          e.target.classList.contains(el) ||
          e.target.closest(el)
        ) {
          hover = true;
        }
      });
      // Additionals hovers simple
      // if (e.target.classList.contains(".pill")) {
      //   hover = true;
      // }
      this.cursorHover = hover;

      // Custom Hovers
      if (this.customHovers.length > 0) {
        this.customHovers.forEach((el) => {
          if (
            e.target.classList.contains(el.selector) ||
            e.target.closest("." + el.selector)
          ) {
            this.cursor.classList.add(el.class);
          } else {
            this.cursor.classList.remove(el.class);
          }
        });
      }
    },
    mouseLeaveHandler(e) {
      this.showCursor = false;
    },
  },
  mounted() {
    const _this = this;
    this.yscroll = window.scrollY;
    window.onscroll = function (e) {
      _this.yscroll = window.scrollY;
    };

    document.querySelectorAll(this.bounds).forEach((el) => {
      el.addEventListener("mousemove", this.mouseMoveHandler);
      el.addEventListener("mouseleave", this.mouseLeaveHandler);
    });
    this.followMouse();
  },
};
</script>
