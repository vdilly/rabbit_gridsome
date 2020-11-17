<template lang="pug">
fieldset.form__fieldset
  legend.form__legend
    span(v-html="fieldsetTitle")
    span.form__required(v-if="required") *
  slot
</template>

<script>
export default {
  props: ["fieldsetTitle", "required"],
};
</script>
<style lang="scss">
.form.material {
  .form__fieldset {
    margin-bottom: 2rem;
  }
  .form__legend {
    font-weight: 700;
    margin-bottom: 2rem;
  }
}
</style>
