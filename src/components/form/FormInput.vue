<template>
  <input
    :type="type"
    :placeholder="placeholder"
    class="input-box"
    :name="name"
    :id="id"
    cols="30"
    rows="10"
    :required="required"
    onkeyup="this.setAttribute('value', this.value);"
    :value="value"
    ref="input"
  />
</template>
<script>
export default {
  props: ["name", "id", "placeholder", "type", "required", "value"],
  mounted() {
    this.$refs.input.setAttribute("value", this.$refs.input.value);
  }
};
</script>
<style lang="scss">
</style>