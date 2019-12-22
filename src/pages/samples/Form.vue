<template>
  <Layout pageTitle="Page Formulaire">
    <Container class="container--small">
      <a href="/samples">Revenir au sommaire</a>
      <form
        class="contact__form form"
        :class="validate ? 'validate' : ''"
        action=""
        method="POST"
        @submit.prevent="submit"
        v-show="state == '' || state == 'error'"
        ref="scrollTo"
      >
        <!--  -->

        <fieldset>
          <legend class="form__legend h4">A propos de vous</legend>

          <FormGroup class="row">
            <FormGroup id="gender" label="Civilité" class="col col-2">
              <FormSelect name="gender" id="gender">
                <option value="mr" selected>Mr.</option>
                <option value="mrs" selected>Mrs.</option>
              </FormSelect>
            </FormGroup>
            <FormGroup id="name" label="Nom" class="col col-5">
              <FormInput type="text" name="name" id="name"></FormInput>
            </FormGroup>
            <FormGroup id="prenom" label="Prénom" class="col col-5">
              <FormInput type="text" name="prenom" id="prenom"></FormInput>
            </FormGroup>
          </FormGroup>

          <FormGroup id="email" label="E-mail" required="true">
            <FormInput
              type="email"
              name="email"
              id="email"
              required
            ></FormInput>
          </FormGroup>

          <FormGroup id="message" label="Votre message" required="true">
            <FormTextarea name="message" id="message" required></FormTextarea>
          </FormGroup>

          <FormGroup id="agree" label="Acceptez-vous ?" required="true">
            <FormCheckbox
              name="agree"
              id="agree"
              required
              checked="checked"
            ></FormCheckbox>
          </FormGroup>

          <FormGroup
            id="checkbox"
            label="Choisissez parmis ces cas"
            class="multiple-items"
          >
            <FormGroup id="checkbox_cas1" label="Cas 1">
              <FormCheckbox name="checkbox" id="checkbox_cas1"></FormCheckbox>
            </FormGroup>
            <FormGroup id="checkbox_cas2" label="Cas 2">
              <FormCheckbox name="checkbox" id="checkbox_cas2"></FormCheckbox>
            </FormGroup>
          </FormGroup>

          <FormGroup
            id="radio"
            label="Choisissez parmis ces radios"
            class="multiple-items"
          >
            <FormGroup id="radio_cas1" label="Cas 1">
              <FormRadio name="radios" id="radio_cas1"></FormRadio>
            </FormGroup>
            <FormGroup id="radio_cas2" label="Cas 2">
              <FormRadio name="radios" id="radio_cas2"></FormRadio>
            </FormGroup>
          </FormGroup>
        </fieldset>

        <!-- Footer Bottom -->
        <FormActions @submit="validate = true"></FormActions>

        <!--  -->
      </form>
    </Container>
  </Layout>
</template>

<script>
import FormGroup from "~/components/form/FormGroup.vue";
import FormSelect from "~/components/form/FormSelect.vue";
import FormCountrySelect from "~/components/form/FormCountrySelect.vue";
import FormTextarea from "~/components/form/FormTextarea.vue";
import FormInput from "~/components/form/FormInput.vue";
import FormCheckbox from "~/components/form/FormCheckbox.vue";
import FormRadio from "~/components/form/FormRadio.vue";
import FormActions from "~/components/form/FormActions.vue";
import systemString from "~/js/plugins/systemString";
export default {
  props: ["field", "parent_labels_display", "parent_id"],
  components: {
    FormGroup,
    FormSelect,
    FormCountrySelect,
    FormTextarea,
    FormInput,
    FormCheckbox,
    FormRadio,
    FormActions,
    FormField: () => import("~/components/form/FormField.vue")
  },

  data() {
    return {
      validate: false,
      state: ""
    };
  },
  methods: {
    submit: function(e) {
      this.state = "sendt";
      this.$smoothScroll(this.$refs.scrollTo, 100);
      console.log("envoie du formulaire");
    },
    success: function() {
      this.state = "success";
    },
    error: function() {
      this.state = "error";
    }
  }
};
</script>
