<template>
  <!-- @TODO: Swipe avec un offset en tablet/mobile -->
  <!-- @TODO: lecture auto ? -->
  <div class="swype__overflow" @wheel="scroll" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <ul
      class="swype js-observe-scroll"
      js-observe-scroll
      :class="[isAdjustingX ? 'adjusting': '', isDragging ? 'dragging': '', isScrolling ? 'scrolling' : '']"
      @mousedown="startDrag"
      v-touch:start="startDrag"
      @mouseup="endDrag"
      v-touch:end="endDrag"
      v-touch:moving="drag"
      :style="'transform: translateX('+translateX+'px);'"
      ref="slider"
    >
      <slot></slot>
    </ul>
  </div>
</template>
<script>
import SwypeItem from "./SwypeItem.vue";
import DelayScroll from "~/mixins/delayScroll";
export default {
  mixins: [DelayScroll],
  components: { SwypeItem },
  data() {
    return {
      isDragging: false,
      hasDragged: false,
      mouseLastSeen: 0,
      translateX: 210,
      posX: 210,
      isAdjustingX: false,
      adjustingTimeout: null,

      isScrolling: false,
      isScrollFocused: false,
      scrollFocusTimeout: null
    };
  },
  computed: {
    $slider() {
      return this.$refs.slider;
    },
    minOffsetX() {
      var range = this.window.range;
      return range == "desktop" ? 210 : range == "tablet" ? 50 : 25;
    },
    maxOffsetX() {
      return this.$slider.offsetWidth - window.innerWidth + 60;
    },
    useMouse() {
      return this.device.useMouse;
    }
  },
  methods: {
    // Au focus du component on autorise le scroll à la souris du slider
    mouseenter: function() {
      let _this = this;
      this.scrollFocusTimeout = setTimeout(() => {
        _this.isScrollFocused = true;
      }, 200);
    },
    mouseleave: function() {
      if (this.scrollFocusTimeout) {
        clearTimeout(this.scrollFocusTimeout);
      }
      this.isScrollFocused = false;
    },

    /**
     * DRAG
     */

    startDrag: function(e) {
      if (e.type != "touchstart") {
        e.preventDefault();
        this.mouseLastSeen = e.pageX;
      } else {
        this.mouseLastSeen = e.touches[0].clientX;
      }
      this.isDragging = true;
      this.hasDragged = false;
      this.isAdjustingX = false;
      if (this.adjustingTimeout) {
        clearTimeout(this.adjustingTimeout);
      }
    },
    drag: function(e) {
      if (this.isDragging && !this.isAdjustingX) {
        let pageX = e.type == "mousemove" ? e.pageX : e.touches[0].clientX;
        let offset = pageX - this.mouseLastSeen;
        this.dragSlider(offset);
        this.hasDragged = true;
        this.mouseLastSeen = pageX;
      }
    },
    endDrag: function(e) {
      if (!this.isDragging) {
        return;
      }

      let _this = this;
      this.adjustDrag();

      let timeout = this.isAdjustingX ? 500 : 0;
      this.isDragging = false;
      this.mouseLastSeen = 0;
      this.adjustingTimeout = setTimeout(function() {
        _this.isAdjustingX = false;
      }, timeout);

      this.posX = this.translateX;
    },
    dragSlider: function(offset) {
      offset = offset * this.getAccel(offset);
      this.translateX += offset;
    },
    adjustDrag: function() {
      this.isAdjustingX = true;
      if (this.translateX > this.minOffsetX) {
        this.translateX = this.minOffsetX;
      } else if (this.translateX < -this.maxOffsetX) {
        this.translateX = -this.maxOffsetX;
      } else {
        this.isAdjustingX = false;
      }
    },

    /**
     * SCROLL
     */

    scroll: function(e) {
      if (e.deltaX == 0) return;
      e.preventDefault();
      this.manageScrollState(e);
      let translate = this.normalizeScrollDelta(e.deltaX);
      this.translateX = this.adjustScroll(translate);
    },
    normalizeScrollDelta: function(delta) {
      delta = delta < -100 ? -100 : delta > 100 ? 100 : delta;
      return delta;
    },
    manageScrollState: function(e) {
      this.isScrolling = true;
      let _this = this;
      this.smoothStart(e, function(delta) {
        _this.isScrolling = false;
      });
    },
    // Empêche le scroll si on dépasse les offset
    adjustScroll: function(translate) {
      translate = this.translateX + translate;
      if (translate > this.minOffsetX) {
        translate = this.minOffsetX;
      } else if (translate < -this.maxOffsetX) {
        translate = -this.maxOffsetX;
      }
      return translate;
    },

    /**
     * UTILS
     */

    getAccel: function(translate) {
      let base_accel = this.device.type != "desktop" ? 1.2 : 0.8;
      let accel =
        (this.translateX < -this.maxOffsetX && translate < 0) ||
        (this.translateX > 210 && translate > 0)
          ? 0.25
          : base_accel;
      return accel;
    },
    testMouseOutWindow(e) {
      e = e ? e : window.event;
      var from = e.relatedTarget || e.toElement;
      if (!from || from.nodeName == "HTML") {
        this.endDrag();
      }
    }
  },
  mounted() {
    var _this = this;
    document.addEventListener("mouseout", function(e) {
      _this.testMouseOutWindow(e);
    });

    let links = this.$el.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", function(e) {
        if (_this.hasDragged) {
          e.preventDefault();
        }
      });
    });
  },
  watch: {
    minOffsetX: function(data) {
      this.posX = this.minOffsetX;
      this.translateX = this.minOffsetX;
    }
  }
};
</script>
<style lang="scss">
.swype {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.5s ease-out;
  &.dragging {
    transition: transform 1s cubic-bezier(0, 0.94, 0.5, 1.08);
  }
  &.adjusting {
    transition: 0.5s;
  }

  &[js-observe-scroll] {
    .swype__item {
      transition: 0.5s;

      @for $i from 1 through 20 {
        &:nth-child(#{$i}) {
          transition-delay: #{$i * 0.1s};
        }
      }
    }
    &:not([js-observe-scroll="in-view"]) {
      .swype__item {
        transform: translateY(6rem);
        opacity: 0;
      }
    }
    &[js-observe-scroll="in-view"] {
    }
  }

  &__overflow {
    margin-left: calc(50% - (100vw / 2));
    margin-right: calc(50% - (100vw / 2));
    display: flex;
  }
}
</style>
