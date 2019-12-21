<template>
  <textarea
    class="input-box"
    cols="30"
    rows="10"
    onkeyup="this.setAttribute('value', this.value);"
    ref="textarea"
  ></textarea>
</template>
<script>
export default {
  mounted() {
    this.$refs.textarea.setAttribute("value", this.$refs.textarea.value);
  }
};
</script>
<style lang="scss">
textarea {
  resize: none;
}
</style>
