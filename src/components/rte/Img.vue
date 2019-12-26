<template>
  <figure>
    <img lazy="img" :lazy-src="src" :lazy-placeholder="placeholder" :width="width" />
  </figure>
</template>

<script>
export default {
  props: ["img"],
  computed: {
    width() {
      if (this.img.attrs.width) {
        return this.img.attrs.width;
      } else {
        return this.getWidthFromAlias(this.alias);
      }
    },
    alias() {
      if (!this.img.attrs.sizeSlug) return null;
      return this.img.attrs.sizeSlug == "full" ? null : this.img.attrs.sizeSlug;
    },
    baseUrl() {
      let url = this.img.innerHtml.match(/\bhttps?:\/\/\S+/gi)[0];
      url = url.endsWith('"') ? url.slice(0, -1) : url;
      if (url) return url;
      console.error("Error processing rte image : ", img);
    },
    src() {
      if (this.img.attrs.width) {
        return this.size(this.baseUrl, null, this.img.attrs.width);
      } else {
        return this.size(this.baseUrl, this.alias);
      }
    },
    placeholder() {
      return this.size(this.baseUrl, "lazy");
    }
  }
};
</script>