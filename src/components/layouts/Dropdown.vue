<template lang="pug">
  div.dropdown(@mouseenter="openSubmenu($event)", @mouseleave="closeSubmenu($event)")
    div.dropdown__trigger
      slot(name="trigger")
    transition(name="slideIn")
      div.dropdown__sub(v-show="submenuOpen")
        slot
</template>

<script>
export default {
  data() {
    return {
      submenuOpen: false
    };
  },
  methods: {
    openSubmenu: function(e, index) {
      e.stopPropagation();
      this.$emit("open");
      this.submenuOpen = true;
    },
    closeSubmenu: function(e) {
      e.stopPropagation();
      this.$emit("close");
      this.submenuOpen = false;
    }
  }
};
</script>

<style lang="scss">
.dropdown {
  display: flex;
  &__trigger {
    display: flex;
  }
  &__sub {
    position: absolute;
    bottom: 0rem;
    left: 50%;
    transform: translate(-50%, 100%);
    z-index: 3;
    box-shadow: $bshadow;
    background-color: white;

    & > * {
      white-space: nowrap;
    }
  }
}
</style>