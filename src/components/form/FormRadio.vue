<template lang="pug">
input(
  type="radio",
  :name="name",
  :id="id",
  required="required",
  :checked="shouldBeChecked",
  :value="value",
  @click="click",
  ref="input"
)
</template>
<script>
export default {
  model: {
    prop: "modelValue",
    event: "change",
  },

  props: ["name", "id", "label", "required", "selected", "value", "modelValue"],
  computed: {
    shouldBeChecked() {
      return this.modelValue == this.value;
    },
  },
  methods: {
    click() {
      // Pour qu'au clic on ait la value, le click doit s'envoyer après le change /!\ conflit possible car ça change le déroulé natif click then change
      this.$emit("change", this.value);
      this.$emit("click");
    },
  },
};
</script>
<style lang="scss">
input[type="radio"] {
  position: absolute;
  height: 1px;
  width: 1px;
  opacity: 0;
  bottom: 0;

  & + label {
    display: flex;
    align-items: center;
    cursor: pointer;

    font-family: $font__main;
    font-size: rem($fsi);
    line-height: 1.2em;
    color: #606060;

    &:before {
      content: "";
      height: 1.5rem;
      width: 1.5rem;
      display: block;
      margin-right: 13px;
      background-color: transparent;
      border: solid 2px #606060;
      border-radius: 2px;
      flex-shrink: 0;
      border-radius: 50%;
    }
  }

  &:checked + label {
    &:before {
      background-color: $color__title;
      border-color: $color__title;
    }
  }
  .form.validate &:required:invalid + label:before {
    border-color: $color__error;
  }
}
.form.material {
  // Exception label des checkboxes/radios
  input[type="radio"] + label {
    font-weight: 400;
  }
}
</style>
