<template lang="pug">
.form__group
  slot
  label.form__label(:for="id", v-if="label")
    span(v-html="label")
    span.form__required(v-if="required") *
</template>

<script>
export default {
  props: ["id", "label", "required"],
};
</script>

<style lang="scss">
// Material
%form__label {
  font-family: $font__main;
  font-weight: 600;
  font-size: 1.5rem;
  color: $color__text;
}
.form.material {
  .form__group {
  }
  .form__label {
    @extend %form__label;
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
      @extend %form__label;
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
}
</style>
