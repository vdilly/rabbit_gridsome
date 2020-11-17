module.exports = async function({ actions, axios }) {
  actions.addSchemaResolvers({
    WordPressAttachment: {
      full: {
        type: "String",
        resolve(obj) {
          return obj.mediaDetails.sizes.full
            ? obj.mediaDetails.sizes.full.sourceUrl
            : obj.sourceUrl;
        },
      },
      logo: {
        type: "String",
        resolve(obj) {
          return obj.mediaDetails.sizes.logo
            ? obj.mediaDetails.sizes.logo.sourceUrl
            : obj.sourceUrl;
        },
      },
      mobile: {
        type: "String",
        resolve(obj) {
          return obj.mediaDetails.sizes.mobile
            ? obj.mediaDetails.sizes.mobile.sourceUrl
            : obj.sourceUrl;
        },
      },
      lazy: {
        type: "String",
        resolve(obj) {
          return obj.mediaDetails.sizes.lazy
            ? obj.mediaDetails.sizes.lazy.sourceUrl
            : null;
        },
      },
    },
  });
};
