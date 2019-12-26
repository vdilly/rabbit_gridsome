export default {
  data() {
    return {
      imgAliases: {
        lazy: [50],
        mobile: [1000],
        full: [1920],
        thumbnail: [150]
      }
    };
  },
  methods: {
    size: function(url, alias, width, height) {
      // Test if img from cloudinary
      if (url.indexOf("cloudinary.com") == -1) return url;

      const base = url.slice(0, url.indexOf("upload")) + "upload/";
      const file = url.slice(url.indexOf("upload/") + 6, url.length);
      let w = "",
        h = "";
      if (alias) {
        if (this.imgAliases[alias]) {
          w = this.imgAliases[alias][0] ? "w_" + this.imgAliases[alias][0] : "";
          h = this.imgAliases[alias][1] ? "h_" + this.imgAliases[alias][1] : "";
        } else {
          console.warn("Unknown alias :" + alias);
        }
      } else {
        w = width ? "w_" + width : "";
        h = height ? "h_" + height : "";
      }
      const sep = w & h ? "," : "";
      return base + w + sep + h + file;
    },
    getWidthFromAlias: function(alias) {
      return alias && this.imgAliases[alias] ? this.imgAliases[alias][0] : null;
    }
  }
};
