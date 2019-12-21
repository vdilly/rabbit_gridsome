<template>
  <div class="form__actions align-center">
    <Btn tag="button" type="submit" @click="submit">Envoyer</Btn>
  </div>
</template>

<script>
export default {
  methods: {
    submit: function() {
      this.$emit("submit");
    }
  }
};
</script>

<style lang="scss">
.form__actions {
  margin-top: $m4;
}
</style>
