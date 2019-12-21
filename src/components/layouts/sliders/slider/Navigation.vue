<template>
  <div class="slider__navigation">
    <ul class="slider__dot">
      <li class="slider__dot-item" v-for="index in slider.slideCount" :key="index">
        <button
          :class="index == slider.index ? 'active' : ''"
          class="slider__dot-btn"
          @click="goToPage(index)"
          :title="'Aller à la slide ' + index"
        ></button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  inject: ["slider"],
  methods: {
    goToPage(index) {
      this.$emit("dotClick", index);
    }
  }
};
</script>
<style lang="scss">
.slider__dot {
  display: flex;
  align-items: center;
  justify-content: center;
  &-item + &-item {
    margin-left: 1.2rem;
  }
  &-btn {
    height: 1.2rem;
    width: 1.2rem;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.12);
    &:focus {
      outline: none;
    }

    &.active {
      background-color: #5dade2;
    }
  }
}
</style>
