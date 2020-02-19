<template lang="pug">
  div.popin(:class="[opened? 'opened': null, panelType]")
    button.popin__trigger(@click="open")
      slot(name="trigger")
    div.popin__pop(@click="clickout")
      transition(name="fade")
        div.popin__overlay(v-if="overlayed && opened && panelType != 'full-panel' && panelType != 'anchor-panel'")
      transition(:name="panelType")
        div.popin__panel(v-show="opened")
          button.popin__close(@click="close", v-if="panelType == 'full-panel'")
            slot(name="close")
          slot
</template>

<script>
export default {
  props: {
    overlayed: {
      default: true
    },
    preventBodyScroll: {
      default: true
    },
    panelType: {
      default: "full-panel" // side-left, side-right, center, full, anchor
    }
  },
  data() {
    return {
      opened: false
    };
  },
  methods: {
    open(e) {
      e.stopPropagation();
      // Cas ou le bouton devient un close (anchor-panel)
      if (this.opened) {
        this.close(e);
        return;
      }
      this.opened = true;
      this.$emit("open");
      this.listenClikout();
      if (this.preventBodyScroll)
        document.querySelector("html").classList.add("no-scroll");
    },
    close(e) {
      e.stopPropagation();
      this.opened = false;
      this.$emit("close");
      if (this.preventBodyScroll)
        document.querySelector("html").classList.remove("no-scroll");
    },
    listenClikout() {
      document.addEventListener("click", this.clickout);
    },
    removeClickout() {
      document.removeEventListener("click", this.clikout);
    },
    clickout(e) {
      if (
        !e.target.classList.contains("popin__panel") &&
        !e.target.closest(".popin__panel")
      ) {
        this.close(e);
      }
    }
  }
};
</script>

<style lang="scss">
.popin {
  display: flex;
  align-items: center;
  justify-content: center;
  &__pop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: $z-popin;
  }
  &__overlay {
    background-color: $color__overlay;
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  &__panel {
    position: fixed;
    z-index: 2;
    background-color: white;
  }
}

// Center
.popin.center-panel {
  .popin__panel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); // /!\ aux anim sur le translate
    width: 50rem;
    height: 50rem;
    max-height: 80%;
    max-width: 80%;
  }
}

// Anchor
.popin.anchor-panel {
  .popin__panel {
    position: fixed;
    top: 8rem; // menu height
    left: 0;
    width: 100%;
    height: calc(100% - 8rem);
  }
  .burger-icon,
  .burger-icon span {
    transition: $transition-s;
  }
  &.opened {
    .burger-icon {
      height: 3rem;
      span {
        &:nth-child(1) {
          transform: rotate(45deg);
          transform-origin: top left;
        }
        &:nth-child(2) {
          opacity: 0;
        }
        &:nth-child(3) {
          transform: rotate(-45deg);
          transform-origin: bottom left;
        }
      }
    }
  }
}

// Side panel
.popin {
  &.side-right-panel,
  &.side-left-panel {
    .popin {
      &__panel {
        top: 0;
        bottom: 0;
        width: auto;
        max-width: calc(100% - 8rem);
      }
    }
  }
  &.side-right-panel {
    .popin__panel {
      right: 0;
    }
  }
  &.side-left-panel {
    .popin__panel {
      left: 0;
    }
  }
}

// Full panel
.popin.full-panel {
  .popin__panel {
    padding-top: 4rem;
    padding-right: 4rem;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .popin__close {
    position: absolute;
    top: 2rem;
    right: 2rem;
    z-index: 4;
  }
}

// Animations

// Center panel
.center-panel-enter-active,
.center-panel-leave-active {
  transition: $transition-s;
}
.center-panel-enter,
.center-panel-leave-to {
  opacity: 0;
}

// Anchor panel
.anchor-panel-enter-active,
.anchor-panel-leave-active {
  transition: $transition-s;
}
.anchor-panel-enter,
.anchor-panel-leave-to {
  transform: translateY(10rem);
  opacity: 0;
}

// Full panel
.full-panel-enter-active,
.full-panel-leave-active {
  transition: $transition-s;
}
.full-panel-enter,
.full-panel-leave-to {
  transform: scale(0.8);
  opacity: 0;
}

// Panel left
.side-left-panel-enter-active,
.side-left-panel-leave-active {
  transition: $transition-m;
}
.side-left-panel-enter,
.side-left-panel-leave-to {
  transform: translateX(-100%);
}

// Panel right
.side-right-panel-enter-active,
.side-right-panel-leave-active {
  transition: $transition-m;
}
.side-right-panel-enter,
.side-right-panel-leave-to {
  transform: translateX(100%);
}
</style>