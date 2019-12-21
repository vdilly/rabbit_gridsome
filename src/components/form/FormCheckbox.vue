<template>
  <input type="checkbox" :name="name" :id="id" :required="required" :checked="checked" />
</template>
<script>
export default {
  props: ["name", "id", "label", "required", "checked"]
};
</script>
<style lang="scss">
// Pas de label par défaut dans les groupes de checkbox (on affiche un titre à la palce)
.form__field--checkboxes > label {
  display: none;
}
input[type="checkbox"] {
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
    }
  }

  &:checked + label {
    &:before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%233B3B3B' width='443' height='443' viewBox='0 0 442.5 442.5'%3E%3Cpath d='M434.5 98.5l-38.8-38.8c-5.3-5.3-11.8-8-19.4-8 -7.6 0-14.1 2.7-19.4 8L169.6 247.2l-83.9-84.2c-5.3-5.3-11.8-8-19.4-8 -7.6 0-14.1 2.7-19.4 8L8 201.9C2.7 207.2 0 213.7 0 221.3c0 7.6 2.7 14.1 8 19.4l103.4 103.3 38.8 38.8c5.3 5.3 11.8 8 19.4 8 7.6 0 14.1-2.7 19.4-8l38.8-38.8L434.5 137.3c5.3-5.3 8-11.8 8-19.4C442.5 110.3 439.9 103.8 434.5 98.5z'/%3E%3C/svg%3E%0A");
      background-position: center;
      background-size: cover;
      border-color: $color__title;
    }
  }

  .form.validate &:required:invalid + label:before {
    border-color: $color__error;
  }
}
</style>
