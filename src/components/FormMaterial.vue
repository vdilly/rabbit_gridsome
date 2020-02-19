<template lang="pug">
form.form.material(:class="validate ? 'validate' : ''" :method="method" :action="action" @submit.prevent="submit" ref="form")
  div.form__content
    slot
    //- Actions
    div.form__actions.align-center
      slot(name="cancel")
      Btn.form__send(@click="validate = true" type="submit") Envoyer
  //- Etats de validation
  transition(name="fade")
    div.form__pending.form__state(v-if="state != 'form'")
      Loader
  transition(name="fade")
    div.form__success.form__state(v-if="state == 'success'")
      div Formulaire bien envoyé
  transition(name="fade")
    div.form__error.form__state(v-if="state == 'error'")
      div Une erreur est survenue, #[a(href="javascript:history.go(0)") cliquer-ici] pour réessayer
</template>

<script>
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
  methods: {
    submit: function(e) {
      if (this.ajaxTo) {
        this.state = "pending";
        ajaxPost(this.ajaxTo, new FormData(e.target), this.success, this.error);
      } else {
        console.warn("no Ajax Target on form ", e.target);
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

<style lang="scss">
// Form material
.form.material {
  padding-top: 0.5rem; // Pour éviter que le label qui remonte du premier champ dépasse des overlay d'état
  margin-top: 4rem;
  .form__subfield {
    padding-left: 2.8rem;
    margin-top: 1rem;
  }
  .form__flexbox {
    display: flex;
    align-items: flex-start;
    @include RWD(mobile) {
      display: block;
      margin-bottom: 2rem;
    }
    .form__group + .form__group {
      margin-left: 1.5rem;
      @include RWD(mobile) {
        margin-left: 0;
      }
    }
  }
  .form__fieldset {
    margin-bottom: 2rem;
  }
  .form__legend {
    font-weight: 700;
    margin-bottom: 2rem;
  }
  .form__group {
    margin-bottom: 2rem;
    position: relative;

    &:last-child {
      margin-bottom: 0;
    }

    .form__group {
      margin-bottom: 0;
    }

    &.multiple-items {
      display: flex;
      flex-direction: column;
      & > * {
        max-width: 100%;
      }
      & > label {
        order: 1;
        @extend .form__label;
        margin-bottom: 0.5rem;
      }
      & > *:not(label) {
        order: 2;
      }
    }
    &.row {
      @include RWD(mobile) {
        display: block;
        .col {
          margin-left: 0 !important;
          margin-bottom: $m2;
        }
      }
    }
  }
  .form__required {
    color: $color__error;
    margin-left: 0.2em;
  }

  .form__label {
    font-family: $font__main;
    font-weight: 600;
    font-size: 1.5rem;
    color: $color__text;
  }

  .form__field {
    border: 1px solid #adadad;

    border-radius: 4px;
    padding: $m2;
    width: 100%;
    font-family: $font__main;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.2em;
    color: $color__text;
    background-color: transparent;

    &::placeholder {
      opacity: 0.5;
    }

    &:focus {
      border-color: $color__title;
      outline: none;
    }
  }

  // Validation
  &.validate .form__field:required:invalid {
    border-left: solid 4px $color__error;
  }
  &.validate .form__field:required:valid {
    border-left: solid 4px $color__success;
  }

  // Exception label des checkboxes/radios
  input[type="radio"] + label,
  input[type="checkbox"] + label {
    font-weight: 400;
  }

  // Champs Input, select, textarea , label en placeholder
  input:not([type="radio"]):not([type="checkbox"]),
  select,
  textarea {
    pointer-events: all;
    & + label {
      pointer-events: none;
      margin-bottom: $m2;
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      padding: 0 5px;
      transition: font-size 0.25s, top 0.25s, background 0s 0.25s, opacity 0.25s;
      opacity: 0.6;
      @extend .form__label;
      &:before {
        border-radius: 0.5rem;
        position: absolute;
        top: 0px;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        content: "";
        z-index: -1;
        opacity: 0;
      }
    }
    &:focus + label,
    &:not([value=""]) + label {
      top: 1px;
      font-size: 1.2rem;
      opacity: 1;
      &:before {
        opacity: 1;
        transition: 0.15s 0.1s;
      }
    }
  }
  textarea + label {
    top: 2.5rem;
  }

  // Etats
  position: relative;

  .form__state {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
