<template>
  <input
    class="input-box"
    onkeyup="this.setAttribute('value', this.value);"
    ref="input"
  />
</template>
<script>
export default {
  mounted() {
    this.$refs.input.setAttribute("value", this.$refs.input.value);
  }
};
</script>
<style lang="scss"></style>
