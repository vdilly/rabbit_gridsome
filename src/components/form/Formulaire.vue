<template lang="pug">
form.form(:class="validate ? 'validate' : ''" :method="method" :action="action" @submit.prevent="submit" ref="form")
  div.form__content
    slot
    div.form__actions.align-center
      slot(name="cancel")
      button.form__send(@click="validate = true" type="submit")
        slot(name="send")
  transition(name="fade")
    div.form__pending.form__state(v-if="state != 'form'")
      slot(name="pending")
  transition(name="fade")
    div.form__success.form__state(v-if="state == 'success'")
      slot(name="success")
  transition(name="fade")
    div.form__error.form__state(v-if="state == 'error'")
      slot(name="error")
</template>

<script>
import FormField from "~/components/form/FormField.vue";
import { ajaxPost } from "~/js/plugins/ajax.js";
export default {
  props: {
    toValidate: {
      default: true
    },
    method: {
      default: "POST"
    },
    action: {
      default: null
    },
    ajaxTo: {
      default: null
    }
  },
  data() {
    return {
      validate: false,
      state: "form"
    };
  },
  components: { FormField },
  methods: {
    submit: function(e) {
      if (this.ajaxTo) {
        this.state = "pending";
        ajaxPost(this.ajaxTo, new FormData(e.target), this.success, this.error);
      }
    },
    success() {
      this.state = "success";
    },
    error() {
      this.state = "error";
    }
  }
};
</script>
