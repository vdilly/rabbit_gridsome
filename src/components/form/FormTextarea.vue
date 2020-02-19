<template>
  <textarea class="form__field"></textarea>
</template>
<template lang="pug">
textarea.form__field(
  cols="30"
  rows="10"
  onkeyup="this.setAttribute('value', this.value);"
  ref="textarea"
)
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
