<template>
  <FormGroup
    :id="id"
    :label="field.label"
    :required="field.requis"
    :class="'form__field--' + field.acfFcLayout"
  >
    <h2
      class="h4"
      v-if="field.acfFcLayout == 'titre'"
      v-html="field.titre"
    ></h2>
    <FormSelect
      v-if="field.acfFcLayout == 'select'"
      :name="id"
      :id="id"
      :required="field.requis"
    >
      <option
        v-for="(option, index) in field.options"
        :value="systemString(option.value)"
        :key="index"
        :selected="option.selected"
        v-html="option.value"
      ></option>
    </FormSelect>
    <FormCountrySelect
      v-if="field.acfFcLayout == 'country_selector'"
      :name="id"
      :id="id"
      :required="field.requis"
    ></FormCountrySelect>
    <FormTextarea
      v-if="field.acfFcLayout == 'textarea'"
      :name="id"
      :id="id"
      :placeholder="field.placeholder"
      :required="field.requis"
      :value="field.default_value"
    ></FormTextarea>
    <FormInput
      v-if="field.acfFcLayout == 'input'"
      :type="field.type"
      :name="id"
      :id="id"
      :placeholder="field.placeholder"
      :required="field.requis"
      :value="field.default_value"
    ></FormInput>
    <FormCheckbox
      v-if="field.acfFcLayout == 'single_checkbox'"
      :label="field.label"
      :name="id"
      :id="id"
      :required="field.requis"
      :checked="field.checked"
    ></FormCheckbox>

    <FormGroup
      :label="checkbox.label"
      :id="systemString(checkbox.label)"
      v-for="checkbox in field.checkboxes"
      :key="checkbox.label"
    >
      <FormCheckbox
        :name="systemString(field.label)"
        :id="systemString(checkbox.label)"
        :required="checkbox.requis"
        :checked="checkbox.checked"
      ></FormCheckbox>
    </FormGroup>
    <FormGroup
      :label="radio.label"
      :id="systemString(radio.label)"
      v-for="radio in field.radios"
      :key="radio.label"
    >
      <FormRadio
        :label="radio.label"
        :name="systemString(field.label)"
        :id="systemString(radio.label)"
        :required="radio.requis"
        :selected="radio.selected"
      ></FormRadio>
    </FormGroup>
  </FormGroup>
</template>
<script>
import FormGroup from "~/components/form/FormGroup.vue";
import FormSelect from "~/components/form/FormSelect.vue";
import FormCountrySelect from "~/components/form/FormCountrySelect.vue";
import FormTextarea from "~/components/form/FormTextarea.vue";
import FormInput from "~/components/form/FormInput.vue";
import FormCheckbox from "~/components/form/FormCheckbox.vue";
import FormRadio from "~/components/form/FormRadio.vue";
import systemString from "~/js/plugins/systemString";
export default {
  props: ["field", "parent_labels_display", "parent_id"],
  computed: {
    id() {
      if (!this.field.label) return null;
      let id = this.systemString(this.field.label);
      return id;
    }
  },
  components: {
    FormGroup,
    FormSelect,
    FormCountrySelect,
    FormTextarea,
    FormInput,
    FormCheckbox,
    FormRadio,
    FormFieldsWp: () => import("~/components/FormFieldsWP.vue")
  },
  methods: {
    systemString: systemString
  }
};
</script>
