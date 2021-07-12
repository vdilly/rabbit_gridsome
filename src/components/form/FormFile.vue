<template lang="pug">
.form__file.input-box(ref="input")
  .text(v-html="text")
  input(
    type="file",
    :id="id",
    :name="name",
    :accept="accept",
    @change="change",
    ref="input",
    :required="required"
  )
  .validation-box
</template>
<script>
export default {
  props: ["id", "name", "accept", "required", "maxsize"],
  data() {
    return {
      text: "Parcourir...",
      maxFileSize: 2,
    };
  },
  beforeMount() {
    if (this.maxsize) this.maxFileSize = this.maxsize;
  },
  mounted() {
    // this.$refs.input.setAttribute("value", this.$refs.input.value);
  },
  methods: {
    toggleFileName(e) {
      if (e.target.files[0]) {
        this.text = e.target.files[0].name;
      } else {
        e.target.value = "";
        this.text = "Parcourir ...";
      }
    },
    validateFileWeight(e) {
      if (!e.target.files[0]) return;
      const file = e.target.files[0];
      let size = file.size / 1024 / 1024;
      if (size > this.maxFileSize) {
        e.target.setCustomValidity(
          "Fichier trop volumineux, max : " + this.maxFileSize + "Mo"
        );
      } else {
        e.target.setCustomValidity("");
      }
    },
    change(e) {
      this.toggleFileName(e);
      this.validateFileWeight(e);
    },
  },
};
</script>
<style lang="scss">
.form__group--file {
  display: flex;
  flex-direction: column;

  .form__file {
    order: 1;
  }
  .form__label {
    order: 0;
  }
  .form__subfield {
    order: 2;
  }

  label {
    margin-bottom: $m1;
  }
}
.form__file {
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dotted #979797;
  background-color: #f5f5f5;
  width: 100%;
  border-radius: 4px;
  position: relative;

  .text {
    font-weight: 600;
    // color: $color__title;
  }

  input {
    opacity: 0;
    position: absolute;
    cursor: pointer;
    height: 100%;
    width: 100%;
    z-index: 2;
  }
  .validation-box {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;
    // border-radius: 0.5rem;
    box-sizing: content-box;
  }
}
</style>
