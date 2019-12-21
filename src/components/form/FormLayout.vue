<template>
  <div class="form-layout">
    <div class="no-gutter" :class="window.range == 'desktop' ? 'row' : ''">
      <div class="col col-6 left">
        <h2 class="h2 form-title" v-html="title"></h2>
        <slot name="left"></slot>
      </div>
      <div class="col col-4 right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title"]
};
</script>
<style lang="scss">
.form-layout {
  box-shadow: 0 2px 74px 0 rgba(0, 0, 0, 0.26);
  .left {
    padding: 7.3rem 11.8rem;
    background-color: #fff;
    @include RWD(tablet_only) {
      padding: 7rem 5rem;
    }
    @include RWD(mobile) {
      padding: 5rem 2rem;
      margin-left: -1.5rem;
      margin-right: -1.5rem;
    }
  }
  .right {
    padding: 7.3rem 5.3rem;
    background-color: #f5f5f5;
    @include RWD(tablet_only) {
      padding: 7rem 5rem;
    }
    @include RWD(mobile) {
      padding: 5rem 2rem;
      margin-left: -1.5rem;
      margin-right: -1.5rem;
    }

    h5 {
      color: #606060;
    }
    p {
      color: #606060;
    }
  }
}
.form-title {
  margin-bottom: 4.8rem;
}
.form__btn {
  min-width: 25rem;
}
.form__actions {
  margin-top: $m6;
}
</style>
