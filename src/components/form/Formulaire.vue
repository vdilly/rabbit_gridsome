<template>
  <form
    class="contact__form form"
    :class="validate ? 'validate' : ''"
    :action="form.formAction"
    method="POST"
    @submit.prevent="submit"
    v-show="state == '' || state == 'error'"
  >
    <template v-for="(field, index) in form.fields">
      <fieldset class="form__fieldset" v-if="field.acfFcLayout == 'group_field'" :key="index">
        <legend class="form__legend h4">
          {{ field.label }}
          <span v-if="field.requis" class="form__required">*</span>
        </legend>
        <FormField v-for="(subfield, index) in field.fields" :field="subfield" :key="index"></FormField>
      </fieldset>
      <FormField v-else :field="field" :key="index"></FormField>
    </template>
    <div class="form__actions align-center">
      <button class="btn form__btn btn--dark" type="submit" @click="validate = true">
        <div class="flexbox">
          <div class="btn__text">{{ form.formSend }}</div>
        </div>
      </button>
    </div>
  </form>
</template>

<script>
import FormField from "~/components/form/FormField.vue";
export default {
  props: ["form"],
  data() {
    return {
      validate: false,
      state: ""
    };
  },
  components: { FormField }
};
</script>