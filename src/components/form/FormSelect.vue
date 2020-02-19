<template>
  <select
    class="form__field"
    value
    onchange="this.setAttribute('value', this.value);"
    ref="select"
  >
    <option value selected></option>
    <slot></slot>
  </select>
</template>
<script>
export default {
  mounted() {
    const $select = this.$refs.select;
    $select.setAttribute("value", $select.value);
    $select.nextElementSibling.addEventListener("click", function() {
      $select.click();
    });
  }
};
</script>
<style lang="scss">
select.input-box {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%233B3B3B'><polygon points='0,0 100,0 50,50'/></svg>")
    no-repeat;
  background-size: 1.2rem;
  background-position: calc(100% - 20px) calc(50% + 6px);
  background-repeat: no-repeat;
}
</style>
