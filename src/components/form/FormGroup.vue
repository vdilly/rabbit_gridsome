<template>
  <div class="form__group">
    <slot></slot>
    <label :for="id" v-if="label">
      {{ label }}
      <span v-if="required" class="form__required">*</span>
    </label>
  </div>
</template>

<script>
export default {
  props: ["id", "label", "required"]
};
</script>

<style lang="scss">
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

// Champs Input, select, textarea
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
</style>
