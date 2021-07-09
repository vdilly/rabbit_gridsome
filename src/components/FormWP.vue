<template lang="pug">
FormMaterial(:ajaxTo="form.formAction" :form="form")
  h2.form-title(v-html="form.formTitle")
  template(v-for="(field, index) in form.fields")
    FormFieldset(
      v-if="field.acfFcLayout == 'group_field'",
      :fieldsetTitle="field.label",
      :required="field.requis",
      :key="index"
    )
      FormFieldsWP(
        v-for="(subfield, index) in field.fields",
        :field="subfield",
        :key="index"
      )
    FormFieldsWP(v-else, :field="field", :key="index")
</template>

<script>
import FormMaterial from "~/components/FormMaterial.vue";
import FormFieldsWP from "~/components/FormFieldsWP.vue";
export default {
  props: ["form"],
  components: { FormFieldsWP, FormMaterial },
};
</script>
