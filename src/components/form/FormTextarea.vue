<template>
  <textarea
    :placeholder="placeholder"
    class="input-box"
    :name="name"
    :id="id"
    cols="30"
    rows="10"
    :required="required"
    :value="value"
    onkeyup="this.setAttribute('value', this.value);"
    ref="textarea"
  ></textarea>
</template>
<script>
export default {
  props: ["name", "id", "placeholder", "required", "value"],
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
