<template lang="pug">
form.form.material(
  :class="validate ? 'validate' : ''",
  :method="method",
  :action="action",
  @submit.prevent="submit",
  ref="form"
)
  .form__content
    slot
    //- Actions
    .form__actions.align-center
      slot(name="cancel")
      Btn.form__send(@click="validate = true", type="submit") Envoyer
  //- Etats de validation
  transition(name="fade")
    .form__pending.form__state(v-if="state != 'form'")
      Loader
  transition(name="fade")
    .form__success.form__state(v-if="state == 'success'")
      div Formulaire bien envoyé
  transition(name="fade")
    .form__error.form__state(v-if="state == 'error'")
      div Une erreur est survenue, #[a(href="javascript:history.go(0)") cliquer-ici] pour réessayer
</template>

<script>
import { ajaxPost } from "~/js/plugins/ajax.js";
export default {
  props: {
    toValidate: {
      default: true,
    },
    method: {
      default: "POST",
    },
    action: {
      default: null,
    },
    ajaxTo: {
      default: null,
    },
  },
  data() {
    return {
      validate: false,
      state: "form",
    };
  },
  methods: {
    submit: function (e) {
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
    },
  },
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
  .form__group {
    margin-bottom: 2rem;
    position: relative;

    &:last-child {
      margin-bottom: 0;
    }

    .form__group {
      margin-bottom: 0;
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

  // Validation
  &.validate .form__field:required:invalid {
    border-left: solid 4px $color__error;
  }
  &.validate .form__field:required:valid {
    border-left: solid 4px $color__success;
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
